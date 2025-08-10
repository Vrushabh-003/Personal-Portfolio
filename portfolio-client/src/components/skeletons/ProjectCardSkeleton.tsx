import React from 'react';

const ProjectCardSkeleton = () => {
  return (
    <div className="bg-white/10 dark:bg-gray-800/20 rounded-lg shadow-lg p-6 animate-pulse">
      <div className="h-48 bg-gray-300/10 dark:bg-gray-700/30 rounded-md mb-4"></div>
      <div className="h-6 w-3/4 bg-gray-300/10 dark:bg-gray-700/30 rounded-md mb-3"></div>
      <div className="h-4 w-full bg-gray-300/10 dark:bg-gray-700/30 rounded-md mb-1"></div>
      <div className="h-4 w-5/6 bg-gray-300/10 dark:bg-gray-700/30 rounded-md"></div>
    </div>
  );
};

export default ProjectCardSkeleton;