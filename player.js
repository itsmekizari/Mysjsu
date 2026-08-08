export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 19;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  contains(x, y) {
    return Math.hypot(x - this.x, y - this.y) < 42;
  }

  draw(ctx) {
    drawPerson(ctx, this.x, this.y, 1.35, "#111");
  }
}

export function drawPerson(ctx, x, y, scale = 1, color = "#222") {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2.2 * scale;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.arc(0, -13 * scale, 5.5 * scale, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(0, -7 * scale);
  ctx.lineTo(0, 8 * scale);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, -2 * scale);
  ctx.lineTo(-9 * scale, 3 * scale);
  ctx.moveTo(0, -2 * scale);
  ctx.lineTo(9 * scale, 2 * scale);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 8 * scale);
  ctx.lineTo(-7 * scale, 19 * scale);
  ctx.moveTo(0, 8 * scale);
  ctx.lineTo(7 * scale, 19 * scale);
  ctx.stroke();

  ctx.restore();
}
