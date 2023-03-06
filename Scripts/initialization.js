import dataSongsBeatles from "./dataSongs.js"


//export const toogleCircleBtn = document.querySelector("#changeCircleBtn")

//  0.-  Canvas
export const contCanvas = document.querySelector(".contCanvas")
export const elemMyCanvas = document.querySelector("#myCanvas")

//  1.- HTMLElements (elemSelectAlbum, elemSelectSong, buttonSelectAlbum, buttonSelectSong)
export const elemSelectAlbum = document.querySelector('#selectAlbum')
export const elemSelectSong = document.querySelector('#selectSong')

export const buttonSelectAlbum = document.querySelector('#buttonSelectAlbum')
export const buttonSelectSong = document.querySelector('#buttonSelectSong')

//  2.-  Configuration audio element
//  Song ini (dataSongsBeatles[0] from album:  albumIsSelected = "1 (2015 Version)")
let urlSong = dataSongsBeatles[0].mp3
const imageSong = dataSongsBeatles[0].image[0]
export let urlImgSong = `./assets/images/portadas/${imageSong}`
export let indexSongActual = 0

export const audioElement = document.createElement("audio")
audioElement.src = urlSong
audioElement.preload = "auto"

export const playPauseButton = document.querySelector('#btn-play-paused')
export const seekBar = document.querySelector('.seekBar')
seekBar.value = 0
export const iniSeekBar = document.querySelector('.IniSeekBar')
iniSeekBar.innerHTML = `0:00m`
export const endSeekBar = document.querySelector('.EndSeekBar')
export const currentSeekBar = document.querySelector('.currentSeekBar')
currentSeekBar.innerHTML = '0:00%'

export const volumeControl = document.querySelector("#rangeVolume");
volumeControl.value = 0.7
export const mutedVolume = document.querySelector("#toogleMutedButton")
mutedVolume.value = false

export const volumeDown = document.querySelector("#buttonDown")
export const volumeUp = document.querySelector("#buttonUp")

export const pannerElement = document.querySelector("#pannerStereo");
export const elemInfoStereo = document.querySelector("#infoStereo")
elemInfoStereo.classList.add("valueStereo")
export const channelLeft = document.querySelector("#channelLeft")
channelLeft.innerHTML = "L = 0%"
export const channelRight = document.querySelector("#channelRight")
channelRight.innerHTML = "R = 0%"
export const stereoLeft = document.querySelector("#buttonLeft")
export const stereoRight = document.querySelector("#buttonRight")

export const toogleStereoButton = document.querySelector("#toogleStereoButton")
toogleStereoButton.dataset.playing = "false"

//  3.-  Controls of Buttons
export const shuffleBtn = document.querySelector("#shuffleButton")
export const previusBtn = document.querySelector("#previusButton")
export const resumeBtn = document.querySelector("#resumeButton")
export const nextBtn = document.querySelector("#nextButton")
export const repeatBtn = document.querySelector("#repeatButton")

export const microphoneButton = document.querySelector('#btn-microphone')
export const elemMicroOff = document.querySelector("#microOff")
export const elemMicroOn = document.querySelector("#microOn")
