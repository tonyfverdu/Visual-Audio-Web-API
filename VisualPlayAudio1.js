import { canvasBars, canvasBarCtx, WIDTH_BAR, HEIGHT_BAR } from "./scripts/graphic.js"
import { randomColor, randomNumber } from "./scripts/functions.js"

//  A.-  Definition init of system
//  0.-  AudioContext of System
//  1.2.-  Definition of variable "audioState", 2 values: replay oder paused
export let audioState = {
  isPlay: false,
  isReplay: false,
  isPaused: true,
}

//  2.-  Connect the "audio source" (AudioNode "audioElement") with the "context of audio" ("audioCtx"), 
//  so we define the audio source of the audio graph.
export const audio = new Audio("../assets/mp3/John Lennon 'Imagine'.mp3");
audio.setAttribute('src', `./assets/mp3/John Lennon 'Imagine'.mp3`)
audio.preload = "auto"
audio.volume = 0.5

export const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
const source = audioCtx.createMediaElementSource(audio);
const analyser = audioCtx.createAnalyser();  //  create a analyser of audio

//  3.-  Connect the analyser with the font of audio  (source Node ==> analyzer Node)
source.connect(analyser);

//  4.-  Connect the "destination of audio" with the "analyser" node  (analyzer ==> destination defect)
analyser.connect(audioCtx.destination);

//  5.-  Definition de "buffer of audio" and the "dataArray"
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

//  E.-  Draw the exit of analycer in canvas
let visualizator = "Bars"
//  6.-  Events of select visualizator, 'change' in the "select" of visualizator  ('change' => "visualizator" is value selected)
const optionElementVisualizator = document.querySelectorAll('.optionVisualizator')
const visualizatorSelect = document.querySelector('#selectVisualizator')

visualizatorSelect.addEventListener('change', (ev) => {
  visualizator = optionElementVisualizator[ev.target.selectedIndex].value
  console.log(visualizator)
})
analyser.fftSize = 2048;  //  Fast Fourier Transform (fft)
function typeVisualizator (parType) {
  canvasBarCtx.font = "0.6rem Arial";
  canvasBarCtx.fillStyle = "white";
  canvasBarCtx.textAlign = "center";
  canvasBarCtx.fillText(`Visualizator of ${parType}`, 68, 18);
}

function drawBarsSound() {
  let x
  switch (visualizator) {
    case "Bars":
      visualizerBars(bufferLength, x)
      break;
    case "Hell Doom":
      visualizatorHell(bufferLength, x)
      break;
    case "Fireworks":
      visualizatorFirework(bufferLength, x)
      break;
    case "Circles":
      visualizatorCircles(bufferLength)
      break;
    default:
    // code block
  }

  requestAnimationFrame(drawBarsSound);
}

function visualizerBars(bufferLength, x) {
  canvasBars.style.filter = 'blur(0px) contrast(2)'
  analyser.fftSize = 4096;  //  Fast Fourier Transform (fft)
  analyser.getByteFrequencyData(dataArray);
  canvasBarCtx.fillStyle = 'rgb(0, 0, 0)';
  canvasBarCtx.fillRect(0, 0, WIDTH_BAR, HEIGHT_BAR);
  const barWidth = (canvasBars.width / bufferLength) + 1;
  x = 0
  typeVisualizator ('Bars')

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i] * 0.62;
    const g = i * 1.2 / bufferLength;
    const b = i * 5;
    const colorRed = i * barHeight / randomNumber(5, 10)
    const colorGreen = 255 * 4 * g;
    const colorBlue = 255 - b;

    canvasBarCtx.fillStyle = `rgb(${colorRed}, ${colorGreen}, ${colorBlue})`;
    canvasBarCtx.fillRect(x, canvasBars.height - barHeight, barWidth, barHeight);
    canvasBarCtx.fillStyle = 'white'
    canvasBarCtx.fillRect(x, canvasBars.height - barHeight, barWidth, 2)
    x += barWidth + 0.45;
  }
}

function visualizatorHell(bufferLength, x) {
  canvasBars.style.filter = 'blur(4px) contrast(6)'
  //  Fast Fourier Transform (fft)
  analyser.fftSize = 512;
  analyser.getByteFrequencyData(dataArray);
  canvasBarCtx.fillStyle = 'rgb(0, 0, 0)';
  canvasBarCtx.fillRect(0, 0, canvasBars.width, canvasBars.height);
  const barWidth = ((canvasBars.width) / bufferLength) + 0.5
  x = 0

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i] * 0.6
    x += barWidth + 0.2
    //  Colors of bars
    const colorRed = i * barHeight / 7
    const colorGreen = i * randomNumber(2, 4)
    const colorBlue = randomNumber(80, 255)
    canvasBarCtx.fillStyle = 'yellow'
    canvasBarCtx.fillRect((canvasBars.width / 2) - x, canvasBars.height - barHeight - randomNumber(6, 18), barWidth, randomNumber(4, 7))
    const colorRGB = `rgb(${colorRed}, ${colorGreen}, ${colorBlue})`

    canvasBarCtx.fillStyle = colorRGB
    canvasBarCtx.fillRect((canvasBars.width / 2) - x, canvasBars.height - barHeight, barWidth, barHeight)
  }
  x = canvasBars.width / 2 - 2
  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i] * 0.6
    x += barWidth + 0.2
    //  Colors of bars
    const colorRed = i * barHeight / 7
    const colorGreen = i * randomNumber(2, 4)
    const colorBlue = randomNumber(80, 255)
    canvasBarCtx.fillStyle = 'yellow'
    canvasBarCtx.fillRect(x, canvasBars.height - barHeight - randomNumber(6, 18), barWidth, randomNumber(4, 7))
    const colorRGB = `rgb(${colorRed}, ${colorGreen}, ${colorBlue})`

    canvasBarCtx.fillStyle = colorRGB
    canvasBarCtx.fillRect(x, canvasBars.height - barHeight, barWidth, barHeight)
  }
}

function visualizatorFirework(bufferLength, x) {
  canvasBars.style.filter = 'blur(1px) contrast(4)'
  //  Fast Fourier Transform (fft)
  analyser.fftSize = 256;
  analyser.getByteFrequencyData(dataArray);
  canvasBarCtx.fillStyle = 'rgb(0, 0, 0)';
  canvasBarCtx.fillRect(0, 0, canvasBars.width, canvasBars.height);
  const barWidth = ((canvasBars.width / 2) / bufferLength) + 1.5
  x = 0
  typeVisualizator ('Fireworks')

  for (let i = 0; i < bufferLength; i++) {
    const randomGanancia = randomNumber(6, 7) / 10
    const barHeight = dataArray[i] * randomGanancia
    //  Colors of bars
    const colorRed = i * barHeight / randomNumber(12, 18)
    const colorGreen = i * randomNumber(3, 5)
    const colorBlue = randomNumber(50, 200)
    canvasBarCtx.fillStyle = randomColor()
    canvasBarCtx.fillRect((canvasBars.width / 2) - x, canvasBars.height - barHeight - randomNumber(randomNumber(4, 8), randomNumber(20, 68)), barWidth, randomNumber(1, 3))
    const colorRGB = `rgb(${colorRed}, ${colorGreen}, ${colorBlue})`

    canvasBarCtx.fillStyle = colorRGB
    canvasBarCtx.fillRect((canvasBars.width / 2) - x, canvasBars.height - barHeight, barWidth, barHeight)
    x += barWidth + 0.2
  }
  x = canvasBars.width / 2
  for (let i = 0; i < bufferLength; i++) {
    const randomGanancia = randomNumber(6, 7) / 10
    const barHeight = dataArray[i] * randomGanancia
    //  Colors of bars
    const colorRed = i * barHeight / randomNumber(12, 18)
    const colorGreen = i * randomNumber(3, 5)
    const colorBlue = randomNumber(50, 150)
    canvasBarCtx.fillStyle = randomColor()
    canvasBarCtx.fillRect(x, canvasBars.height - barHeight - randomNumber(randomNumber(4, 8), randomNumber(20, 68)), barWidth, randomNumber(1, 3))
    const colorRGB = `rgb(${colorRed}, ${colorGreen}, ${colorBlue})`

    canvasBarCtx.fillStyle = colorRGB
    canvasBarCtx.fillRect(x, canvasBars.height - barHeight, barWidth, barHeight)
    x += barWidth + 0.2
  }
}

let randomX = canvasBars.width / 2
let randomY = canvasBars.height / 2
let randomGanancia = randomNumber(5, 9) / 10
let contClick = 0
let isCircle = true

function appearCircle() {
  setInterval(() => {
    randomX = randomNumber(10, canvasBars.width - 10)
    randomY = randomNumber(10, canvasBars.height - 10)
    isCircle = !isCircle
  }, 3000)
}

function visualizatorCircles(bufferLength) {
  canvasBars.style.filter = 'blur(0px) contrast(3)'
  canvasBars.addEventListener('mousedown', (ev) => {
    contClick += 1
    const arrayFFT = [64, 512, 1024, 2048, 4096, 8192]
    const randomIndex = randomNumber(0, arrayFFT.length - 1)
    randomGanancia = randomNumber(5, 9) / 10
    analyser.fftSize = arrayFFT[randomIndex];
    if(contClick < 2) {
      appearCircle()
    }
  })
  analyser.getByteFrequencyData(dataArray);
  canvasBarCtx.fillStyle = 'rgb(0, 0, 0)';
  canvasBarCtx.fillRect(0, 0, canvasBars.width, canvasBars.height);
  canvasBarCtx.font = "10px Comic Sans MS";
  canvasBarCtx.fillStyle = "red";
  canvasBarCtx.textAlign = "center";
  canvasBarCtx.fillText("Click the mouse here", canvasBars.width - 50, 20);
  const barWidth = (canvasBars.width / bufferLength) * 1.1 + 1
  typeVisualizator ('Circles')

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i] * randomGanancia
    canvasBarCtx.save()
    canvasBarCtx.translate(randomX, randomY)
    if (isCircle) {
      canvasBarCtx.rotate(i + Math.PI * 4 / bufferLength)
    } else {
      canvasBarCtx.rotate(i * Math.PI * 8 / bufferLength)
    }
    //  Colors of circle
    const colorHLS = 'hsl(' + i * 8 + ',' + barHeight + '%, 50%)'
    canvasBarCtx.fillStyle = colorHLS
    canvasBarCtx.fillRect(0, 0, barWidth, barHeight)
    canvasBarCtx.restore()
  }
}

drawBarsSound();


