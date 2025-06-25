import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import NavMenu from "../components/NavMenu";
import Footer from "../components/Footer";
import BreathingAvatar from "../components/BreathingAvatar";

import KinestheticProjectCard from "../components/KinestheticProjectCard";
import MedicalBackground from "../components/MedicalBackground";
import { PulsingSubtitle, BalancedText, NeuralText } from "../components/KinestheticTypography";
import "../App.css";
import selfImg from "../assets/self.png";
import useMovementScroll from "../hooks/useMovementScroll";

const fulcrum = {
  title: "Fulcrum",
  body: "Fulcrum is a management software for experts in the field of movement sciences, such as physical education, adapted physical activity and physical rehabilitation.",
  technologies: ["React", "Electron"],
  status: "Alpha",
  version: "v1.0.0",    
};

const cornea = {
  title: "Cornea",
  body: "Cornea is an application that is leveraging the amazing Google Mediapipe open source framework to build a real time movement assessment and analysis tool. Several analysis options, a gait analysis functionality that is suitable enough for the work on the field. From posture analysis, to movement form execution assessment, cornea is going to implement as many tools as possible and all evidence based and up to date withs standards.",
  technologies: ["Tauri", "React"],
  status: "Alpha",
  version: "0.1.0",    
};

const auditorHelper = {
  title: "Auditor Helper",
  body: "A desktop application to help auditors track and analyze their auditing tasks across different weeks.",
  technologies: ["Pyside"],
  status: "Alpha",
  version: "v0.16.8-beta",
};

const pProject = {
  title: "p-project", 
  body: "Simulations in Python and Jupyter notebooks about p-values and decision making in academia. Statistical dashboard and analytics platform with interactive data visualization.",
  technologies: ["Tauri", "React"],
  status: "Production", 
  version: "v1.0.0",
};

const Home = () => {
  const { 
    scrollEffects, 
    movementQuality, 
    isScrolling, 
    velocityNormalized 
  } = useMovementScroll();

  // Card interaction state management
  const avatarRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const cardRefs = useRef({});

  // User activity tracking for medical background
  const [userActivity, setUserActivity] = useState('idle');
  


  // Handle card interactions
  const handleCardHover = (cardIndex) => {
    setActiveCard(cardIndex);
    setUserActivity('focused');
  };

  const handleCardLeave = () => {
    setActiveCard(null);
    setUserActivity(isScrolling ? 'active' : 'idle');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Medical Background with EEG waves and grid */}
      <MedicalBackground userActivity={userActivity} />
      
      <NavMenu />
      <motion.main
        style={{ 
          background: "transparent",
        }}
        className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[70vh] mb-24 px-6 pb-12 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
        }}
        transition={{ 
          duration: 0.6 * scrollEffects.responsiveness, 
          delay: 0.2,
          ease: scrollEffects.transitionTiming
        }}
              >

          <div id="main_content" className="text-black relative z-10">
            {/* Avatar and Content Grid */}
            <div className="grid grid-cols-2 gap-4 relative">
              <motion.div 
                id="avatar" 
                ref={avatarRef}
                className="col-span-1 text-center flex justify-center items-center my-6 relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                }}
                transition={{ 
                  duration: 0.6 * scrollEffects.responsiveness, 
                  delay: 0.4,
                  ease: scrollEffects.transitionTiming
                }}
              >
                <div className="relative flex items-center justify-center">
                  {/* Main Avatar */}
                  <BreathingAvatar
                    src={selfImg}
                    alt="Antonio's avatar - Living, breathing kinesiologist"
                    className="w-64 h-64 rounded-full shadow-lg object-cover border-4 border-[#e07a5f] bg-white dark:bg-zinc-800"
                  />
                </div>
                
                {/* Movement quality indicator */}
                
              </motion.div>
          
          <div id="stuff" className="col-span-1 text-center">
            <motion.div 
              id="presentation" 
              className="text-sm my-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="mb-2">
                <PulsingSubtitle className="text-sm font-medium">
                  Hello, this is <NeuralText isActive={activeCard !== null}>Antonio</NeuralText>.
                </PulsingSubtitle>
              </div>
              <BalancedText>
                I'm a <NeuralText isActive={userActivity === 'focused'}>kinesiologist</NeuralText>, 
                passionate about <span className="text-sm inline font-medium text-[#e07a5f]">AI</span>, 
                movement sciences and coding. At the moment is all I have for you.
              </BalancedText>
            </motion.div>
            <motion.div
              id="projects_cards"
              className="flex flex-col items-center gap-2 w-full relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div
                ref={(el) => cardRefs.current[0] = el}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                }}
                transition={{ 
                  duration: 0.4 * scrollEffects.animationSpeed, 
                  delay: 1.0,
                  ease: scrollEffects.transitionTiming
                }}
                onMouseEnter={() => handleCardHover(0)}
                onMouseLeave={handleCardLeave}
              >
                <KinestheticProjectCard 
                  link={"https://github.com/MrTimedying/fulcrum"} 
                  data={fulcrum} 
                  index={0}
                  onHover={handleCardHover}
                  onLeave={handleCardLeave}
                />
              </motion.div>
              <motion.div
                ref={(el) => cardRefs.current[1] = el}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                }}
                transition={{ 
                  duration: 0.4 * scrollEffects.animationSpeed, 
                  delay: 1.2,
                  ease: scrollEffects.transitionTiming
                }}
                onMouseEnter={() => handleCardHover(1)}
                onMouseLeave={handleCardLeave}
              >
                <KinestheticProjectCard 
                  link={"https://github.com/MrTimedying/cornea"} 
                  data={cornea} 
                  index={1}
                  onHover={handleCardHover}
                  onLeave={handleCardLeave}
                />
              </motion.div>
              <motion.div
                ref={(el) => cardRefs.current[2] = el}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                }}
                transition={{ 
                  duration: 0.4 * scrollEffects.animationSpeed, 
                  delay: 1.4,
                  ease: scrollEffects.transitionTiming
                }}
                onMouseEnter={() => handleCardHover(2)}
                onMouseLeave={handleCardLeave}
              >
                <KinestheticProjectCard 
                  link={"https://github.com/MrTimedying/auditor_helper"} 
                  data={auditorHelper} 
                  index={2}
                  onHover={handleCardHover}
                  onLeave={handleCardLeave}
                />
              </motion.div>
              <motion.div
                ref={(el) => cardRefs.current[3] = el}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                }}
                transition={{ 
                  duration: 0.4 * scrollEffects.animationSpeed, 
                  delay: 1.6,
                  ease: scrollEffects.transitionTiming
                }}
                onMouseEnter={() => handleCardHover(3)}
                onMouseLeave={handleCardLeave}
              >
                <KinestheticProjectCard 
                  link={"https://github.com/MrTimedying/p-project"} 
                  data={pProject} 
                  index={3}
                  onHover={handleCardHover}
                  onLeave={handleCardLeave}
                />
              </motion.div>
            </motion.div>
            </div>
          </div>
        </div>
      </motion.main>
      <Footer />
      

    </motion.div>
  );
};

export default Home;

