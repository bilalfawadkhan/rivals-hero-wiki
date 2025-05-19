'use client';
import React, { useRef } from 'react';
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
  const [isFocused, setIsFocused] = React.useState(false);
  const [isPosition , setPosition] = React.useState({
    left: 0,
    top: 0
  })

  const handleClick = (e: React.MouseEvent,value:boolean) => {
    e.stopPropagation();
    setIsFocused(!value)
  
  };

  const variants = {
    focused : {scale:2 , y : 300 , x:100},
    unfocused :{ scale : 1 , y : 0 , x:0}
  }

  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <div className='w-[200px] h-[273px]'>
          <motion.div
           className={`w-[200px] rounded-2xl shadow-2xl flex flex-col items-center  bg-gray-700 border-gold-border border-4 `}
           onClick={(e) => handleClick(e, isFocused)}
           variants={variants}
           animate={isFocused ? 'focused' : 'unfocused'}
          >
            <Image src={src} alt={alt} className={className} width={200} height={300} />
            <h5 className="bg-gray-500 w-full text-center text-white">{heroName}</h5>
            <p className="bg-amber-600 w-full text-center">{herotype}</p>
          </motion.div>
      </div>


      {/* {isFocused &&(
        <motion.div
         className={"rounded-2xl shadow-2xl flex flex-col items-center mt-12 bg-gray-700 border-gold-border border-4 overflow-hidden "}

         animate={{scale:1,
          z:50,
          y:50
         }}

         onClick={(e) => handleClick(e, isFocused)}
        >
          <Image src={src} alt={alt} className={className} width={200} height={300} />
          <h5 className="bg-gray-500 w-full text-center text-white">{heroName}</h5>
          <p className="bg-amber-600 w-full text-center">{herotype}</p>
        </motion.div>
  )} */}


    </>
  );
};

export default Portrait;
