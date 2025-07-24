// src/components/sections/ProjectsSection.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import AnimatedSection from '../common/AnimatedSection';
import ProjectCard from '../common/ProjectCard';
import { Project } from '../../types';

const ProjectsSection = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/projects');
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // Animation variants for the container
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2, // This tells each child to animate 0.2s after the previous one
        },
      },
    };

    return (
        <AnimatedSection id="projects" className="py-20 px-4">
            <h2 className="text-4xl font-bold text-center mb-12">My Work & Projects</h2>
            {loading ? (
                <p className="text-center">Loading Projects...</p>
            ) : (
                <motion.div
                  className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  style={{ perspective: "1000px" }}
                >
                    {projects.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </motion.div>
            )}
        </AnimatedSection>
    );
};

export default ProjectsSection;