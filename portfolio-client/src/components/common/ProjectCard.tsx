// src/components/common/ProjectCard.tsx
import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const { width, height, left, top } = cardRef.current.getBoundingClientRect();
        x.set((e.clientX - left) / width - 0.5);
        y.set((e.clientY - top) / height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className="relative rounded-lg shadow-lg cursor-pointer"
            style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            <div className="relative bg-white dark:bg-gray-800 rounded-lg flex flex-col h-full overflow-hidden" style={{ transform: "translateZ(20px)" }}>
                {/* START: UPDATED MEDIA SECTION */}
                {project.mediaType === 'video' ? (
                  <video
                    src={project.imageUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <img src={project.imageUrl} alt={project.title} className="w-full h-56 object-cover" />
                )}
                {/* END: UPDATED MEDIA SECTION */}
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