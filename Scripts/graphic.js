//  1.1- Canvas Bars configuration
export const myCanvas = document.querySelector('#myCanvas')
export const canvasCtx = myCanvas.getContext('2d')
export const WIDTH = myCanvas.width
export const HEIGHT = myCanvas.height

export const toogleCircleBtn = document.querySelector("#changeCircleBtn")

canvasCtx.fillStyle = 'rgb(0,0,0)'
canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)

//  1.2.-  Canvas Amplitud of wave
export const canvasGain = document.querySelector("#canvasGain")
export const ctxCanvasGain = canvasGain.getContext("2d")

export const canvasGainWidth = canvasGain.width
export const canvasGainHeight = canvasGain.height

ctxCanvasGain.fillStyle = 'rgb(0,0,0)'
ctxCanvasGain.fillRect(0, 0, canvasGainWidth, canvasGainHeight)

//  2.-  Info of Song
export const elemImgAlbumOfSong = document.querySelector("#imageAlbumOfSong")
export const elemContInfoSong = document.querySelector("#contInfoSong")
export const elemTitleSongOfAlbum = document.querySelector("#titleSongOfAlbum")
export const elemVocalsOfSong = document.querySelector("#vocalsOfSong")
export const elemInfoAlbum = document.querySelector("#infoAlbum")
export const elemInfoYear = document.querySelector("#infoYear")
export const elemInfoDuration = document.querySelector("#infoDuration")

//  3.-  Icons google
export const pauseIcon = `<span class="material-symbols-outlined pause">pause_circle</span>`;
export const playIcon = `<span class="material-symbols-outlined play">play_circle</span>`;
export const replayIcon = `<span class="material-symbols-outlined replay">replay</span>`;
export const mutedIcon = '<span class="material-symbols-outlined volume_muted">volume_off</span>'
export const notMutedIcon = '<span class="material-symbols-outlined volume_Notmuted">volume_up</span>'

export const speakerIcon = '<span class="material-symbols-outlined">speaker</span>'
export const spacialTrackingIcon = '<span class="material-symbols-outlined stereoChannel">spatial_tracking</span>'
export const spacialRightIcon = '<span class="material-symbols-outlined not_stereoChannel">spatial_audio_off</span>'

export const elemSpanMicro = document.querySelector("#spanMicro")
// export const microphoneOn ='<span class="material-symbols-outlined">mic</span>'
// export const microphoneOff ='<span class="material-symbols-outlined">mic_off</span>'