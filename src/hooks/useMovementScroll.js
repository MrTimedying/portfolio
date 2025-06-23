import { useState, useEffect, useRef } from 'react';

export const useMovementScroll = () => {
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(0);
  const [movementQuality, setMovementQuality] = useState('controlled');
  const [isScrolling, setIsScrolling] = useState(false);
  
  const lastScrollTime = useRef(Date.now());
  const lastScrollY = useRef(0);
  const velocityHistory = useRef([]);
  const scrollTimeout = useRef(null);

  // Separate useEffect for movement quality analysis to avoid circular dependency
  useEffect(() => {
    if (velocityHistory.current.length < 5) return;
    
    const avgVelocity = velocityHistory.current.reduce((a, b) => a + b, 0) / velocityHistory.current.length;
    const velocityVariance = velocityHistory.current.reduce((acc, v) => acc + Math.pow(v - avgVelocity, 2), 0) / velocityHistory.current.length;
    
    // Classify movement quality based on biomechanical principles
    let newQuality = 'controlled';
    if (avgVelocity > 2 && velocityVariance > 0.5) {
      newQuality = 'rapid'; // Fast, jerky movement
    } else if (avgVelocity > 1 && velocityVariance < 0.3) {
      newQuality = 'smooth'; // Fast but controlled
    } else if (avgVelocity < 0.5) {
      newQuality = 'precise'; // Slow, deliberate
    }
    
    if (newQuality !== movementQuality) {
      setMovementQuality(newQuality);
    }
  }, [scrollVelocity]); // Only depend on scrollVelocity

  useEffect(() => {
    const handleScroll = (e) => {
      const currentTime = Date.now();
      const currentScrollY = window.scrollY;
      const deltaTime = currentTime - lastScrollTime.current;
      const deltaY = Math.abs(currentScrollY - lastScrollY.current);
      
      // Calculate instantaneous velocity (pixels per millisecond)
      const instantVelocity = deltaTime > 0 ? deltaY / deltaTime : 0;
      
      // Update velocity with biomechanical smoothing (muscle memory effect)
      const smoothingFactor = 0.8; // Simulates muscle damping
      const newVelocity = instantVelocity * (1 - smoothingFactor) + scrollVelocity * smoothingFactor;
      
      setScrollVelocity(newVelocity);
      setScrollDirection(currentScrollY > lastScrollY.current ? 1 : -1);
      setIsScrolling(true);
      
      // Update velocity history for movement analysis
      velocityHistory.current.push(newVelocity);
      if (velocityHistory.current.length > 10) {
        velocityHistory.current.shift();
      }
      
      // Clear scrolling state after inactivity
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
        setScrollVelocity(0);
      }, 150);
      
      lastScrollTime.current = currentTime;
      lastScrollY.current = currentScrollY;
    };

    const handleWheel = (e) => {
      const wheelVelocity = Math.abs(e.deltaY) / 100; // Normalize wheel input
      
      // Apply movement-based scroll modifications
      if (movementQuality === 'rapid') {
        // Reduce sensitivity for rapid movements (fatigue simulation)
        e.preventDefault();
        window.scrollBy({
          top: e.deltaY * 0.7,
          behavior: 'smooth'
        });
      } else if (movementQuality === 'precise') {
        // Increase precision for slow movements
        e.preventDefault();
        window.scrollBy({
          top: e.deltaY * 0.3,
          behavior: 'smooth'
        });
      }
      // Let normal scrolling behavior for 'controlled' and 'smooth'
    };

    // Attach event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(scrollTimeout.current);
    };
  }, [movementQuality]); // Only depend on movementQuality for wheel handler

  // Calculate scroll-based animation effects
  const getScrollEffects = () => {
    const normalizedVelocity = Math.min(scrollVelocity * 100, 1); // 0 to 1
    
    return {
      // Interface responsiveness based on movement quality
      responsiveness: movementQuality === 'rapid' ? 0.3 : 
                     movementQuality === 'precise' ? 1.2 : 1.0,
      
      // Visual feedback intensity
      feedbackIntensity: normalizedVelocity,
      
      // Animation speed multiplier
      animationSpeed: movementQuality === 'rapid' ? 1.5 : 
                     movementQuality === 'precise' ? 0.7 : 1.0,
      
      // Blur effect for motion (simulates visual perception during movement)
      motionBlur: normalizedVelocity * 2,
      
      // Transition timing based on movement biomechanics (as arrays for Framer Motion)
      transitionTiming: movementQuality === 'smooth' ? [0.4, 0, 0.2, 1] :
                       movementQuality === 'rapid' ? [0.68, -0.55, 0.265, 1.55] :
                       [0.25, 0.46, 0.45, 0.94],
    };
  };

  return {
    scrollVelocity,
    scrollDirection,
    movementQuality,
    isScrolling,
    scrollEffects: getScrollEffects(),
    
    // Additional utilities
    isRapidMovement: movementQuality === 'rapid',
    isPreciseMovement: movementQuality === 'precise',
    isSmoothMovement: movementQuality === 'smooth',
    velocityNormalized: Math.min(scrollVelocity * 100, 1),
  };
};

export default useMovementScroll; 