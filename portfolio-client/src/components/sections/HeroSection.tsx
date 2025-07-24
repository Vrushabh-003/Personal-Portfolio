// src/components/sections/HeroSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedBlobBackground from '../common/AnimatedBlobBackground';

interface HeroProps {
  name: string;
  title: string;
}

const HeroSection: React.FC<HeroProps> = ({ name, title }) => {
  return (
    <section
      id="hero"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-light-bg dark:bg-dark-bg"
    >
      <AnimatedBlobBackground />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Column: Text Content */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              {name}
            </h1>
            <p className="text-lg md:text-2xl text-secondary dark:text-gray-400">
              {title}
            </p>
          </motion.div>

          {/* Right Column: Profile Picture */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-sky-400 rounded-full blur-xl animate-pulse" />
              <img
                // IMPORTANT: Replace this with a direct link to your photo!
                src="https://via.placeholder.com/320" 
                alt="Vrushabh Shirke"
                className="relative w-full h-full object-cover rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;