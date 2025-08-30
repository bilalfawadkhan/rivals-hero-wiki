'use client';
import Portrait , {Portraithandle} from "@/components/Portrait";
import SpellTable from "@/components/SpellTable";
import { Button } from "@/components/ui/button"
import { useState , useRef, useEffect } from "react";
import { AnimatePresence, motion, rgba} from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import GradientButton from "@/components/GradientButton";

export default function Home() {

  const [buffsBorder, setBuffsBorder] = useState<string[]>(['rgb(107 114 128)','rgba(170, 255, 0, 1)', 'rgba(199, 0, 57, 1)']); // Temp Border Colors
  const [activeId, setActiveId] = useState<number | null>(null)
  const [CardIndex, setCardIndex] = useState<number | null>(null);
  const [spellState, setSpellState] = useState<spells[]>([])
  const [portraitLeft, setPortraitLeft] = useState<number>(0);
  const refs = useRef<Array<HTMLDivElement | null>>([]);
  let offtop:number | undefined = 0;
  let offsetLeft:number | undefined  = 0 ;
  const [season, SetSeason] = useState('Season3_5');
  const [position, setPosition] = useState<{
  top: number | string;
  left: number | string;
  height: number | string;
  width: number | string;
  }>({ top: 0, left: 0, height: 0, width: 0 });
  const positionRef = useRef(position)


const rplceKeyword = (key: String):String => {
  if(key === 'Right Click')
    return 'RMB'
  else if(key === 'Left Click')
    return 'LMB'
  else if(key === 'Passive')
    return 'PSV'
  else
  return key
}


const buffValue = (changeval: number , target:number) =>{
  if(changeval === 1){
    if(target === 1){// target 1 is for placeholder value , 0 is for color value
      return "Buff"
    }
    else return 'bg-green-600'  
 }

  else if(changeval === 2){
      if(target === 1){
        return 'DeBuff'
      }
      else return 'bg-red-600'
    }

  else{
        if(target === 1){
        return 'NC'
      }
      else return 'bg-gray-500'
    }
}

{/* ----Fetching datqa from API for Hero Spells-----*/}
type spells = {
  key: string;
  img : string;
  name : string
  description: string;
  change: number
  changeDescription: string;
  attributes: {label: string; value: string}[];   
 }

const [hero_spells, setHeroSpells]  = useState <{[key: string] : spells} | null>();

   useEffect(() => {
    if (!season) return; // Ensure season is defined before fetching
       fetch(`/api/hero_spells/${season}/Adam_Warlock`)
       .then(response => response.json())
         .then(data => {
            //  console.log(data);
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


useEffect(() => {
  if (hero_spells){
    const arr = Object.entries(hero_spells).map(([_,spell]) => spell)
    setSpellState(arr);
  }

},[hero_spells])

const portraitRef = useRef<Portraithandle>(null);




    return (
  <>
  {/* Header Start*/}
    <div
    className="relative w-full h-12 flex items-center border-b-4 border-gold-border overflow-hidden"
    style={{ backgroundColor: 'rgba(255, 207, 64, 0.5)' }}
  >
      <div className="relative w-44 md:w-52 h-12 ">
      {/* Tilted grey background */}
        <div
        className="absolute top-0 left-0 w-full h-full bg-gray-700"
        style={{ transform: 'skew(-15deg)' }}
      />
      {/* Text container */}
        <h1 className="relative text-[14px] md:text-base z-10 h-12 flex items-center justify-center text-white font-bold">
        Marvel Rivals Hero Wiki
      </h1>
    </div>
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <GradientButton className="m-4" label="Select Patch"/>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={season} onValueChange={SetSeason}>
          <DropdownMenuRadioItem value="Season0">Season 0</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Season1">Season 1</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Season1_5">Season 1.5</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Season2">Season 2</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Season2_5">Season 2.5</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Season3">Season 3</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Season3_5">Season 3.5</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
   {/* Header end*/}
<motion.div className={`fixed inset-0 z-50 w-full h-full  ${activeId ? '' : 'hidden'}`}
  animate={{ backgroundColor: activeId ? "rgba(0,0,0,0.8)" :"rgba(0,0,0,0)" }}
  transition={{ duration: 0.3,delay: 0.1 }}
  >
    <Button  onClick={() => portraitRef.current?.handleClickChild()}>Xlose</Button>
    <div className=" relative rounded-lg m-auto xl:mt-48 p-4 w-[60%] 2xl:w-[90%] h-full xl:h-[600px] max-w-4xl 
     md:translate-x-20 bg-amber-400"> 
      <motion.div 
      initial={{opacity: 0}}
      animate={{opacity:1}}
      transition={{duration:0.25}}
      exit={{opacity:0}}
      className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hero_spells && Object.entries(hero_spells).map(([SpellId,spell],index) => {
          let newIndex = index + 1;
          return(
          <motion.button
          key={newIndex}
          layoutId={String(newIndex)}
          className=" flex flex-col relative w-full h-24 xs:h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden"
          onClick={() => setCardIndex(newIndex)} 
          >
            <div className="flex flex-row">
              <p className=" text-white font-bold text-sm w-10 rounded-tl-2xl bg-yellow-600 2xl:text-base">{rplceKeyword(spell.key)?? 'null'}</p>
              <p className={`ml-auto rounded-l-md px-1 ${buffValue(spell.change,0)}`}>{buffValue(spell.change,1)}</p>
            </div>
            <h2 className=" text-yellow-400 text-[1rem] md:text-sm font-bold mt-1 pb-2 xl:text-xl "> {spell.name}</h2>
            <p className="text-gray-300 hidden xs:block text-[10px] text-left px-4 xl:text-sm 2xl:px-8 ">{spell.description}</p>
          </motion.button>
        );
        })}
      </motion.div>

      <AnimatePresence>
      {CardIndex && (
        <>
       <motion.div
        key="backdrop"
        className="fixed inset-0 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setCardIndex(null)}
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      />

        <motion.div
        layoutId={String(CardIndex)}
        className="fixed z-50 w-[60%] h-full md:w-[80%] m-auto inset-10 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900  overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        >
           <motion.div className="relative h-full w-full">
            <SpellTable spell={spellState[CardIndex-1]}/>
              <AnimatePresence>
              <motion.div
              initial={{x:400 , opacity:0}}
              animate={{x:0 , opacity:1}}
              exit={{x:400, opacity:0}}
              transition={{duration:0.25}}
              className="absolute top-0 right-0 p-6 w-[30%] xl:w-[34%] bg-gradient-to-br from-zinc-800 to-zinc-900 h-full w-ful hidden md:block"
              >
              <motion.button // Cross button
              whileHover={{ scale: 1.1, rotate: 90 , backgroundColor : '#A40D26' , color: 'white' }}
              whileTap={{ scale: 0.9 }}
              transition={{duration: 0.30}}
              onClick={() => setCardIndex(null)}
              className="flex items-center justify-center w-10 h-10 rounded-full ml-auto bg-gray-200 hover:bg-gray-300 text-gray-700 shadow-md"
              >
                {/* Cross (X) centered properly */}
                <span className="relative block w-5 h-5">
                <span className="absolute top-1/2 left-1/2 w-5 h-0.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current rounded"></span>
                <span className="absolute top-1/2 left-1/2 w-5 h-0.5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current rounded"></span>
                </span>
              </motion.button>
          {spellState[CardIndex-1].change === 1 ? (
            <ul role="list" className="text-white text-[12px] xl:text-sm p-3">
              <li className="list-disc list-inside">
                {spellState[CardIndex-1].changeDescription ?? 'Spell Updated in this Patch'}
              </li>
            </ul>
            ):
            (
              <p className="text-white text-[12px] xl:text-sm p-3">No Spell Changes</p>
            )} 
        </motion.div>
      </AnimatePresence>
  </motion.div>
</motion.div>
</>
)};
</AnimatePresence>
</div>
</motion.div> {/*Absolute div */}


      <div className="grid grid-cols-11 h-full mt-8">
        {/* {heroNames && heroNames.map((hero, index) => (
          <Portrait key={index} src=`/hero-prestige-images/{hero.name}_prestige` alt="hero.name" heroName={hero.name} herotype={hero.type} 
      isActive ={activeId == index + 1 } activeId={activeId} setActiveId = {setActiveId} compID ={index + 1} />
        ))} */}
         <Portrait src="/hero-prestige-images/adam-warlock_prestige.png" alt="My Portrait" heroName="PSYLOCKE" herotype="Strategist" 
          isActive ={activeId == 1 } activeId={activeId} setActiveId = {setActiveId} compID ={1} setSelectedCard = {setCardIndex} />
          <Portrait src="/jeff.webp" alt="My Portrait" heroName="PSYLOCKE" herotype="STRATEGIST" 
          isActive ={activeId == 2 } activeId={activeId}  setActiveId = {setActiveId}  compID ={2} setSelectedCard = {setCardIndex} ref={portraitRef} />
      </div>
      </>
    );
}

