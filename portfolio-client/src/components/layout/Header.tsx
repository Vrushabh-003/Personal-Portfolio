import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 py-4 px-8 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <motion.a href="#" whileHover={{ scale: 1.1 }} className="text-2xl font-bold tracking-wider text-primary">
          VS.
        </motion.a>
        <nav className="hidden md:flex items-center gap-6 text-base font-medium">
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
          <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
          <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          <motion.button 
            onClick={toggleTheme} 
            whileTap={{ scale: 0.9, rotate: 90 }}
            className="ml-4"
          >
            {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
          </motion.button>
        </nav>
        {/* Add mobile navigation button if needed */}
      </div>
    </header>
  );
};

export default Header;