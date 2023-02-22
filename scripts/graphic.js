export const canvasBars = document.querySelector('#canvasBars')

//  1.1- Canvas Bars configuration
export const canvasBarCtx = canvasBars.getContext('2d')
export const WIDTH_BAR = canvasBars.width
export const HEIGHT_BAR = canvasBars.height

canvasBarCtx.fillStyle = 'rgb(0,0,0)'
canvasBarCtx.fillRect(0, 0, WIDTH_BAR, HEIGHT_BAR)

//  2.-  Icons google
export const pauseIcon = `<span class="material-symbols-outlined pause">pause_circle</span>`;
export const playIcon = `<span class="material-symbols-outlined play">play_circle</span>`;
export const replayIcon = `<span class="material-symbols-outlined replay">replay</span>`;
export const mutedIcon = '<span class="material-symbols-outlined volume_muted">volume_off</span>'
export const notMutedIcon = '<span class="material-symbols-outlined volume_Notmuted">volume_up</span>'

//  3.-  Bars graphic
