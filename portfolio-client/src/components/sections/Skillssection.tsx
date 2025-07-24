// import React from 'react';
// import AnimatedSection from '../common/AnimatedSection';
// import { motion } from 'framer-motion';

// interface SkillsProps {
//   skills: { [key: string]: string[] };
// }

// const SkillsSection: React.FC<SkillsProps> = ({ skills }) => {
//   const cardVariants = {
//     offscreen: { y: 50, opacity: 0 },
//     onscreen: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 10,
//       }
//     }
//   };

//   return (
//     <AnimatedSection id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
//       <h2 className="text-4xl font-bold text-center mb-12">My Tech Stack</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//         {Object.entries(skills).map(([category, items]) => (
//           <motion.div
//             key={category}
//             className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
//             variants={cardVariants}
//             initial="offscreen"
//             whileInView="onscreen"
//             viewport={{ once: true, amount: 0.5 }}
//           >
//             <h3 className="text-2xl font-bold mb-4 text-primary">{category}</h3>
//             <div className="flex flex-wrap gap-2">
//               {items.map(skill => (
//                 <span key={skill} className="bg-gray-200 dark:bg-gray-700 text-sm font-medium px-3 py-1 rounded-full">
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </AnimatedSection>
//   );
// };

// export default SkillsSection;

// src/components/sections/SkillsSection.tsx
import React from 'react';
import AnimatedSection from '../common/AnimatedSection';

interface Skill {
  name: string;
  icon: string;
}

interface SkillsProps {
  skills: Skill[];
}

const SkillsSection: React.FC<SkillsProps> = ({ skills }) => {
  // We duplicate the skills array to create a seamless loop
  const extendedSkills = [...skills, ...skills];

  return (
    <AnimatedSection id="skills" className="py-20">
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
    </AnimatedSection>
  );
};

export default SkillsSection;