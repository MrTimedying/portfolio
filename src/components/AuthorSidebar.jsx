import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import selfImg from '../assets/self.png';
import researcherImg from '../assets/researcher.jpg';

const AuthorSidebar = ({ authorName, categories, tags }) => {
  // Check if it's AI-generated based on tags
  const isAIGenerated = tags && Array.isArray(tags) && tags.includes('ai-generated');
  
  // Placeholder description - replace with actual data if available from Sanity
  const authorDescription = isAIGenerated 
    ? "A cutting-edge artificial intelligence dedicated to exploring and synthesizing information on various topics." 
    : "Experienced kinesiologist with a passion for AI, movement science, and web development.";
  
  return (
    <motion.div
      className="w-1/6 md:w-64 mt-24 md:sticky md:top-20 self-start mb-8 md:mb-0 text-center md:text-center"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <motion.div
        className="rounded-lg p-6 flex flex-col items-center md:items-center justify-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Avatar Section */}
        <motion.div 
          className="flex justify-center md:justify-center mb-4"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          {isAIGenerated ? (
             <img
              src={researcherImg}
              alt="Self-aware Researcher"
              className="w-[150px] h-[150px] rounded-full object-cover shadow-lg border-2 border-blue-400"
            />
          ) : (
            <img
              src={selfImg}
              alt={authorName || 'Author'}
              className="w-[150px] h-[150px] rounded-full object-cover shadow-lg border-6 border-[#d44343]"
            />
          )}
        </motion.div>
        
        {/* Author Info / Card Section */}
        <motion.div 
          className="text-center md:text-center w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-[#d44343] font-normal mb-2 text-sm">
            {isAIGenerated ? (
              <>
                Author: 
                <Link 
                  to="/blog/human-in-the-loop"
                  className="text-amber-700 hover:text-amber-800 transition-colors duration-200 ml-1 hover:underline"
                >
                  Self-aware Researcher
                </Link>
              </>
            ) : (
              `${authorName || 'Unknown Author'}`
            )}
          </p>

          {/* Description Card */}
          <motion.div
            className="mt-3 p-4 border-l-4 border-[#d44343] text-gray-800 text-xs text-left"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p>{authorDescription}</p>
          </motion.div>

          {/* Badge */}
          <motion.div 
            className={
              `mt-4 px-3 py-1 text-xs rounded-full inline-block ` +
              `${isAIGenerated ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`
            }
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {isAIGenerated ? '🤖 AI Assistant' : '✍️ Human Author'}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AuthorSidebar; 