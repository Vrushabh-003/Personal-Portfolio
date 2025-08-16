// src/components/layout/Header.tsx
import React, { useState, useEffect, useRef } from 'react';
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

  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(96);

  useEffect(() => {
    const handleResize = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    const className = `transition-colors ${
      isActive ? 'text-primary font-bold' : 'hover:text-primary'
    }`;

    if (link.href.startsWith('/#') || link.href.startsWith('#')) {
      return (
        <motion.a
          key={link.title}
          href={link.href}
          onClick={onClick}
          className={className}
          variants={menuItem}
        >
          {link.title}
        </motion.a>
      );
    }
    return (
      <motion.div variants={menuItem} key={link.title}>
        <Link to={link.href} onClick={onClick} className={className}>
          {link.title}
        </Link>
      </motion.div>
    );
  };

  const headerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  // animation for dropdown
  const menuVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 15,
        staggerChildren: 0.07,
        delayChildren: 0.05,
      },
    },
    exit: { opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.2 } },
  };

  const menuItem = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  };

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-center"
      style={{ minHeight: headerHeight }}
      ref={headerRef}
    >
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            key="expanded-header"
            className="absolute top-0 w-full py-4 px-6 sm:px-8 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm"
            variants={headerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="container mx-auto flex justify-between items-center">
              <a href="/#" className="mr-4">
                <img src={logoSrc} alt="Logo" className="h-12 sm:h-14 w-auto" />
              </a>
              {/* Desktop nav */}
              <nav className="hidden lg:flex items-center gap-4 sm:gap-6 text-base font-medium">
                {navLinks.map(link => renderLink(link))}
                <motion.button
                  onClick={toggleTheme}
                  whileTap={{ scale: 0.9, rotate: 90 }}
                  className="ml-4 focus:outline-none focus:ring-2 focus:ring-primary rounded"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
                </motion.button>
              </nav>
              {/* Mobile nav toggle */}
              <div className="lg:hidden flex items-center">
                <motion.button
                  onClick={toggleTheme}
                  whileTap={{ scale: 0.9, rotate: 90 }}
                  className="mr-4 focus:outline-none focus:ring-2 focus:ring-primary rounded"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
                </motion.button>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle menu"
                  aria-expanded={isMenuOpen}
                  className="focus:outline-none focus:ring-2 focus:ring-primary rounded"
                >
                  {isMenuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
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
            className="absolute top-3 sm:top-4 py-2 px-4 sm:px-6 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg border border-white/20 shadow-lg"
            variants={headerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <nav className="hidden lg:flex items-center gap-4 sm:gap-6 text-base font-medium">
              <a href="/#" className="mr-4">
                <img src={logoSrc} alt="Logo" className="h-8 sm:h-10 w-auto" />
              </a>
              {navLinks.map(link => renderLink(link))}
              <motion.button
                onClick={toggleTheme}
                whileTap={{ scale: 0.9, rotate: 90 }}
                className="ml-4 focus:outline-none focus:ring-2 focus:ring-primary rounded"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
              </motion.button>
            </nav>
            {/* Mobile logo + toggle */}
            <div className="lg:hidden flex items-center">
              <a href="/#" className="mr-4">
                <img src={logoSrc} alt="Logo" className="h-8 sm:h-10 w-auto" />
              </a>
              <motion.button
                onClick={toggleTheme}
                whileTap={{ scale: 0.9, rotate: 90 }}
                className="mr-4 focus:outline-none focus:ring-2 focus:ring-primary rounded"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
              </motion.button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                className="focus:outline-none focus:ring-2 focus:ring-primary rounded"
              >
                {isMenuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact Glassmorphic Mobile Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden fixed left-4 right-4 mt-2 rounded-2xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-lg shadow-2xl border border-white/20 z-50"
            style={{ top: headerHeight }}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.nav
              className="flex flex-col items-center gap-4 p-6 text-lg font-medium"
              variants={menuVariants}
            >
              {navLinks.map(link => renderLink(link, () => setIsMenuOpen(false)))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
