// src/components/sections/ProjectsSection.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useActiveSection } from '../../contexts/ActiveSectionContext';
import ProjectCard from '../common/ProjectCard';
import { Project } from '../../types';
import ProjectModal from '../common/ProjectModal';

const ProjectsSection = () => {
    const { ref, inView } = useInView({ rootMargin: "-50% 0px -50% 0px" });
    const { setActiveSection } = useActiveSection();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        if (inView) setActiveSection('projects');
    }, [inView, setActiveSection]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Use the environment variable for the API URL
                const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/projects`;
                const { data } = await axios.get(apiUrl);
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // --- Global Spotlight Logic ---
    const [isHovered, setIsHovered] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { stiffness: 400, damping: 30 };
    const mouseXSpring = useSpring(mouseX, springConfig);
    const mouseYSpring = useSpring(mouseY, springConfig);

    const spotlight = useMotionTemplate`
      radial-gradient(
        circle at ${mouseXSpring}px ${mouseYSpring}px,
        rgba(0, 123, 255, 0.15),
        transparent 30%
      )
    `;

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    return (
        <>
            <section 
                ref={ref} 
                id="projects" 
                className="py-20  relative"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* The Global Spotlight Div */}
                <motion.div
                    className="pointer-events-none fixed -inset-px" // Use fixed to cover the whole screen
                    style={{ background: spotlight }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />

                <h2 className="text-4xl font-bold text-center mb-12">My Work & Projects</h2>
                {loading ? (
                    <p className="text-center">Loading Projects...</p>
                ) : (
                    <div
                        className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        style={{ perspective: "1000px" }}
                    >
                        {projects.map((project) => (
                            <ProjectCard 
                                key={project._id} 
                                project={project}
                                onClick={() => setSelectedProject(project)}
                            />
                        ))}
                    </div>
                )}
            </section>
            
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </>
    );
};

export default ProjectsSection;
