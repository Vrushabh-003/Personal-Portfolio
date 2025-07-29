// src/components/sections/HeroSection.tsx
import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import AnimatedBlobBackground from '../common/AnimatedBlobBackground';
import { FaDownload } from 'react-icons/fa';

interface HeroProps {
  name: string;
 
}

const HeroSection: React.FC<HeroProps> = ({ name, }) => {
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
    <section id="hero" className="relative h-screen w-full flex items-center justify-center pt-24 overflow-hidden bg-light-bg dark:bg-dark-bg">
      <AnimatedBlobBackground />
      <div className="relative z-10 container mx-auto px-4 md:-inset-6 " style={{ perspective: "1000px" }}>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Column: Text Content */}
          <motion.div 
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">{name}</h1>
          {/* The new Type Animation component */}
            <TypeAnimation
              sequence={[
                'I am a Full-Stack Developer',
                1500, // wait 1.5s
                'I am a Mobile App Developer',
                1500, // wait 1.5s
                'I am an AI & ML Developer',
                1500, // wait 1.5s
                'I am a Data Science Enthusiast',
                1500,
              ]}
              wrapper="p"
              speed={50}
              className="text-lg md:text-xl font-medium text-slate-600 dark:text-slate-300 mb-8"
              repeat={Infinity}
            />
            
            <motion.a
              href="/Vrushabh_Shirke_Resume.pdf"
              download
              className="group relative inline-flex items-center justify-center p-0.5 rounded-lg overflow-hidden"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => { setIsHovered(false); handleMouseLeave(); }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00c1ffff_0%,#c137ffff_50%,#00c1ffff_100%)] blur-lg" />
              <span 
                className="relative inline-flex items-center gap-2 py-3 px-6 bg-white dark:bg-gray-900 rounded-[7px] z-10"
                style={{ transform: "translateZ(20px)" }}
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
            transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
          >
            <div className="relative w-[300px] h-[300px] md:w-[420px] md:h-[420px]">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-sky-400 rounded-full blur-xl opacity-70 animate-pulse" />
              <img
                src="https://res.cloudinary.com/dqfqipzk6/image/upload/q_auto,f_auto/v1753644203/photo_v3lpwi.jpg" // <-- Your URL is now here
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