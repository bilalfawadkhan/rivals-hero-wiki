'use client'; // Enables usage of client-side features in a Next.js 13+ app

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

// Define the props expected by the Portrait component
interface PortraitProps {
  src: string;                              // Image source URL
  alt?: string;                             // Alternative text for the image
  className?: string;                       // Additional CSS classes for the image
  heroName?: string;                        // Name to be displayed over the portrait
  herotype?: string;                        // Type or description of the hero
  isActive?: boolean;                       // Whether this component is currently active
  setActiveId: (value: number | null) => void; // Function to update the active component's ID
  activeId: number | null;                  // ID of the currently active portrait
  compID: number;                           // Unique ID for this particular component
  setScaledIndex: (value :number | null) => void;              // Index of the currently scaled portrait, if any

}

// Functional component definition using the props above
const Portrait: React.FC<PortraitProps> = ({
  src,
  alt = 'Portrait Image',
  className = '',
  heroName = 'Hero Name',
  herotype = 'Hero Type',
  isActive,
  activeId,
  setActiveId,
  compID,
  setScaledIndex,
  
}) => {

  // Reference to the root DOM element for positioning calculations
  const ref = useRef<HTMLDivElement | null>(null);

  // Local state to store dynamic position and scale for animation
  const [Position, setPosition] = React.useState({
    left: 0,
    top: 0,
    scale: 1
  });

  // Function to set this component as the active one
  const setId = (compID: number) => {
    setActiveId(compID);
  };

  // Handle click events on the portrait
  const handleClick = (e: React.MouseEvent) => {
    if (!ref.current) return;
    e.stopPropagation(); // Prevents the event from bubbling to parent elements

    let shouldFocus;

    // Logic to toggle focus based on the current active ID and click count
    if (activeId === compID && isActive) {
      // If already active and clicked again, unfocus
      // console.log('Second Click actions');
      setActiveId(null);
      shouldFocus = !isActive;
      setScaledIndex(null);
    }
    if (activeId === null) {
      // First time click — set as active
      // console.log('First Click action');
      setActiveId(compID);
      shouldFocus = !isActive;
    }

    // Update position and scale for animation if needed
    if (shouldFocus) {
      const data = ref.current.getBoundingClientRect(); // Get current position on screen
      setPosition({
        left: 140 - ref.current.offsetLeft,
        top: 430 - ref.current.offsetTop,
        scale: 2.5, // Zoom in
      });
    } else {
      // Reset to original position and scale
      setPosition({
        left: 0,
        top: 0,
        scale: 1
      });
    }
  };

  return (
    <>
      {/* Outer wrapper to provide fixed dimensions */}
      <div
        ref={ref}
        onClick={(e) => handleClick(e)}
        className='w-[150px] h-[217px]'
      >
        {/* Motion-enabled card for smooth scaling and repositioning */}
        <motion.div
          className={`relative h-50 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center bg-gray-700 border-[#D6D9F2] border-4 ${activeId === compID ? 'z-60' : 'z-40'}`}
          animate={Position} // Apply dynamic animation styles
        >
          {/* Image of the hero */}
          <Image src={src} alt={alt} className='-ml-3.5' width={120} height={300} />

          {/* Hero name positioned near the bottom of the image */}
          <h5 className="absolute top-34 left-6 rounded-sm w-2/3 text-center text-white text-xl">
            {heroName}
          </h5>

          {/* Hero type badge positioned below the name */}
          <p className="absolute top-40 rounded-sm w-2/4 bg-[#be6f23] border-[#eaa03a] border-2 text-center text-[10px]">
            {herotype}
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default Portrait;
