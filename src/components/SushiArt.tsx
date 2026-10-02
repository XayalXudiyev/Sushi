import { useId } from "react";
import type { Art } from "@/data/menu";

/**
 * Mock product illustrations drawn in SVG, so the demo needs no real photos.
 * Swap for <Image> once real photography exists.
 */

const RICE = "#fbf7ee";
const RICE_SHADE = "#e9e1cf";
const NORI = "#1b2620";

function RollPiece({ cx, cy, r, fish, accent }: { cx: number; cy: number; r: number; fish: string; accent: string }) {
  const seeds = [
    [-0.55, -0.55, 18],
    [0.6, -0.4, -30],
    [-0.7, 0.35, 60],
    [0.45, 0.65, 10],
    [0.05, -0.82, 80],
    [0.82, 0.18, -60],
    [-0.25, 0.82, 40],
  ];
  return (
    <g>
      <ellipse cx={cx} cy={cy + r * 0.9} rx={r * 0.95} ry={r * 0.22} fill="#000" opacity={0.35} />
      <circle cx={cx} cy={cy} r={r} fill={RICE} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={RICE_SHADE} strokeWidth={r * 0.08} />
      {seeds.map(([x, y, rot], i) => (
        <ellipse
          key={i}
          cx={cx + x * r}
          cy={cy + y * r}
          rx={r * 0.06}
          ry={r * 0.035}
          fill={i % 3 === 0 ? "#2a2522" : "#d9c9a3"}
          transform={`rotate(${rot} ${cx + x * r} ${cy + y * r})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={r * 0.62} fill={NORI} />
      <circle cx={cx} cy={cy} r={r * 0.54} fill={RICE} />
      <circle cx={cx - r * 0.12} cy={cy - r * 0.06} r={r * 0.26} fill={fish} />
      <circle cx={cx + r * 0.2} cy={cy + r * 0.16} r={r * 0.16} fill={accent} />
      <circle cx={cx - r * 0.18} cy={cy - r * 0.14} r={r * 0.07} fill="#fff" opacity={0.35} />
    </g>
  );
}

function Nigiri({ fish, accent, clipId, transform }: { fish: string; accent: string; clipId: string; transform?: string }) {
  const fishPath = "M28 116 C 40 70, 150 62, 174 100 C 168 120, 60 132, 28 116 Z";
  return (
    <g transform={transform}>
      <ellipse cx={100} cy={152} rx={70} ry={10} fill="#000" opacity={0.35} />
      <rect x={42} y={104} width={116} height={46} rx={23} fill={RICE} />
      <rect x={42} y={130} width={116} height={20} rx={10} fill={RICE_SHADE} opacity={0.6} />
      <clipPath id={clipId}>
        <path d={fishPath} />
      </clipPath>
      <path d={fishPath} fill={fish} />
      <g clipPath={`url(#${clipId})`} stroke={accent} strokeWidth={5} opacity={0.55} fill="none">
        <path d="M50 70 C 60 100, 55 120, 48 140" />
        <path d="M80 60 C 92 95, 88 120, 80 140" />
        <path d="M112 58 C 124 92, 120 120, 112 140" />
        <path d="M144 62 C 154 92, 150 118, 144 140" />
      </g>
      <path d="M50 96 C 80 76, 130 72, 160 90" stroke="#fff" strokeWidth={4} strokeLinecap="round" opacity={0.25} fill="none" />
    </g>
  );
}

export default function SushiArt({ art, className }: { art: Art; className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const { kind, fish, accent } = art;

  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-hidden="true">
      {kind === "roll" && (
        <>
          <RollPiece cx={100} cy={70} r={36} fish={fish} accent={accent} />
          <RollPiece cx={64} cy={124} r={36} fish={fish} accent={accent} />
          <RollPiece cx={136} cy={124} r={36} fish={fish} accent={accent} />
        </>
      )}

      {kind === "nigiri" && <Nigiri fish={fish} accent={accent} clipId={`n${uid}`} transform="translate(0 6)" />}

      {kind === "sashimi" && (
        <g>
          <ellipse cx={100} cy={160} rx={74} ry={12} fill="#000" opacity={0.35} />
          <path d="M40 150 C 50 60, 90 40, 120 52 C 70 70, 60 120, 64 152 Z" fill="#4f8a3a" />
          <path d="M44 148 C 54 90, 80 62, 112 54" stroke="#7cbf5c" strokeWidth={3} fill="none" />
          <g stroke="#f1ede4" strokeWidth={3} strokeLinecap="round">
            {Array.from({ length: 14 }, (_, i) => (
              <line key={i} x1={60 + i * 7} y1={156} x2={66 + i * 7} y2={134 + (i % 3) * 4} />
            ))}
          </g>
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${62 + i * 24} ${66 + i * 4}) rotate(${-18 + i * 4})`}>
              <rect width={36} height={84} rx={12} fill={i % 2 && art.alt ? art.alt : fish} />
              <path d="M8 10 C 14 30, 12 56, 8 76" stroke="#fff" strokeWidth={3} opacity={0.35} fill="none" />
              <path d="M22 8 C 28 30, 26 56, 22 78" stroke="#fff" strokeWidth={3} opacity={0.25} fill="none" />
            </g>
          ))}
        </g>
      )}

      {kind === "gunkan" && (
        <g>
          <ellipse cx={100} cy={160} rx={56} ry={10} fill="#000" opacity={0.4} />
          <rect x={52} y={86} width={96} height={72} rx={14} fill={NORI} />
          <rect x={60} y={92} width={10} height={60} rx={5} fill="#fff" opacity={0.08} />
          <path d="M52 92 C 60 40, 140 40, 148 92 Z" fill={fish} />
          {Array.from({ length: 26 }, (_, i) => {
            const a = (i / 26) * Math.PI;
            const ring = (i % 3) + 1;
            const x = 100 + Math.cos(a) * (14 * ring + 2);
            const y = 90 - Math.sin(a) * (11 * ring);
            return <circle key={i} cx={x} cy={y} r={4.2} fill={accent} opacity={0.85} />;
          })}
          <ellipse cx={86} cy={66} rx={10} ry={4} fill="#fff" opacity={0.3} />
        </g>
      )}

      {kind === "set" && (
        <g>
          <ellipse cx={100} cy={170} rx={88} ry={10} fill="#000" opacity={0.4} />
          <rect x={14} y={60} width={172} height={104} rx={14} fill="#a8713f" />
          <rect x={14} y={60} width={172} height={104} rx={14} fill="none" stroke="#7a4f2a" strokeWidth={3} />
          <g stroke="#8f5e33" strokeWidth={2} opacity={0.6}>
            <line x1={24} y1={84} x2={176} y2={84} />
            <line x1={24} y1={118} x2={176} y2={118} />
            <line x1={24} y1={148} x2={176} y2={148} />
          </g>
          <RollPiece cx={44} cy={88} r={20} fish={fish} accent={accent} />
          <RollPiece cx={86} cy={88} r={20} fish={fish} accent={accent} />
          <RollPiece cx={128} cy={88} r={20} fish={accent} accent={fish} />
          <RollPiece cx={168} cy={88} r={14} fish="#3fbf5a" accent="#3fbf5a" />
          <Nigiri fish={fish} accent="#ffd2bd" clipId={`s1${uid}`} transform="translate(18 82) scale(0.42)" />
          <Nigiri fish="#e5484d" accent="#ff9aa0" clipId={`s2${uid}`} transform="translate(72 82) scale(0.42)" />
          <Nigiri fish="#8a5a3c" accent="#c08a5c" clipId={`s3${uid}`} transform="translate(126 82) scale(0.42)" />
        </g>
      )}

      {kind === "drink" && (
        <g>
          <ellipse cx={100} cy={170} rx={44} ry={8} fill="#000" opacity={0.4} />
          <clipPath id={`d${uid}`}>
            <path d="M62 48 L138 48 L128 162 Q100 172 72 162 Z" />
          </clipPath>
          <g clipPath={`url(#d${uid})`}>
            <rect x={50} y={76} width={100} height={100} fill={fish} />
            <rect x={50} y={76} width={100} height={8} fill={accent} opacity={0.6} />
            <rect x={78} y={92} width={22} height={22} rx={5} fill="#fff" opacity={0.3} transform="rotate(12 89 103)" />
            <rect x={102} y={112} width={20} height={20} rx={5} fill="#fff" opacity={0.25} transform="rotate(-10 112 122)" />
          </g>
          <path d="M62 48 L138 48 L128 162 Q100 172 72 162 Z" fill="#fff" opacity={0.07} stroke="#fff" strokeOpacity={0.45} strokeWidth={3} />
          <rect x={112} y={24} width={7} height={86} rx={3.5} fill={accent} transform="rotate(16 115 60)" />
          <path d="M70 58 L74 150" stroke="#fff" strokeWidth={4} strokeLinecap="round" opacity={0.25} />
        </g>
      )}
    </svg>
  );
}
