import React from 'react';
import { motion } from 'motion/react';
import NavMenu from '../components/NavMenu'; // Assuming NavMenu component is correctly imported
import Footer from '../components/Footer';
import FulcrumUI from '../assets/fulcrumUI.png'; // Assuming Footer component is correctly imported
import MedicalBackground from '../components/MedicalBackground';

const Fulcrum = () => {
  return (
    <motion.div 
      className="relative h-screen w-screen overflow-scroll"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
        <NavMenu />
        <MedicalBackground userActivity={'idle'} />

      <motion.div 
        className="text-black h-full flex flex-row gap-5 items-center justify-center w-4/5 mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div 
          label="fulcrum-content" 
          className="w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.h1 
            className="text-3xl font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Fulcrum App
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6 }
            }}
            viewport={{ once: true, margin: "-50px" }}
          >
            Fulcrum is a solution for professionals in the field of movement sciences. It's an inclusive people management solution, which empowers the users with several tools to overcharge their workflow. Fulcrum allows the creation of individual ICF standard profiles and interventions for patients with the two built in React Flow based editors. The flow diagram approach allows for fast overviews, hierarchical and evidence based organization of interventions, testing and profiling.
            The current Alpha version allows multiple interventions for each patient, templating for fast designing and planning, and modular composition of single activities within a discipline agnostic frame.
          </motion.p>
          {/* Download Button */}
          <motion.a
            href="https://github.com/MrTimedying/fulcrum/releases/tag/v1.0.0-alpha"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            Download Fulcrum App
          </motion.a>
        </motion.div>
        <motion.div 
          label="fulcrum-image"
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            scale: 1,
            transition: { duration: 0.8 }
          }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.img 
            src={FulcrumUI} 
            className="shadow-lg shadow-gray-800" 
            style={{width: '100%'}} 
            alt="Fulcrum UI"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
        </motion.div>
      </motion.div>

        <Footer />
    </motion.div>
  );
};

export default Fulcrum;

