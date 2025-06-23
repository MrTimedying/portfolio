import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimationControls } from 'motion/react';

const KinestheticText = ({ 
  children, 
  type = 'flow', 
  intensity = 1, 
  isActive = false, 
  className = '',
  as = 'span' 
}) => {
  const controls = useAnimationControls();
  const [isHovered, setIsHovered] = useState(false);
  const MotionComponent = motion[as];

  // Kinesthetic movement patterns
  const movementPatterns = {
    // Fluid, continuous motion like blood flow
    flow: {
      animate: {
        x: [0, 2, -1, 1, 0],
        y: [0, -1, 1, -0.5, 0],
        scale: [1, 1.02, 0.98, 1.01, 1],
      },
      transition: {
        duration: 4 + (Math.random() * 2), // Vary timing naturally
        repeat: Infinity,
        ease: [0.4, 0, 0.6, 1], // Smooth easing like physiological rhythms
      }
    },

    // Rhythmic pulsing like heartbeat
    pulse: {
      animate: {
        scale: isActive ? [1, 1.05, 1] : [1, 1.02, 1],
        opacity: [1, 0.9, 1],
      },
      transition: {
        duration: isActive ? 0.8 : 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      }
    },

    // Balanced swaying like maintaining equilibrium
    balance: {
      animate: {
        rotate: [0, 1, -1, 0.5, 0],
        x: [0, 1, -1, 0],
      },
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }
    },

    // Tension and release like muscle contraction
    tension: {
      animate: isHovered ? {
        scaleX: [1, 1.1, 1],
        scaleY: [1, 0.9, 1],
        letterSpacing: ['0em', '0.05em', '0em'],
      } : {
        scaleX: [1, 1.02, 1],
        scaleY: [1, 0.98, 1],
      },
      transition: {
        duration: isHovered ? 0.3 : 2,
        repeat: isHovered ? 2 : Infinity,
        ease: isHovered ? "easeOut" : "easeInOut",
      }
    },

    // Spatial awareness - responding to virtual space
    spatial: {
      animate: {
        x: [0, 3, -2, 1, 0],
        y: [0, -2, 1, -1, 0],
        rotate: [0, 0.5, -0.3, 0.2, 0],
      },
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom bezier for organic feel
      }
    },

    // Breathing pattern for important text
    breath: {
      animate: {
        scale: [1, 1.03, 1, 1.01, 1],
        opacity: [1, 0.95, 1, 0.98, 1],
      },
      transition: {
        duration: 4.7, // 4-7-8 breathing pattern scaled
        repeat: Infinity,
        ease: "easeInOut",
      }
    },

    // Nervous system firing pattern
    neural: {
      animate: isActive ? {
        textShadow: [
          '0 0 0px rgba(224, 122, 95, 0)',
          '0 0 5px rgba(224, 122, 95, 0.5)',
          '0 0 2px rgba(224, 122, 95, 0.3)',
          '0 0 0px rgba(224, 122, 95, 0)'
        ],
        scale: [1, 1.02, 1],
      } : {
        textShadow: '0 0 0px rgba(224, 122, 95, 0)',
        scale: 1,
      },
      transition: {
        duration: isActive ? 0.6 : 1,
        repeat: isActive ? Infinity : 0,
        ease: "easeOut",
      }
    }
  };

  const pattern = movementPatterns[type] || movementPatterns.flow;

  useEffect(() => {
    controls.start(pattern.animate);
  }, [controls, pattern, isActive, isHovered]);

  return (
    <MotionComponent
      className={className}
      animate={controls}
      transition={pattern.transition}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        display: 'inline-block',
        transformOrigin: 'center',
      }}
    >
      {children}
    </MotionComponent>
  );
};

// Specialized components for different text types
export const PulsingSubtitle = ({ children, ...props }) => (
  <KinestheticText type="pulse" as="h2" {...props}>
    {children}
  </KinestheticText>
);

export const BalancedText = ({ children, ...props }) => (
  <KinestheticText type="balance" as="p" {...props}>
    {children}
  </KinestheticText>
);

export const TensionButton = ({ children, ...props }) => (
  <KinestheticText type="tension" as="button" {...props}>
    {children}
  </KinestheticText>
);

export const SpatialLabel = ({ children, ...props }) => (
  <KinestheticText type="spatial" as="span" {...props}>
    {children}
  </KinestheticText>
);

export const BreathingText = ({ children, ...props }) => (
  <KinestheticText type="breath" as="div" {...props}>
    {children}
  </KinestheticText>
);

export const NeuralText = ({ children, isActive, ...props }) => (
  <KinestheticText type="neural" isActive={isActive} as="span" {...props}>
    {children}
  </KinestheticText>
);

// Compound component for kinesthetic paragraph with mixed movements
export const KinestheticParagraph = ({ children, intensity = 1 }) => {
  const words = children.split(' ');
  const movementTypes = ['flow', 'balance', 'spatial', 'pulse'];
  
  return (
    <p className="leading-relaxed">
      {words.map((word, index) => {
        const movementType = movementTypes[index % movementTypes.length];
        const delay = index * 0.1; // Stagger animations
        
        return (
          <React.Fragment key={index}>
            <KinestheticText 
              type={movementType} 
              intensity={intensity}
              style={{ 
                animationDelay: `${delay}s`,
                marginRight: '0.25em'
              }}
            >
              {word}
            </KinestheticText>
            {index < words.length - 1 && ' '}
          </React.Fragment>
        );
      })}
    </p>
  );
};

export default KinestheticText; 