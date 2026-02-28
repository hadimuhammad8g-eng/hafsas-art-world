import { useEffect, useState, useMemo } from "react";
import { motion, useScroll } from "framer-motion";

interface PetalConfig {
  side: "left" | "right";
  top: number;
  size: number;
  speed: number;
  swayAmount: number;
  opacity: number;
}

const petalConfigs: PetalConfig[] = [
  { side: "left", top: 10, size: 32, speed: 0.12, swayAmount: 25, opacity: 0.3 },
  { side: "right", top: 20, size: 28, speed: 0.09, swayAmount: 18, opacity: 0.25 },
  { side: "left", top: 35, size: 36, speed: 0.14, swayAmount: 30, opacity: 0.2 },
  { side: "right", top: 50, size: 24, speed: 0.1, swayAmount: 15, opacity: 0.35 },
  { side: "left", top: 65, size: 30, speed: 0.11, swayAmount: 22, opacity: 0.28 },
  { side: "right", top: 75, size: 26, speed: 0.08, swayAmount: 20, opacity: 0.22 },
  { side: "left", top: 85, size: 34, speed: 0.13, swayAmount: 28, opacity: 0.18 },
  { side: "right", top: 90, size: 22, speed: 0.07, swayAmount: 12, opacity: 0.3 },
];

const Flower = ({ size, opacity }: { size: number; opacity: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" className="pointer-events-none">
    {[0, 72, 144, 216, 288].map((angle) => (
      <ellipse
        key={angle}
        cx="20"
        cy="10"
        rx="6"
        ry="10"
        fill={`hsl(25 30% 70% / ${opacity})`}
        transform={`rotate(${angle} 20 20)`}
      />
    ))}
    <circle cx="20" cy="20" r="4" fill={`hsl(32 55% 48% / ${opacity + 0.15})`} />
  </svg>
);

const FloatingFlowers = () => {
  const { scrollY } = useScroll();
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    return scrollY.on("change", (v) => setScroll(v));
  }, [scrollY]);

  const flowers = useMemo(() => petalConfigs, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {flowers.map((config, i) => {
        const yOffset = Math.sin(scroll * 0.001 * config.speed * 10 + i) * 30 + config.top * window.innerHeight / 100;
        const xBase = config.side === "left"
          ? 5 + (i % 3) * 12
          : window.innerWidth - config.size - 5 - (i % 3) * 12;
        const sway = Math.sin(scroll * 0.002 + i * 1.8) * config.swayAmount;
        const rotation = Math.sin(scroll * 0.001 + i * 2) * 30;

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: xBase + sway,
              top: yOffset,
              transform: `rotate(${rotation}deg)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.2, duration: 1 }}
          >
            <Flower size={config.size} opacity={config.opacity} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingFlowers;
