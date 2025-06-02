'use client';
import Portrait from "./components/Portrait";
import { useState , useRef, useLayoutEffect } from "react";
import {animate, motion, scale} from "framer-motion";
import { off } from "process";

export default function Home() {


  const [activeId, setActiveId] = useState<number | null>(null)
  const id :number = 1;
  const [scaledIndex, setScaledIndex] = useState<number | null>(null);
  const refs = useRef<Array<HTMLDivElement | null>>([]);
  let offtop:number | undefined = 0;
  let offsetLeft:number | undefined  = 0 ;
  const [position, setPosition] = useState({
top: 0,
left: 0,
height: 0,
width: 0,
  });

useLayoutEffect(() => {
  if (scaledIndex !== null && refs.current[scaledIndex]) {
    const el = refs.current[scaledIndex];
    const rect = el.getBoundingClientRect();
    offtop = el.offsetTop;
    offsetLeft = el.offsetLeft;
    console.log('first Click')
    console.log('topOff = ', offtop);
    console.log('leftOff = ', offsetLeft);
    console.log(el)
    setPosition({
      top: offtop - 100,
      left:offsetLeft,
      height: 99,
      width: 99,
    });
  }
}, [scaledIndex]);


  return (
<>

{/* Header Start*/}

    <div
  className="w-full h-12 flex items-center border-b-4 border-gold-border overflow-hidden"
  style={{ backgroundColor: 'rgba(255, 207, 64, 0.5)' }}
>
  <div className="relative w-52 h-12 ">
    {/* Tilted grey background */}
   <div
      className="absolute top-0 left-0 w-full h-full bg-gray-700"
      style={{ transform: 'skew(-15deg)' }}
    />
    {/* Text container */}
    <h1 className="relative z-10 h-12 flex items-center justify-center text-white font-bold">
      Marvel Rivals Hero Wiki
    </h1>
  </div>
</div>
 {/* Header end*/}

  <motion.div className={`absolute z-50 bg-black w-full h-full flex items-center justify-center ${activeId ? '' : 'hidden'}`}
  animate={{ opacity: activeId ? 0.8 : 0}}
  transition={{ duration: 0.3,delay: 0.1 }}
  >
  <div className=" relative rounded-lg p-4 w-[90%] h-[500px] max-w-4xl -mt-7">
    {/* Top Section */}
    <div className="flex items-center gap-4 mt-6 mb-6 bg-gray-600 rounded-lg overflow-hidden">
      <div className="w-24 h-24 bg-[#FBF8F4] border-2 border-[#D6D9F2] rounded-lg "></div>
      <h2 className="text-3xl font-semibold">Hero Attack</h2>
    </div>

    {/* Abilities Grid */}
    <div className=" flex flex-wrap gap-4 h-64 mt-10 justify-between ">
      {[...Array(6)].map((_, i) => (
    <div  key={i}  className="w-[45%]" ref = {(el) =>{ refs.current[i] = el}}>
          <motion.div 
          className={`flex absolute w-[45%] bg-[#D9C9CF] rounded-xl overflow-hidden ${scaledIndex === i ? 'z-50' : 'z-10'} shadow-lg cursor-pointer`}
          onClick={() => {
          setScaledIndex(scaledIndex === i ? null : i)
          }}
            animate={{
              top: scaledIndex === i ? `${ position.top}px` : '',
              left: scaledIndex === i ? `${ position.left}px` : '',
              width: scaledIndex === i ? '99%' : '',
              height: scaledIndex === i ? '90%' : '',
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20}}
          >
            <div className="bg-[#D6D9F2] text-white w-[20%] h-16 px-4 py-2 flex items-center justify-center font-bold">Q</div>
            <div className="p-3  h-16 font-medium">
              Karmic Revival
            </div>
            <div className="w-[55%] h-16 bg-gray-500 flex items-center justify-center">
              <img/>
              </div>
              {/* <div className="absolute translate-x-[-30%]">
              <p>Name</p>
              <p>Description</p>
              <p>Cost</p>
              <p>Type</p>
              <p>Range</p>
              <p>Target</p>
              <p>Effect</p>
                </div> */}
          </motion.div>
    </div>
      ))}
    </div>
  </div>
</motion.div>

    <div className="grid grid-cols-11 h-full mt-8">
       <Portrait src="/jeff.webp" alt="My Portrait" heroName="PSYLOCKE" herotype="Strategist" 
    isActive ={activeId == 1 } activeId={activeId} setActiveId = {setActiveId} compID ={1} />
        <Portrait src="/jeff.webp" alt="My Portrait" heroName="PSYLOCKE" herotype="STRATEGIST" 
   isActive ={activeId == 2 } activeId={activeId}  setActiveId = {setActiveId}  compID ={2}/>

    </div>
    </>
  );
}
