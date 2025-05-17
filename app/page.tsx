import Image from "next/image";
import Portrait from "./components/Portrait";

export default function Home() {
  return (
    <div >
<Portrait src="/jeff.webp" alt="My Portrait" heroName="Psylocke" herotype="Assassin" />
    </div>
  );
}
