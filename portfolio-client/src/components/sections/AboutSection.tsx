// src/components/sections/AboutSection.tsx
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useActiveSection } from '../../contexts/ActiveSectionContext';
import AnimatedSection from '../common/AnimatedSection';

interface AboutProps {
  bio: string;
}

const AboutSection: React.FC<AboutProps> = ({ bio }) => {
  const { ref, inView } = useInView({
    rootMargin: "-50% 0px -50% 0px" // The section is "in view" when 50% is visible
  });
  const { setActiveSection } = useActiveSection();

  useEffect(() => {
    if (inView) {
      setActiveSection('about');
    }
  }, [inView, setActiveSection]);

  return (
    // We use a regular section tag here and apply the ref to it
    <section ref={ref} id="about">
      <AnimatedSection id=""> {/* Pass an empty id to AnimatedSection since the parent has it now */}
        <div className="py-20 text-center">
          <h2 className="text-4xl font-bold mb-8">About Me</h2>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            {bio}
          </p>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default AboutSection;