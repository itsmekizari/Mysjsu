export function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function avoidPoint(entity, point, radius, strength = 1) {
  const dx = entity.x - point.x;
  const dy = entity.y - point.y;
  const d = Math.hypot(dx, dy) || 0.001;

  if (d >= radius) return { x: 0, y: 0, amount: 0 };

  const amount = (radius - d) / radius;
  return {
    x: (dx / d) * amount * strength,
    y: (dy / d) * amount * strength,
    amount
  };
}
