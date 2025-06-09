import React from "react";
import { motion } from "motion/react";
import { FaReact } from "react-icons/fa";
import { SiVite } from "react-icons/si";
import { SiSanity } from "react-icons/si";
import { SiJavascript } from "react-icons/si";

export default function Footer() {
  return (
    <motion.footer 
      className="w-screen py-6 h-72 text-center text-sm bg-neutral-900 text-white font-source-sans font-medium"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className=" mx-auto flex flex-col md:flex-row justify-between items-center gap-2 px-4">
        <motion.div 
          className="flex flex-2/6 flex-col gap-2 items-center"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Powered by:
          </motion.span>
          <motion.div 
            className="flex flex-row gap-25"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.2, 
                rotate: 180,
                transition: { duration: 0.3 }
              }}
            >
              <FaReact className="text-5xl" />
            </motion.div>
            <motion.div
              whileHover={{ 
                scale: 1.2,
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              <SiVite className="text-5xl" />
            </motion.div>
          </motion.div>
          <motion.div 
            className="flex flex-row gap-25"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.2,
                transition: { duration: 0.3 }
              }}
            >
              <SiSanity className="text-5xl" />
            </motion.div>
            <motion.div
              whileHover={{ 
                scale: 1.2,
                rotate: [0, 10, -10, 0],
                transition: { duration: 0.5 }
              }}
            >
              <SiJavascript className="text-5xl" />
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.span 
          className="flex flex-col flex-2/6 text-justify"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          &copy; {new Date().getFullYear()} Antonio Logarzo
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            All the material in the website is under Creative Commons (BY-NC-ND) license. Every reproduction without permission of the author is not allowed.
            All the material is considered intellectual property of the creator and thus not usable for own purposes, or commercial endeavours.
          </motion.p>
        </motion.span>
        <motion.div 
          className="flex flex-2/6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
        </motion.div>
      </div>
    </motion.footer>
  );
}
