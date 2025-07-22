import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
  imageUrl: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col h-full"
            whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
            transition={{ duration: 0.3 }}
        >
            <img src={project.imageUrl} alt={project.title} className="w-full h-56 object-cover" />
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-2 text-light-text dark:text-dark-text">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech: string) => (
                        <span key={tech} className="bg-primary/10 text-primary dark:bg-primary/20 dark:text-sky-300 px-2.5 py-1 text-xs font-semibold rounded-full">
                            {tech}
                        </span>
                    ))}
                </div>
                <div className="mt-auto flex justify-end gap-4 text-2xl text-secondary dark:text-gray-400">
                    {project.repoUrl && project.repoUrl !== '#' && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository" className="hover:text-primary"><FaGithub /></a>}
                    {project.liveUrl && project.liveUrl !== '#' && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo" className="hover:text-primary"><FaExternalLinkAlt /></a>}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;