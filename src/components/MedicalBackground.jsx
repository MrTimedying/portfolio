import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const MedicalBackground = ({ userActivity = 'idle' }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  // Circadian rhythm color adaptation
  const getCircadianColors = () => {
    const hour = currentTime.getHours();
    
    if (hour >= 6 && hour < 12) {
      // Morning: Cooler blues (alert, focused)
      return {
        primary: 'rgba(59, 130, 246, 0.02)', // Cool blue
        secondary: 'rgba(99, 102, 241, 0.01)', // Indigo
        accent: 'rgba(147, 197, 253, 0.03)' // Light blue
      };
    } else if (hour >= 12 && hour < 18) {
      // Afternoon: Neutral (productive)
      return {
        primary: 'rgba(224, 122, 95, 0.02)', // Original warm
        secondary: 'rgba(55, 63, 81, 0.01)', // Original dark
        accent: 'rgba(235, 207, 178, 0.03)' // Original light
      };
    } else if (hour >= 18 && hour < 24) {
      // Evening: Warmer oranges (consultative)
      return {
        primary: 'rgba(251, 146, 60, 0.02)', // Warm orange
        secondary: 'rgba(194, 120, 3, 0.01)', // Amber
        accent: 'rgba(253, 186, 116, 0.03)' // Light orange
      };
    } else {
      // Night: Deep, restful tones
      return {
        primary: 'rgba(99, 102, 241, 0.015)', // Deep purple
        secondary: 'rgba(55, 48, 163, 0.008)', // Darker purple
        accent: 'rgba(129, 140, 248, 0.02)' // Soft purple
      };
    }
  };

  const colors = getCircadianColors();

  // EEG wave patterns based on user activity
  const getEEGPattern = () => {
    switch (userActivity) {
      case 'active':
        return {
          frequency: 'beta', // 13-30 Hz
          amplitude: 0.8,
          speed: '8s',
          waves: 'M0,50 Q25,30 50,50 T100,50'
        };
      case 'focused':
        return {
          frequency: 'gamma', // 30+ Hz
          amplitude: 1.2,
          speed: '4s',
          waves: 'M0,50 Q12.5,25 25,50 Q37.5,75 50,50 Q62.5,25 75,50 Q87.5,75 100,50'
        };
      case 'reading':
        return {
          frequency: 'alpha', // 8-13 Hz
          amplitude: 0.6,
          speed: '12s',
          waves: 'M0,50 Q50,35 100,50'
        };
      default: // idle
        return {
          frequency: 'alpha',
          amplitude: 0.4,
          speed: '15s',
          waves: 'M0,50 Q50,45 100,50'
        };
    }
  };

  const eegPattern = getEEGPattern();

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Medical Grid Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${colors.primary} 1px, transparent 1px),
            linear-gradient(90deg, ${colors.primary} 1px, transparent 1px),
            linear-gradient(${colors.secondary} 1px, transparent 1px),
            linear-gradient(90deg, ${colors.secondary} 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px, 20px 20px, 100px 100px, 100px 100px',
          backgroundPosition: '0 0, 0 0, 0 0, 0 0'
        }}
      />

      {/* EEG Wave Animation */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.03 }}>
        <defs>
          <pattern id="eegWaves" x="0" y="0" width="200" height="100" patternUnits="userSpaceOnUse">
            <motion.path
              d={eegPattern.waves}
              stroke={colors.accent.replace('0.03', '0.8')}
              strokeWidth="2"
              fill="none"
              initial={{ x: -200 }}
              animate={{ x: 0 }}
              transition={{
                duration: parseFloat(eegPattern.speed),
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </pattern>
        </defs>
        
        {/* Multiple EEG wave layers for depth */}
        <rect width="100%" height="20%" fill="url(#eegWaves)" y="10%" />
        <rect width="100%" height="20%" fill="url(#eegWaves)" y="40%" opacity="0.6" />
        <rect width="100%" height="20%" fill="url(#eegWaves)" y="70%" opacity="0.4" />
      </svg>

      {/* Breathing Rhythm Overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundColor: [
            colors.primary,
            colors.accent,
            colors.primary
          ]
        }}
        transition={{
          duration: 4.7, // Sync with avatar breathing
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Neural Activity Intensity Indicator */}
      <motion.div
        className="absolute top-4 right-4 text-xs text-gray-400 font-mono"
        animate={{
          opacity: userActivity !== 'idle' ? 0.6 : 0.3
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ 
              backgroundColor: colors.accent.replace('0.03', '0.6'),
              boxShadow: `0 0 6px ${colors.accent.replace('0.03', '0.4')}`
            }}
          />
          <span>{eegPattern.frequency.toUpperCase()} waves</span>
        </div>
      </motion.div>

      {/* Circadian Time Indicator */}
      <div className="absolute top-4 left-4 text-xs text-gray-400 font-mono opacity-20">
        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default MedicalBackground; 