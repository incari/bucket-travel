import React from "react";

export const CardSkeleton = () => {
  return (
    <div className="animate-pulse mt-8 max-w-4xl mx-auto bg-gray-200 rounded-lg shadow-lg overflow-hidden h-[200px] flex">
      <div className="w-1/2 bg-gray-300 h-full"></div>
      <div className="w-1/2">
        <div className="p-6 text-start">
          <div className="bg-gray-400 h-6 w-1/2 mb-4"></div>
          <div className="bg-gray-300 h-4 w-full mb-2"></div>
          <div className="bg-gray-300 h-4 w-full mb-2"></div>
          <div className="bg-gray-300 h-4 w-full mb-2"></div>
          <div className="bg-gray-300 h-4 w-full mb-2"></div>
          <div className="flex justify-between mt-4">
            <div className="bg-gray-400 h-4 w-1/3"></div>
            <div className="bg-gray-400 h-4 w-1/3 mb-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
