import Microphone from "./microphone.js"
import { canvasGain, ctxCanvasGain, } from "./graphic.js"
import { toogleAnimation } from "./events.js"

//export const audioElement = document.createElement("audio")

export function amplitudeMain() {
  //  1.-  Class Bar
  class Bar {
    constructor(theCanvas, theCtxCanvas, posX, posY, barWidth, barHeight, barColor, index) {
      this.canvas = theCanvas
      this.contextCanvas = theCtxCanvas
      this.posX = posX
      this.posY = posY
      this.barWidth = barWidth
      this.barHeight = barHeight
      this.barColor = barColor
      this.index = index
    }

    update(micInput) {
      const sound = micInput * 560

      if (sound > 0 && sound > this.barHeight) {
        this.barHeight = sound
      } else if (sound > 0 && sound > this.barHeight) {
        this.barHeight = this.barHeight * 0.9
      } else if (sound < 0 && sound < this.barHeight) {
        this.barHeight = sound
      } else {
        this.barHeight = this.barHeight * 0.9
      }
    }

    drawMicrophone(ctxCanvas) {
      ctxCanvas.fillStyle = this.barColor
      ctxCanvas.fillRect(this.posX, this.posY, this.barWidth, this.barHeight)
    }

    drawVisualizator(ctxCanvas, volume) {  // (ctxCanvas, volume)
      ctxCanvas.fillStyle = this.barColor
      ctxCanvas.fillRect(this.posX, this.posY, this.barWidth, this.barHeight * volume)
    }
  }

  const myMicro = new Microphone()
  const bars = []

  function createBars(parCanvas, parCtxCanvas) {
    for (let i = 0; i < 256; i++) {
      const colorsBar = 'hsl(' + i * 2 + ', 100%, 50%)'
      bars.push(new Bar(parCanvas, parCtxCanvas, i * 2 * parCanvas.width / 256, parCanvas.height / 1.5, parCanvas.width * 2 / 256, 2, colorsBar, i))
    }
  }

  createBars(canvasGain, ctxCanvasGain)
  ///////////////////////////////////////////////


  //  1.-  Function of animation by amplitude loop
  function animationLoopCanvasGain() {
    if (myMicro.initialized) {
      ctxCanvasGain.clearRect(0, 0, canvasGain.width, canvasGain.height)
      ctxCanvasGain.fillStyle = "black"
      ctxCanvasGain.fillRect(0, 0, canvasGain.width, canvasGain.height)

      const samples = myMicro.getSamples()
      bars.forEach(function (bar, i) {
        bar.update(samples[i])
        bar.drawVisualizator(ctxCanvasGain, myMicro.getVolume())
      })
    }

    if (toogleAnimation) {
      requestAnimationFrame(animationLoopCanvasGain)
    } else if (!toogleAnimation) {
      cancelAnimationFrame(animationLoopCanvasGain)
      ctxCanvasGain.reset()
      ctxCanvasGain.fillStyle = "black"
      ctxCanvasGain.fillRect(0, 0, canvasGain.width, canvasGain.height)
    }
  }
  animationLoopCanvasGain()
}