import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import NavMenu from "../components/NavMenu";
import Footer from "../components/Footer";
import BreathingAvatar from "../components/BreathingAvatar";

import KinestheticProjectCard from "../components/KinestheticProjectCard";
import MedicalBackground from "../components/MedicalBackground";
import { PulsingSubtitle, BalancedText, NeuralText } from "../components/KinestheticTypography";
import ECGPulse from "../components/ECGPulse";
import useMovementScroll from "../hooks/useMovementScroll";
import useGitHubCommits from "../hooks/useGitHubCommits";
import "../App.css";
import selfImg from "../assets/self.png";
import MindActivityDashboard from "../components/MindActivityDashboard";

const fulcrum = {
  title: "Fulcrum",
  body: "Fulcrum is a management software for experts in the field of movement sciences, such as physical education, adapted physical activity and physical rehabilitation.",
  language: "Javascript",
  backgroundColor: "#f7df1e",
  status: "Alpha",
  version: "v1.0.0",    
};

const cornea = {
  title: "Cornea",
  body: "Cornea is an application that is leveraging the amazing Google Mediapipe open source framework to build a real time movement assessment and analysis tool. Several analysis options, a gait analysis functionality that is suitable enough for the work on the field. From posture analysis, to movement form execution assessment, cornea is going to implement as many tools as possible and all evidence based and up to date withs standards.",
  language: "Python",
  backgroundColor: "#3572A5",
  status: "Alpha",
  version: "0.1.0",    
};

const auditorHelper = {
  title: "Auditor Helper",
  body: "A desktop application to help auditors track and analyze their auditing tasks across different weeks.",
  language: "Python",
  backgroundColor: "#607D8B", // A shade of grey
  status: "Alpha",
  version: "v0.16.8-beta",
};

const pProject = {
  title: "p-project", 
  body: "Simulations in Python and Jupyter notebooks about p-values and decision making in academia. Statistical dashboard and analytics platform with interactive data visualization.",
  language: "Python",
  backgroundColor: "#3776ab", // Python blue
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

  // Fetch actual GitHub commit data
  const { commitCounts, loading, error } = useGitHubCommits();

  // Card interaction state management
  const avatarRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const [avatarHovered, setAvatarHovered] = useState(false);
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
      
      {/* ECG Display - positioned relative to active card */}
      <AnimatePresence mode="wait">
        {activeCard !== null && activeCard !== undefined && cardRefs.current[activeCard] && (
          <ECGPulse 
            key={`ecg-${activeCard}`}
            projectType={(() => {
              switch(activeCard) {
                case 0: return 'fulcrum';
                case 1: return 'cornea';
                case 2: return 'auditor';
                case 3: return 'pproject';
                default: return 'fulcrum';
              }
            })()} 
            intensity={1} 
            isActive={true}
            cardRef={cardRefs.current[activeCard]}
            commitCount={(() => {
              switch(activeCard) {
                case 0: return commitCounts.fulcrum || 0;
                case 1: return commitCounts.cornea || 0;
                case 2: return commitCounts.auditor || 0;
                case 3: return commitCounts.pproject || 0;
                default: return 0;
              }
            })()}
          />
        )}
      </AnimatePresence>
      
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
              {/* Mind Activity Dashboard - Left of Avatar (shows on hover) */}
              <AnimatePresence>
                {avatarHovered && (
                  <motion.div 
                    className="absolute left-[-400px] top-1/2 transform -translate-y-1/2 z-20 w-96"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <MindActivityDashboard 
                      commitCounts={{
                        ai: commitCounts.fulcrum || 0,
                        coding: (commitCounts.cornea || 0) + (commitCounts.auditor || 0),
                        movement: commitCounts.fulcrum || 0
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

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
                onMouseEnter={() => setAvatarHovered(true)}
                onMouseLeave={() => setAvatarHovered(false)}
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

