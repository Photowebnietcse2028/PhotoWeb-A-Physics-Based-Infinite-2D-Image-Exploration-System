export const camera = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0,
  velocityX: 0,
  velocityY: 0
};

export function updateCamera() {
  const prevX = camera.x;
  const prevY = camera.y;

  // LERP Smoothing
  camera.x += (camera.targetX - camera.x) * 0.05;
  camera.y += (camera.targetY - camera.y) * 0.05;

  // Calculate Velocity for dynamics
  camera.velocityX = camera.x - prevX;
  camera.velocityY = camera.y - prevY;
}
