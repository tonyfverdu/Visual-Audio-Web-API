//  A.-  Definition init of system
//  0.-  AudioContext of System
const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

//  1.- HTMLElement (fileSong, audioElement, canvasElement, playPauseButton, seekbar and volumenBar)
const songSelect = document.querySelector('.selectSong')
const optionElement = document.querySelectorAll('option')
const buttonSelectSong = document.querySelector('.buttonSelect')
let fileSong = "./assets/mp3/John Lennon 'Imagine'.mp3"
const audio = new Audio(fileSong);
let durationMinuten
audio.preload = "auto"
const canvasElement = document.querySelector('.canvas')
const playPauseButton = document.querySelector('.playPause')
const seekBar = document.querySelector('.seekBar')
const iniSeekBar = document.querySelector('.IniSeekBar')
iniSeekBar.innerHTML = `0:00m`
const endSeekBar = document.querySelector('.EndSeekBar')
const currentSeekBar = document.querySelector('.CurrentSeekBar')
const volumenBar = document.querySelector('.volume')
const mutedVolume = document.querySelector(".mutedButton")
const elemValueVolume = document.querySelector("#valueMuted");
const volumeDown = document.querySelector("#buttonDown")
const volumeUp = document.querySelector("#buttonUp")

audio.addEventListener("loadeddata", function () {
    durationMinuten = (this.duration / 60).toFixed(2);
    endSeekBar.innerHTML = `${durationMinuten}m`
})

//  2.- Canvas configuration
const canvasCtx = canvasElement.getContext('2d')
const WIDTH = canvasElement.clientWidth
const HEIGHT = canvasElement.clientHeight

//  3.- Bars (seekbar and volumenBar) init configuration
seekBar.value = 0
currentSeekBar.innerHTML = '0:00%'
volumenBar.value = 50
elemValueVolume.innerHTML = `${volumenBar.value}%`
audio.volume = 0.5
mutedVolume.value = false

//  4.-  Messages of button (playPause)
const pauseIcon = `<span class="material-symbols-outlined pause">pause_circle</span>`;
const playIcon = `<span class="material-symbols-outlined play">play_circle</span>`;
const replayIcon = `<span class="material-symbols-outlined replay">replay</span>`;

//  5.-  Definition of variable "audioState", 2 values: replay oder paused
let audioState = {
    isReplay: false,
    isPaused: true,
};

//  Definition of events  (click => button "playPause", )
//  1.-  Event "click" in the button "playPause"  (click => togglePlayPause)
playPauseButton.addEventListener('click', togglePlayPause);
function togglePlayPause() {
    audioCtx.resume().then(() => {
        if (audioState.isPaused) {
            playPauseButton.innerHTML = pauseIcon;
            audio.play();
            elemValueVolume.classList.remove("valueMuted")
            elemValueVolume.classList.add("valueNotMuted")
            seekBar.classList.remove("seekBarNotPlay")
            seekBar.classList.add("seekBarPlay")
        } else {
            if (audioState.isReplay) { // Replay
                playPauseButton.innerHTML = pauseIcon;
                audio.play();
                audioState.isReplay = false;
                elemValueVolume.classList.remove("valueMuted")
                elemValueVolume.classList.add("valueNotMuted")
                seekBar.classList.remove("seekBarPlay")
                seekBar.classList.add("seekBarPlay")
                return;
            }
            elemValueVolume.classList.remove("valueNotMuted")
            elemValueVolume.classList.add("valueMuted")
            seekBar.classList.remove("seekBarPlay")
            seekBar.classList.add("seekBarNotPlay")
            playPauseButton.innerHTML = playIcon;
            audio.pause();
        }
        audioState.isPaused = !audioState.isPaused;
    });
}

//  2.-  Event "change" in the input type="file" (fileSong) (change => ev.target.files[0].name --> src of audioElement)
audio.setAttribute('src', `./assets/mp3/John Lennon 'Imagine'.mp3`)
// fileSong.addEventListener('change', (ev) => {
//     if (ev.target.files[0]) {
//         audioElement.setAttribute('src', `./assets/mp3/${ev.target.files[0].name}`);
//     }
// })

songSelect.addEventListener('change', (ev) => {
    fileSong = optionElement[ev.target.selectedIndex].value
})

buttonSelectSong.addEventListener('click', () => {
    audio.setAttribute('src', fileSong);
    playPauseButton.innerHTML = playIcon;
})

//  3.- Events in the audioElement (timeupdate, ended and canplay)
//  3.1.- Event "timeupdate" in the audioElement (timeupdate ==> setProgress)
audio.addEventListener('timeupdate', setProgress);

function setProgress() {
    currentSeekBar.innerHTML = `${((100 * audio.currentTime) / (durationMinuten * 60)).toFixed(2)}%`;
    if (audio.currentTime === 0 || isNaN((100 * audio.currentTime) / (durationMinuten * 60))) currentSeekBar.innerHTML = '0:00%'
    seekBar.value = audio.currentTime;

}
//  3.2.- Event "ended" in the audioElement (ended==> onEnd).  End of play music in the audioElement
audio.addEventListener('ended', onEnd);
function onEnd() {
    playPauseButton.innerHTML = replayIcon;
    audio.currentTime = 0;
    seekBar.value = 0;
    audioState.isReplay = true;
}
//  3.3.- Event "canplay" in the audioElement (canplay ==> setDuration)
audio.addEventListener('canplay', setDuration);
function setDuration() {
    seekBar.max = audio.duration;
}
//  3.4.- Event "muted" in the mutedVolume (muted => !muted)
const mutedIcon = '<span class="material-symbols-outlined volume_muted">volume_off</span>'
const notMutedIcon = '<span class="material-symbols-outlined volume_Notmuted">volume_up</span>'

mutedVolume.addEventListener('click', () => {
    if (mutedVolume.value === "false") {
        mutedVolume.innerHTML = mutedIcon;
        mutedVolume.value = "true"
        audio.muted = true
        elemValueVolume.classList.remove("valueNotMuted")
        elemValueVolume.classList.add("valueMuted")
    } else {
        mutedVolume.innerHTML = notMutedIcon;
        mutedVolume.value = "false"
        audio.muted = false
        elemValueVolume.classList.remove("valueMuted")
        elemValueVolume.classList.add("valueNotMuted")
    }
})

//  3.5.- Events "change volume" in the buttonVolume 
volumeDown.addEventListener('click', () => {
    if (audio.volume >= 0.10) {
        audio.volume = audio.volume - 0.1;
    } else {
        audio.volume = 0;
    }
    volumenBar.value = audio.volume * 100
    elemValueVolume.innerHTML = `${volumenBar.value}%`
})
volumeUp.addEventListener('click', () => {
    if (audio.volume <= 0.9) {
        audio.volume = audio.volume + 0.1;
    } else {
        audio.volume = 1;
    }
    volumenBar.value = audio.volume * 100
    elemValueVolume.innerHTML = `${volumenBar.value}%`
})

// 4.-  Event "input" in the bar (input type "range) "seekBar", (input => onSeek)
seekBar.addEventListener('input', onSeek);
function onSeek(evt) {
    audio.currentTime = evt.target.value;
}
seekBar.addEventListener('change', () => {
    this.style = `linear-gradient('red' ${audio.currentTime}, 'transparent')`;
})

// 5.-  Event "input" in the bar (input type "range") "volumenBar", (input => onVolumenSeek)
volumenBar.addEventListener('input', onVolumenSeek);
function onVolumenSeek(ev) {
    audio.volume = ev.target.value / 100;
    elemValueVolume.innerHTML = `${ev.target.value}%`
}

//  Connect the "audio source" (AudioNode "audioElement") with the context of audio ("audioCtx"), 
//  so we define the audio source of the audio graph.
const source = audioCtx.createMediaElementSource(audio);
const analyser = audioCtx.createAnalyser();  //  create a analyser of audio
analyser.fftSize = 2048;  //  Fourier transform


//  B.-  Connect the analyser with the font of audio
source.connect(analyser);
//  C.-  Connect the destination of audio with the analyser
analyser.connect(audioCtx.destination);

//  D.-  Definition de buffer of audio and the dataArray
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

//  E.-  Draw the exit of analycer in canvas
function drawSound() {
    analyser.getByteFrequencyData(dataArray);
    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    const barWidth = (WIDTH / bufferLength) * 1.1;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 1.1;

        //  Colors of bars
        const g = i * 1.2 / bufferLength;
        const b = i * 1.1 / bufferLength;
        const redColor = 255;
        const greenColor = 255 * 3 * g;
        const blueColor = barHeight * 4 * b;
        canvasCtx.fillStyle = `rgb(${redColor}, ${greenColor}, ${blueColor})`;
        canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
        x += barWidth + 1;
    }

    requestAnimationFrame(drawSound);
}
drawSound();


