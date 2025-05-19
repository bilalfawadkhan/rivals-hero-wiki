'use client';
import React from 'react';
import Image from 'next/image';
import {AnimatePresence, motion} from 'framer-motion';

interface PortraitProps {
  src: string;
  alt?: string;
  className?: string;
  heroName?: string;
  herotype?: string;
}

const Portrait: React.FC<PortraitProps> = ({
  src,
  alt = 'Portrait Image',
  className = '',
  heroName = 'Hero Name',
  herotype = 'Hero Type',
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const handleClick = (e: React.MouseEvent,value:boolean) => {
    e.stopPropagation();
    value ? setIsFocused(false) : setIsFocused(true);
    document.body.style.overflow = 'hidden'; // optional
  };
  return (
    <>
    <AnimatePresence> 
      {isFocused &&(
      <motion.div
      layoutId="portrait"
       className={"w-[200px] rounded-2xl shadow-2xl flex flex-col items-center mt-12 bg-gray-700 border-gold-border border-4 overflow-hidden "}
       initial={{scale: 0}}
       animate={{scale: 2}}
       style={{transformOrigin: 'left center',
        top: '50%',
        left: '8%',
        position:'fixed',
        transform: 'translateY(-50%)',
       }}
       onClick={(e) => handleClick(e, isFocused)}
      >
        <Image src={src} alt={alt} className={className} width={200} height={300} />
        <h5 className="bg-gray-500 w-full text-center text-white">{heroName}</h5>
        <p className="bg-amber-600 w-full text-center">{herotype}</p>
      </motion.div>
  )}

  {!isFocused && (
      <motion.div
      layoutId="portrait"
       className={" w-[200px] rounded-2xl shadow-2xl flex flex-col items-center mt-12 bg-gray-700 border-gold-border border-4 overflow-hidden "}
       onClick={(e) => handleClick(e, isFocused)}
      >
        <Image src={src} alt={alt} className={className} width={200} height={300} />
        <h5 className="bg-gray-500 w-full text-center text-white">{heroName}</h5>
        <p className="bg-amber-600 w-full text-center">{herotype}</p>
      </motion.div>
  )}
      </AnimatePresence>

    </>
  );
};

export default Portrait;
