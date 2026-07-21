import * as THREE from "three";

let cached: THREE.CanvasTexture | null = null;

// Drawn tall (runway recedes along the canvas's vertical axis) so the strip
// can be mapped straight onto a rotated ground plane with no tiling.
const WIDTH = 512;
const HEIGHT = 2048;

export function getRunwayTexture() {
  if (cached) return cached;

  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d")!;

  // asphalt base — lighter near the camera (bottom), darker toward the
  // horizon so it visually sinks into the hero's navy background
  const base = ctx.createLinearGradient(0, HEIGHT, 0, 0);
  base.addColorStop(0, "#3a4256");
  base.addColorStop(0.35, "#2a3145");
  base.addColorStop(1, "#12172a");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // subtle asphalt grain
  for (let i = 0; i < 2600; i++) {
    const x = Math.random() * WIDTH;
    const y = Math.random() * HEIGHT;
    const shade = Math.random() > 0.5 ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.05)";
    ctx.fillStyle = shade;
    ctx.fillRect(x, y, 1.6, 1.6);
  }

  // solid edge lines, converging slightly toward the horizon for perspective
  const edgeInset = WIDTH * 0.09;
  ctx.strokeStyle = "rgba(245,247,252,0.85)";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(edgeInset, HEIGHT);
  ctx.lineTo(edgeInset + WIDTH * 0.06, 0);
  ctx.moveTo(WIDTH - edgeInset, HEIGHT);
  ctx.lineTo(WIDTH - edgeInset - WIDTH * 0.06, 0);
  ctx.stroke();

  // dashed centre line
  ctx.strokeStyle = "rgba(255,255,255,0.9)";
  ctx.lineWidth = 10;
  ctx.setLineDash([46, 40]);
  ctx.beginPath();
  ctx.moveTo(WIDTH / 2, HEIGHT);
  ctx.lineTo(WIDTH / 2, 0);
  ctx.stroke();
  ctx.setLineDash([]);

  // fade the far end (top of canvas) to fully transparent so the runway
  // dissolves into the sky/fog instead of ending in a hard edge
  ctx.globalCompositeOperation = "destination-in";
  const fade = ctx.createLinearGradient(0, HEIGHT, 0, 0);
  fade.addColorStop(0, "rgba(0,0,0,1)");
  fade.addColorStop(0.55, "rgba(0,0,0,1)");
  fade.addColorStop(0.85, "rgba(0,0,0,0.4)");
  fade.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = fade;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.globalCompositeOperation = "source-over";

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  cached = texture;
  return texture;
}
