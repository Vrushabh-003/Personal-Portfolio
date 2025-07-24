// src/components/common/AnimatedBlobBackground.tsx
import React from 'react';

const AnimatedBlobBackground = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div className="absolute w-96 h-96 bg-primary/20 rounded-full -top-32 -left-32 animate-blob"></div>
      <div className="absolute w-96 h-96 bg-sky-500/20 rounded-full -bottom-24 -right-16 animate-blob animation-delay-2000"></div>
      <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full bottom-32 left-24 animate-blob animation-delay-4000"></div>
    </div>
  );
};

export default AnimatedBlobBackground;