import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

// Canvas dimensions – keep them in sync with JSX below
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 112;

const ECGPulse = ({ projectType, intensity = 1, isActive = false, cardRef, commitCount = 0 }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [pulseData, setPulseData] = useState([]);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [pulsePosition, setPulsePosition] = useState(0); // Position of the light pulse
  const [lastBeatTime, setLastBeatTime] = useState(0);

  // Calculate heart rate based on GitHub commit activity - use ref to avoid animation restarts
  const heartRateRef = useRef(72);

  const calculateHeartRate = (commits) => {
    const baseRate = 60; // Resting heart rate
    const maxRate = 120; // Maximum heart rate for very active projects
    
    // Convert commits to heart rate (commits per week → BPM)
    // 0-2 commits = 60-70 BPM (resting)
    // 3-7 commits = 70-90 BPM (active)
    // 8+ commits = 90-120 BPM (intense development)
    let activityRate;
    if (commits <= 2) {
      activityRate = baseRate + (commits * 5); // 60-70 BPM
    } else if (commits <= 7) {
      activityRate = 70 + ((commits - 2) * 4); // 70-90 BPM
    } else {
      activityRate = Math.min(90 + ((commits - 7) * 3), maxRate); // 90-120 BPM, capped
    }
    
    return Math.round(activityRate);
  };

  // Update heart rate only when commit count changes, without triggering re-renders
  useEffect(() => {
    heartRateRef.current = calculateHeartRate(commitCount);
  }, [commitCount]);



  // Generate ECG waveform data
  const generateECGWaveform = () => {
    const bpm = heartRateRef.current;
    // Scale samples per beat based on BPM - higher BPM = more frequent QRS complexes
    const baseSamplesPerBeat = 120; // Base samples for 60 BPM
    const samplesPerBeat = Math.max(80, baseSamplesPerBeat * (60 / bpm)); // Adjust frequency based on BPM
    const totalSamples = 450; // More data for longer display
    const data = [];

    for (let i = 0; i < totalSamples; i++) {
      const beatProgress = (i % samplesPerBeat) / samplesPerBeat;
      let amplitude = 0;

      // P wave (atrial depolarization)
      if (beatProgress >= 0.1 && beatProgress <= 0.2) {
        amplitude = 0.2 * Math.sin((beatProgress - 0.1) * Math.PI / 0.1);
      }
      // QRS complex (ventricular depolarization) - main spike
      else if (beatProgress >= 0.3 && beatProgress <= 0.4) {
        const qrsProgress = (beatProgress - 0.3) / 0.1;
        if (qrsProgress < 0.3) {
          amplitude = -0.3 * Math.sin(qrsProgress * Math.PI / 0.3); // Q wave
        } else if (qrsProgress < 0.6) {
          amplitude = 1.0 * Math.sin((qrsProgress - 0.3) * Math.PI / 0.3); // R wave
        } else {
          amplitude = -0.4 * Math.sin((qrsProgress - 0.6) * Math.PI / 0.4); // S wave
        }
      }
      // T wave (ventricular repolarization)
      else if (beatProgress >= 0.6 && beatProgress <= 0.8) {
        amplitude = 0.3 * Math.sin((beatProgress - 0.6) * Math.PI / 0.2);
      }

      // Add slight noise for realism
      amplitude += (Math.random() - 0.5) * 0.05;
      data.push(amplitude * intensity);
    }

    return data;
  };

  useEffect(() => {
    setPulseData(generateECGWaveform());
  }, [commitCount, intensity]);

  // Calculate position relative to card with improved stability
  useEffect(() => {
    if (!cardRef) return;
    
    const updatePosition = () => {
      const cardRect = cardRef.getBoundingClientRect();
      
      // More stable positioning fixed to viewport (no scroll offset needed)
      setPosition({
        top: cardRect.top + (cardRect.height / 2) - CANVAS_HEIGHT / 2,
        left: Math.min(cardRect.right + 20, window.innerWidth - CANVAS_WIDTH - 20),
      });
    };

    // Debounce position updates to prevent excessive recalculations
    let timeoutId;
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updatePosition, 10);
    };

    updatePosition();
    
    window.addEventListener('resize', debouncedUpdate);
    window.addEventListener('scroll', debouncedUpdate);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedUpdate);
      window.removeEventListener('scroll', debouncedUpdate);
    };
  }, [cardRef]);

  // Canvas animation with light ball following ECG path
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;
    const scale = height * 0.3;
    let baselineOffset = 0; // For moving baseline animation
    
    // Calculate beat interval in milliseconds
    const beatInterval = (60 / heartRateRef.current) * 1000;
    
    // Simplified smooth interpolation (less intensive than Catmull-Rom)
    const smoothInterpolate = (p1, p2, t) => {
      // Simple cubic easing for smoothness without heavy computation
      const eased = t * t * (3 - 2 * t);
      return p1 + (p2 - p1) * eased;
    };
    
    const animate = (currentTime) => {
      // Initialize lastBeatTime if not set
      if (lastBeatTime === 0) {
        setLastBeatTime(currentTime);
      }
      
      // Update pulse position with continuous looping using modulo
      const timeElapsed = currentTime - lastBeatTime;
      const pulseProgress = (timeElapsed / beatInterval) % 1; // Modulo for continuous loop
      const currentPulseX = pulseProgress * width;
      
      // Update baseline offset for moving ECG effect
      baselineOffset += (heartRateRef.current / 60) * 0.3; // Slower baseline movement
      
      ctx.clearRect(0, 0, width, height);
      
      // Draw very subtle grid lines
      ctx.strokeStyle = 'rgba(128, 128, 128, 0.015)';
      ctx.lineWidth = 0.15;
      
      // Only major grid lines
      for (let i = 0; i <= height; i += 30) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }
      
      for (let i = 0; i <= width; i += 60) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }

      // Calculate current Y position on ECG curve
      const dataIndex = Math.floor((currentPulseX + baselineOffset) % pulseData.length);
      const currentPulseY = centerY - (pulseData[dataIndex] * scale);

      // Draw ECG waveform trail with optimized smoothness and edge fading
      const trailLength = 180; // Longer trail
      const trailStart = Math.max(0, currentPulseX - trailLength);
      const fadeZone = 40; // Fade zone at edges
      
      if (currentPulseX > 0) {
        // Set up for smooth curves (optimized)
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Collect points with reasonable step size for performance
        const points = [];
        const step = 1.5; // Balanced step size - smooth but not laggy
        
        for (let x = trailStart; x <= currentPulseX; x += step) {
          const trailDataIndex = Math.floor((x + baselineOffset) % pulseData.length);
          const y = centerY - (pulseData[trailDataIndex] * scale);
          points.push({ x, y });
        }
        
        // Draw smooth curve with simple interpolation
        if (points.length > 1) {
          ctx.beginPath();
          
          for (let i = 0; i < points.length - 1; i++) {
            const currentPoint = points[i];
            const nextPoint = points[i + 1];
            
            // Draw smooth segments with interpolation
            for (let t = 0; t <= 1; t += 0.2) { // Reduced interpolation steps
              const x = smoothInterpolate(currentPoint.x, nextPoint.x, t);
              const y = smoothInterpolate(currentPoint.y, nextPoint.y, t);
              
              // Calculate distance from light for opacity
              const distanceFromBall = currentPulseX - x;
              const fadeOpacity = Math.max(0, 1 - (distanceFromBall / trailLength));
              
              // Edge fade effects
              let edgeFade = 1;
              if (x < fadeZone) {
                edgeFade = x / fadeZone; // Fade in from left
              }
              if (x > width - fadeZone) {
                edgeFade = (width - x) / fadeZone; // Fade out to right
              }
              
              // Combined opacity
              const baseOpacity = 0.04;
              const maxOpacity = 0.85;
              const finalOpacity = (baseOpacity + (fadeOpacity * maxOpacity)) * edgeFade;
              
              if (finalOpacity > 0.01) {
                ctx.strokeStyle = `rgba(230, 31, 72, ${finalOpacity})`; // Correct logo crimson red
                ctx.lineWidth = 2 + (fadeOpacity * 0.8); // Thinner line
                
                // Add subtle glow effect to the line (same effect, correct red color)
                ctx.shadowColor = `rgba(230, 31, 72, ${finalOpacity * 0.4})`;
                ctx.shadowBlur = 1.5 + (fadeOpacity * 2); // Subtle glow that increases near light
                
                if (i === 0 && t === 0) {
                  ctx.moveTo(x, y);
                } else {
                  ctx.lineTo(x, y);
                }
              }
            }
          }
          ctx.stroke();
        }
      }

      // Draw single light at the head of the animation
      if (currentPulseX <= width) {
        const logoRed = [230, 31, 72]; // #e61f48 - correct logo color
        
        // Calculate light spread based on ECG amplitude
        const currentAmplitude = Math.abs(pulseData[dataIndex]);
        const spreadFactor = 1 + (currentAmplitude * 0.6);
        
        // Single light at current position
        const lightX = currentPulseX;
        const lightY = currentPulseY;
        
        // Create glow layers for the single light point
        const glowLayers = [
          { radius: 20 * spreadFactor, opacity: 0.3 },
          { radius: 14 * spreadFactor, opacity: 0.5 },
          { radius: 10 * spreadFactor, opacity: 0.7 },
          { radius: 6 * spreadFactor, opacity: 0.9 }
        ];
        
        glowLayers.forEach((layer) => {
          // Create radial glow
          const gradient = ctx.createRadialGradient(
            lightX, lightY, 0,
            lightX, lightY, layer.radius
          );
          
          const layerIntensity = layer.opacity;
          // Brighter center with logo red, more faded glow
          if (layer.radius <= 10) {
            // Inner layers - brighter red center
            gradient.addColorStop(0, `rgba(255, 120, 140, ${layerIntensity})`); // Brighter shade of logo red
            gradient.addColorStop(0.3, `rgba(${logoRed[0]}, ${logoRed[1] + 20}, ${logoRed[2] + 20}, ${layerIntensity})`);
            gradient.addColorStop(0.6, `rgba(${logoRed[0]}, ${logoRed[1]}, ${logoRed[2]}, ${layerIntensity * 0.8})`);
            gradient.addColorStop(1, `rgba(${logoRed[0]}, ${logoRed[1]}, ${logoRed[2]}, ${layerIntensity * 0.3})`);
          } else {
            // Outer layers - much more faded glow
            gradient.addColorStop(0, `rgba(${logoRed[0]}, ${logoRed[1] + 15}, ${logoRed[2] + 15}, ${layerIntensity * 0.6})`);
            gradient.addColorStop(0.4, `rgba(${logoRed[0]}, ${logoRed[1]}, ${logoRed[2]}, ${layerIntensity * 0.4})`);
            gradient.addColorStop(0.7, `rgba(${logoRed[0]}, ${logoRed[1]}, ${logoRed[2]}, ${layerIntensity * 0.2})`);
            gradient.addColorStop(1, `rgba(${logoRed[0]}, ${logoRed[1]}, ${logoRed[2]}, 0)`);
          }
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          
          // Create slightly elliptical shape based on path direction
          ctx.save();
          ctx.translate(lightX, lightY);
          
          // Scale based on ECG slope for organic following effect
          const nextDataIndex = Math.floor(((lightX + 3) + baselineOffset) % pulseData.length);
          const slope = pulseData[nextDataIndex] - pulseData[dataIndex];
          const scaleX = 1 + Math.abs(slope) * 0.2;
          const scaleY = 1 - Math.abs(slope) * 0.1;
          
          ctx.scale(scaleX, scaleY);
          ctx.arc(0, 0, layer.radius, 0, Math.PI * 2);
          ctx.restore();
          ctx.fill();
        });
        
        // Add subtle flowing sparkle trail for high amplitude sections
        if (currentAmplitude > 0.6) {
          for (let i = 0; i < 4; i++) {
            const trailX = currentPulseX - (i * 6) - Math.random() * 3;
            const trailY = currentPulseY + (Math.random() - 0.5) * 8;
            const sparkleSize = (1 - i * 0.2) * (0.6 + Math.random() * 0.3);
            const sparkleOpacity = (1 - i * 0.25) * (0.3 + Math.random() * 0.3);
            
            if (trailX > trailStart) {
              ctx.fillStyle = `rgba(255, 255, 255, ${sparkleOpacity})`;
              ctx.beginPath();
              ctx.arc(trailX, trailY, sparkleSize, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [pulseData]);

  return (
    <motion.div 
      className="fixed w-[400px] h-28 overflow-hidden z-40 pointer-events-none"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        opacity: 0.5,
        transform: 'translateZ(0)', // Force hardware acceleration
        willChange: 'transform, opacity'
      }}
      initial={{ opacity: 0, scale: 0.9, x: -30 }}
      animate={{ opacity: 0.5, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: -30 }}
      transition={{ 
        duration: 0.4, 
        ease: "easeOut",
        opacity: { duration: 0.3 }
      }}
    >
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="w-full h-full"
      />
      
      {/* Heart rate display */}
      <div className="absolute top-1 right-2 text-sm font-mono text-[#e07a5f] font-medium drop-shadow-sm">
        {Math.round(heartRateRef.current)} BPM
      </div>
      
      {/* Commit activity indicator */}
      <div className="absolute top-6 right-2 text-xs font-mono text-[#e07a5f] opacity-80 drop-shadow-sm">
        {commitCount} commits/week
      </div>
      
      {/* Project health indicator */}
      <div className="absolute bottom-1 right-2 flex items-center space-x-1">
        <div 
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: 
              heartRateRef.current < 70 ? '#10b981' : // Green - resting
              heartRateRef.current < 90 ? '#f59e0b' : // Yellow - active
              '#ef4444' // Red - intense
          }}
        />
        <span className="text-xs text-[#e07a5f] font-medium drop-shadow-sm">
          {heartRateRef.current < 70 ? 'Rest' : heartRateRef.current < 90 ? 'Active' : 'Intense'}
        </span>
      </div>
    </motion.div>
  );
};

export default ECGPulse; 