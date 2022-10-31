import { drawCircle } from "./drawCircle";

export class Ball {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  r: number;
  s: number;
  a: number;
  color: string;
  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    r: number,
    s: number,
    a: number,
    color: string
  ) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.r = r;
    this.s = s;
    this.a = a;
    this.color = color;
  }
  draw() {
    drawCircle(this.ctx, this.x, this.y, this.r, this.color);
  }

  move() {
    this.x += Math.sin(this.a) * this.s;
    this.y += Math.cos(this.a) * this.s;
  }

  moveCrash() {
    this.x += Math.sin(this.a) * this.s;
    this.y += Math.cos(this.a) * this.s;
    if (0 > this.x || this.x > 400 || 0 > this.y || this.y > 400) {
      this.s = -this.s;
    }
  }
}
