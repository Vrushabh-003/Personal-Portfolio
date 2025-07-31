// src/components/common/CustomCursor.tsx
import React, { useState, useEffect } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';

interface CustomCursorProps {
  cursorSize?: number;
}

const Spark = ({
  x,
  y,
  id,
  color,
  onComplete,
}: {
  x: number;
  y: number;
  id: number;
  color: string;
  onComplete: (id: number) => void;
}) => {
  const angle = Math.random() * 360;
  const distance = Math.random() * 40 + 30;
  const finalX = x + distance * Math.cos((angle * Math.PI) / 180);
  const finalY = y + distance * Math.sin((angle * Math.PI) / 180);
  const duration = Math.random() * 0.5 + 0.4;
  const size = Math.random() * 3 + 2;

  return (
    <motion.div
      className="absolute rounded-full shadow-md"
      initial={{ x, y, scale: 1, opacity: 1, width: size, height: size }}
      animate={{ x: finalX, y: finalY, scale: 0, opacity: 0 }}
      transition={{ duration, ease: 'easeOut' }}
      style={{
        backgroundColor: color,
        top: 0,
        left: 0,
        position: 'fixed',
        pointerEvents: 'none',
      }}
      onAnimationComplete={() => onComplete(id)}
    />
  );
};

const CustomCursor: React.FC<CustomCursorProps> = ({ cursorSize = 20 }) => {
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'text'>('default');
  const [sparks, setSparks] = useState<{ x: number; y: number; id: number; color: string }[]>([]);

  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const mouse = {
    x: useSpring(0, { stiffness: 500, damping: 40 }),
    y: useSpring(0, { stiffness: 500, damping: 40 }),
  };

  const trailer = {
    x: useSpring(0, { stiffness: 200, damping: 20 }),
    y: useSpring(0, { stiffness: 200, damping: 20 }),
  };

  const trailerScale = useSpring(1, { stiffness: 200, damping: 20 });
  const mouseScale = useSpring(1, { stiffness: 500, damping: 40 });

  useEffect(() => {
    if (isTouchDevice) return;

    const mouseMove = (e: MouseEvent) => {
      mouse.x.set(e.clientX - cursorSize / 2);
      mouse.y.set(e.clientY - cursorSize / 2);
      trailer.x.set(e.clientX - cursorSize / 2);
      trailer.y.set(e.clientY - cursorSize / 2);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        const style = window.getComputedStyle(e.target).cursor;
        if (style === 'pointer') {
          setIsHoveringInteractive(true);
          setCursorType('pointer');
        } else if (style === 'text') {
          setIsHoveringInteractive(true);
          setCursorType('text');
        } else {
          setIsHoveringInteractive(false);
          setCursorType('default');
        }
      }
    };

    const handleMouseOut = () => {
      setIsHoveringInteractive(false);
      setCursorType('default');
    };

    const handleClick = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const colors = ['#007BFF', '#FF4081', '#FFC107', '#4CAF50'];
      const newSparks = Array.from({ length: 10 }).map((_, i) => ({
        x: e.clientX,
        y: e.clientY,
        id: Date.now() + i,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
      setSparks((prev) => [...prev, ...newSparks]);
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('click', handleClick);
    document.body.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('click', handleClick);
      document.body.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorSize, prefersReducedMotion, isTouchDevice]);

  useEffect(() => {
    if (isHoveringInteractive) {
      trailerScale.set(1.5);
      mouseScale.set(0.6);
    } else {
      trailerScale.set(1);
      mouseScale.set(1);
    }
  }, [isHoveringInteractive]);

  const removeSpark = (id: number) => {
    setSparks((prev) => prev.filter((s) => s.id !== id));
  };

  if (isTouchDevice) return null;

  return (
    <div className="custom-cursor-container pointer-events-none fixed inset-0 z-[9999]">
      {/* The trailing dot */}
      <motion.div
        style={{
          left: trailer.x,
          top: trailer.y,
          scale: trailerScale,
        }}
        className={`rounded-full absolute shadow-md ${
          cursorType === 'text'
            ? 'bg-purple-400/50 h-6 w-6'
            : 'bg-primary/50 h-5 w-5'
        } border border-gray-300 dark:border-gray-700`}
      />
      {/* The main cursor dot */}
      <motion.div
        style={{
          left: mouse.x,
          top: mouse.y,
          scale: mouseScale,
        }}
        className={`rounded-full absolute shadow-lg ${
          cursorType === 'text'
            ? 'bg-purple-600 h-3 w-3'
            : 'bg-primary h-5 w-5'
        } border border-white dark:border-gray-900`}
      />

      {/* Render the sparks */}
      <AnimatePresence>
        {!prefersReducedMotion &&
          sparks.map((spark) => (
            <Spark
              key={spark.id}
              x={spark.x}
              y={spark.y}
              id={spark.id}
              color={spark.color}
              onComplete={removeSpark}
            />
          ))}
      </AnimatePresence>
    </div>
  );
};

export default CustomCursor;
