import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import * as d3 from 'd3';

const MindActivityDashboard = ({ className = "", commitCounts = {} }) => {
  const svgRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [brainState, setBrainState] = useState('focused'); // idle, focused, creative, analytical

  // Brain activity data for different domains
  const [activityData, setActivityData] = useState([
    {
      domain: 'AI Research',
      frequency: 8, // Hz - Alpha waves
      amplitude: 0.7,
      color: '#e61f48',
      baselineActivity: 0.6,
      currentActivity: 0.7,
      commits: commitCounts.ai || 0
    },
    {
      domain: 'Coding Projects', 
      frequency: 15, // Hz - Beta waves
      amplitude: 0.8,
      color: '#3572A5',
      baselineActivity: 0.8,
      currentActivity: 0.9,
      commits: commitCounts.coding || 0
    },
    {
      domain: 'Movement Science',
      frequency: 12, // Hz - SMR waves
      amplitude: 0.6,
      color: '#e07a5f',
      baselineActivity: 0.5,
      currentActivity: 0.6,
      commits: commitCounts.movement || 0
    },
    {
      domain: 'Learning',
      frequency: 6, // Hz - Theta waves
      amplitude: 0.5,
      color: '#81b366',
      baselineActivity: 0.4,
      currentActivity: 0.5,
      commits: 0
    }
  ]);

  // Update activity based on commits (simulating real data)
  useEffect(() => {
    setActivityData(prev => prev.map(item => ({
      ...item,
      currentActivity: Math.min(1, item.baselineActivity + (item.commits * 0.05)),
      amplitude: Math.min(1, 0.3 + (item.commits * 0.1))
    })));
  }, [commitCounts]);

  // EEG Wave Animation with Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const waveHeight = (height - 40) / activityData.length; // Space for each wave

    let animationTime = 0;

    const animate = () => {
      animationTime += 0.05;
      setCurrentTime(animationTime);
      
      ctx.clearRect(0, 0, width, height);
      
      // Draw background grid (like EEG paper)
      ctx.strokeStyle = 'rgba(200, 200, 200, 0.2)';
      ctx.lineWidth = 0.5;
      
      // Vertical grid lines
      for (let x = 0; x < width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      // Horizontal grid lines
      for (let y = 0; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw EEG waves for each domain
      activityData.forEach((domain, index) => {
        const centerY = (index + 0.5) * waveHeight + 20;
        const waveAmplitude = domain.amplitude * (waveHeight * 0.3);
        
        ctx.strokeStyle = domain.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        // Generate wave points
        for (let x = 0; x < width; x += 1) {
          const time = (animationTime + x * 0.02) * domain.frequency;
          
          // Complex wave combining multiple frequencies for realistic EEG
          let y = Math.sin(time) * waveAmplitude;
          y += Math.sin(time * 2.3 + 1) * (waveAmplitude * 0.3);
          y += Math.sin(time * 0.7 + 2) * (waveAmplitude * 0.2);
          
          // Add some noise for realism
          y += (Math.random() - 0.5) * (waveAmplitude * 0.1);
          
          // Modulate by activity level
          y *= domain.currentActivity;
          
          const finalY = centerY + y;
          
          if (x === 0) {
            ctx.moveTo(x, finalY);
          } else {
            ctx.lineTo(x, finalY);
          }
        }
        
        ctx.stroke();
        
        // Draw domain label
        ctx.fillStyle = domain.color;
        ctx.font = '12px monospace';
        ctx.fillText(domain.domain, 8, centerY - waveHeight/3);
        
        // Draw activity level indicator
        const activityWidth = domain.currentActivity * 60;
        ctx.fillStyle = `${domain.color}40`;
        ctx.fillRect(width - 80, centerY - waveHeight/3 - 5, activityWidth, 10);
        ctx.strokeStyle = domain.color;
        ctx.strokeRect(width - 80, centerY - waveHeight/3 - 5, 60, 10);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [activityData]);

  // D3 Progress Bars for Learning/Development
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 20, left: 120 };
    const width = 300 - margin.left - margin.right;
    const height = 200 - margin.bottom - margin.top;

    const container = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Learning progress data
    const learningData = [
      { skill: 'React/Three.js', progress: 0.85, target: 0.95 },
      { skill: 'AI/ML Concepts', progress: 0.70, target: 0.90 },
      { skill: 'D3 Visualization', progress: 0.60, target: 0.85 },
      { skill: 'Movement Analysis', progress: 0.90, target: 0.95 }
    ];

    const yScale = d3.scaleBand()
      .domain(learningData.map(d => d.skill))
      .range([0, height])
      .padding(0.2);

    const xScale = d3.scaleLinear()
      .domain([0, 1])
      .range([0, width]);

    // Background bars
    container.selectAll(".bg-bar")
      .data(learningData)
      .enter()
      .append("rect")
      .attr("class", "bg-bar")
      .attr("x", 0)
      .attr("y", d => yScale(d.skill))
      .attr("width", width)
      .attr("height", yScale.bandwidth())
      .attr("fill", "#f0f0f0")
      .attr("rx", 4);

    // Progress bars
    container.selectAll(".progress-bar")
      .data(learningData)
      .enter()
      .append("rect")
      .attr("class", "progress-bar")
      .attr("x", 0)
      .attr("y", d => yScale(d.skill))
      .attr("width", 0)
      .attr("height", yScale.bandwidth())
      .attr("fill", (d, i) => activityData[i % activityData.length].color)
      .attr("rx", 4)
      .transition()
      .duration(2000)
      .delay((d, i) => i * 200)
      .attr("width", d => xScale(d.progress));

    // Target indicators
    container.selectAll(".target-line")
      .data(learningData)
      .enter()
      .append("line")
      .attr("class", "target-line")
      .attr("x1", d => xScale(d.target))
      .attr("x2", d => xScale(d.target))
      .attr("y1", d => yScale(d.skill))
      .attr("y2", d => yScale(d.skill) + yScale.bandwidth())
      .attr("stroke", "#333")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "3,3");

    // Labels
    container.selectAll(".label")
      .data(learningData)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", -10)
      .attr("y", d => yScale(d.skill) + yScale.bandwidth()/2)
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "middle")
      .style("font-size", "11px")
      .style("font-family", "monospace")
      .text(d => d.skill);

    // Progress text
    container.selectAll(".progress-text")
      .data(learningData)
      .enter()
      .append("text")
      .attr("class", "progress-text")
      .attr("x", width + 10)
      .attr("y", d => yScale(d.skill) + yScale.bandwidth()/2)
      .attr("dominant-baseline", "middle")
      .style("font-size", "10px")
      .style("font-family", "monospace")
      .style("fill", "#666")
      .text(d => `${Math.round(d.progress * 100)}%`);

  }, [activityData]);

  return (
    <motion.div 
      className={`relative rounded-lg p-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 0.5, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      style={{ opacity: 0.5 }}
    >
      {/* Header */}
      <motion.div 
        className="mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-lg font-mono font-bold text-gray-800 mb-1">
          Mind Activity Dashboard
        </h3>
        <p className="text-xs text-gray-600 font-mono">
          Real-time neural activity • {activityData.length} domains monitored
        </p>
      </motion.div>

      {/* EEG Wave Display */}
      <motion.div 
        className="mb-6 relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="text-xs text-gray-600 mb-2 font-mono">Brainwave Activity (Hz)</div>
        <canvas
          ref={canvasRef}
          width={400}
          height={240}
          className="w-full border border-gray-200 rounded bg-gray-50"
        />
      </motion.div>

      {/* Learning Progress Section */}
      <motion.div 
        className="mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0 }}
      >
        <div className="text-xs text-gray-600 mb-2 font-mono">Learning Progress</div>
        <svg ref={svgRef}></svg>
      </motion.div>

      {/* Brain State Indicator */}
      <motion.div 
        className="flex items-center justify-between text-xs font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-gray-600">Brain State: {brainState}</span>
        </div>
        <div className="text-gray-500">
          {Math.round(currentTime * 10) / 10}s elapsed
        </div>
      </motion.div>

      {/* Activity Legend */}
      <motion.div 
        className="mt-4 pt-3 border-t border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <div className="text-xs text-gray-600 mb-2 font-mono">Domain Activity</div>
        <div className="grid grid-cols-2 gap-2">
          {activityData.map((domain) => (
            <div key={domain.domain} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: domain.color }}
              />
              <span className="text-xs text-gray-700 font-mono">
                {domain.domain.split(' ')[0]}
              </span>
              <span className="text-xs text-gray-500 font-mono">
                {Math.round(domain.currentActivity * 100)}%
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MindActivityDashboard; 