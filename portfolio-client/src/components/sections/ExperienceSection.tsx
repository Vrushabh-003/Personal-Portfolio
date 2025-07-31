// src/components/sections/ExperienceSection.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useActiveSection } from '../../contexts/ActiveSectionContext';
import { FaBriefcase } from 'react-icons/fa';
import { Experience } from '../../types';

const ExperienceSection = () => {
  const { ref, inView } = useInView({ rootMargin: "-50% 0px -50% 0px" });
  const { setActiveSection } = useActiveSection();

  useEffect(() => {
    if (inView) setActiveSection('experience');
  }, [inView, setActiveSection]);

  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        // Use the environment variable for the API URL
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/experiences`;
        const { data } = await axios.get(apiUrl);
        const sortedData = data.sort((a: Experience, b: Experience) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
        setExperiences(sortedData);
      } catch(e) { console.error("Failed to fetch experiences", e) }
    };
    fetchExperiences();
  }, []);
  
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });

  if (experiences.length === 0) return null;

  return (
    <section ref={ref} id="experience" className="py-20">
      <h2 className="text-4xl font-bold text-center mb-16">Work Experience</h2>
      <div className="container mx-auto max-w-4xl ">
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-300 dark:bg-gray-700"></div>
          {experiences.map((job, index) => (
            <motion.div 
              key={job._id}
              className="relative mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className={`flex items-center md:grid md:grid-cols-2 md:gap-8`}>
                <div className={`w-full ml-12 md:ml-0 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg ${index % 2 === 0 ? 'md:col-start-2' : ''}`}>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {formatDate(job.startDate)} - {job.endDate ? formatDate(job.endDate) : 'Present'}
                  </p>
                  <h3 className="text-xl font-bold">{job.title}</h3>
                  <p className="font-semibold text-primary mb-3">{job.company} - {job.location}</p>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                    {job.description.map((point, i) => <li key={i}>{point}</li>)}
                  </ul>
                </div>
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white z-10">
                  <FaBriefcase />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;