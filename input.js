export class PointerInput {
  constructor(canvas, player) {
    this.canvas = canvas;
    this.player = player;
    this.dragging = false;
    this.offsetX = 0;
    this.offsetY = 0;

    canvas.addEventListener("pointerdown", e => this.down(e));
    canvas.addEventListener("pointermove", e => this.move(e));
    canvas.addEventListener("pointerup", () => this.up());
    canvas.addEventListener("pointercancel", () => this.up());
  }

  pos(e) {
    const r = this.canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  down(e) {
    const p = this.pos(e);
    if (this.player.contains(p.x, p.y)) {
      this.dragging = true;
      this.offsetX = p.x - this.player.x;
      this.offsetY = p.y - this.player.y;
      this.canvas.setPointerCapture?.(e.pointerId);
    }
  }

  move(e) {
    if (!this.dragging) return;
    const p = this.pos(e);
    this.player.setPosition(p.x - this.offsetX, p.y - this.offsetY);
  }

  up() {
    this.dragging = false;
  }
}
