import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PlaneModel } from "./PlaneModel";
import { CloudField } from "./CloudField";
import { Runway } from "./Runway";

export function Hero3DScene() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]">
      <Canvas
        camera={{ position: [0, 0.6, 8], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "low-power" }}
        style={{ pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[4, 5, 4]} intensity={1.6} color="#ffffff" />
          <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#2f5fc4" />
          <Runway />
          <PlaneModel />
          <CloudField />
        </Suspense>
      </Canvas>
    </div>
  );
}
