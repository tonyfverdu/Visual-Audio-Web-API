import { contCanvas } from "./initialization.js"
import { Pumpkin } from "./pumpkin.js"
import Microphone from "./microphone.js"


export function createCanvasPumpkin() {
  const canvasPumpkin = document.createElement("canvas")
  const pumpkinCtx = canvasPumpkin.getContext("2d")

  pumpkinCtx.reset(0, 0, canvasPumpkin.width, canvasPumpkin.height)
  canvasPumpkin.setAttribute("width", "120px")
  canvasPumpkin.setAttribute("height", "120px")
  canvasPumpkin.setAttribute("id", "canvasPumpkin")
  canvasPumpkin.classList.add("canvasPumpkin")
  contCanvas.appendChild(canvasPumpkin)

  const myMicro = new Microphone(8192)

  const myPumpkin = new Pumpkin(
    canvasPumpkin,
    canvasPumpkin.width / 2,
    canvasPumpkin.height / 2,
    Math.min(canvasPumpkin.width, canvasPumpkin.height) * 0.48
  )

  function speakerPumpkin() {
    requestAnimationFrame(speakerPumpkin)
    if(myMicro.initialized) {
      const openness = myMicro.getVolume() * 6.8
      myPumpkin.drawPumpkin(pumpkinCtx, openness)
    }
  }
  speakerPumpkin()
}

export function removeCanvasPumpkin() {
  if (canvasPumpkin) {

    canvasPumpkin.remove()
  }
}