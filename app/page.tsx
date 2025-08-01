'use client';
import Portrait from "@/components/Portrait";
import SpellTable from "@/components/SpellTable";
import { Button } from "@/components/ui/button"
import { useState , useRef, useEffect } from "react";
import { AnimatePresence, motion} from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Home() {

  const [buffsBorder, setBuffsBorder] = useState<string[]>(['rgb(107 114 128)','rgba(170, 255, 0, 1)', 'rgba(199, 0, 57, 1)']); // Temp Border Colors
  const [activeId, setActiveId] = useState<number | null>(null)
  const id :number = 1;
  const [scaledIndex, setScaledIndex] = useState<number | null>(null);
  const refs = useRef<Array<HTMLDivElement | null>>([]);
  let offtop:number | undefined = 0;
  let offsetLeft:number | undefined  = 0 ;
  const [season, SetSeason] = useState('S1');
  const [position, setPosition] = useState<{
  top: number | string;
  left: number | string;
  height: number | string;
  width: number | string;
  }>({ top: 0, left: 0, height: 0, width: 0 });
  const positionRef = useRef(position)

  const handleClick = (e: React.MouseEvent, index:number) => { // event handling for scaling the spell card
    e.stopPropagation();
    if(scaledIndex === index) {
      setScaledIndex(null);
    }
    else {
      const el = refs.current[index];
      if(el){
        offtop = el.offsetTop;
        offsetLeft = el.offsetLeft;
       const newPosition = {
          top: 40,
          left:16,
          height: 'fit-content',
          width: '90%',
     }
       positionRef.current = newPosition;
       setPosition(newPosition);
       setScaledIndex(index);
    }
  }
}

{/* ----Fetching datqa from API for Hero Spells-----*/}
type spells = {
  key: string;
  img : string;
  name : string
  description: string;
  attributes: {label: string; value: string}[];   
 }

const [hero_spells, setHeroSpells]  = useState <{[key: string] : spells} | null>();


   useEffect(() => {
    if (!season) return; // Ensure season is defined before fetching
       fetch(`/api/hero_spells/${season}/Adam_Warlock`)
       .then(response => response.json())
         .then(data => {
             console.log(data);
             setHeroSpells(data);
         })
   },[season]);

{/* -----END-----*/}

{/*--------Loading hero Names-------*/}
 type hero ={
  name: string;
  type: string;
 };

const [heroNames, setHeroNames] = useState<hero[]>();

useEffect(() =>{
  fetch('/api/hero_names')
  .then(response => response.json())
  .then(data => {
    setHeroNames(data.heroes);
    })},[])

{/* -----END-----*/}


    return (
  <>
  {/* Header Start*/}
    <div
    className="relative w-full h-12 flex items-center border-b-4 border-gold-border"
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
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Select Patch</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={season} onValueChange={SetSeason}>
          <DropdownMenuRadioItem value="S0">Season 0</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="S1">Season 1</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="S2">Season 2</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="S3">Season 3</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
   {/* Header end*/}

    <motion.div className={`absolute z-50 bg-black w-full h-full flex items-center justify-center ${activeId ? '' : 'hidden'}`}
        animate={{ opacity: activeId ? 0.8 : 0}}
        transition={{ duration: 0.3,delay: 0.1 }}
        >
    <div className=" relative rounded-lg p-4 w-[90%] h-[600px] max-w-4xl mt-7">
      {/* Top Section */} 
        {/* Abilities Grid */}
      <div className=" flex flex-wrap gap-y-36 h-64 mt-10 justify-between">
        {hero_spells && Object.entries(hero_spells).map(([key,spell], i) => (
           <div key={i}  className="w-[45%] h-fit" ref = {(el) =>{ refs.current[i] = el}}>
            <motion.div 
              className={`flex absolute w-[45%] h-28 bg-[#D9C9CF] rounded-xl overflow-hidden ${scaledIndex === i ? 'z-50' : 'z-10'} shadow-lg cursor-pointer `}
              style={{ border: `2px solid ${buffsBorder[0]}` }}
              onClick={(e) => {   
              handleClick(e, i);
              console.log(`top = ${positionRef.current.top}, left = ${positionRef.current.left}, height = ${positionRef.current.height}, width = ${positionRef.current.width}`);
            }}
              animate={
              scaledIndex == i ? {
                top: positionRef.current.top,
                left: positionRef.current.left,
                width: positionRef.current.width,
                height: positionRef.current.height,
              }:{}
              }
              transition={{duration:0.2}}
            >  
              <div className=" w-full relative bg-blue-900">
                 <SpellTable spell={spell} />
                  <AnimatePresence>
                  {scaledIndex === i && (
                     <motion.div className="absolute bottom-0 right-0 h-full bg-gray-800 rounded-b-xl"
                     initial={{ width: '0%'}}
                     animate={{ width: '42%'}}
                     exit={{ width: '0%' , transition: { duration:0.2 } }}
                     transition={{ duration: 0.2 }}
                     style={{transformOrigin:'right'}}
                     >
                    <div className="relative h-1/2 w-full bg-amber-700">
                    <p className="text-white text-sm p-1">Hero Update Changes</p>
                    </div>
                    <div className=" relative h-1/2 w-full bg-green-600">
                    <p className="text-white text-sm p-1">Hero Prestige Changes</p>
                    </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
              </div>
                ))}
              </div>
            </div>
        </motion.div>
      <div className="grid grid-cols-11 h-full mt-8">
        {/* {heroNames && heroNames.map((hero, index) => (
          <Portrait key={index} src=`/hero-prestige-images/{hero.name}_prestige` alt="hero.name" heroName={hero.name} herotype={hero.type} 
      isActive ={activeId == index + 1 } activeId={activeId} setActiveId = {setActiveId} compID ={index + 1} />
        ))} */}
         <Portrait src="/hero-prestige-images/adam-warlock_prestige.png" alt="My Portrait" heroName="PSYLOCKE" herotype="Strategist" 
      isActive ={activeId == 1 } activeId={activeId} setActiveId = {setActiveId} compID ={1} />
          <Portrait src="/jeff.webp" alt="My Portrait" heroName="PSYLOCKE" herotype="STRATEGIST" 
     isActive ={activeId == 2 } activeId={activeId}  setActiveId = {setActiveId}  compID ={2}/>
      </div>
      </>
    );
}

