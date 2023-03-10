import { audioCtx, analyser, track, gainNode, pannerStereo, myNewCanvas, newCtx } from "./main.js"
import { contCanvas, urlImgSong, toogleCircleBtn } from "./initialization.js"
import { randomNumber, randomColor, imageInCanvas } from "./functions.js"
// import { myCanvas, canvasCtx, WIDTH, HEIGHT } from "./graphic.js"


//  Analyser Frecuency:  displayFrecWave()
export default function displayFrecWave(myCanvas, canvasCtx, IdAnimation, optSelectDisplayFrec) {
  //  0.-  Config the System of Audio
  //  1.-  Definition of variables of analyser
  analyser.minDecibels = -90
  analyser.maxDecibels = -10

  //     1.-   Connects of AudioNodes
  //     1.1-  Connect the "track" (sound of font audioNode) to the node of Gain: "gainNode" (track => gainNode)
  track.connect(gainNode);
  //     1.2.- Connect the "gainNode" to the audioNode: "pannerStereo" (gainNode => pannerStereo)
  gainNode.connect(pannerStereo)
  //    1.3.-  Connect the audioNode "pannerStereo" to the audioNode "analyser" (pannerStereo ==> analyzer Node)
  pannerStereo.connect(analyser);
  //    1.4.-  Connect the node "analyser" to "destination" of system (speakers) (analyser => audioCtx.destination)
  analyser.connect(audioCtx.destination)

  //  2.-  Definition of variables of analyser  (get frecuency of the sound audioNode with:  frequencyBinCount)
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  // 3.-    Vidualizators of frecuencys
  // 3.1-   Events of select visualizator, 'change' in the "select" of visualizator  ('change' => "visualizator" is value selected)
  const optionElemVisualizator = document.querySelectorAll('.optionVisualizator')
  const visualizatorSelect = document.querySelector('#selectVisuaFrec')

  visualizatorSelect.addEventListener('change', (ev) => {
    optSelectDisplayFrec = optionElemVisualizator[ev.target.selectedIndex].value
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
    contCanvas.appendChild(parCanvas)
  }

  newCanvas(myNewCanvas)
  imageInCanvas(urlImgSong, newCtx)

  let barWidth = (myCanvas.width / bufferLength) + 1
  let x

  // 5.-  Switch of type of frecuency visualizator ("Bars", "Hell Doom", "Fireworks", "Circles Rainbow")
  function drawFrecuencySound() {
    cancelAnimationFrame(IdFauerwerk)
    analyser.fftSize = 2048;
    analyser.getByteFrequencyData(dataArray);

    switch (optSelectDisplayFrec) {
      case "Bars":
        myCanvas.style.filter = 'blur(0px) contrast(3)'
        toogleCircleBtn.style.display = 'none'
        cancelAnimationFrame(IdAnimation)
        visualizerBars(bufferLength, x)
        break;
      case "Hell Doom":
        myCanvas.style.filter = 'blur(2.5px) contrast(4)'
        toogleCircleBtn.style.display = 'none'
        cancelAnimationFrame(IdAnimation)
        visualizerHell(bufferLength, x)
        break
      case "Fireworks":
        myCanvas.style.filter = 'blur(0px) contrast(3)'
        toogleCircleBtn.style.display = 'none'
        cancelAnimationFrame(IdAnimation)
        visualizerFirework(bufferLength, x)
        break
      case "Circles Rainbow":
        myCanvas.style.filter = 'blur(0px) contrast(3)'
        toogleCircleBtn.style.display = 'block'
        cancelAnimationFrame(IdAnimation)
        visualizerCircles(bufferLength)
        break
      case "no se":
        toogleCircleBtn.style.display = 'none'
        break
      default:
        break
    }
    IdAnimation = requestAnimationFrame(drawFrecuencySound)
  }

  //  6.1-  Functions definitions of the frecuency visualizers:  visualizerBars 
  function visualizerBars(bufferLength, x) {
    canvasCtx.reset()
    canvasCtx.fillStyle = 'rgb(0, 0, 0)'
    canvasCtx.fillRect(0, 0, myCanvas.width, myCanvas.height)

    const barWidth = (myCanvas.width / bufferLength) + 0.8;
    x = 0

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = dataArray[i] * 0.7
      const g = i * 2 / bufferLength
      const b = i * 1.9
      const colorRed = i * barHeight * 0.7 / randomNumber(4, 6)
      const colorGreen = 255 * 4 * g
      const colorBlue = 255 - b
      const colorRandom = `rgb(${colorRed}, ${colorGreen}, ${colorBlue})`

      canvasCtx.fillStyle = colorRandom
      canvasCtx.fillRect(x, myCanvas.height - barHeight, barWidth, barHeight);
      canvasCtx.beginPath()
      canvasCtx.fillStyle = "white"
      canvasCtx.arc(x, myCanvas.height - barHeight - 3, 0.5, 0, Math.PI * 2)
      canvasCtx.fill()
      x += barWidth + 1;
    }
  }

  //  6.2-  Functions definitions of the frecuency visualizers:  visualizatorHell 
  function visualizerHell(bufferLength, x) {
    canvasCtx.reset()
    canvasCtx.fillStyle = 'rgb(0, 0, 0)'
    canvasCtx.fillRect(0, 0, myCanvas.width, myCanvas.height)

    const barWidth = (myCanvas.width / bufferLength) + 0.9

    const colorFire = ['red', 'rgb(255, 51, 0)', 'rgb(255, 128, 128)', 'rgb(255, 180, 180)', 'orange', 'rgb(255, 102, 102)', 'rgb(255, 153, 153)', 'rgb(204, 255, 102)',
      'rgb(204, 255, 51)', 'rgb(255, 255, 153)', 'rgb(255, 255, 102)', 'rgb(255, 255, 0)', 'rgb(230, 255, 230)', 'rgb(255, 230, 230)', 'rgb(255, 255, 230)', 'white']

    x = 0
    for (let i = 0; i < bufferLength; i++) {
      const barHeight = dataArray[i] * 0.6

      //  Colors of bars
      const colorRed = i * barHeight / 4
      const colorGreen = i * randomNumber(3, 4)
      const colorBlue = randomNumber(50, 255)

      const indexColorFire = randomNumber(0, colorFire.length - 1)
      canvasCtx.fillStyle = colorFire[indexColorFire]
      canvasCtx.fillRect((myCanvas.width / 2) - x, myCanvas.height - barHeight - randomNumber(8, 36), barWidth, randomNumber(2, 12))

      const colorRGB = `rgb(${colorRed}, ${colorGreen}, ${colorBlue})`
      canvasCtx.fillStyle = colorRGB
      canvasCtx.fillRect((myCanvas.width / 2) - x, myCanvas.height - barHeight, barWidth, barHeight)
      x += barWidth + 0.7
    }

    x = myCanvas.width / 2
    for (let i = 0; i < bufferLength; i++) {
      const barHeight = dataArray[i] * 0.6

      //  Colors of bars
      const colorRed = i * barHeight / 5
      const colorGreen = i * randomNumber(3, 4)
      const colorBlue = randomNumber(50, 255)

      const indexColorFire = randomNumber(0, colorFire.length - 1)
      canvasCtx.fillStyle = colorFire[indexColorFire]
      canvasCtx.fillRect(x, myCanvas.height - barHeight - randomNumber(8, 36), barWidth, randomNumber(2, 12))

      const colorRGB = `rgb(${colorRed}, ${colorGreen}, ${colorBlue})`
      canvasCtx.fillStyle = colorRGB
      canvasCtx.fillRect(x, myCanvas.height - barHeight, barWidth, barHeight)
      x += barWidth + 0.7
    }
  }

  //  6.3-  Functions definitions of the frecuency visualizers:  visualizatorFirework 
  function visualizerFirework(bufferLength, x) {
    canvasCtx.reset()
    canvasCtx.fillStyle = 'rgb(0, 0, 0)'
    canvasCtx.fillRect(0, 0, myCanvas.width, myCanvas.height)

    let barWidth = ((myCanvas.width / 2) / bufferLength) + 0.9

    x = 0
    for (let i = 0; i < bufferLength; i++) {
      const randomGanancia = randomNumber(6, 8) / 10
      const barHeight = dataArray[i] * randomGanancia
      const colorHSL = 'hsl(' + i * 4 + ',100%, 50%'

      canvasCtx.lineCap = "round";
      canvasCtx.fillStyle = colorHSL
      canvasCtx.fillRect((myCanvas.width / 2) - x, myCanvas.height - barHeight, barWidth, barHeight)

      //  Colors of bars
      canvasCtx.fillStyle = randomColor()
      canvasCtx.fillRect((myCanvas.width / 2) - x, myCanvas.height - barHeight - randomNumber(randomNumber(2, 8), randomNumber(20, 68)), barWidth, randomNumber(5, 30) / 10)
      x += barWidth + 0.6
    }

    x = myCanvas.width / 2
    for (let i = 0; i < bufferLength; i++) {
      const randomGanancia = randomNumber(6, 8) / 10
      const barHeight = dataArray[i] * randomGanancia

      canvasCtx.lineCap = "round";
      const colorHSL = 'hsl(' + i * 4 + ',100%, 50%'
      canvasCtx.fillStyle = colorHSL
      canvasCtx.fillRect(x, myCanvas.height - barHeight, barWidth, barHeight)

      //  Colors of bars
      canvasCtx.fillStyle = randomColor()
      canvasCtx.fillRect(x, myCanvas.height - barHeight - randomNumber(randomNumber(2, 8), randomNumber(20, 68)), barWidth, randomNumber(5, 30) / 10)
      x += barWidth + 0.6
    }
  }

  //  6.4-  Functions definitions of the frecuency visualizers:  visualizatorCircles 
  let randomX = myCanvas.width / 2
  let randomY = myCanvas.height / 2
  let randomGanancia = randomNumber(5, 8) / 10
  const colorBackCanvas = ['white', 'gray', 'darkred', 'purple', 'navy', 'black']
  let colorCanvas = 'black'
  let contClick = 0
  let isCircle = true
  barWidth = (myCanvas.width / bufferLength) * randomNumber(1, 3) + randomNumber(1, 3)
  let barHeight

  let Fauerwerk = false
  let toogleFeuerwerk = false
  let IdFauerwerk

  function appearCircle() {
    IdFauerwerk = requestAnimationFrame(appearCircle)

    myCanvas.style.filter = `blur(${randomNumber(0, 2)}px) contrast(${randomNumber(1, 3)})`
    randomX = randomNumber(4, myCanvas.width - 4)
    randomY = randomNumber(4, myCanvas.height - 4)
    circle(randomX, randomY, barWidth)
    isCircle = !isCircle
  }

  function circle(bufferLength, parRandomX, parRandomY, barWidth) {
    randomGanancia = randomNumber(5, 8) / 10
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] * randomGanancia

      canvasCtx.save()
      canvasCtx.translate(parRandomX, parRandomY)

      if (toogleCircleBtn.dataset.playing === "true") {
        const hue = i * 10
        canvasCtx.fillStyle = 'hsl(' + hue + ',100%,50%)'
        canvasCtx.beginPath();
        canvasCtx.rotate(i + Math.PI * 8 / bufferLength)
        canvasCtx.arc(randomNumber(0, 20), barHeight * 0.4, barHeight * 0.4, 0, Math.PI / randomNumber(6, 8))
        canvasCtx.fill()
        if (toogleFeuerwerk) {
          canvasCtx.arc(0, barHeight * 2, barHeight / 80, 0, Math.PI * 2)
          canvasCtx.fill()
        }
      } else {
        if (isCircle) {
          canvasCtx.rotate(i + Math.PI * 6 / bufferLength)
        } else {
          canvasCtx.rotate(i * Math.PI * 8 / bufferLength)
        }
        //  Colors of circles
        const hue = i * 1.5
        canvasCtx.fillStyle = 'hsl(' + hue + ',100%,' + barHeight / 1.08 + '%)'
        canvasCtx.fillRect(0, 0, barWidth, barHeight)

      }
      canvasCtx.restore()
    }
  }

  toogleCircleBtn.addEventListener('click', function () {
    // "Black" or "random" the background color of canvas depending on state
    const indexColor = randomNumber(0, colorBackCanvas.length)
    colorCanvas = colorBackCanvas[indexColor]
    canvasCtx.fillStyle = colorCanvas

    //  Change form of circle:  Normal => Fauerwerk
    //  Is this a Fauerwerk?
    if (Fauerwerk) {                    //  <<==  Yes, it's
      this.dataset.playing = "true"
    } else {                            //  <<==  No, it's not
      this.dataset.playing = "false"
      toogleFeuerwerk = !toogleFeuerwerk
    }
    appearCircle()
    Fauerwerk = !Fauerwerk
  }, false)

  function visualizerCircles(bufferLength) {
    canvasCtx.reset()
    canvasCtx.fillStyle = 'rgb(0, 0, 0)'
    canvasCtx.fillRect(0, 0, myCanvas.width, myCanvas.height)

    contClick += 1

    //  Fast Fourier Transform (fft)
    const arrayFFT = [512, 1024, 2048, 4096]
    const randomIndex = randomNumber(0, arrayFFT.length - 1)
    analyser.fftSize = arrayFFT[randomIndex]

    if (contClick < 2) appearCircle()

    canvasCtx.fillStyle = colorCanvas
    canvasCtx.fillRect(0, 0, myCanvas.width, myCanvas.height)
    barWidth = (myCanvas.width / bufferLength) * randomNumber(1, 3) + randomNumber(2, 4)
    circle(bufferLength, randomX, randomY, barWidth)
  }

  //  ****************************************************  function loop draw analyzer:  drawFrecuencySound()
  drawFrecuencySound()
}