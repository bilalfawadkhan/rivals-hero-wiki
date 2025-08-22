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
  const [Card, setCard] = useState<number | null>(null);
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

//   const handleClick = (e: React.MouseEvent, index:number) => { // event handling for scaling the spell card
//     e.stopPropagation();
//     if(Card === index) {
//       setCard(null);
//     }
//     else {
//       const el = refs.current[index];
//       if(el){
//         offtop = el.offsetTop;
//         offsetLeft = el.offsetLeft;
//        const newPosition = {
//           top: 40,
//           left:16,
//           height: 'fit-content',
//           width: '90%',
//      }
//        positionRef.current = newPosition;
//        setPosition(newPosition);
//        setCard(index);
//     }
//   }
// }

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
<motion.div className={`absolute z-50 bg-black w-full h-full flex items-center justify-center ${activeId ? '' : 'hidden'}`}
  animate={{ opacity: activeId ? 0.8 : 0}}
  transition={{ duration: 0.3,delay: 0.1 }}
  >
    <div className=" relative rounded-lg p-4 w-[50%] 2xl:w-[90%] h-[600px] max-w-4xl bg-amber-300
    translate-x-25 md:translate-x-20 lg:translate-x-6"> 
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
    { hero_spells && Object.entries(hero_spells).map(([SpellId,spell],index) => {
      let newIndex = index + 1;
      return(
      <motion.button
      key={newIndex}
      layoutId={String(newIndex)}
      className="relative w-full h-28 rounded-xxl bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl"
      onClick={() => setCard(newIndex)} 
      >
      <h2 className="text-yellow-400 text-xl font-bold mb-1 ">🪐 {spell.name}</h2>
      <p className="text-blue-300 text-base mb-4">{spell.key ?? 'nill'}</p>
      <p className="text-gray-300 text-sm mb-6 text-left ">{spell.description}</p>
      </motion.button>
    );
    })}
    </div>

<AnimatePresence>
{Card && (
  <>
 <motion.div
  key="backdrop"
  className="fixed inset-0 z-40"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  onClick={() => setCard(null)}
  style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
/>

<motion.div
layoutId={String(Card)}
className="fixed z-50 w-[100%] h-full xl:w-[80%] m-auto sm:inset-10 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl overflow-hidden"
onClick={(e) => e.stopPropagation()}
>
  <motion.div className="relative h-full w-full">
    <SpellTable spell={spellState[Card-1]}/>
    {/* <div className="h-full w-full bg-amber-800">

    </div> */}
      {/* <AnimatePresence>
        <motion.div
        initial={{x:400 , opacity:0}}
        animate={{x:0 , opacity:1}}
        exit={{x:400, opacity:0}}
        transition={{duration:0.25}}
          className="absolute top-0 right-0 p-6 sm:w-[42%] bg-gray-400 h-full w-full"
          >
        </motion.div>
      </AnimatePresence> */}
  </motion.div>
</motion.div>
</>
)
}
</AnimatePresence>
</div>
</motion.div> {/*Absolute div */}


      <div className="grid grid-cols-11 h-full mt-8">
        {/* {heroNames && heroNames.map((hero, index) => (
          <Portrait key={index} src=`/hero-prestige-images/{hero.name}_prestige` alt="hero.name" heroName={hero.name} herotype={hero.type} 
      isActive ={activeId == index + 1 } activeId={activeId} setActiveId = {setActiveId} compID ={index + 1} />
        ))} */}
         <Portrait src="/hero-prestige-images/adam-warlock_prestige.png" alt="My Portrait" heroName="PSYLOCKE" herotype="Strategist" 
      isActive ={activeId == 1 } activeId={activeId} setActiveId = {setActiveId} compID ={1} setSelectedCard = {setCard} />
          <Portrait src="/jeff.webp" alt="My Portrait" heroName="PSYLOCKE" herotype="STRATEGIST" 
     isActive ={activeId == 2 } activeId={activeId}  setActiveId = {setActiveId}  compID ={2} setSelectedCard = {setCard} />
      </div>
      </>
    );
}

