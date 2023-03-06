import { randomNumber, calculateIndex, setInfoSong } from "./functions.js"
import {
  audioElement, endSeekBar, playPauseButton, seekBar, elemSelectSong, elemSelectAlbum, buttonSelectAlbum,
  indexSongActual,
  currentSeekBar, volumeDown, volumeUp, volumeControl, mutedVolume,
  pannerElement, elemInfoStereo, channelLeft, channelRight, stereoLeft, stereoRight, toogleStereoButton,
  shuffleBtn, previusBtn, resumeBtn, nextBtn, repeatBtn, microphoneButton
} from "./initialization.js"
import {
  audioState, audioCtx, gainNode, pannerStereo, myNewCanvas, newCtx,
  elemPercentageVolume
} from "./main.js"
import {
  playIcon, replayIcon, pauseIcon, mutedIcon, notMutedIcon, spacialRightIcon, spacialTrackingIcon,
  elemSpanMicro, elemImgAlbumOfSong, elemTitleSongOfAlbum, elemVocalsOfSong, elemInfoAlbum,
  elemInfoYear, elemInfoDuration, elemContInfoSong
} from "./graphic.js"
import dataSongsBeatles from "./dataSongs.js"
import { amplitudeMain } from "./amplitude.js"


// let albumIsSelected
let fileAlbumName
let fileSong
let durationMinuten

// 1.-  Event of audio element "audioElement":  "loadeddata" => definition of "durationMinuten" and "endSeekbar.innerHTML"
audioElement.addEventListener("loadeddata", function () {
  durationMinuten = (this.duration / 60).toFixed(2);
  endSeekBar.innerHTML = `${durationMinuten}m`
}, false)

// Select our play button
//  2.-  Event "click" in the button "playPause"  (click => togglePlayPause)
//  "Play" or "pause" functionality
playPauseButton.addEventListener("click", () => {
  // Check if context is in "suspended" state (autoplay policy)
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  // "Play" or "pause" the track depending on state
  if (playPauseButton.dataset.playing === "false") {
    playPauseButton.innerHTML = pauseIcon;
    audioElement.play();
    playPauseButton.dataset.playing = "true";

    elemPercentageVolume.classList.remove("valueMuted")
    elemPercentageVolume.classList.add("valueNotMuted")
    seekBar.classList.remove("seekBarNotPlay")
    seekBar.classList.add("seekBarPlay")

    elemContInfoSong.classList.remove("contInfoleftNotActiv")
    elemContInfoSong.classList.add("contInfoleftActiv")

    myNewCanvas.style.animation = 'rotateRecord 18s linear infinite'
  } else if (playPauseButton.dataset.playing === "true") {
    playPauseButton.innerHTML = playIcon;
    audioElement.pause();
    playPauseButton.dataset.playing = "false";

    elemPercentageVolume.classList.remove("valueNotMuted")
    elemPercentageVolume.classList.add("valueMuted")
    seekBar.classList.remove("seekBarPlay")
    seekBar.classList.add("seekBarNotPlay")

    elemContInfoSong.classList.remove("contInfoleftActiv")
    elemContInfoSong.classList.add("contInfoleftNotActiv")

    myNewCanvas.style.animation = 'none'
  }
}, false);

//  Event "ende" => dataset.plaing = "false"
audioElement.addEventListener("ended", () => {
  playPauseButton.innerHTML = replayIcon;
  playPauseButton.dataset.playing = "false";

  elemContInfoSong.classList.remove("contInfoleftActiv")
  elemContInfoSong.classList.add("contInfoleftNotActiv")
}, false);

// 3.1.-  Event 'change' in the "select" of albums ('change' => "fileAlbum" is value selected)
elemSelectAlbum.addEventListener('change', function (ev) {
  const optionElementAlbum = document.querySelectorAll(".optionAlbums")
  fileAlbumName = optionElementAlbum[ev.target.selectedIndex].value
}, false)

buttonSelectAlbum.addEventListener('click', () => {
  let arraySongs = []

  //  1.-  Remove alles optioElem of elemSelectSong
  let optionsOfSelectSongs = document.querySelectorAll(".optionSongs")
  for (let i = 0; i < optionsOfSelectSongs.length; i++) {
    optionsOfSelectSongs[i].remove()
  }

  //uploadSongs(fileAlbumName, dataSongsBeatles, elemSelectSong)

  /////////////////////////////////
  //  2.-  Create options elements in the element select of songs (elemSelectSong)
  for (let i = 0; i < dataSongsBeatles.length; i++) {
    for (let j = 0; j < dataSongsBeatles[i].album.length; j++) {
      if (fileAlbumName === dataSongsBeatles[i].album[j]) {
        arraySongs.push({ title: dataSongsBeatles[i].title, song: dataSongsBeatles[i].mp3 })
      }
    }
  }

  arraySongs.map(elem => {
    const optionElem = document.createElement("option")
    optionElem.classList.add("optionSongs")
    optionElem.value = elem.song
    optionElem.innerHTML = `${elem.title}`
    elemSelectSong.appendChild(optionElem)
  })
  return arraySongs
  ////////////////////////////////
}, false)

// 3.2-  Event 'change' in the "select" of songs  ('change' => "fileSong" is value selected)
elemSelectSong.addEventListener('change', function (ev) {
  const optionElementSongs = document.querySelectorAll(".optionSongs")
  fileSong = optionElementSongs[ev.target.selectedIndex].value
  const nameOfSong = optionElementSongs[ev.target.selectedIndex].innerHTML
  const indexOfSong = calculateIndex(nameOfSong, dataSongsBeatles)

  setInfoSong(indexOfSong, dataSongsBeatles, elemImgAlbumOfSong, elemVocalsOfSong, elemTitleSongOfAlbum, elemInfoAlbum,
    elemInfoYear, elemInfoDuration, newCtx)

}, false)

buttonSelectSong.addEventListener('click', () => {
  audioElement.setAttribute('src', fileSong);
  playPauseButton.dataset.playing = "false";
  playPauseButton.innerHTML = playIcon;
}, false)

//  4.- Events in the audioElement (timeupdate, ended and canplay)
//  4.1.- Event "timeupdate" in the audioElement (timeupdate ==> setProgress)
audioElement.addEventListener('timeupdate', setProgress);
function setProgress() {
  currentSeekBar.innerHTML = `${((100 * audioElement.currentTime) / (durationMinuten * 60)).toFixed(2)}%`;
  if (audioElement.currentTime === 0 || isNaN((100 * audioElement.currentTime) / (durationMinuten * 60))) currentSeekBar.innerHTML = '0:00%'
  seekBar.value = audioElement.currentTime;
}

//  4.2.- Event "ended" in the audioElement (ended==> onEnd).  End of play music in the audioElement
audioElement.addEventListener('ended', onEnd);
function onEnd() {
  playPauseButton.innerHTML = replayIcon;
  audioElement.currentTime = 0;
  seekBar.value = 0;
  audioState.isReplay = true;
  elemContInfoSong.classList.remove(".contInfoleftActiv")
  elemContInfoSong.classList.add(".contInfoleftNotActiv")
}

//  4.3.- Event "canplay" in the audioElement (canplay ==> setDuration)
audioElement.addEventListener('canplay', setDuration);
function setDuration() {
  seekBar.max = audioElement.duration;
}

//  4.4.- Event "muted" in the mutedVolume (muted => !muted)
mutedVolume.addEventListener('click', () => {
  if (mutedVolume.value === "false") {
    mutedVolume.innerHTML = mutedIcon;
    mutedVolume.value = "true"
    audioElement.muted = true
    elemPercentageVolume.classList.remove("valueNotMuted")
    elemPercentageVolume.classList.add("valueMuted")
  } else {
    mutedVolume.innerHTML = notMutedIcon;
    mutedVolume.value = "false"
    audioElement.muted = false
    elemPercentageVolume.classList.remove("valueMuted")
    elemPercentageVolume.classList.add("valueNotMuted")
  }
}, false)

//  4.5.- Events "change volume" in the buttonVolume 
volumeDown.addEventListener('click', () => {
  if (gainNode.gain.value >= 0.10) {
    gainNode.gain.value = gainNode.gain.value - 0.1;
  } else {
    gainNode.gain.value = 0;
  }
  volumeControl.value = gainNode.gain.value
  elemPercentageVolume.innerHTML = `${(gainNode.gain.value * 100 / 3.4).toFixed(2)}%`
})
volumeUp.addEventListener('click', () => {
  if (gainNode.gain.value <= 3.3) {
    gainNode.gain.value = gainNode.gain.value + 0.1;
  } else {
    gainNode.gain.value = 3.4;
  }
  volumeControl.value = gainNode.gain.value
  elemPercentageVolume.innerHTML = `${(gainNode.gain.value * 100 / 3.4).toFixed(2)}%`
})

// 5.-  Event "input" in the bar (input type "range) "seekBar", (input => onSeek)
seekBar.addEventListener('input', onSeek);
function onSeek(evt) {
  audioElement.currentTime = evt.target.value;
}
seekBar.addEventListener('change', function () {
  this.style.background = `linear-gradient('red' ${audioElement.currentTime}, 'transparent')`;
})

// 6.-  Event "input" in the bar (input type "range") "volumeControl"
volumeControl.addEventListener("input", (ev) => {
  gainNode.gain.value = ev.target.value;
  volumeControl.value = ev.target.value

  elemPercentageVolume.innerHTML = `${(ev.target.value * 100 / 3.40).toFixed(2)}%`
}, false)

volumeControl.addEventListener('change', (ev) => {
  gainNode.gain.value = ev.target.value
  volumeControl.value = ev.target.value
  elemPercentageVolume.innerHTML = `${(ev.target.value * 100 / 3.40).toFixed(2)}%`
}, false)

//  7.- Event 'input' and 'change' in the bar range of stereoPanner
pannerElement.addEventListener("input", (ev) => {
  pannerStereo.pan.value = ev.target.value
  const porcentageLeft = -ev.target.value * 100
  const porcentageRight = ev.target.value * 100
  channelLeft.innerHTML = `L = ${porcentageLeft}%`
  channelRight.innerHTML = `R = ${porcentageRight}%`
}, false);

//  7.1.-  Events "change channels stereo" in the button Speakers
stereoLeft.addEventListener('click', () => {
  if (pannerStereo.pan.value >= -0.90) {
    pannerStereo.pan.value = pannerStereo.pan.value - 0.1;
  } else {
    pannerStereo.pan.value = -1;
  }
  pannerElement.value = pannerStereo.pan.value
  channelLeft.innerHTML = `L = ${(pannerStereo.pan.value * 100).toFixed(0)}%`
  channelRight.innerHTML = `R = ${-(pannerStereo.pan.value * 100).toFixed(0)}%`
})
stereoRight.addEventListener('click', () => {
  if (pannerStereo.pan.value <= 0.90) {
    pannerStereo.pan.value = pannerStereo.pan.value + 0.1;
  } else {
    pannerStereo.pan.value = 1;
  }
  pannerElement.value = pannerStereo.pan.value
  channelLeft.innerHTML = `L = ${-(pannerStereo.pan.value * 100).toFixed(0)}%`
  channelRight.innerHTML = `R = ${(pannerStereo.pan.value * 100).toFixed(0)}%`
})

//  7.2.-  Event "toggle pannerStereo" in the button
toogleStereoButton.addEventListener('click', function () {
  // "Stereo" or "mono" the audio channels depending on state
  console.log()
  if (this.dataset.playing === "false") {
    this.innerHTML = spacialRightIcon
    this.dataset.playing = "true"
    pannerStereo.pan.value = -1

    elemInfoStereo.classList.remove("valueStereo")
    elemInfoStereo.classList.add("valueNotStereo")
  } else {
    this.innerHTML = spacialTrackingIcon
    this.dataset.playing = "false"
    pannerStereo.pan.value = 0

    elemInfoStereo.classList.remove("valueNotStereo")
    elemInfoStereo.classList.add("valueStereo")
  }
}, false)

//  8.-  Events of control flown buttons
let countSong = 0
let indexSong = indexSongActual
//  8.1.- Random song
// export let newUrlImgSong
shuffleBtn.addEventListener('click', () => {
  indexSong = randomNumber(0, dataSongsBeatles.length - 1)
  setInfoSong(indexSong, dataSongsBeatles, elemImgAlbumOfSong, elemVocalsOfSong, elemTitleSongOfAlbum, elemInfoAlbum,
    elemInfoYear, elemInfoDuration, newCtx)

  fileSong = dataSongsBeatles[indexSong].mp3
  audioElement.setAttribute('src', fileSong);
  audioElement.play()
  playPauseButton.dataset.playing = "true";
}, false)

//  8.2.- Previus song
previusBtn.addEventListener('click', () => {
  const indexPreviusSong = indexSong + countSong - 1
  indexSong = indexPreviusSong

  if (indexSong < dataSongsBeatles.length) {
    fileSong = dataSongsBeatles[indexSong].mp3
  } else {
    fileSong = dataSongsBeatles[0].mp3
  }
  setInfoSong(indexSong, dataSongsBeatles, elemImgAlbumOfSong, elemVocalsOfSong, elemTitleSongOfAlbum, elemInfoAlbum,
    elemInfoYear, elemInfoDuration, newCtx)

  audioElement.setAttribute('src', fileSong);
  audioElement.play()
  playPauseButton.dataset.playing = "true";
}, false)

//  8.3.-  button de enmedio

//  8.4.-  Next song
nextBtn.addEventListener('click', () => {
  const indexNextSong = indexSong + countSong + 1
  indexSong = indexNextSong

  if (indexSong < dataSongsBeatles.length) {
    fileSong = dataSongsBeatles[indexSong].mp3
  } else {
    fileSong = dataSongsBeatles[0].mp3
  }
  setInfoSong(indexSong, dataSongsBeatles, elemImgAlbumOfSong, elemVocalsOfSong, elemTitleSongOfAlbum, elemInfoAlbum,
    elemInfoYear, elemInfoDuration, newCtx)

  audioElement.setAttribute('src', fileSong);
  audioElement.play()
  playPauseButton.dataset.playing = "true";
}, false)

//  8.5.-  Repeat track
repeatBtn.addEventListener('click', () => {
  audioElement.currentTime = 0
}, false)


//  9.-  Event "click" in the button "btn-microphone"  (click => toggleMicrophone)
//  "Play" or "pause" functionality of the microphone
export let toogleAnimation = false
microphoneButton.addEventListener("click", function () {
  // "On" or "Off" the microphone depending on state
  if (this.dataset.playing === "true") {
    elemSpanMicro.classList.remove("microOff")
    elemSpanMicro.classList.add("microOn")
    elemSpanMicro.innerHTML = 'mic'
    this.dataset.playing = "false"
    toogleAnimation = !toogleAnimation
    amplitudeMain()

  } else if (this.dataset.playing === "false") {
    elemSpanMicro.classList.remove("microOn")
    elemSpanMicro.classList.add("microOff")
    elemSpanMicro.innerHTML = 'mic_off'
    this.dataset.playing = "true"
    toogleAnimation = !toogleAnimation
    amplitudeMain()
  }
}, false);

// 10.-  Event 'change' in the canvas "myCanvasAmplitude"
//  Analyser Amplitude: analyserAmp()
// export function analyserAmp(parCanvas, parCtxCanvas, parAudioCtx, parContCanvas, parMyNewCanvas, parNewCtx, parAnalyser, parfftSize) {
//   const toogleCircleBtn = document.querySelector("#changeCircleBtn")

//   //  1.-   Connects of AudioNodes:
//   //  1.1-  Connect the "track" (sound of font audioNode) to the node of Gain: "gainNode" (track => gainNode)
//   track.connect(gainNode);
//   //  1.2.- Connect the "gainNode" to the audioNode: "pannerStereo" (gainNode => pannerStereo)
//   gainNode.connect(pannerStereo)
//   //  1.3.-  Connect the audioNode "pannerStereo" to the audioNode "analyser" (pannerStereo ==> analyzer Node)
//   pannerStereo.connect(parAnalyser);
//   //  1.4.-  Connect the node "analyser" to "destination" of system (speakers) (analyser => audioCtx.destination)
//   parAnalyser.connect(parAudioCtx.destination)

//   //  2.-  Definition of variables of analyser  (get frecuency of the sound audioNode with:  frequencyBinCount)
//   const bufferLength = parAnalyser.frequencyBinCount;
//   const dataArray = new Uint8Array(bufferLength);

//   let visualizator = "Sine wave"  //  Defect visualizator:  "Bars"

//   // 3.2-   Events of select visualizator, 'change' in the "select" of visualizator  ('change' => "visualizator" is value selected)
//   const optionElemVisualizator = document.querySelectorAll('.optionVisualizator')
//   const visualizatorSelect = document.querySelector('#selectVisuaAmp')

//   visualizatorSelect.addEventListener('change', (ev) => {
//     visualizator = optionElemVisualizator[ev.target.selectedIndex].value
//   })

//   // 3.3.-  Select Fast Fourier transfrorm size (fftSize)
//   parAnalyser.fftSize = parfftSize;  //  Fast Fourier Transform (fft)

//   // 4.-  Style of parCanvas, put image opf album in the newcanvas
//   function newCanvas(parCanvas) {
//     const styleNewCanvas = {
//       display: 'flex',
//       position: 'absolute',
//       top: '15px',
//       right: '15px',
//       width: '120px',
//       height: '120px',
//       padding: '0%',
//       margin: '0% auto',
//       borderRadius: '50%',
//       border: '1px solid v.$backgroundColorHellGrayT',
//       backgroundColor: 'black',
//       zIndex: '50'
//     }
//     for (const atributteCSS in styleNewCanvas) {
//       parCanvas.style[atributteCSS] = styleNewCanvas[atributteCSS]
//     }
//     parContCanvas.appendChild(parCanvas)
//   }

//   newCanvas(parMyNewCanvas)
//   imageInCanvas(urlImgSong, parNewCtx)

//   // 5.-  Switch of type of frecuency visualizator ("Bars", "Hell Doom", "Fireworks", "Circles Rainbow")
//   function drawAmplitudeSound() {
//     let x
//     switch (visualizator) {
//       case "Sine wave":
//         toogleCircleBtn.style.display = 'none'
//         visualizerSine(bufferLength, x)
//         // visualizerBars(bufferLength, x)
//         break;
//       case "Hell Doom":
//         toogleCircleBtn.style.display = 'none'
//         visualizatorHell(bufferLength, x)
//         break
//       case "Fireworks":
//         toogleCircleBtn.style.display = 'none'
//         visualizatorFirework(bufferLength, x)
//         break
//       case "Circles Rainbow":
//         toogleCircleBtn.style.display = 'block'
//         visualizatorCircles(bufferLength)
//         // visualizator2(bufferLength)
//         break
//       case "no se":
//         toogleCircleBtn.style.display = 'none'
//         break
//       default:
//       // code block
//     }
//     requestAnimationFrame(drawAmplitudeSound);
//   }

//   //  6.1-  Functions definitions of the frecuency visualizers:  visualizerBars 
//   function visualizerBars(bufferLength, x) {
//     parCanvas.style.filter = 'blur(0px) contrast(3)'
//     parAnalyser.fftSize = parfftSize;  //  Fast Fourier Transform (fft)
//     parAnalyser.getByteFrequencyData(dataArray);
//     parCtxCanvas.reset()
//     parCtxCanvas.fillStyle = 'rgb(0, 0, 0)';
//     parCtxCanvas.fillRect(0, 0, WIDTH, HEIGHT);
//     const barWidth = (parCanvas.width / bufferLength) + 0.5;
//     x = 0

//     for (let i = 0; i < bufferLength; i++) {
//       const barHeight = dataArray[i] * 0.5
//       const g = i * 1.5 / bufferLength
//       const b = i * 1.5
//       const colorRed = i * barHeight / randomNumber(5, 6)
//       const colorGreen = 255 * 3 * g
//       const colorBlue = 255 - b

//       const colorRandom = `rgb(${colorRed}, ${colorGreen}, ${colorBlue})`
//       parCtxCanvas.fillStyle = colorRandom
//       parCtxCanvas.fillRect(x, parCanvas.height - barHeight, barWidth, barHeight);
//       parCtxCanvas.beginPath()
//       parCtxCanvas.fillStyle = "white"
//       parCtxCanvas.arc(x, parCanvas.height - barHeight - 3, 0.5, 0, Math.PI * 2)
//       parCtxCanvas.fill()
//       x += barWidth + 0.6;
//     }
//   }

//   let bars = []
//   let toogleLoop = false

//   function visualizerSine(bufferLength, x) {
//     //  1.-  Class Bar
//     class Bar {
//       constructor(theCanvas, theCtxCanvas, posX, posY, barWidth, barHeight, barColor, index) {
//         this.canvas = theCanvas
//         this.contextCanvas = theCtxCanvas
//         this.posX = posX
//         this.posY = posY
//         this.barWidth = barWidth
//         this.barHeight = barHeight
//         this.barColor = barColor
//         this.index = index
//       }

//       update(micInput) {
//         const sound = micInput * 165
//         if (sound > 0 && sound > this.barHeight) {
//           this.barHeight = sound
//         } else if (sound > 0 && sound > this.barHeight) {
//           this.barHeight = this.barHeight * 0.99
//         } else if (sound < 0 && sound < this.barHeight) {
//           this.barHeight = sound
//         } else {
//           this.barHeight = this.barHeight * 0.99
//         }
//       }

//       drawMicrophone(ctxCanvas) {
//         ctxCanvas.fillStyle = this.barColor
//         ctxCanvas.fillRect(this.posX, this.posY, this.barWidth, this.barHeight)
//       }

//       drawVisualizator(ctxCanvas) {  // (ctxCanvas, volume)
//         ctxCanvas.fillStyle = this.barColor
//         ctxCanvas.fillRect(this.posX, this.posY, this.barWidth, this.barHeight)
//       }
//     }

//     const myMicro = new Microphone()
//     const bars = []

//     function createBars(parCanvas, parCtxCanvas) {
//       for (let i = 0; i < 256; i++) {
//         const colorsBar = 'hsl(' + i * 2 + ', 100%, 50%)'
//         bars.push(new Bar(parCtxCanvas, parCtxCanvas, i * 2 * parCanvas.width / 256, parCanvas.height / 2, parCanvas.width * 2 / 256, 0, colorsBar, i))
//       }
//     }

//     createBars(parCanvas, parCtxCanvas)
//     ///////////////////////////////////////////////


//     //  1.-  Function of animation by amplitude loop
//     function animationLoopCanvas() {
//       if (myMicro.initialized) {
//         parCtxCanvas.clearRect(0, 0, parCanvas.width, parCanvas.height)
//         parCtxCanvas.fillStyle = "black"
//         parCtxCanvas.fillRect(0, 0, parCanvas.width, parCanvas.height)
//         const samples = myMicro.getSamples()
//         bars.forEach(function (bar, i) {
//           bar.update(samples[i])
//           bar.drawVisualizator(parCtxCanvas)
//         })
//       }
//       if (toogleAnimation) {
//         requestAnimationFrame(animationLoopCanvasGain)
//       } else if (!toogleAnimation) {
//         cancelAnimationFrame(animationLoopCanvasGain)
//         parCtxCanvas.reset()
//         parCtxCanvas.fillStyle = "black"
//         parCtxCanvas.fillRect(0, 0, parCanvas.width, parCanvas.height)
//       }
//     }
//     animationLoopCanvas()
//   }

//   //  
//   drawAmplitudeSound()

// }