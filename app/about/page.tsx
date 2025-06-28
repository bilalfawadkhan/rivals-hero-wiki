'use client';

import { useEffect, useState } from "react";


export default function AboutPage() {

  type spells = {
   key: string;
   img : string;
   name : string
   description: string;
   attributes: {label: string; value: string}[];
    
  }
const [hero_spells, setHeroSpells]  = useState <{[key: string] : spells} | null>();

    useEffect(() => {
        fetch('/api/hero_spells/Adam_Warlock')
        .then(response => response.json())
          .then(data => {
              console.log(data);
              setHeroSpells(data);
          })
    },[]);
    // console.log("Render hero_spells:", hero_spells);

    useEffect(() => {
      if (hero_spells) {
        console.log("Updated hero_spells:", hero_spells);
      }
    }, [hero_spells]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <p>
    {hero_spells && Object.entries(hero_spells).map(([key,val]) => (
      <span key={key} className="block mt-2">
        {val.name}
      </span>
    ))}
      </p>
    </div>
  );
}