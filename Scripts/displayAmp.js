import { analyser } from "./main.js"
import { toogleCircleBtn } from "./initialization.js"

export default function displayAmpWave(myCanvasAmp, canvasCtxAmp, IdAnimation, parOptSelectDisplay) {
  //  0.-  Config the System of Audio
  //  1.-  Definition of variables of analyser  (get frecuency of the sound audioNode with:  frequencyBinCount)
  analyser.minDecibels = -90
  analyser.maxDecibels = -10

  analyser.fftSize = 2048  //  Fast Fourier Transform (fft)
  let bufferLength = analyser.frequencyBinCount  //  bufferLength = parfftSize / 2
  let dataArray = new Uint8Array(bufferLength)

  let barWidth = (myCanvasAmp.width / bufferLength) + 1
  let x

  function drawAmplitudeSound() {
    toogleCircleBtn.style.display = 'none'
    switch (parOptSelectDisplay) {
      case "Sine Wave":
        analyser.fftSize = 2048
        myCanvasAmp.style.filter = 'blur(0px) contrast(3)'
        barWidth = (myCanvasAmp.width / bufferLength) + 0.8
        cancelAnimationFrame(IdAnimation)
        visualizerSine()
        break
      case "Circles":
        myCanvasAmp.style.filter = 'blur(2px) contrast(5)'
        analyser.fftSize = 1024  //  Fast Fourier Transform (fft)
        barWidth = (myCanvasAmp.width / bufferLength) + 0.5
        cancelAnimationFrame(IdAnimation)
        visualizerCircle()
        break
      default:
        break
    }
    IdAnimation = requestAnimationFrame(drawAmplitudeSound)
  }

  // /////////  FUNCTIONS OF VISUALIZATORS IN AMPLITUDE   //////////////////////////////////

  // 1.-  Oscilospie => visualizerSine()
  function visualizerSine() {
    analyser.getByteTimeDomainData(dataArray)  //  Copy of the waveform into analyser

    canvasCtxAmp.reset()
    canvasCtxAmp.fillStyle = 'rgb(0, 0, 0)';
    canvasCtxAmp.fillRect(0, 0, myCanvasAmp.width, myCanvasAmp.height);

    x = 0;
    for (let i = 0; i < bufferLength; i++) {
      const volume = (dataArray[i] / 128) - 0.5
      let barHeight = (volume * myCanvasAmp.height) * 1.05

      if (volume > 0 && volume > myCanvasAmp.height) {
        barHeight = volume
      } else if (volume > 0 && volume < myCanvasAmp.height) {
        barHeight = barHeight * 0.8
      } else if (volume < 0 && volume < myCanvasAmp.height) {
        barHeight = volume
      } else {
        barHeight = barHeight * 0.8
      }

      const colorHSL = 'hsl(' + i * 2 + ', 100%, 50%'
      canvasCtxAmp.fillStyle = colorHSL
      canvasCtxAmp.fillRect(x, barHeight, barWidth, barHeight / 1.8)

      x += barWidth + 1;
    }
  }

  //  2.-  Circles of amplitude => visualizerCircle()
  function visualizerCircle() {
    analyser.getByteTimeDomainData(dataArray)  //  Copy of the waveform into analyser

    canvasCtxAmp.reset()
    canvasCtxAmp.fillStyle = 'rgb(0, 0, 0)';
    canvasCtxAmp.fillRect(0, 0, myCanvasAmp.width, myCanvasAmp.height);

    x = 0;
    canvasCtxAmp.save()
    canvasCtxAmp.translate(myCanvasAmp.width / 2, myCanvasAmp.height / 2)

    for (let i = 0; i < bufferLength; i++) {
      const volume = (dataArray[i] / 128) - 1
      let barHeight = (volume * myCanvasAmp.height) * 0.8

      if (volume > 0 && volume > myCanvasAmp.height / 16) {
        barHeight = volume
      } else if (volume > 0 && volume < myCanvasAmp.height / 16) {
        barHeight = barHeight * 0.99
      } else if (volume < 0 && volume < myCanvasAmp.height / 16) {
        barHeight = volume
      } else {
        barHeight = barHeight * 0.99
      }

      const colorHSL = 'hsl(' + i * 2 + ', 100%, 50%'
      canvasCtxAmp.fillStyle = colorHSL
      canvasCtxAmp.rotate(volume * 0.28)
      canvasCtxAmp.fillRect(i * 0.101, 0, barWidth * i / 350, barHeight / (volume * 14))

      x += barWidth + 1
    }
    canvasCtxAmp.restore()
  }

  //////////  LOOP FUNCTION 
  drawAmplitudeSound()

}