import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, useGLTF } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Group, Mesh } from "three";
import * as THREE from "three";
import type { LocationEntry } from "../data/content";
import { useInViewport } from "../hooks/useInViewport";

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

// Single, constant rotation speed — shared by every globe on the site (Home
// preview and all 3 Destinations globes) so they all spin identically.
const SPIN_SPEED = 0.1;
// How often the auto-cycle advances to the next destination's quick-view card.
const CYCLE_SECONDS = 4.5;

function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat * LAT_SCALE) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180) + THETA_OFFSET;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function Pin({
  location,
  onInteract,
}: {
  location: LocationEntry;
  onInteract: (location: LocationEntry) => void;
}) {
  const pos = latLonToVector3(location.lat, location.lon, EARTH_RADIUS + 0.03);
  const ref = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

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
          onInteract(location);
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
    </group>
  );
}

function QuickViewCard({ location }: { location: LocationEntry }) {
  const pos = latLonToVector3(location.lat, location.lon, EARTH_RADIUS + 0.03);
  return (
    <group position={pos}>
      <Html style={{ pointerEvents: "auto" }} zIndexRange={[10, 0]}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.id}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-52 -translate-x-1/2 -translate-y-[135%] rounded-xl bg-white shadow-2xl shadow-black/30 border border-navy-900/10 p-4"
          >
            <span className="inline-block mb-2 rounded-full bg-red-50 border border-red-500/20 px-2.5 py-0.5 text-[9px] tracking-widest uppercase text-red-600">
              {location.categoryLabel}
            </span>
            <h4 className="font-display text-sm text-navy-900 mb-1">{location.name}</h4>
            {location.highlight && (
              <p className="text-[11px] text-ink-400 leading-snug mb-3">{location.highlight}</p>
            )}
            {/* Plain <a>, not react-router's <Link> — this card is rendered
                inside a drei <Html> portal within the R3F Canvas tree, which
                is a separate reconciler root and does not inherit the outer
                <BrowserRouter> context, so <Link> throws here. */}
            <a
              href={`/destinations#location-${location.id}`}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-600 hover:text-red-700"
            >
              View Full Details <ArrowRight size={12} />
            </a>
          </motion.div>
        </AnimatePresence>
      </Html>
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

function GlobeMesh({ locations, isVisible }: { locations: LocationEntry[]; isVisible: boolean }) {
  const group = useRef<Group>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const cyclingRef = useRef(true);
  const cycleTimerRef = useRef(0);

  const activeLocation = useMemo(
    () => locations.find((l) => l.id === activeId) ?? null,
    [locations, activeId]
  );

  const handleInteract = useCallback((location: LocationEntry) => {
    cyclingRef.current = false;
    setActiveId(location.id);
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    if (isVisible) group.current.rotation.y += delta * SPIN_SPEED;

    if (!isVisible || !cyclingRef.current) return;
    cycleTimerRef.current += delta;
    if (cycleTimerRef.current < CYCLE_SECONDS) return;
    cycleTimerRef.current = 0;

    // Pick whichever pin is currently facing the camera most directly, so
    // the popup always lands on a pin that's actually legible right now
    // rather than forcing the globe to spin-to-target.
    const rotY = group.current.rotation.y;
    let best: LocationEntry | null = null;
    let bestZ = -Infinity;
    for (const loc of locations) {
      const local = latLonToVector3(loc.lat, loc.lon, 1);
      const z = -local.x * Math.sin(rotY) + local.z * Math.cos(rotY);
      if (z > bestZ) {
        bestZ = z;
        best = loc;
      }
    }
    if (best) setActiveId(best.id);
  });

  return (
    <group ref={group}>
      <EarthMesh />
      <mesh>
        <sphereGeometry args={[EARTH_RADIUS + 0.18, 28, 28]} />
        <meshBasicMaterial color="#2f5fc4" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>

      {locations.map((loc) => (
        <Pin key={loc.id} location={loc} onInteract={handleInteract} />
      ))}

      {activeLocation && <QuickViewCard location={activeLocation} />}
    </group>
  );
}

export function LocationGlobe({ locations }: { locations: LocationEntry[] }) {
  const { ref: mountRef, inView } = useInViewport<HTMLDivElement>("150px");
  const liveRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = liveRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0.2,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const setRefs = (node: HTMLDivElement | null) => {
    mountRef.current = node;
    liveRef.current = node;
  };

  return (
    <div ref={setRefs} className="h-[380px] md:h-[460px] w-full">
      {inView && (
        <Canvas camera={{ position: [0, 0.5, 6], fov: 45 }} dpr={[1, 1.5]} frameloop="always">
          <Suspense fallback={null}>
            <ambientLight intensity={1.1} />
            <directionalLight position={[5, 4, 5]} intensity={1.6} color="#ffffff" />
            <pointLight position={[-5, -3, -5]} intensity={0.5} color="#2f5fc4" />
            <GlobeMesh locations={locations} isVisible={isVisible} />
            <OrbitControls
              enablePan={false}
              enableZoom
              minDistance={3.2}
              maxDistance={9}
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
