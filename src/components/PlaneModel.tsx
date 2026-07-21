import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/plane_animated.glb";
const TARGET_SIZE = 9.8;
// Measured from the model's own geometry (world-space AABB): the gap
// between the mesh's centre pivot and its lowest point (landing gear),
// scaled to TARGET_SIZE. Lets us sit the model's wheels exactly on the
// runway surface instead of guessing an offset.
const PIVOT_TO_WHEELS = TARGET_SIZE * 0.2663 * 0.5;
const RUNWAY_SURFACE_Y = -2.5;

// The source texture is an almost-neutral grey metal bake, so a light tint
// here reads as a clean paint job rather than a colour cast. Set to
// "#ffffff" to keep the model's untouched bare-metal look.
const TINT = "#eef2fb";

// Static pose — matches the reference front-quarter angle (nose toward
// camera-left, tail receding right, seen slightly from above), zoomed in
// and pushed toward the right edge so it reads as peeking into the frame
// rather than sitting fully within it. No animation for now: fixed
// position and rotation only.
const POSITION = new THREE.Vector3(4.6, RUNWAY_SURFACE_Y + PIVOT_TO_WHEELS, -0.5);
const ROTATION = new THREE.Euler(0, -0.6, 0);

export function PlaneModel() {
  const { scene } = useGLTF(MODEL_URL);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    const tint = new THREE.Color(TINT);
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = false;
        child.receiveShadow = false;
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((mat) => {
          if (mat instanceof THREE.MeshStandardMaterial) {
            mat.color.multiply(tint);
          }
        });
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scaleFactor = TARGET_SIZE / maxDim;

    const center = new THREE.Vector3();
    box.getCenter(center);

    const wrapper = new THREE.Group();
    clone.scale.setScalar(scaleFactor);
    clone.position.set(
      -center.x * scaleFactor,
      -center.y * scaleFactor,
      -center.z * scaleFactor
    );
    wrapper.add(clone);

    return wrapper;
  }, [scene]);

  return <primitive object={model} position={POSITION} rotation={ROTATION} />;
}

useGLTF.preload(MODEL_URL);
