// src/components/common/ProjectModal.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { Project } from '../../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset the slider to the first image whenever a new project is opened
  useEffect(() => {
    if (project) {
      setCurrentIndex(0);
    }
  }, [project]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.2 } },
  };

  if (!project) return null;

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from closing
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? project.media.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from closing
    const isLastSlide = currentIndex === project.media.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const currentMedia = project.media[currentIndex];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-primary z-20">
              <FaTimes size={24} />
            </button>
            
            <div className="relative w-full h-64 md:h-80">
              {project.media.length > 1 && (
                <>
                  <button onClick={goToPrevious} className="absolute top-1/2 left-2 z-10 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 transform -translate-y-1/2 transition-colors">❮</button>
                  <button onClick={goToNext} className="absolute top-1/2 right-2 z-10 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 transform -translate-y-1/2 transition-colors">❯</button>
                </>
              )}
              {currentMedia && currentMedia.type === 'video' ? (
                <video src={currentMedia.url} controls autoPlay className="w-full h-full object-cover rounded-t-lg bg-black" />
              ) : (
                <img src={currentMedia?.url} alt={project.title} className="w-full h-full object-cover rounded-t-lg" />
              )}
            </div>

            <div className="p-8">
              <h2 className="text-4xl font-bold mb-4">{project.title}</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span key={tech} className="bg-primary/10 text-primary dark:bg-primary/20 dark:text-sky-300 px-2.5 py-1 text-xs font-semibold rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{project.description}</p>
              <div className="mt-6 flex gap-4">
                {project.liveUrl && project.liveUrl !== '#' && 
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-2 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/90">
                    <FaExternalLinkAlt /> Live Demo
                  </a>}
                {project.repoUrl && project.repoUrl !== '#' && 
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md">
                    <FaGithub /> Source Code
                  </a>}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;