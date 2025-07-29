// src/components/common/CustomCursor.tsx
import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const cursorSize = 20;

  const mouse = {
    x: useSpring(0, { stiffness: 500, damping: 40 }),
    y: useSpring(0, { stiffness: 500, damping: 40 }),
  };

  const trailer = {
    x: useSpring(0, { stiffness: 200, damping: 20 }),
    y: useSpring(0, { stiffness: 200, damping: 20 }),
  };

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      mouse.x.set(e.clientX - cursorSize / 2);
      mouse.y.set(e.clientY - cursorSize / 2);
      trailer.x.set(e.clientX - cursorSize / 2);
      trailer.y.set(e.clientY - cursorSize / 2);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && window.getComputedStyle(e.target).cursor === 'pointer') {
        setIsHoveringInteractive(true);
      }
    };

    const handleMouseOut = () => {
      setIsHoveringInteractive(false);
    };

    window.addEventListener('mousemove', mouseMove);
    document.body.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      document.body.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  const trailerScale = useSpring(1, { stiffness: 200, damping: 20 });
  const mouseScale = useSpring(1, { stiffness: 500, damping: 40 });

  useEffect(() => {
    if (isHoveringInteractive) {
      trailerScale.set(1.5);
      mouseScale.set(0.6);
    } else {
      trailerScale.set(1);
      mouseScale.set(1);
    }
  }, [isHoveringInteractive]);

  return (
    <div className="custom-cursor-container pointer-events-none fixed inset-0 z-[9999]">
      <motion.div
        style={{
          left: trailer.x,
          top: trailer.y,
          scale: trailerScale,
        }}
        className="h-5 w-5 rounded-full bg-primary/40 absolute"
      />
      <motion.div
        style={{
          left: mouse.x,
          top: mouse.y,
          scale: mouseScale,
        }}
        className="h-5 w-5 rounded-full bg-primary absolute"
      />
    </div>
  );
};

export default CustomCursor;