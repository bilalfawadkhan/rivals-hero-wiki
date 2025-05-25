'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import {AnimatePresence, motion, scale} from 'framer-motion';

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
  
  const ref = useRef<HTMLDivElement | null>(null);
  const [isFocused, setIsFocused] = React.useState(false);
  const [Position , setPosition] = React.useState({
    left: 0,
    top: 0,
    scale:1
  })

    {/* Conditional Reposition and Scaling based on a focused usestate*/}
  const handleClick = (e: React.MouseEvent,value:boolean) => {
     if(!ref.current) return;
        e.stopPropagation();
        if(!isFocused){
        const data = ref.current.getBoundingClientRect();
        console.log(data)
      setPosition({
        left:140 - ref.current.offsetLeft,
        top: 350- ref.current.offsetTop,
        scale:2.5
      })
    } 
    else{
       setPosition({
        left:0,
        top: 0,
        scale:1
      })
    }   
    setIsFocused(!value)
  };


  return (
    <>
    {/* Wrapper Div around the card as Placeholder*/}
      <div 
      ref = {ref}
       onClick={(e) => handleClick(e, isFocused)}
        className='w-[150px] h-[217px]'>

            {/* Motion Card for Scaled and normal version*/}
          <motion.div
           className={`relative z-50 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center bg-gray-700 border-gold-border border-4 `}
           animate={Position}
          >
            <Image src={src} alt={alt} className={className} width={200} height={300} />
            <h5 className="bg-gray-500 w-full text-center text-white">{heroName}</h5>
            <p className="bg-amber-600 w-full text-center ">{herotype}</p>
          </motion.div>
      </div>
    </>
  );
};

export default Portrait;
