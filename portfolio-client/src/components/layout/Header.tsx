// src/components/layout/Header.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useActiveSection } from '../../contexts/ActiveSectionContext';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import logoSrc from '../../assets/logo.png';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { activeSection } = useActiveSection();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/#about', title: 'About', id: 'about' },
    { href: '/#leadership', title: 'Leadership', id: 'leadership' },
    { href: '/#experience', title: 'Experience', id: 'experience' },
    { href: '/#skills', title: 'Skills', id: 'skills' },
    { href: '/#projects', title: 'Projects', id: 'projects' },
    { href: '/#achievements', title: 'Achievements', id: 'achievements' },
    { href: '/blog', title: 'Blog', id: 'blog' },
    { href: '/#contact', title: 'Contact', id: 'contact' },
  ];

  const renderLink = (link: (typeof navLinks)[0], onClick?: () => void) => {
    const isActive = activeSection === link.id || location.pathname === link.href;
    const className = `transition-colors py-3 w-full text-center md:py-0 md:w-auto ${
      isActive ? 'text-primary font-bold' : 'hover:text-primary'
    }`;
    
    if (link.href.startsWith('/#') || link.href.startsWith('#')) {
      return <a key={link.title} href={link.href} onClick={onClick} className={className}>{link.title}</a>;
    }
    return <Link key={link.title} to={link.href} onClick={onClick} className={className}>{link.title}</Link>;
  };

  const headerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 h-24 flex items-center justify-center">
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            key="expanded-header"
            className="absolute top-0 w-full py-4 px-8 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm"
            variants={headerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="container mx-auto flex justify-between items-center">
             <a href="/#" className =" text-2xl font-text-2xl font-bold tracking-wider text-primary mr-4">
               <img src={logoSrc} alt="Logo" className="h-14 w-auto" />
              </a>
              <nav className="hidden md:flex items-center gap-6 text-base font-medium">
                {navLinks.map(link => renderLink(link))}
                <motion.button onClick={toggleTheme} whileTap={{ scale: 0.9, rotate: 90 }} className="ml-4">
                  {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
                </motion.button>
              </nav>
              <div className="md:hidden flex items-center">
                 <motion.button onClick={toggleTheme} whileTap={{ scale: 0.9, rotate: 90 }} className="mr-4">
                   {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
                 </motion.button>
                 <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                   {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            key="shrunk-header"
            className="absolute top-4 py-2 px-6 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-white/20 shadow-lg"
            variants={headerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
             <nav className="hidden md:flex items-center gap-6 text-base font-medium">
                <a href="/#" className =" text-2xl font-bold tracking-wider text-primary mr-4">
                <img src={logoSrc} alt="Logo" className="h-10 w-auto" />
                </a>
                {navLinks.map(link => renderLink(link))}
                <motion.button onClick={toggleTheme} whileTap={{ scale: 0.9, rotate: 90 }} className="ml-4">
                  {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
                </motion.button>
              </nav>
              <div className="md:hidden flex items-center">
                <a href="/#" className="text-2xl font-bold tracking-wider text-primary mr-4">
                <img src={logoSrc} alt="Logo" className="h-10 w-auto" />
                </a>
                <motion.button onClick={toggleTheme} whileTap={{ scale: 0.9, rotate: 90 }} className="mr-4">
                   {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
                 </motion.button>
                 <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                   {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                 </button>
              </div>
          </motion.div>
        )}
      </AnimatePresence>
       <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed top-24 left-0 w-full bg-white dark:bg-gray-800 shadow-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <nav className="flex flex-col items-center p-4">
              {navLinks.map(link => renderLink(link, () => setIsMenuOpen(false)))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;