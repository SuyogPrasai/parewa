import React, { useEffect, useState } from 'react';

const Preloader = () => {
  // State to manage the loading progress (0-100)
  const [progress, setProgress] = useState(0);
  // State to control the visibility of the preloader
  const [isLoading, setIsLoading] = useState(true);

  // Define the total loading time in milliseconds
  const loadingTime = 3000; // 3 seconds

  useEffect(() => {
    // Apply styles to html and body to prevent scrolling during preloader display
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.height = '100%';
    document.documentElement.style.width = '100%';
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
    document.body.style.width = '100%';
    document.body.style.margin = '0';

    // Set up the interval for updating progress
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = Math.min(100, (elapsedTime / loadingTime) * 100);

      setProgress(newProgress);

      // If loading is complete, clear the interval and hide the preloader
      if (newProgress === 100) {
        clearInterval(interval);
        setIsLoading(false);
      }
    }, 100); // Update every 100 milliseconds for smoother animation

    // Clean up: remove styles and clear interval when the component unmounts
    return () => {
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
      document.documentElement.style.width = '';
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.width = '';
      document.body.style.margin = '';
      clearInterval(interval);
    };
  }, []); // Empty dependency array ensures this runs once on mount and once on unmount

  // Only render the preloader if isLoading is true
  if (!isLoading) {
    return null;
  }

  // Calculate the circumference for the progress bar (2 * PI * radius)
  const circumference = 2 * Math.PI * 70; // For a circle with r=70

  return (
    // Fixed container to cover the entire screen with a semi-transparent, slightly darker background for better contrast
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-90 z-50">
      {/* Container for the bird and progress bar */}
      <div className="relative w-40 h-40 flex items-center justify-center"> {/* Adjusted container size */}
        {/* SVG for the circular progress bar */}
        <svg className="absolute" width="160" height="160" viewBox="0 0 160 160">
          {/* Progress bar track (background circle) */}
          <circle
            className="progress-ring-track"
            stroke="#e0e0e0" // Light grey color for the track
            strokeWidth="8"
            fill="transparent"
            r="70" // Radius of the circle
            cx="80" // Center X coordinate
            cy="80" // Center Y coordinate
          />
          {/* Progress bar itself (foreground circle) */}
          <circle
            className="progress-ring-bar"
            stroke="#93C5FD" // Lighter blue color for the progress (Tailwind blue-300)
            strokeWidth="8"
            fill="transparent"
            r="70"
            cx="80"
            cy="80"
            style={{
              strokeDasharray: circumference, // Full circumference
              // Calculate stroke-dashoffset based on progress
              strokeDashoffset: circumference - (progress / 100) * circumference,
              transition: 'stroke-dashoffset 0.1s linear', // Smooth transition for the progress
              transform: 'rotate(-90deg)', // Start the progress from the top
              transformOrigin: 'center center', // Ensure rotation is around the center
            }}
          />
        </svg>

        {/* SVG for the pigeon, positioned within the progress bar */}
        <svg className="bird-animation w-32 h-32 absolute" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Pigeon body */}
          <path d="M 30 50 Q 50 30 70 50 C 70 60 50 70 30 60 Z" fill="#FFFFFF" />
          {/* Pigeon head */}
          <circle cx="25" cy="55" r="8" fill="#FFFFFF" />
          {/* Pigeon eye */}
          <circle cx="22" cy="53" r="2" fill="#000000" />
          {/* Pigeon beak */}
          <path d="M 18 57 L 10 55 L 18 53 Z" fill="#FFA500" />

          {/* Pigeon wings - these will be animated */}
          {/* Top wing */}
          <path className="wing-top" d="M 35 50 Q 50 35 65 50 Q 50 40 35 50 Z" fill="#E0E0E0" />
          {/* Bottom wing */}
          <path className="wing-bottom" d="M 35 50 Q 50 65 65 50 Q 50 60 35 50 Z" fill="#E0E0E0" />

          {/* Pigeon legs - changed to orange fill */}
          <path d="M 40 60 L 38 70 L 42 70 Z" fill="#FFA500" /> {/* Left leg */}
          <path d="M 50 60 L 48 70 L 52 70 Z" fill="#FFA500" /> {/* Right leg */}
        </svg>

        {/* Text displaying the percentage progress, positioned below the bird */}
        <div className="absolute text-xl font-bold text-gray-700 mt-24">
          {Math.round(progress)}%
        </div>
      </div>

      {/* Custom CSS for the pigeon animation */}
      <style>{`
        @keyframes flap {
          0%, 100% {
            transform: scaleY(1);
            opacity: 1;
          }
          50% {
            transform: scaleY(0.5);
            opacity: 0.7;
          }
        }

        @keyframes fly {
          0% {
            transform: translateX(-50%) translateY(0px);
          }
          50% {
            transform: translateX(50%) translateY(-10px);
          }
          100% {
            transform: translateX(-50%) translateY(0px);
          }
        }

        .bird-animation {
          animation: fly 3s infinite ease-in-out;
          transform-origin: center center;
        }

        .wing-top {
          transform-origin: 50% 50%;
          animation: flap 0.5s infinite alternate ease-in-out;
        }

        .wing-bottom {
          transform-origin: 50% 50%;
          animation: flap 0.5s infinite alternate-reverse ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Preloader;
