import React from 'react';
import AnimatedSection from '../common/AnimatedSection';
import { motion } from 'framer-motion';

interface SkillsProps {
  skills: { [key: string]: string[] };
}

const SkillsSection: React.FC<SkillsProps> = ({ skills }) => {
  const cardVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      }
    }
  };

  return (
    <AnimatedSection id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-4xl font-bold text-center mb-12">My Tech Stack</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Object.entries(skills).map(([category, items]) => (
          <motion.div
            key={category}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-primary">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map(skill => (
                <span key={skill} className="bg-gray-200 dark:bg-gray-700 text-sm font-medium px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
};

export default SkillsSection;