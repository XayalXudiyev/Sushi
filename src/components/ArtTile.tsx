import type { CSSProperties } from "react";
import type { Art } from "@/data/menu";
import SushiArt from "./SushiArt";

export default function ArtTile({ art, className = "", artClassName = "" }: { art: Art; className?: string; artClassName?: string }) {
  const style = { "--fish": art.fish, "--tile": art.bg } as CSSProperties;
  return (
    <div className={`art-bg relative overflow-hidden ${className}`} style={style}>
      <SushiArt art={art} className={`h-full w-full ${artClassName}`} />
    </div>
  );
}
