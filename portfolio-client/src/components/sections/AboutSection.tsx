import React from 'react';
import AnimatedSection from '../common/AnimatedSection';

interface AboutProps {
  bio: string;
}

const AboutSection: React.FC<AboutProps> = ({ bio }) => {
  return (
    <AnimatedSection id="about" className="py-20 text-center">
      <h2 className="text-4xl font-bold mb-8">About Me</h2>
      <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-600 dark:text-gray-300">
        {bio}
      </p>
    </AnimatedSection>
  );
};

export default AboutSection;