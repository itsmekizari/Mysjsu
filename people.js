import { drawPerson } from "./player.js";
import { avoidPoint } from "./collision.js";

export class Crowd {
  constructor(count, player) {
    this.people = [];
    this.player = player;
    this.spacing = 38;
    this.dodgeRadius = 62;
    this.score = 0;

    for (let i = 0; i < count; i++) {
      this.people.push({
        x: player.x - (i + 1) * 34,
        y: player.y + (i % 2 ? -18 : 18),
        vx: 0,
        vy: 0,
        side: i % 2 ? -1 : 1,
        dodging: 0
      });
    }
  }

  update(dt) {
    let target = { x: this.player.x, y: this.player.y };

    for (let i = 0; i < this.people.length; i++) {
      const p = this.people[i];
      const dodge = avoidPoint(p, this.player, this.dodgeRadius, 2.6);

      const dx = target.x - p.x;
      const dy = target.y - p.y;
      const d = Math.hypot(dx, dy) || 1;

      let ax = (dx / d) * 0.13;
      let ay = (dy / d) * 0.13;

      // Side-step when the player gets too close.
      if (dodge.amount > 0) {
        ax += dodge.x;
        ay += dodge.y;

        const sideX = -dy / d;
        const sideY = dx / d;
        ax += sideX * p.side * dodge.amount * 0.75;
        ay += sideY * p.side * dodge.amount * 0.75;

        if (p.dodging === 0) this.score++;
        p.dodging = Math.min(1, p.dodging + dt * 0.008);
      } else {
        p.dodging = Math.max(0, p.dodging - dt * 0.006);
      }

      p.vx = (p.vx + ax) * 0.91;
      p.vy = (p.vy + ay) * 0.91;

      p.x += p.vx * dt * 0.055;
      p.y += p.vy * dt * 0.055;

      // Prevent crowd members from stacking on each other.
      for (let j = 0; j < i; j++) {
        const q = this.people[j];
        const ddx = p.x - q.x;
        const ddy = p.y - q.y;
        const dd = Math.hypot(ddx, ddy) || 0.001;
        if (dd < 25) {
          const push = (25 - dd) / dd * 0.35;
          p.x += ddx * push;
          p.y += ddy * push;
        }
      }

      target = p;
    }
  }

  draw(ctx) {
    for (let i = this.people.length - 1; i >= 0; i--) {
      const p = this.people[i];
      const lean = p.dodging * p.side * 0.18;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(lean);
      ctx.translate(-p.x, -p.y);
      drawPerson(ctx, p.x, p.y, 1, "#222");
      ctx.restore();
    }
  }
}
