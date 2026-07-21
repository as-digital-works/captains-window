import * as THREE from "three";

let cached: THREE.CanvasTexture | null = null;

function seededRandom(seed: number) {
  const x = Math.sin(seed * 999.7) * 43758.5453;
  return x - Math.floor(x);
}

function drawPuff(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, alpha: number) {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
  gradient.addColorStop(0, color);
  gradient.addColorStop(0.6, color);
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.globalAlpha = alpha;
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

export function getCloudTexture() {
  if (cached) return cached;

  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size * 0.6;
  const ctx = canvas.getContext("2d")!;

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  // keep puffs well inside the canvas so their gradients always fully
  // resolve to transparent before hitting the edge (no hard cutoffs)
  const puffs = Array.from({ length: 6 }).map((_, i) => ({
    dx: (seededRandom(i) - 0.5) * canvas.width * 0.34,
    dy: (seededRandom(i + 20) - 0.5) * canvas.height * 0.3,
    r: canvas.width * (0.1 + seededRandom(i + 40) * 0.06),
  }));

  puffs.forEach((p) => drawPuff(ctx, cx + p.dx, cy + p.dy + 8, p.r * 1.1, "#b9c6e6", 0.25));
  puffs.forEach((p) => drawPuff(ctx, cx + p.dx, cy + p.dy, p.r, "#f5f8fd", 0.6));
  puffs.forEach((p) => drawPuff(ctx, cx + p.dx * 0.9, cy + p.dy - p.r * 0.12, p.r * 0.6, "#ffffff", 0.55));

  ctx.globalAlpha = 1;

  // vignette mask: guarantees a smooth fade to fully transparent well
  // before the canvas bounds, regardless of puff placement above
  ctx.globalCompositeOperation = "destination-in";
  const mask = ctx.createRadialGradient(cx, cy, 0, cx, cy, canvas.width * 0.4);
  mask.addColorStop(0, "rgba(0,0,0,1)");
  mask.addColorStop(0.55, "rgba(0,0,0,0.85)");
  mask.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = mask;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "source-over";

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  cached = texture;
  return texture;
}
