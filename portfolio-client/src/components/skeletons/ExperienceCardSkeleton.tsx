import React from 'react';

const ExperienceCardSkeleton = () => {
  return (
    <div className="relative mb-12 animate-pulse">
      <div className="w-full ml-12 md:ml-0 p-6 bg-white/10 dark:bg-gray-800/20 rounded-lg shadow-lg">
        <div className="h-4 w-1/3 bg-gray-300/10 dark:bg-gray-700/30 rounded-md mb-3"></div>
        <div className="h-6 w-1/2 bg-gray-300/10 dark:bg-gray-700/30 rounded-md mb-2"></div>
        <div className="h-5 w-2/3 bg-gray-300/10 dark:bg-gray-700/30 rounded-md mb-4"></div>
        <div className="space-y-2">
            <div className="h-4 w-full bg-gray-300/10 dark:bg-gray-700/30 rounded-md"></div>
            <div className="h-4 w-5/6 bg-gray-300/10 dark:bg-gray-700/30 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCardSkeleton;