// src/components/common/CustomCursor.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  return (
    <>
      {/* Outer Ring (the trailing circle) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-8 w-8 rounded-full border-2 border-primary"
        style={{
          translateX: position.x - 16,
          translateY: position.y - 16,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />
      
      {/* Inner Dot (the main filled pointer) */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-primary"
        style={{
          translateX: position.x - 4,
          translateY: position.y - 4,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 40 }}
      />
    </>
  );
};

export default CustomCursor;