// src/components/sections/SkillsSection.tsx
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useActiveSection } from '../../contexts/ActiveSectionContext';
import AnimatedSection from '../common/AnimatedSection';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  icon: string;
}

interface SkillsProps {
  skills: Skill[];
}

const SkillsSection: React.FC<SkillsProps> = ({ skills }) => {
  const { ref, inView } = useInView({ rootMargin: "-50% 0px -50% 0px" });
  const { setActiveSection } = useActiveSection();

  useEffect(() => {
    if (inView) {
      setActiveSection('skills');
    }
  }, [inView, setActiveSection]);

  const extendedSkills = [...skills, ...skills];

  return (
    <section ref={ref} id="skills">
      <AnimatedSection id="">
        <div className="py-20">
          <h2 className="text-4xl font-bold text-center mb-12">My Tech Stack</h2>
          <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
              {extendedSkills.map((skill, index) => (
                <li key={index} className="flex flex-col items-center justify-center gap-2 w-24">
                  <img src={skill.icon} alt={skill.name} className="h-16 w-16" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default SkillsSection;