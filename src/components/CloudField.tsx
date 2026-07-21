import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard } from "@react-three/drei";
import type { Group } from "three";
import { getCloudTexture } from "./cloudTexture";

type CloudConfig = {
  position: [number, number, number];
  scale: number;
  opacity: number;
  driftRange: number;
  driftSpeed: number;
};

const clouds: CloudConfig[] = [
  { position: [-4.5, 1.6, -3], scale: 3.2, opacity: 0.28, driftRange: 0.4, driftSpeed: 0.06 },
  { position: [4.2, -1.2, -4], scale: 3.6, opacity: 0.24, driftRange: 0.5, driftSpeed: 0.05 },
  { position: [-3, -2, -6], scale: 4.2, opacity: 0.18, driftRange: 0.6, driftSpeed: 0.04 },
  { position: [3.5, 2.1, -5], scale: 2.8, opacity: 0.22, driftRange: 0.35, driftSpeed: 0.07 },
  { position: [0, -2.6, -7], scale: 5, opacity: 0.16, driftRange: 0.5, driftSpeed: 0.035 },
  { position: [-5.5, -0.3, -5], scale: 3, opacity: 0.2, driftRange: 0.4, driftSpeed: 0.055 },
];

function CloudSprite({ position, scale, opacity, driftRange, driftSpeed }: CloudConfig) {
  const ref = useRef<Group>(null);
  const texture = getCloudTexture();
  const baseX = position[0];

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.x = baseX + Math.sin(t * driftSpeed) * driftRange;
  });

  return (
    <Billboard ref={ref} position={position}>
      <mesh scale={scale}>
        <planeGeometry args={[1, 0.6]} />
        <meshBasicMaterial map={texture} transparent opacity={opacity} depthWrite={false} />
      </mesh>
    </Billboard>
  );
}

export function CloudField() {
  return (
    <>
      {clouds.map((c, i) => (
        <CloudSprite key={i} {...c} />
      ))}
    </>
  );
}
