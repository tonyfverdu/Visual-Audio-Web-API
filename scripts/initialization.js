//  1.- HTMLElements (songSelect, optionsElement, fileSong, buttonSelectSong, canvasBars, canvasCircles, playPauseButton)
export const songSelect = document.querySelector('#selectSong')
export const optionElementSongs = document.querySelectorAll('.optionSongs')

export const buttonSelectSong = document.querySelector('#buttonSelectSong')

//  Configuration audio element
export const playPauseButton = document.querySelector('.playPause')
export const seekBar = document.querySelector('.seekBar')
seekBar.value = 0
export const iniSeekBar = document.querySelector('.IniSeekBar')
iniSeekBar.innerHTML = `0:00m`
export const endSeekBar = document.querySelector('.EndSeekBar')
export const currentSeekBar = document.querySelector('.CurrentSeekBar')
currentSeekBar.innerHTML = '0:00%'
export const volumenBar = document.querySelector('.volume')
volumenBar.value = 50
export const mutedVolume = document.querySelector(".mutedButton")
mutedVolume.value = false
export const elemValueVolume = document.querySelector("#valueMuted")
elemValueVolume.innerHTML = `${volumenBar.value}%`
export const volumeDown = document.querySelector("#buttonDown")
export const volumeUp = document.querySelector("#buttonUp")



