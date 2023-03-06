import { audioElement, urlImgSong, elemMyCanvas } from "./initialization.js"
import { track, gainNode, pannerStereo } from "./main.js"
import { toogleAnimation } from "./events.js"
import { randomNumber, randomColor, imageInCanvas } from "./functions.js"
import { WIDTH, HEIGHT } from "./graphic.js"
import Microphone from "./microphone.js"


//  Function Analyser Amplitude: analyserAmp()
export default function analyserAmp(parContCanvas, parCanvas, parCtxCanvas, parMyNewCanvas, parNewCtx, parAudioCtx,
  parAnalyser, parfftSize) {
  const toogleCircleBtn = document.querySelector("#changeCircleBtn")

  //  1.-   Connects of AudioNodes:
  //  1.1-  Connect the "track" (sound of font audioNode) to the node of Gain: "gainNode" (track => gainNode)
  track.connect(gainNode);
  //  1.2.- Connect the "gainNode" to the audioNode: "pannerStereo" (gainNode => pannerStereo)
  gainNode.connect(pannerStereo)
  //  1.3.-  Connect the audioNode "pannerStereo" to the audioNode "analyser" (pannerStereo ==> analyzer Node)
  pannerStereo.connect(parAnalyser);
  //  1.4.-  Connect the node "analyser" to "destination" of system (speakers) (analyser => audioCtx.destination)
  parAnalyser.connect(parAudioCtx.destination)


  //  2.-  Definition of variables of analyser  (get frecuency of the sound audioNode with:  frequencyBinCount)
  //  const bufferLength = parAnalyser.frequencyBinCount;  //  bufferLength = parfftSize / 2
  // parAnalyser.fftSize = parfftSize;  //  Fast Fourier Transform (fft)
  const bufferLength = parAnalyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  parAnalyser.getByteTimeDomainData(dataArray)  //  copia de la forma de onda

  // 3.-    Vidualizators of amplitude
  // 3.1.-  Draw the exit of analyser in canvas
  let visualizator = "Sine wave"  //  Defect visualizator:  "Sine wave"

  // 3.2-   Events of select visualizator, 'change' in the "select" of visualizator  ('change' => "visualizator" is value selected)
  const optionElemVisualizator = document.querySelectorAll('.optionVisualizator')
  const visualizatorSelect = document.querySelector('#selectVisuaAmp')

  visualizatorSelect.addEventListener('change', (ev) => {
    visualizator = optionElemVisualizator[ev.target.selectedIndex].value
  })

  // 4.-  Style of parCanvas, put image of album in the newcanvas
  function newCanvas(parCanvas) {
    const styleNewCanvas = {
      display: 'flex',
      position: 'absolute',
      top: '15px',
      right: '15px',
      width: '120px',
      height: '120px',
      padding: '0%',
      margin: '0% auto',
      borderRadius: '50%',
      border: '1px solid v.$backgroundColorHellGrayT',
      backgroundColor: 'black',
      zIndex: '50'
    }
    for (const atributteCSS in styleNewCanvas) {
      parCanvas.style[atributteCSS] = styleNewCanvas[atributteCSS]
    }
    parContCanvas.appendChild(parCanvas)
  }
  newCanvas(parMyNewCanvas)
  imageInCanvas(urlImgSong, parNewCtx)

  // 5.-  Switch of type of frecuency visualizator ("Sine wave", ...)
  function drawAmplitudeSound() {
    let x
    switch (visualizator) {
      case "Sine wave":
        parCanvas.style.filter = 'blur(0px) contrast(3)'
        toogleCircleBtn.style.display = 'none'
        visualizerSine(bufferLength, x)
        // visualizerBars(bufferLength, x)
        break;
      case "Hell Doom":
        toogleCircleBtn.style.display = 'none'
        visualizatorHell(bufferLength, x)
        break
      case "Fireworks":
        toogleCircleBtn.style.display = 'none'
        visualizatorFirework(bufferLength, x)
        break
      case "Circles Rainbow":
        toogleCircleBtn.style.display = 'block'
        visualizatorCircles(bufferLength)
        // visualizator2(bufferLength)
        break
      case "no se":
        toogleCircleBtn.style.display = 'none'
        break
      default:
      // code block
    }
    requestAnimationFrame(drawAmplitudeSound);
  }

  //  6.1-  Functions definitions of the frecuency visualizers:  visualizerBars 
  function visualizerBars(bufferLength, x) {
    parCanvas.style.filter = 'blur(0px) contrast(3)'
    parAnalyser.fftSize = parfftSize;  //  Fast Fourier Transform (fft)

    parAnalyser.getByteFrequencyData(dataArray);

    parCtxCanvas.reset()
    parCtxCanvas.fillStyle = 'rgb(0, 0, 0)';
    parCtxCanvas.fillRect(0, 0, WIDTH, HEIGHT);

    const barWidth = (parCanvas.width / bufferLength) + 0.5;
    x = 0

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = dataArray[i] * 0.5

      const g = i * 1.5 / bufferLength
      const b = i * 1.5
      const colorRed = i * barHeight / randomNumber(5, 6)
      const colorGreen = 255 * 3 * g
      const colorBlue = 255 - b

      const colorRandom = `rgb(${colorRed}, ${colorGreen}, ${colorBlue})`
      parCtxCanvas.fillStyle = colorRandom
      parCtxCanvas.fillRect(x, parCanvas.height - barHeight, barWidth, barHeight)
      parCtxCanvas.beginPath()
      parCtxCanvas.fillStyle = "white"
      parCtxCanvas.arc(x, parCanvas.height - barHeight - 3, 0.5, 0, Math.PI * 2)
      parCtxCanvas.fill()
      x += barWidth + 0.5;
    }
  }

  //  6.2-  Functions definitions of the frecuency visualizers:  visualizerSine 
  function visualizerSine(bufferLength, x) {
    parAnalyser.fftSize = parfftSize; //  Fast Fourier Transform (fft)

    parCtxCanvas.reset()
    parCtxCanvas.fillStyle = 'rgb(0, 0, 0)';
    parCtxCanvas.fillRect(0, 0, parCanvas.width, parCanvas.height);

    parCtxCanvas.lineWidth = 1;
    parCtxCanvas.strokeStyle = "rgb(255, 255, 255)";

    const barWidth = (parCanvas.width / bufferLength) + 0.5;
    x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = dataArray[i] * 0.5
      const volume = (dataArray[i] / 128.0) - 1
      
      const y = (volume * parCanvas.height) / 2

      const g = i * 1.5 / bufferLength
      const b = i * 1.5
      const colorRed = i * barHeight / randomNumber(5, 6)
      const colorGreen = 255 * 3 * g
      const colorBlue = 255 - b

      const colorRandom = `rgb(${colorRed}, ${colorGreen}, ${colorBlue})`
      parCtxCanvas.fillStyle = colorRandom
      parCtxCanvas.fillRect(x, y, barWidth, y)

      x += barWidth;
    }    
  }
  drawAmplitudeSound()
}


/*
    //  1.-  Class Bar
    class BarAmp {
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

      update(signalFont) {
        const sound = signalFont * 450
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

      drawMicrophone(ctx) {
        ctx.fillStyle = this.barColor
        ctx.fillRect(this.posX, this.posY, this.barWidth, this.barHeight)
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
        bars.push(new BarAmp(parCtxCanvas, parCtxCanvas, i * 2 * parCanvas.width / 256, parCanvas.height / 1.5, parCanvas.width / 256, 2, colorsBar, i))
      }
    }
    createBars(parCanvas, parCtxCanvas)
    ///////////////////////////////////////////////
    //  1.-  Function of animation by amplitude loop
    function animationLoopCanvas() {
      parCtxCanvas.clearRect(0, 0, parCanvas.width, parCanvas.height)
      parCtxCanvas.fillStyle = "black"
      parCtxCanvas.fillRect(0, 0, parCanvas.width, parCanvas.height)
      // parCtxCanvas.fill()

      const theSamples = myMicro.getSamples()
      console.log(myMicro)
      bars.forEach(function (bar, i) {
        bar.update(theSamples[i])
        bar.drawVisualizator(parCtxCanvas, myMicro.getVolume() )
      })

      if (toogleAnimation) {
        requestAnimationFrame(animationLoopCanvas)
      } else if (!toogleAnimation) {
        cancelAnimationFrame(animationLoopCanvas)
        parCtxCanvas.reset()
        parCtxCanvas.fillStyle = "black"
        parCtxCanvas.fillRect(0, 0, parCanvas.width, parCanvas.height)
      }
    }
    animationLoopCanvas()
*/