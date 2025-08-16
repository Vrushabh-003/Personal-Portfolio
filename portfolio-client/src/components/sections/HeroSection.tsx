// src/components/sections/HeroSection.tsx
import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import AnimatedBlobBackground from '../common/AnimatedBlobBackground';
import { FaDownload } from 'react-icons/fa';

interface HeroProps {
  name: string;
}

const HeroSection: React.FC<HeroProps> = ({ name }) => {
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const buttonShine = useMotionTemplate`
    radial-gradient(
      200px circle at ${mouseX}px ${mouseY}px,
      rgba(255, 255, 255, 0.4),
      transparent 80%
    )
  `;

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-light-bg dark:bg-dark-bg pt-16 sm:pt-20 md:pt-28"
    >
      <AnimatedBlobBackground />
      <div
        className="relative z-10 container mx-auto px-4 md:-inset-6"
        style={{ perspective: "1000px" }}
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Column: Text Content */}
          <motion.div
            className="text-center md:text-left pl-2 sm:pl-4 md:pl-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Responsive heading using clamp */}
            <h1 className="font-bold mb-4 text-[clamp(2rem,6vw,4.5rem)] leading-tight">
              {name}
            </h1>

            {/* Animated subtitle */}
            <TypeAnimation
              sequence={[
                'I am a Full-Stack Developer',
                1500,
                'I am a Mobile App Developer',
                1500,
                'I am an AI & ML Developer',
                1500,
                'I am a Data Science Enthusiast',
                1500,
              ]}
              wrapper="p"
              speed={50}
              className="text-[clamp(1rem,2.5vw,1.25rem)] font-medium text-slate-600 dark:text-slate-300 mb-8"
              repeat={Infinity}
            />

            {/* Download Resume Button */}
            <motion.a
              href="/Vrushabh_Shirke_Resume.pdf"
              download
              aria-label="Download Resume"
              className="group relative inline-flex items-center justify-center p-0.5 rounded-lg overflow-hidden"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => {
                setIsHovered(false);
                handleMouseLeave();
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00c1ffff_0%,#c137ffff_50%,#00c1ffff_100%)] blur-lg" />
              <span
                className="relative inline-flex items-center gap-2 py-3 px-6 bg-white dark:bg-gray-900 rounded-[7px] z-10"
                style={{ transform: "translateZ(20px)", willChange: "transform" }}
              >
                <FaDownload />
                Download Resume
              </span>
              <motion.div
                className="absolute inset-0 rounded-lg z-0"
                style={{ background: buttonShine }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </motion.a>
          </motion.div>

          {/* Right Column: Profile Picture */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          >
            <div className="relative w-40 h-40 sm:w-60 sm:h-60 md:w-[420px] md:h-[420px]">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-sky-400 rounded-full blur-xl opacity-70 animate-pulse" />
              <img
                src="https://res.cloudinary.com/dqfqipzk6/image/upload/q_auto,f_auto,dpr_auto,c_fill,w_600/photo_v3lpwi.jpg
"
                alt="Vrushabh Shirke"
                className="relative w-full h-full object-cover rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
