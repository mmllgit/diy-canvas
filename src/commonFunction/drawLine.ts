export function drawLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  width: number
) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color || "red";
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.stroke();
  ctx.closePath();
}
