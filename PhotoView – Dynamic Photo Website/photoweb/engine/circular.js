export function getCircularPosition(index, total, scrollY) {
  const angle = (index / (total || 1)) * Math.PI * 2 + scrollY * 0.002;
  const radius = 600;

  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle)
  };
}
