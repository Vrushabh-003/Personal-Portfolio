import React from 'react';

const AchievementCardSkeleton = () => {
  return (
    <div className="relative p-8 animate-pulse">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="w-full h-80 bg-gray-300/10 dark:bg-gray-700/30 rounded-lg shadow-lg"></div>
            <div className="text-center md:text-left">
                <div className="h-4 w-1/4 bg-gray-300/10 dark:bg-gray-700/30 rounded-md mb-3 mx-auto md:mx-0"></div>
                <div className="h-8 w-3/4 bg-gray-300/10 dark:bg-gray-700/30 rounded-md mb-4 mx-auto md:mx-0"></div>
                <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-300/10 dark:bg-gray-700/30 rounded-md"></div>
                    <div className="h-4 w-full bg-gray-300/10 dark:bg-gray-700/30 rounded-md"></div>
                    <div className="h-4 w-5/6 bg-gray-300/10 dark:bg-gray-700/30 rounded-md"></div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AchievementCardSkeleton;