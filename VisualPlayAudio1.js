//  A.-  Definition init of system
//  0.-  AudioContext of System
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

//  1.- HTMLElement (fileSong, audioElement, canvasElement, playPauseButton, seekbar and volumenBar)
const fileSong = document.querySelector("#songChose")
const audioElement = document.querySelector('.audioController');
const canvasElement = document.querySelector('.canvas');
const playPauseButton = document.querySelector('.playPause');
const seekBar = document.querySelector('.seekbar');
const volumenBar = document.querySelector('.volume');

//  2.- Canvas configuration
const canvasCtx = canvasElement.getContext('2d');
const WIDTH = canvasElement.clientWidth;
const HEIGHT = canvasElement.clientHeight;

//  3.- Bars (seekbar and volumenBar) init configuration
seekBar.value = 0;
volumenBar.value = 50;

//  4.-  Messages of button (playPause)
const pauseIcon = `<span class="materialIcons">Pause</span>`;
const playIcon = `<span class="materialIcons">Play</span>`;
const replayIcon = `<span class="materialIcons">Replay</span>`;

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
            audioElement.play();
        } else {
            if (audioState.isReplay) { // Replay
                playPauseButton.innerHTML = pauseIcon;
                audioElement.play();
                audioState.isReplay = false;
                return;
            }
            playPauseButton.innerHTML = playIcon;
            audioElement.pause();
        }
        audioState.isPaused = !audioState.isPaused;
    });
}

//  2.-  Event "change" in the input type="file" (fileSong) (change => ev.target.files[0].name --> src of audioElement)
audioElement.setAttribute('src', `./assets/mp3/John Lennon 'Imagine'.mp3`)
fileSong.addEventListener('change', (ev) => {
    if (ev.target.files[0]) {
        audioElement.setAttribute('src', `./assets/mp3/${ev.target.files[0].name}`);
    }
})

//  3.- Events in the audioElement (timeupdate, ended and canplay)
//  3.1.- Event "timeupdate" in the audioElement (timeupdate ==> setProgress)
audioElement.addEventListener('timeupdate', setProgress);
function setProgress() {
    seekBar.value = audioElement.currentTime;
}
//  3.2.- Event "ended" in the audioElement (ended==> onEnd).  End of play music in the audioElement
audioElement.addEventListener('ended', onEnd);
function onEnd() {
    playPauseButton.innerHTML = replayIcon;
    audioElement.currentTime = 0;
    seekBar.value = 0;
    audioState.isReplay = true;
}
//  3.3.- Event "canplay" in the audioElement (canplay ==> setDuration)
audioElement.addEventListener('canplay', setDuration);
function setDuration() {
    seekBar.max = audioElement.duration;
}
// 4.-  Event "input" in the bar (input type "range) "seekBar", (input => onSeek)
seekBar.addEventListener('input', onSeek);
function onSeek(evt) {
    audioElement.currentTime = evt.target.value;
}

// 5.-  Event "input" in the bar (input type "range") "volumenBar", (input => onVolumenSeek)
volumenBar.addEventListener('input', onVolumenSeek);
function onVolumenSeek(ev) {
    audioElement.volume = ev.target.value / 100;
}

//  Connect the "audio source" (AudioNode "audioElement") with the context of audio ("audioCtx"), 
//  so we define the audio source of the audio graph.
const source = audioCtx.createMediaElementSource(audioElement);
const analyser = audioCtx.createAnalyser();  //  create a analyser of audio
analyser.fftSize = 2048;  //  Fourier transform


//  B.-  Connect the analyser with the font of audio
source.connect(analyser);
//  C.-  Connect the destination of audio with the analyser
analyser.connect(audioCtx.destination);

//  D.-  Definitoion de buffer of audio and the dataArray
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
        barHeight = dataArray[i] / 1.18;

        //  Colors of bars
        const c = i * 1.1 / bufferLength;
        const redColor = 253;
        const greenColor = 253 * 4 * c;
        const blueColor = barHeight * 3 * c;
        canvasCtx.fillStyle = `rgb(${redColor}, ${greenColor}, ${blueColor})`;
        canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
        x += barWidth + 1;
    }

    requestAnimationFrame(drawSound);
}
drawSound();


