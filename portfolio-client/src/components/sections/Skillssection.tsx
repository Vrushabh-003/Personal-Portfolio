// src/components/sections/Skillssection.tsx
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useActiveSection } from '../../contexts/ActiveSectionContext';
import { motion } from 'framer-motion';

interface Skill { name: string; icon: string; }
interface CategorizedSkills { [key: string]: Skill[]; }
interface SkillsProps { skills: CategorizedSkills; }

const SkillsSection: React.FC<SkillsProps> = ({ skills }) => {
  const { ref, inView } = useInView({ rootMargin: "-50% 0px -50% 0px", triggerOnce: false });
  const { setActiveSection } = useActiveSection();

  useEffect(() => { if (inView) setActiveSection('skills'); }, [inView, setActiveSection]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section ref={ref} id="skills" className="py-20">
      <motion.div 
        className="container mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <h2 className="text-4xl font-bold text-center mb-12">My Tech Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {Object.entries(skills).map(([category, skillList]) => (
            <motion.div key={category} variants={itemVariants} className="bg-white/5 dark:bg-gray-800/20 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-center text-primary">{category}</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {skillList.map(skill => (
                  <div key={skill.name} className="flex items-center gap-2 bg-gray-200/50 dark:bg-gray-700/50 py-2 px-3 rounded-full">
                    <img src={skill.icon} alt={skill.name} className="h-6 w-6" />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
