import Image from "next/image";
import Portrait from "./components/Portrait";

export default function Home() {
  return (
    <div className="grid grid-cols-10 h-full">
       <Portrait src="/jeff.webp" alt="My Portrait" heroName="Psylocke" herotype="Assassin" />
        <Portrait src="/jeff.webp" alt="My Portrait" heroName="Psylocke" herotype="Assassin" />

    </div>
  );
}
