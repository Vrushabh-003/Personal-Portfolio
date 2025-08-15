// src/components/sections/LeadershipSection.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useActiveSection } from '../../contexts/ActiveSectionContext';
import { Leadership } from '../../types';
import { FaUsers, FaCertificate } from 'react-icons/fa';

const LeadershipSection = () => {
  const { ref, inView } = useInView({ rootMargin: "-50% 0px -50% 0px" });
  const { setActiveSection } = useActiveSection();
  const [leadershipRoles, setLeadershipRoles] = useState<Leadership[]>([]);

  useEffect(() => {
    if (inView) setActiveSection('leadership');
  }, [inView, setActiveSection]);

  useEffect(() => {
    const fetchLeadershipRoles = async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/leadership`;
        const { data } = await axios.get(apiUrl);
        setLeadershipRoles(data);
      } catch(e) { 
        console.error("Failed to fetch leadership roles", e);
      }
    };
    fetchLeadershipRoles();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section ref={ref} id="leadership" className="py-20">
      <h2 className="text-4xl font-bold text-center mb-12">Leadership & Volunteering</h2>
      <motion.div 
        className="container mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        {leadershipRoles.map((role) => (
          <motion.div 
            key={role._id}
            variants={itemVariants}
            className="bg-white/5 dark:bg-gray-800/20 p-6 rounded-lg flex items-start gap-4"
          >
            <div className="text-primary text-3xl mt-1">
              <FaUsers />
            </div>
            <div>
              <h3 className="text-xl font-bold">{role.role}</h3>
              <p className="font-semibold text-primary mb-2">{role.organization}</p>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{role.description}</p>
              {role.certificateUrl && (
                <a
                  href={role.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-primary font-semibold hover:underline"
                >
                  <FaCertificate /> View Certificate
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default LeadershipSection;