import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF } from "@react-three/drei";
import type { Group, Mesh } from "three";
import * as THREE from "three";
import type { LocationEntry } from "../data/content";
import { useInViewport } from "../hooks/useInViewport";
import { useFacilityModal } from "../context/FacilityModalContext";

const EARTH_MODEL_URL = "/models/earth.glb";
const EARTH_RADIUS = 2;
// Derived by parsing this model's actual mesh (POSITION + TEXCOORD_0 accessors)
// and comparing each vertex's true 3D angle against the lat/lon its UV implies.
// Adjust both in the same way if a different earth.glb is swapped in.
const THETA_OFFSET = Math.PI / 2;
// This low-poly mesh's rings only extend to ~±78.75° geometrically (not all
// the way to the poles), so real-world latitude must be compressed by this
// factor (78.75/90) to land on the correct ring instead of overshooting toward the poles.
const LAT_SCALE = 0.875;

function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat * LAT_SCALE) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180) + THETA_OFFSET;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function Pin({ location }: { location: LocationEntry }) {
  const pos = latLonToVector3(location.lat, location.lon, EARTH_RADIUS + 0.03);
  const ref = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { open } = useFacilityModal();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * 3 + location.lat) * 0.15;
    ref.current.scale.setScalar(hovered ? pulse * 1.6 : pulse);
  });

  return (
    <group position={pos}>
      {/* invisible larger hit target so the pin is easy to hover/click */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          open(location);
        }}
      >
        <sphereGeometry args={[0.14, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh ref={ref}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial
          color="#d31627"
          emissive="#d31627"
          emissiveIntensity={hovered ? 1.4 : 0.8}
        />
      </mesh>
      {hovered && (
        <Html distanceFactor={8} occlude>
          <div className="pointer-events-none whitespace-nowrap rounded-md bg-navy-950/90 border border-red-500/30 px-2 py-1 text-[10px] text-white -translate-y-6">
            {location.name}
          </div>
        </Html>
      )}
    </group>
  );
}

function EarthMesh() {
  const { scene } = useGLTF(EARTH_MODEL_URL);

  const model = useMemo(() => {
    const clone = scene.clone(true);

    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    // use the box's face-to-face extent (not the corner-to-corner bounding
    // sphere, which overestimates a spherical mesh's radius by up to √3x)
    const radius = Math.max(size.x, size.y, size.z) / 2;
    const scaleFactor = EARTH_RADIUS / radius;

    const wrapper = new THREE.Group();
    clone.scale.setScalar(scaleFactor);
    clone.position.set(-center.x * scaleFactor, -center.y * scaleFactor, -center.z * scaleFactor);
    wrapper.add(clone);

    return wrapper;
  }, [scene]);

  return <primitive object={model} />;
}

function GlobeMesh({ locations }: { locations: LocationEntry[] }) {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.1;
  });

  return (
    <group ref={group}>
      <EarthMesh />
      <mesh>
        <sphereGeometry args={[EARTH_RADIUS + 0.18, 28, 28]} />
        <meshBasicMaterial color="#2f5fc4" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>

      {locations.map((loc) => (
        <Pin key={loc.id} location={loc} />
      ))}
    </group>
  );
}

export function LocationGlobe({ locations }: { locations: LocationEntry[] }) {
  const { ref, inView } = useInViewport<HTMLDivElement>("150px");

  return (
    <div ref={ref} className="h-[380px] md:h-[460px] w-full">
      {inView && (
        <Canvas camera={{ position: [0, 0.5, 6], fov: 45 }} dpr={[1, 1.5]} frameloop="always">
          <Suspense fallback={null}>
            <ambientLight intensity={1.1} />
            <directionalLight position={[5, 4, 5]} intensity={1.6} color="#ffffff" />
            <pointLight position={[-5, -3, -5]} intensity={0.5} color="#2f5fc4" />
            <GlobeMesh locations={locations} />
            <OrbitControls
              enablePan={false}
              enableZoom
              minDistance={3.2}
              maxDistance={9}
              autoRotate
              autoRotateSpeed={0.5}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.4}
            />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}

useGLTF.preload(EARTH_MODEL_URL);
