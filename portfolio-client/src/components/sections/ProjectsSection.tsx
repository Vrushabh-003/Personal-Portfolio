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
  const { ref: sectionRef, inView } = useInView({ rootMargin: "-50% 0px -50% 0px" });
  const { ref: loadMoreRef, inView: isLoadMoreVisible } = useInView({ triggerOnce: false });
  const { setActiveSection } = useActiveSection();

  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (inView) setActiveSection('projects');
  }, [inView]);

  const fetchProjects = async (pageNum: number) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${apiBaseUrl}/api/projects?page=${pageNum}&limit=3`);
      setProjects((prev) => pageNum === 1 ? data.projects : [...prev, ...data.projects]);
      setPage(data.page);
      setPages(data.pages);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(1); // First load
  }, []);

  // Scroll trigger to load more
  useEffect(() => {
    if (isLoadMoreVisible && page < pages && !loading) {
      fetchProjects(page + 1);
    }
  }, [isLoadMoreVisible]);

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
        ref={sectionRef}
        id="projects"
        className="py-20 relative"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="pointer-events-none fixed -inset-px"
          style={{ background: spotlight }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <h2 className="text-4xl font-bold text-center mb-12">My Work & Projects</h2>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </div>

        {/* Sentinel div for scroll-based loading */}
        {page < pages && (
          <div ref={loadMoreRef} className="h-16 mt-12 flex items-center justify-center">
            {loading && (
              <span className="text-gray-500 text-sm animate-pulse">Loading more...</span>
            )}
          </div>
        )}
      </section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
};

export default ProjectsSection;
