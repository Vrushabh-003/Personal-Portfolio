// src/components/common/ProjectCard.tsx
import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, animate } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaImage } from "react-icons/fa";
import { Project } from "../../types";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const GLOW_BASE_ALPHA = 0.25;
const GLOW_HOVER_ALPHA = 0.55;
const GLARE_MAX_ALPHA = 0.45;

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [charLimit, setCharLimit] = useState(120);

  // --- Responsive char limit ---
  useEffect(() => {
    const updateLimit = () => {
      if (window.innerWidth < 640) setCharLimit(60);
      else if (window.innerWidth < 1024) setCharLimit(90);
      else setCharLimit(120);
    };
    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const hoverSmoothed = useSpring(hovered ? 1 : 0, { stiffness: 200, damping: 20 });
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const glow = useTransform([x, y, hoverSmoothed], ([mxv, myv, h]: number[]) => {
    const ox = Math.round(mxv * 20);
    const oy = Math.round(myv * 20);
    const blur = Math.round(30 + h * 40);
    const alpha = (GLOW_BASE_ALPHA + (GLOW_HOVER_ALPHA - GLOW_BASE_ALPHA) * h).toFixed(3);
    return `0 10px 30px rgba(0,0,0,0.12), ${-oy}px ${-ox}px ${blur}px rgba(88,101,242,${alpha})`;
  });

  const glareBg = useTransform([x, y, hoverSmoothed], ([mxv, myv, h]: number[]) => {
    const px = Math.round(mxv * 40 + 50);
    const py = Math.round(myv * 40 + 50);
    const alpha = (GLARE_MAX_ALPHA * h).toFixed(3);
    return `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,${alpha}) 0%, rgba(255,255,255,0) 40%)`;
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { width, height, left, top } = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - left) / width - 0.5);
    y.set((e.clientY - top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    animate(x, 0, { type: "spring", stiffness: 200, damping: 20 });
    animate(y, 0, { type: "spring", stiffness: 200, damping: 20 });
    setHovered(false);
  };

  const truncateText = (text: string) => {
    return text.length <= charLimit ? text : text.substring(0, charLimit) + "...";
  };

  const firstMedia = project.media && project.media[0];

  return (
    <motion.div
      ref={cardRef}
      className="relative cursor-pointer h-[28rem] rounded-lg"
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        perspective: "1000px",
        boxShadow: glow,
      }}
      whileHover={{
        scale: 1.02
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Glare overlay */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none z-20"
        style={{ background: glareBg }}
      />

      <div className="relative bg-white dark:bg-gray-800 rounded-lg flex flex-col h-full overflow-hidden" style={{ transform: "translateZ(20px)" }}>
        {/* Media Area */}
        <div className="h-1/2 w-full flex-shrink-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          {firstMedia ? (
            firstMedia.type === "video" ? (
              <video src={firstMedia.url} autoPlay loop muted playsInline className="w-full h-full object-cover" />
            ) : (
              <img src={firstMedia.url} alt={project.title} className="w-full h-full object-cover" />
            )
          ) : (
            <FaImage className="text-4xl text-gray-400 dark:text-gray-500" />
          )}
        </div>
        
        {/* Content Area */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2 truncate text-light-text dark:text-dark-text">
            {project.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow overflow-hidden">
            {truncateText(project.description)}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 4).map((tech: string) => (
              <span key={tech} className="bg-primary/10 text-primary dark:bg-primary/20 dark:text-sky-300 px-2 py-1 text-xs font-semibold rounded-full z-10">
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-auto flex justify-end gap-4 text-xl text-secondary dark:text-gray-400 z-10">
            {project.repoUrl && project.repoUrl !== "#" && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-primary" onClick={e => e.stopPropagation()}>
                <FaGithub />
              </a>
            )}
            {project.liveUrl && project.liveUrl !== "#" && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo" className="hover:text-primary" onClick={e => e.stopPropagation()}>
                <FaExternalLinkAlt />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
