import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

const petalPositions = [
  { side: "left" as const, top: 15 },
  { side: "right" as const, top: 25 },
  { side: "left" as const, top: 40 },
  { side: "right" as const, top: 55 },
  { side: "left" as const, top: 70 },
  { side: "right" as const, top: 80 },
];

const Flower = ({ x, y, scale, rotation }: { x: number; y: number; scale: number; rotation: number }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    className="absolute pointer-events-none"
    style={{ left: x, top: y, transform: `scale(${scale}) rotate(${rotation}deg)` }}
  >
    {[0, 72, 144, 216, 288].map((angle) => (
      <ellipse
        key={angle}
        cx="20"
        cy="10"
        rx="6"
        ry="10"
        fill="hsl(25 30% 70% / 0.35)"
        transform={`rotate(${angle} 20 20)`}
      />
    ))}
    <circle cx="20" cy="20" r="4" fill="hsl(32 55% 48% / 0.5)" />
  </svg>
);

const FloatingFlowers = () => {
  const { scrollY } = useScroll();
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    return scrollY.on("change", (v) => setScroll(v));
  }, [scrollY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petalPositions.map((pos, i) => {
        const progress = scroll * 0.15;
        const yOffset = (progress + i * 120) % (window.innerHeight + 200) - 100;
        const xBase = pos.side === "left" ? 10 + (i % 3) * 15 : window.innerWidth - 50 - (i % 3) * 15;
        const sway = Math.sin((scroll * 0.003) + i * 1.5) * 20;

        return (
          <Flower
            key={i}
            x={xBase + sway}
            y={yOffset}
            scale={0.6 + (i % 3) * 0.25}
            rotation={(scroll * 0.05 + i * 45) % 360}
          />
        );
      })}
    </div>
  );
};

export default FloatingFlowers;
