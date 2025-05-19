import Image from "next/image";
import Portrait from "./components/Portrait";

export default function Home() {
  return (
    <div >
      
<div
className="grid grid-cols-12"
>
  <Portrait src="/jeff.webp" alt="My Portrait" heroName="Psylocke" herotype="Assassin" />
  {/* <Portrait src="/jeff.webp" alt="My Portrait" heroName="jeff" herotype="Assassin" /> */}
</div>
    </div>
  );
}
