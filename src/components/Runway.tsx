import * as THREE from "three";
import { getRunwayTexture } from "./runwayTexture";

// Sits below and behind the plane's resting pose, receding away into the
// scene so the aircraft reads as having just lifted off it rather than
// floating in empty space. The z rotation here is a pure heading spin of
// the flat ground plane (it doesn't tilt it), so it's set to match the
// plane's own yaw (-0.6 in PlaneModel.tsx) exactly — the runway's
// centreline runs parallel to the fuselage instead of at an unrelated angle.
const POSITION: [number, number, number] = [7.4, -2.5, -3.6];
const ROTATION: [number, number, number] = [-Math.PI / 2, 0, -0.85];
const SIZE: [number, number] = [4.2, 17];

// A large, plain dark-ground layer sitting just beneath the marked runway
// strip, same flat orientation. The marked strip is a fixed width, so at
// wide viewports or extreme angles its edges can fall short of the frame
// and reveal the sky/star background as a gap — this fill is oversized
// well past any reasonable viewport so that never happens, and its colour
// matches the hero's own background so the seam is invisible.
const FILL_POSITION: [number, number, number] = [7.4, -2.52, -3.6];
const FILL_SIZE: [number, number] = [40, 40];

export function Runway() {
  const texture = getRunwayTexture();

  return (
    <>
      <mesh position={FILL_POSITION} rotation={ROTATION}>
        <planeGeometry args={FILL_SIZE} />
        <meshBasicMaterial color="#0a0f1f" transparent opacity={0.92} depthWrite={false} />
      </mesh>
      <mesh position={POSITION} rotation={ROTATION}>
        <planeGeometry args={SIZE} />
        <meshBasicMaterial map={texture} transparent opacity={0.9} depthWrite={false} />
      </mesh>
    </>
  );
}
