// src/pages/HomePage.tsx
import React from 'react';
import Header from '../components/layout/Header';
import HeroSection from '../components/sections/HeroSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import Footer from '../components/layout/Footer';
import { Helmet } from 'react-helmet-async';
import AboutSection from '../components/sections/AboutSection';
import SkillsSection from '../components/sections/SkillsSection';
import AchievementsSection from '../components/sections/AchievementsSection';
import ContactSection from '../components/sections/ContactSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import { ActiveSectionProvider } from '../contexts/ActiveSectionContext';

const HomePage = () => {
  const refinedBio = "I'm a final-year Computer Engineering student passionate about building meaningful digital experiences. I specialize in full-stack web and mobile app development, with a growing interest in Data Science, AI/ML, and cloud computing. From AI-powered security systems to Gen Z investment platforms, I thrive on leading and contributing to impactful projects in fast-paced, collaborative environments.";

  const skillsData = [
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    { name: 'Unity', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg' },
  ];

  return (
    <ActiveSectionProvider>
      <div className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-500">
        <Helmet>
          <title>Vrushabh Shirke</title>
          <meta name="description" content="The personal portfolio of Vrushabh Shirke, showcasing projects in web development, AI, and data science." />
        </Helmet>
        
        <Header />
          <HeroSection 
            name="Vrushabh Deepak Shirke" 
          />
        <main className="pt-24 px-4 md:px-6"> {/* <-- The fix is here */}
          <AboutSection bio={refinedBio} />
          <ExperienceSection />
          <SkillsSection skills={skillsData} />
          <ProjectsSection />
          <AchievementsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ActiveSectionProvider>
  );
};

export default HomePage;