'use client';
import Image from "next/image";
import Portrait from "./components/Portrait";
import { useState } from "react";

export default function Home() {


  const [activeId, setActiveId] = useState<number | null>(null)
  const id :number = 1;

  return (
<>
      <div className='w-full h-12 bg-cyan-900 flex items-center'>
      <h1 className="text-white ">Marvel Rivals Hero Wiki</h1>
    </div>
    <div className= {`bg-gray-500 absolute z-50 opacity-50 w-full h-full ${activeId? '' :'hidden'} `}>

    </div>
    <div className="grid grid-cols-11 h-full mt-8">
       <Portrait src="/jeff.webp" alt="My Portrait" heroName="PSYLOCKE" herotype="Strategist" 
    isActive ={activeId == 1 } activeId={activeId} setActiveId = {setActiveId} compID ={1} />
        <Portrait src="/jeff.webp" alt="My Portrait" heroName="PSYLOCKE" herotype="STRATEGIST" 
   isActive ={activeId == 2 } activeId={activeId}  setActiveId = {setActiveId}  compID ={2}/>

    </div>
    </>
  );
}
