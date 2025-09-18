'use client'; // Enables usage of client-side features in a Next.js 13+ app

import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
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
  cardID: number;                           // Unique ID for this particular component
  setSelectedCard: (value :number | null) => void; // Index of the currently scaled portrait, if any
  onCardClick : (value:String) => void;
}

export interface Portraithandle{
  handleClickChild: () => void;
}

// Functional component definition using the props above
const Portrait = forwardRef<Portraithandle, PortraitProps>(function Portrait(
  {
    src,
    alt = 'Portrait Image',
    className = '',
    heroName = 'Hero Name',
    herotype = 'Hero Type',
    isActive,
    activeId,
    setActiveId,
    cardID: compID,
    setSelectedCard,
    onCardClick
  },
  ref
) {
  

  // Reference to the root DOM element for positioning calculations
  const rootRef = useRef<HTMLDivElement | null>(null);

const getHeroTypeColor = (herotype: string) => {
  switch (herotype) {
    case "Vanguard":
      return "bg-gradient-to-r from-blue-700 to-blue-900 border-blue-800";
    case "Duelist":
      return "bg-gradient-to-r from-red-700 to-red-900 border-red-800";
    case "Strategist":
      return "bg-gradient-to-r from-green-700 to-green-900 border-green-800";
    default:
      return "bg-gradient-to-r from-gray-700 to-gray-900 border-gray-800";
  }
};

  // Local state to store dynamic position and scale for animation
  const [Position, setPosition] = React.useState({
    left: 0,
    top: 0,
    scale: 1
  });


const getTargetPosition = (width: number) => {
  if (width <= 330) { // sm breakpoint
    return { left: 50, top: 200, scale: 1 };
  }
  if (width <= 640) { // sm breakpoint
    return { left: 50, top: 200, scale: 1.1 };
  } else if (width <= 1280) { // md / lg breakpoint
    return { left: 100, top: 250, scale: 1.4 };
  } else { // xl breakpoint
    return { left: 140, top: 250, scale: 2.2 };
  }
};


  // Handle click events on the portrait
  const handleClickCore = () => {
    if (!rootRef.current) return;
    let shouldFocus;

    // Logic to toggle focus based on the current active ID and click count
    if (activeId === compID) {
      setActiveId(null);
      shouldFocus = !isActive;
      setSelectedCard(null);
    }
    else {
      // First time click — set as active
      setActiveId(compID);
      onCardClick(heroName);
      shouldFocus = !isActive;
    }


    // Update position and scale for animation if needed
    if (shouldFocus) {
      const width = window.innerWidth; // Get current window width
      const { left, top, scale } = getTargetPosition(width);
      if(width <= 640 )
        return;
      setPosition({
        left: left - rootRef.current.offsetLeft,
        top: top - rootRef.current.offsetTop,
        scale: scale, // Zoom in
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

  const handleClick =(e:React.MouseEvent) =>{
    e.stopPropagation();
    handleClickCore();
  }

  useImperativeHandle(ref, () => ({
    handleClickChild:handleClickCore,

  }),[activeId, compID, isActive]);

  return (
    <>
      {/* Outer wrapper to provide fixed dimensions */}
      <div
        ref={rootRef}
        onClick={(e) => handleClick(e)}
        className='w-[150px] h-[217px]'
      >
        {/* Motion-enabled card for smooth scaling and repositioning */}
        <motion.div
          className={`relative h-50 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center bg-gray-700 border-[#D6D9F2] border-4 ${activeId === compID ? 'md:z-60' : 'md:z-40'}`}
          animate={Position} // Apply dynamic animation styles
        >
          {/* Image of the hero */}
          <Image src={src} alt={alt} className='-ml-3.5' width={120} height={300} />

          {/* Hero name positioned near the bottom of the image */}
          <h5 className="absolute top-34 left-0 rounded-sm w-full text-center text-white text-sm">
            {heroName}
          </h5>

          {/* Hero type badge positioned below the name */}
          <p className={`absolute top-40 rounded-sm w-2/4  border-2 text-center text-[10px] ${getHeroTypeColor(herotype)}`}>
            {herotype}
          </p>
        </motion.div>
      </div>
    </>
  );
});

export default Portrait;
