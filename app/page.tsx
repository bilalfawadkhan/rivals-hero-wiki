import Image from "next/image";
import Portrait from "./components/Portrait";

export default function Home() {
  return (
<>
      <div className='relative z-40 bg-black opacity-40'>


    </div>
    <div className="grid grid-cols-11 h-full">
       <Portrait src="/jeff.webp" alt="My Portrait" heroName="Psylocke" herotype="Assassin" />
        <Portrait src="/jeff.webp" alt="My Portrait" heroName="Psylocke" herotype="Assassin" />

    </div>
    </>
  );
}
