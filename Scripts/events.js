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
  elemInfoYear, elemInfoDuration, elemContInfoSong, canvasGain
} from "./graphic.js"
import dataSongsBeatles from "./dataSongs.js"
import { amplitudeMain } from "./amplitude.js"
import { createCanvasPumpkin, removeCanvasPumpkin } from "./pumpkinSpeaker.js"

import { createContSpeech, deleteContSpeech } from "./SpeedRecognizer/speedchrecognizer.js"


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

  myNewCanvas.style.animation = 'none'
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

  myNewCanvas.style.animation = 'none'
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

    canvasGain.classList.remove('canvasGainOn')
    canvasGain.classList.add('canvasGainOff')
    
    deleteContSpeech()
    removeCanvasPumpkin()

    toogleAnimation = !toogleAnimation

  } else if (this.dataset.playing === "false") {
    elemSpanMicro.classList.remove("microOn")
    elemSpanMicro.classList.add("microOff")
    elemSpanMicro.innerHTML = 'mic_off'
    this.dataset.playing = "true"

    canvasGain.classList.remove('canvasGainOff')
    canvasGain.classList.add('canvasGainOn')

    createContSpeech()
    createCanvasPumpkin()

    toogleAnimation = !toogleAnimation
  }
  amplitudeMain()
}, false);
