// src/components/sections/AchievementsSection.tsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useActiveSection } from '../../contexts/ActiveSectionContext';
import { Achievement } from '../../types';
import { FaTrophy } from 'react-icons/fa';
import AchievementCardSkeleton from '../skeletons/AchievementCardSkeleton'; // Import the skeleton component

const AchievementItem = ({ item, index }: { item: Achievement, index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };
  const vLineVariants = {
    hidden: { scaleY: 0 },
    visible: { scaleY: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.div
      ref={ref}
      className="relative p-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }} // Changed once to true for re-animation on scroll
    >
      <motion.div className="absolute top-0 left-0 w-full h-px bg-primary" style={{ originX: 0 }} variants={lineVariants} />
      <motion.div className="absolute bottom-0 right-0 w-full h-px bg-primary" style={{ originX: 1 }} variants={lineVariants} />
      <motion.div className="absolute top-0 left-0 w-px h-full bg-primary" style={{ originY: 0 }} variants={vLineVariants} />
      <motion.div className="absolute bottom-0 right-0 w-px h-full bg-primary" style={{ originY: 1 }} variants={vLineVariants} />

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className={`flex justify-center overflow-hidden rounded-lg shadow-lg ${index % 2 !== 0 ? 'md:order-last' : ''}`}>
          {item.imageUrl ? (
           <motion.img 
            src={item.imageUrl} 
            alt={item.title} 
            className="w-full h-80 object-cover rounded-lg shadow-lg"
            style={{ y }} 
            whileHover={{
              scale: 1.08,
              filter: "brightness(1.1)",
              boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.25)"
            }}
            transition={{ type: "spring", stiffness: 180, damping: 15 }}
          />
          ) : (
            <div className="flex items-center justify-center w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
              <FaTrophy className="text-6xl text-primary" />
            </div>
          )}
        </div>
        
        <div className="text-center md:text-left">
          <p className="text-primary font-semibold mb-2">
            {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
          </p>
          <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};


const AchievementsSection = () => {
  const { ref, inView } = useInView({ rootMargin: "-50% 0px -50% 0px" });
  const { setActiveSection } = useActiveSection();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (inView) setActiveSection('achievements');
  }, [inView, setActiveSection]);

  useEffect(() => {
    const fetchAchievements = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/achievements`;
        const { data } = await axios.get(apiUrl);
        setAchievements(data);
      } catch (error) {
        console.error("Failed to fetch achievements", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchAchievements();
  }, []);

  return (
    <section ref={ref} id="achievements" className="py-20">
      <h2 className="text-4xl font-bold text-center mb-16">Awards & Achievements</h2>
      <div className="container mx-auto max-w-5xl space-y-16">
        {loading ? (
          // Show skeletons while loading
          <>
            <AchievementCardSkeleton />
            <AchievementCardSkeleton />
          </>
        ) : (
          // Show actual data once loaded
          achievements.map((item, index) => (
            <AchievementItem key={item._id} item={item} index={index} />
          ))
        )}
      </div>
    </section>
  );
};

export default AchievementsSection;