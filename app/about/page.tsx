'use client';

import { useEffect, useState } from "react";


export default function AboutPage() {
{/*Loading hero Names*/}
 type hero ={
  hero_name: string;
 };


const [heroNames, setHeroNames] = useState<hero[]>([]);

useEffect(() =>{

  fetch('/api/hero_names')
  .then(response => response.json())
  .then(data => {
    console.log(data.heroes);
    setHeroNames(data.heroes);
  })

},[])

useEffect(() => {
  console.log(heroNames)

},[heroNames]);


{/* END*/}
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <ul>
  {heroNames.map((hero,index) => (
    <li key={index} className="text-lg font-semibold text-gray-800">
      {hero.hero_name}
    </li>
  ))}
  </ul>
    </div>
  );
}