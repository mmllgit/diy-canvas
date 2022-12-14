export function drawRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number, 
  color: string
) {
  ctx.beginPath()
  ctx.fillStyle = color
  ctx.fillRect(x, y, w, h)
  ctx.closePath()
}
