// src/components/common/ProjectCard.tsx
import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { Project } from '../../types';
import { useTheme } from '../../contexts/ThemeContext'; // 1. Import the useTheme hook

const ProjectCard = ({ project }: { project: Project }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme(); // 2. Get the current theme

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30, restDelta: 0.001 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30, restDelta: 0.001 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);
    
    // 3. Define the glare color based on the current theme
    const glareColor = theme === 'dark' 
        ? 'rgba(255, 255, 255, 0.1)' 
        : 'rgba(0, 123, 255, 0.15)';

    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const { width, height, left, top } = cardRef.current.getBoundingClientRect();
        const mouseX = e.clientX - left;
        const mouseY = e.clientY - top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            ref={cardRef}
            variants={itemVariants}
            className="relative rounded-lg shadow-lg"
            style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative bg-white dark:bg-gray-800 rounded-lg flex flex-col h-full overflow-hidden" style={{ transform: "translateZ(20px)" }}>
                <motion.div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                circle at ${glareX} ${glareY},
                                ${glareColor},
                                transparent 40%
                            )
                        `,
                        opacity: useTransform(mouseXSpring, [-0.5, 0.5], [0, 1]),
                    }}
                />
                <img src={project.imageUrl} alt={project.title} className="w-full h-56 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold mb-2 text-light-text dark:text-dark-text">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech: string) => (
                            <span key={tech} className="bg-primary/10 text-primary dark:bg-primary/20 dark:text-sky-300 px-2.5 py-1 text-xs font-semibold rounded-full z-10">
                                {tech}
                            </span>
                        ))}
                    </div>
                    <div className="mt-auto flex justify-end gap-4 text-2xl text-secondary dark:text-gray-400 z-10">
                        {project.repoUrl && project.repoUrl !== '#' && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository" className="hover:text-primary"><FaGithub /></a>}
                        {project.liveUrl && project.liveUrl !== '#' && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo" className="hover:text-primary"><FaExternalLinkAlt /></a>}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;