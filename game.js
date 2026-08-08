import { Player } from "./player.js";
import { Crowd } from "./people.js";
import { PointerInput } from "./input.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const resetBtn = document.getElementById("reset");

let W, H, dpr;
let player;
let crowd;
let input;

function resize() {
  dpr = Math.max(1, window.devicePixelRatio || 1);
  W = innerWidth;
  H = innerHeight;

  canvas.width = Math.floor(W * dpr);
  canvas.height = Math.floor(H * dpr);
  canvas.style.width = W + "px";
  canvas.style.height = H + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function reset() {
  player = new Player(W * .52, H * .48);
  crowd = new Crowd(15, player);
  input = new PointerInput(canvas, player);
  scoreEl.textContent = "0";
}

function drawBackground() {
  ctx.fillStyle = "#fafaf7";
  ctx.fillRect(0, 0, W, H);

  const step = 34;
  ctx.strokeStyle = "#e6e6e2";
  ctx.lineWidth = 1;

  for (let x = 0; x < W; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }

  for (let y = 0; y < H; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
}

function drawGuide() {
  ctx.save();
  ctx.strokeStyle = "rgba(220, 40, 40, .25)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(player.x, player.y);

  for (const p of crowd.people) {
    ctx.lineTo(p.x, p.y);
  }

  ctx.stroke();
  ctx.restore();
}

let last = performance.now();

function frame(now) {
  const dt = Math.min(32, now - last);
  last = now;

  crowd.update(dt);

  drawBackground();
  drawGuide();
  crowd.draw(ctx);
  player.draw(ctx);

  scoreEl.textContent = Math.floor(crowd.score);

  requestAnimationFrame(frame);
}

window.addEventListener("resize", () => {
  resize();
  reset();
});

resetBtn.addEventListener("click", reset);

resize();
reset();
requestAnimationFrame(frame);
