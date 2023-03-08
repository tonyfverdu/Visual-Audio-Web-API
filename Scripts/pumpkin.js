const canvasPumpkin = document.querySelector("#canvasPumpkin")
export class Pumpkin {
  constructor(canvas, x, y, rad) {
    this.canvas = canvas,
      this.x = x,
      this.y = y,
      this.rad = rad
  }

  drawPumpkin(ctx, openness) {
    ctx.fillStyle = `rgba(${ 50 + openness * 70}, ${ 50 + openness * 70}, ${ 50 + openness * 70}, 0.5)`
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.scale(this.rad, this.rad)

    //  Head
    this.drawHead(ctx, openness)

    // Eyes
    this.drawEyes(ctx, openness)

    // Nose
    this.drawNose(ctx, openness)

    // Mouth
    this.drawMouth(ctx, openness)

    ctx.restore()
  }

  drawHead(ctx, openness) {
    //  Head
    ctx.fillStyle = 'rgb(10, 66, 5)'
    ctx.fillRect(-0.2, -0.875, 0.4, 0.2)

    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 175, 20, 0.95)`
    ctx.ellipse(-0.6, 0.1, 0.3, 0.89, -openness * 0.18, 0, Math.PI * 2)
    ctx.ellipse(0.6, 0.1, 0.3, 0.89, openness * 0.18, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath();
    ctx.fillStyle = 'rgba(250, 175, 10, 0.99)'
    ctx.ellipse(-0.3, 0.1, 0.3, 0.89, -openness * 0.1, 0, Math.PI * 2)
    ctx.ellipse(0.3, 0.1, 0.3, 0.89, openness * 0.1, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 150, 0)'
    ctx.ellipse(0, 0.1, 0.3, 0.89, 0, 0, Math.PI * 2)
    ctx.fill()
  }

  drawEyes(ctx, openness) {
    //Eyes
    ctx.save()
    ctx.translate(-0.4, -0.4)
    ctx.scale(1 + openness * 0.2, 1.2 - openness * 0.8)

    ctx.fillStyle = 'rgb(52, 20, 1)'
    ctx.beginPath()
    ctx.moveTo(-0.08, 0)
    ctx.lineTo(0.15, -0.12)
    ctx.lineTo(0.15, 0.12)
    ctx.closePath()
    ctx.fill()
    ctx.restore()

    ctx.save()
    ctx.translate(0.4, -0.4)
    ctx.scale(1 + openness * 0.2, 1.2 - openness * 0.8)

    ctx.fillStyle = 'rgb(52, 20, 1)'
    ctx.beginPath()
    ctx.moveTo(0.08, 0)
    ctx.lineTo(-0.15, 0.12)
    ctx.lineTo(-0.15, -0.12)
    ctx.closePath()
    ctx.fill()

    ctx.restore()
  }

  drawNose(ctx, openness) {
    ctx.save()
    ctx.translate(-0.08 - openness * 0.01, -0.05 - openness * 0.075)

    ctx.fillStyle = 'black'
    ctx.beginPath()
    ctx.moveTo(-0.072, 0)
    ctx.lineTo(0.05, -0.09)
    ctx.lineTo(0.05, 0.09)
    ctx.closePath()
    ctx.fill()

    ctx.restore()

    ctx.save()
    ctx.translate(openness * 0.01 + 0.08, -0.05 - openness * 0.075)

    ctx.fillStyle = 'black'
    ctx.beginPath()
    ctx.moveTo(0.072, 0)
    ctx.lineTo(-0.05, -0.09)
    ctx.lineTo(-0.05, 0.09)
    ctx.closePath()
    ctx.fill()

    ctx.restore()

  }

  drawMouth(ctx, openness) {
    //  Mouth
    ctx.fillStyle = 'rgba(39, 39, 39, 0.8'
    ctx.save()
    ctx.translate(0, 0.4)
    ctx.scale(1 - openness * 0.28, 0.35 + openness)

    ctx.moveTo(-0.6, 0)
    ctx.lineTo(-0.4, -0.17)
    ctx.lineTo(-0.2, -0.08)
    ctx.lineTo(0, -0.2)
    ctx.lineTo(0.2, -0.08)
    ctx.lineTo(0.4, -0.17)
    ctx.lineTo(0.6, 0)
    ctx.lineTo(0.4, 0.17)
    ctx.lineTo(0.2, 0.08)
    ctx.lineTo(0, 0.2)
    ctx.lineTo(-0.2, 0.08)
    ctx.lineTo(-0.4, 0.17)
    ctx.closePath()
    ctx.fill()

    ctx.restore()
  }
}