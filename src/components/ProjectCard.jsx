import React from "react";
import { motion } from "motion/react";
import { GithubFill } from "./icons";

const ProjectCard = ({ data, link }) => {
  return (
    <motion.div
      id="card_container"
      className="text-center w-96 justify-self-start font-xs bg-[#373f51] border-[#e07a5f] border-2 text-[#ebcfb2] rounded-lg shadow-lg shadow-black-500/50 p-5"
      whileHover={{ 
        scale: 1.05,
        y: -5,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title row */}
      <motion.div
        id="card_title"
        className="flex items-center text-[#e07a5f] font-medium gap-2 justify-start mb-2"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <motion.div
          whileHover={{ 
            rotate: 360,
            transition: { duration: 0.6 }
          }}
        >
          <GithubFill />
        </motion.div>
        <motion.a 
          href={link}
          whileHover={{ 
            color: "#ebcfb2",
            transition: { duration: 0.2 }
          }}
        >
          {data.title}
        </motion.a>
      </motion.div>
      {/* Body/Description */}
      <motion.div 
        id="card_body" 
        className="mb-4 justify-start text-xs text-left"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {data.body || data.description}
      </motion.div>
      {/* Footer: Language indicator, status, version */}
      <motion.div
        id="card_footer"
        className="flex items-center gap-2 text-sm text-zinc-300 justify-between mt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <motion.span 
          className="text-sm"
          whileHover={{ scale: 1.05 }}
        >
          <motion.span
            className="inline-block h-3 w-3 rounded-full mr-1 border border-[#ebcfb2]"
            style={{
              backgroundColor: data.backgroundColor || "#ebcfb2",
            }}
            aria-label={`Project Color: ${data.backgroundColor || "default"}`}
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {data.language}
        </motion.span>
        <div>
          <motion.span 
            className="ml-2 px-2 py-0.5 rounded bg-[#e07a5f] text-[#373f51]"
            whileHover={{ 
              scale: 1.1,
              backgroundColor: "#ebcfb2",
              transition: { duration: 0.2 }
            }}
          >
            {data.status}
          </motion.span>
          <motion.span 
            className="ml-2 px-2 py-0.5 rounded bg-[#ebcfb2] text-[#373f51]"
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
    </motion.div>
  );
};

export default ProjectCard;
