// src/components/sections/AchievementsSection.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Achievement } from '../../types';
import AnimatedSection from '../common/AnimatedSection';

const AchievementsSection = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/achievements');
        setAchievements(data);
      } catch (error) {
        console.error('Failed to fetch achievements', error);
      }
    };
    fetchAchievements();
  }, []);

  if (achievements.length === 0) {
    return null; // Don't render the section if there are no achievements
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <AnimatedSection id="achievements" className="py-20 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-4xl font-bold text-center mb-12">My Achievements</h2>
      <div className="container mx-auto max-w-4xl space-y-8">
        {achievements.map((item) => (
          <motion.div
            key={item._id}
            className="flex items-center gap-6"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="flex flex-col items-center">
              <span className="text-lg font-semibold text-primary">{new Date(item.date).getFullYear()}</span>
              <div className="w-0.5 h-16 bg-gray-300 dark:bg-gray-700 mt-2"></div>
            </div>
            <div>
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
};

export default AchievementsSection;