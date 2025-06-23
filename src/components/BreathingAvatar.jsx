import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

const BreathingAvatar = ({ src, alt, className, onClick }) => {
  const [breathPhase, setBreathPhase] = useState(0);
  const [heartRate, setHeartRate] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // 4-7-8 breathing pattern (scientifically-based relaxation technique)
    const breathingInterval = setInterval(() => {
      setBreathPhase((prev) => (prev + 1) % 3);
    }, 6333); // 19-second total cycle divided by 3 phases

    // Simulated heart rate variation
    const heartInterval = setInterval(() => {
      setHeartRate((prev) => (prev + 0.1) % (Math.PI * 2));
    }, 100);

    return () => {
      clearInterval(breathingInterval);
      clearInterval(heartInterval);
    };
  }, []);

  // Calculate breathing animation values
  const getBreathingAnimation = () => {
    switch (breathPhase) {
      case 0: // Inhale (4 seconds)
        return {
          scale: [1, 1.03],
          transition: { duration: 4, ease: "easeInOut" }
        };
      case 1: // Hold (7 seconds)
        return {
          scale: 1.03,
          transition: { duration: 7, ease: "linear" }
        };
      case 2: // Exhale (8 seconds)
        return {
          scale: [1.03, 1],
          transition: { duration: 8, ease: "easeInOut" }
        };
      default:
        return { scale: 1 };
    }
  };

  // Subtle heart rate visualization
  const heartRateIntensity = Math.sin(heartRate) * 0.01 + 1;

  return (
    <motion.div
      className="relative overflow-hidden rounded-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      animate={getBreathingAnimation()}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {/* Main avatar image */}
      <motion.img
        src={src}
        alt={alt}
        className={className}
        animate={{
          filter: [
            `brightness(${heartRateIntensity}) hue-rotate(0deg)`,
            `brightness(${heartRateIntensity}) hue-rotate(${breathPhase * 2}deg)`
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Breathing indicator overlay */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-[#e07a5f] opacity-0"
        animate={{
          opacity: isHovered ? [0, 0.3, 0] : 0,
          scale: isHovered ? [1, 1.1, 1] : 1,
        }}
        transition={{
          duration: breathPhase === 0 ? 4 : breathPhase === 1 ? 7 : 8,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut"
        }}
      />

      {/* Heart rate pulse indicator */}
      <motion.div
        className="absolute bottom-2 right-2 w-3 h-3 bg-red-500 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 0.8, // ~75 BPM
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Hover tooltip for physiological info */}
      {isHovered && (
        <motion.div
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#373f51] text-[#ebcfb2] px-3 py-1 rounded text-xs whitespace-nowrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          Breathing: {breathPhase === 0 ? 'Inhale' : breathPhase === 1 ? 'Hold' : 'Exhale'} | HR: ~75 BPM
        </motion.div>
      )}
    </motion.div>
  );
};

export default BreathingAvatar; 