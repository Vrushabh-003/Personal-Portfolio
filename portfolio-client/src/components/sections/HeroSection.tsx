import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  name: string;
  title: string;
}

const HeroSection: React.FC<HeroProps> = ({ name, title }) => {
  return (
    <section id="hero" className="h-screen flex items-center justify-center text-center bg-light-bg dark:bg-dark-bg">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {name}
        </motion.h1>
        <motion.p 
          className="text-lg md:text-2xl text-secondary dark:text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {title}
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;