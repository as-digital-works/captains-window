import { motion } from "framer-motion";

const clouds = [
  { top: "12%", left: "6%", size: 220, opacity: 0.35, duration: 26 },
  { top: "62%", left: "2%", size: 260, opacity: 0.3, duration: 32 },
  { top: "8%", left: "78%", size: 240, opacity: 0.3, duration: 28 },
  { top: "68%", left: "80%", size: 200, opacity: 0.25, duration: 24 },
];

const stars = Array.from({ length: 40 }).map((_, i) => {
  const seeded = Math.sin(i * 12.9898) * 43758.5453;
  const rand = seeded - Math.floor(seeded);
  const rand2 = Math.abs(Math.sin(i * 78.233)) % 1;
  return {
    top: `${(rand * 90).toFixed(1)}%`,
    left: `${(rand2 * 100).toFixed(1)}%`,
    size: 1 + (i % 3),
    delay: (i % 8) * 0.4,
  };
});

export function SkyLayer({ showClouds = true }: { showClouds?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
          animate={{ opacity: [0.15, 0.8, 0.15] }}
          transition={{ duration: 3, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
        />
      ))}

      {showClouds &&
        clouds.map((c, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 blur-3xl"
            style={{ top: c.top, left: c.left, width: c.size, height: c.size * 0.6, opacity: c.opacity }}
            animate={{ x: [0, 24, 0] }}
            transition={{ duration: c.duration, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
    </div>
  );
}
