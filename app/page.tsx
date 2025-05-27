'use client';
import Image from "next/image";
import Portrait from "./components/Portrait";
import { useState } from "react";

export default function Home() {

  const [isFocused, setFocus] = useState(false);

  return (
<>
      <div className='w-full h-12 bg-cyan-900 flex items-center'>
      <h1 className="text-white ">Marvel Rivals Hero Wiki</h1>

    </div>
    <div className="grid grid-cols-11 h-full mt-8">
       <Portrait src="/jeff.webp" alt="My Portrait" heroName="PSYLOCKE" herotype="Strategist" isFocused={isFocused}
  setFocus={setFocus} />
        <Portrait src="/jeff.webp" alt="My Portrait" heroName="PSYLOCKE" herotype="STRATEGIST" isFocused={isFocused}
  setFocus={setFocus}/>

    </div>
    </>
  );
}
