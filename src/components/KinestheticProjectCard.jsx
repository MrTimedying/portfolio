import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { GithubFill } from "./icons";

const KinestheticProjectCard = ({ data, link, index = 0, onHover, onLeave }) => {
  const [energyLevel, setEnergyLevel] = useState(0);
  const [isActivated, setIsActivated] = useState(false);
  const [muscleActivation, setMuscleActivation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Simulate continuous energy flow with slight variations
    const energyInterval = setInterval(() => {
      setEnergyLevel((prev) => (prev + 0.1 + Math.random() * 0.05) % (Math.PI * 2));
    }, 100);

    return () => clearInterval(energyInterval);
  }, []);

  // Calculate energy flow visualization
  const energyIntensity = (Math.sin(energyLevel) + 1) / 2; // 0 to 1
  const energyColor = `rgba(224, 122, 95, ${0.1 + energyIntensity * 0.3})`;

  // Gait-inspired movement pattern
  const gaitPhase = index * 0.5; // Offset each card's movement phase
  
  // Muscle activation simulation
  const handleActivation = () => {
    setIsActivated(true);
    setMuscleActivation(1);
    
    // Simulate muscle contraction and relaxation
    setTimeout(() => {
      setMuscleActivation(0.5);
      setTimeout(() => {
        setMuscleActivation(0);
        setIsActivated(false);
      }, 300);
    }, 200);
  };

  // Get project type for ECG
  const getProjectType = () => {
    const title = data.title.toLowerCase();
    if (title.includes('fulcrum')) return 'fulcrum';
    if (title.includes('cornea')) return 'cornea';
    if (title.includes('auditor')) return 'auditor';
    return 'fulcrum';
  };

  // Handle hover events for neural pathways
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHover) onHover(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onLeave) onLeave();
  };

  return (
    <motion.div
      id="kinesthetic_card_container"
      className="relative text-center w-96 justify-self-start font-xs bg-[#373f51] border-[#e07a5f] border-2 text-[#ebcfb2] rounded-lg shadow-lg shadow-black-500/50 p-5 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        // Subtle breathing movement
        scale: 1 + Math.sin(energyLevel + gaitPhase) * 0.005,
      }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        scale: 1.05,
        y: -8,
        boxShadow: [
          "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
          "0 35px 60px -12px rgba(224, 122, 95, 0.2)",
          "0 25px 50px -12px rgba(0, 0, 0, 0.4)"
        ],
        transition: { 
          duration: 0.6,
          boxShadow: { 
            duration: 1.5, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }
        }
      }}
      whileTap={{
        scale: 0.98,
        // Simulate lateral weight shift during gait
        x: [0, -3, 3, 0],
        transition: { duration: 0.4, ease: "easeInOut" }
      }}
      onClick={handleActivation}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Energy field background */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${energyColor} 0%, transparent 70%)`
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [0.8, 1.1, 0.8],
        }}
        transition={{
          duration: 3 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Muscle activation overlay */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#e07a5f] to-transparent"
        animate={{
          opacity: muscleActivation * 0.3,
          x: muscleActivation * 10,
        }}
        transition={{ duration: 0.2 }}
      />



      {/* Energy particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#e07a5f] rounded-full"
            animate={{
              x: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%"
              ],
              y: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%"
              ],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Enhanced title row */}
      <motion.div
        id="card_title"
        className="relative flex items-center text-[#e07a5f] font-medium gap-2 justify-start mb-2 z-10"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <motion.div
          className="relative"
          whileHover={{ 
            rotate: 360,
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
          animate={{
            // Subtle pulsing based on energy flow
            scale: 1 + energyIntensity * 0.1,
          }}
        >
          <GithubFill />
          {/* Energy emanation from icon */}
          <motion.div
            className="absolute inset-0 bg-[#e07a5f] rounded-full"
            animate={{
              scale: [1, 2, 1],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        <motion.a 
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10"
          whileHover={{ 
            color: "#ebcfb2",
            x: 5,
            transition: { duration: 0.2 }
          }}
          animate={{
            // Simulate text "breathing" with the interface
            letterSpacing: `${energyIntensity * 0.5}px`,
          }}
        >
          {data.title}
        </motion.a>
      </motion.div>

      {/* Enhanced body description */}
      <motion.div 
        id="card_body" 
        className="relative mb-4 justify-start text-xs text-left z-10"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          // Subtle text flow effect
          y: Math.sin(energyLevel * 0.5) * 0.5,
        }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {data.body || data.description}
      </motion.div>

      {/* Enhanced footer with movement indicators */}
      <motion.div
        id="card_footer"
        className="relative flex items-center gap-2 text-sm text-zinc-300 justify-between mt-2 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <motion.span 
          className="text-sm flex items-center"
          whileHover={{ scale: 1.05 }}
        >
          <motion.span
            className="inline-block h-3 w-3 rounded-full mr-2 border border-[#ebcfb2]"
            style={{
              backgroundColor: data.backgroundColor || "#ebcfb2",
            }}
            animate={{ 
              scale: [1, 1.2, 1],
              boxShadow: [
                `0 0 0 0 ${data.backgroundColor || "#ebcfb2"}`,
                `0 0 0 4px ${data.backgroundColor || "#ebcfb2"}22`,
                `0 0 0 0 ${data.backgroundColor || "#ebcfb2"}`,
              ]
            }}
            transition={{ 
              duration: 2 + index * 0.3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {data.language}
        </motion.span>
        
        <div className="flex gap-2">
          <motion.span 
            className="px-2 py-0.5 rounded bg-[#e07a5f] text-[#373f51]"
            whileHover={{ 
              scale: 1.1,
              backgroundColor: "#ebcfb2",
              transition: { duration: 0.2 }
            }}
            animate={{
              // Pulse with energy flow
              boxShadow: `0 0 ${energyIntensity * 10}px rgba(224, 122, 95, ${energyIntensity * 0.5})`,
            }}
          >
            {data.status}
          </motion.span>
          <motion.span 
            className="px-2 py-0.5 rounded bg-[#ebcfb2] text-[#373f51]"
            whileHover={{ 
              scale: 1.1,
              backgroundColor: "#e07a5f",
              color: "#ebcfb2",
              transition: { duration: 0.2 }
            }}
          >
            {data.version}
          </motion.span>
        </div>
      </motion.div>

      {/* Activation feedback */}
      {isActivated && (
        <motion.div
          className="absolute inset-0 border-2 border-[#e07a5f] rounded-lg pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.8, 1.05, 1],
          }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.div>
  );
};

export default KinestheticProjectCard; 