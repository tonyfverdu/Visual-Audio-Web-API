import { analyser } from "./main.js"
import { toogleCircleBtn } from "./initialization.js"
import { randomNumber, randomColor, imageInCanvas } from "./functions.js"

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
        barWidth = (myCanvasAmp.width / bufferLength) + 1
        cancelAnimationFrame(IdAnimation)
        visualizerSine()
        break
      case "Circles":
        myCanvasAmp.style.filter = 'blur(3px) contrast(5)'
        analyser.fftSize = 1024  //  Fast Fourier Transform (fft)
        barWidth = (myCanvasAmp.width / bufferLength) + 1
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
      let barHeight = (volume * myCanvasAmp.height) * 0.9

      // if (volume > 0 && volume > myCanvas.height / 8) {
      //   barHeight = volume
      // } else if (volume > 0 && volume < myCanvas.height / 8) {
      //   barHeight = barHeight * 0.9
      // } else if (volume < 0 && volume < myCanvas.height / 8) {
      //   barHeight = volume
      // } else {
      //   barHeight = barHeight * 0.9
      // }

      const colorHSL = 'hsl(' + i * 2 + ', 100%, 50%'
      canvasCtxAmp.fillStyle = colorHSL
      canvasCtxAmp.fillRect(x, barHeight, barWidth, barHeight / 1.75)

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
      let barHeight = (volume * myCanvasAmp.height) * 1.2

      // if (volume > 0 && volume > myCanvas.height / 16) {
      //   barHeight = volume
      // } else if (volume > 0 && volume < myCanvas.height / 16) {
      //   barHeight = barHeight * 0.99
      // } else if (volume < 0 && volume < myCanvas.height / 16) {
      //   barHeight = volume
      // } else {
      //   barHeight = barHeight * 0.99
      // }

      const colorHSL = 'hsl(' + i * 2 + ', 100%, 50%'
      canvasCtxAmp.fillStyle = colorHSL
      canvasCtxAmp.rotate(volume * 0.38)
      canvasCtxAmp.fillRect(i * 0.12, 0, barWidth * i / 380, barHeight / 6)

      x += barWidth + 1
    }
    canvasCtxAmp.restore()
    //requestAnimationFrame(visualizerCircle)
  }

  drawAmplitudeSound() 

  //  1.-  Class Bar
  // class Bar {
  //   constructor(theCanvas, theCtxCanvas, posX, posY, barWidth, barHeight, barColor, index) {
  //     this.canvas = theCanvas
  //     this.contextCanvas = theCtxCanvas
  //     this.posX = posX
  //     this.posY = posY
  //     this.barWidth = barWidth
  //     this.barHeight = barHeight
  //     this.barColor = barColor
  //     this.index = index
  //   }

  //   update(audioInput) {  // audioInput
  //     const sound = audioInput * 560

  //     if (sound > 0 && sound > this.barHeight) {
  //       this.barHeight = sound
  //     } else if (sound > 0 && sound > this.barHeight) {
  //       this.barHeight = this.barHeight * 0.9
  //     } else if (sound < 0 && sound < this.barHeight) {
  //       this.barHeight = sound
  //     } else {
  //       this.barHeight = this.barHeight * 0.9
  //     }

  //   }

  //   drawVisualizator(ctxCanvas, volume) {  // (ctxCanvas, volume)
  //     ctxCanvas.fillStyle = this.barColor
  //     ctxCanvas.fillRect(this.posX, this.posY, this.barWidth, this.barHeight * volume)
  //   }
  // }
  // const bar1 = new Bar(myCanvas, canvasCtx, 10, 10, 100, 80, "red", 1)

  // const myMicro = new Microphone()
  // const bars = []

  // function createBars(parCanvas, parCtxCanvas) {
  //   for (let i = 0; i < 256; i++) {
  //     const colorsBar = 'hsl(' + i * 2 + ', 100%, 50%)'
  //     bars.push(new Bar(parCanvas, parCtxCanvas, i * 2 * parCanvas.width / 256, parCanvas.height / 1.5, parCanvas.width * 2 / 256, 2, colorsBar, i))
  //   }
  // }

  // createBars(canvasGain, ctxCanvasGain)
  ///////////////////////////////////////////////
}


/*
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
  */

