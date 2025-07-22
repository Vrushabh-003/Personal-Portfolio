import React from 'react';
import Header from '../components/layout/Header';
import HeroSection from '../components/sections/HeroSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import Footer from '../components/layout/Footer';
import { Helmet } from 'react-helmet-async';
import AboutSection from '../components/sections/AboutSection';
import SkillsSection from '../components/sections/SkillsSection';

const HomePage = () => {
  const refinedBio = "I'm a final-year Computer Engineering student passionate about building meaningful digital experiences. I specialize in full-stack web and mobile app development, with a growing interest in Data Science, AI/ML, and cloud computing. From AI-powered security systems to Gen Z investment platforms, I thrive on leading and contributing to impactful projects in fast-paced, collaborative environments.";
  const skillsData = {
    Languages: ["JavaScript", "TypeScript", "Python", "C++", "C", "Java"],
    "Frameworks/Libraries": ["React.js", "Express.js", "Node.js", "React Native"],
    Databases: ["MongoDB", "PostgreSQL", "Supabase", "MySQL"],
    Tools: ["Git", "GitHub", "Docker", "Figma", "Blender", "Unity"],
  };

  return (
    <div className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-500">
      <Helmet>
        <title>Vrushabh Shirke | Full-Stack Developer</title>
        <meta name="description" content="The personal portfolio of Vrushabh Shirke, showcasing projects in web development, AI, and data science." />
      </Helmet>
      
      <Header />
      <main>
        <HeroSection 
          name="Vrushabh Deepak Shirke" 
          title="Full-Stack Developer | React & AI Enthusiast" 
        />
        <AboutSection bio={refinedBio} />
        <SkillsSection skills={skillsData} />
        <ProjectsSection />
        {/* Placeholder for Achievements section */}
        {/* Placeholder for Contact section */}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;