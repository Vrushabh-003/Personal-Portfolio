// src/components/sections/ProjectsSection.tsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useActiveSection } from '../../contexts/ActiveSectionContext';
import ProjectCard from '../common/ProjectCard';
import { Project } from '../../types';
import ProjectModal from '../common/ProjectModal';
import ProjectCardSkeleton from '../skeletons/ProjectCardSkeleton';

const ProjectsSection = () => {
  const { ref: sectionRef, inView } = useInView({ rootMargin: "-50% 0px -50% 0px" });
  const { setActiveSection } = useActiveSection();

  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const updateDeviceType = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    updateDeviceType();
    window.addEventListener("resize", updateDeviceType);
    return () => window.removeEventListener("resize", updateDeviceType);
  }, []);

  const projectsPerPage = isMobile ? 1 : isTablet ? 2 : 3;
  const numPages = allProjects.length > 0 ? Math.ceil(allProjects.length / projectsPerPage) : 0;

  useEffect(() => { if (inView) setActiveSection("projects"); }, [inView, setActiveSection]);

  useEffect(() => {
    const fetchAllProjects = async () => {
      setLoading(true);
      try {
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/projects`;
        const { data } = await axios.get(apiUrl);
        
        setAllProjects(
          Array.isArray(data.projects)
            ? data.projects
            : Array.isArray(data)
            ? data
            : []
        );
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProjects();
  }, []);


  const changePage = useCallback((newDirection: number) => {
    if (numPages <= 1) return;
    setDirection(newDirection);
    setCurrentIndex(prev => (prev + newDirection + numPages) % numPages);
  }, [numPages]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    if (!inView) {
      setCurrentIndex(0);
    }
  }, [inView]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < 0 && currentIndex === 0) return;
      if (e.deltaY > 0 && currentIndex === numPages - 1) return;
      e.preventDefault();
      if (isScrolling.current) return;
      isScrolling.current = true;
      if (e.deltaY > 20) changePage(1);
      else if (e.deltaY < -20) changePage(-1);
      setTimeout(() => { isScrolling.current = false; }, 800);
    };
    const currentRef = scrollRef.current;
    if (currentRef && !isMobile && !isTablet) {
      currentRef.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (currentRef && !isMobile && !isTablet) {
        currentRef.removeEventListener("wheel", handleWheel);
      }
    };
  }, [isMobile, isTablet, changePage, currentIndex, numPages]);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchStartX.current - touchEndX;
    if (swipeDistance > 50) changePage(1);
    else if (swipeDistance < -50) changePage(-1);
  };
  
  const visibleProjects = allProjects.slice(currentIndex * projectsPerPage, (currentIndex + 1) * projectsPerPage);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <section ref={sectionRef} id="projects" className="py-20 relative flex flex-col justify-center min-h-[90vh] overflow-hidden">
        <h2 className="text-4xl font-bold text-center mb-12 w-full px-4">My Work & Projects</h2>

        <div
          ref={scrollRef}
          className="container mx-auto flex-grow flex items-center justify-center pt-8"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {loading ? (
            <div className={`grid grid-cols-1 ${isTablet ? "sm:grid-cols-2" : "md:grid-cols-3"} gap-8 w-full px-4`}>
              <ProjectCardSkeleton />
              {projectsPerPage > 1 && <ProjectCardSkeleton />}
              {projectsPerPage > 2 && <ProjectCardSkeleton />}
            </div>
          ) : (
            <motion.div
              key={currentIndex}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible" // <-- THE FIX IS HERE
              viewport={{ once: false, amount: 0.2 }} // <-- And here
              className={`w-full grid grid-cols-1 ${isTablet ? "sm:grid-cols-2" : "lg:grid-cols-3"} gap-8 px-4`}
            >
              {visibleProjects.map((project) => (
                <motion.div key={project._id} variants={cardVariants}>
                  <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
          {Array.from({ length: numPages }).map((_, i) => (
            <button key={i} onClick={() => setCurrentIndex(i)} className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${currentIndex === i ? "bg-primary scale-125" : "bg-gray-400"}`} />
          ))}
        </div>
      </section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
};

export default ProjectsSection;