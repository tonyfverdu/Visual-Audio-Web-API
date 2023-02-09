const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const fileSong = document.querySelector("#songChose")
const audioElement = document.querySelector('.audioController');
const canvasElement = document.querySelector('.canvas');
const canvasCtx = canvasElement.getContext('2d');
const playPauseButton = document.querySelector('.playPause');
const seekbar = document.querySelector('.seekbar');
const volumeBar = document.querySelector('.volume');


const pauseIcon = `<span class="materialIcons">
Pause
</span>`;
const playIcon = `<span class="materialIcons">
Play
</span>`;
const replayIcon = `<span class="materialIcons">
replay
</span>`;


const WIDTH = canvasElement.clientWidth;
const HEIGHT = canvasElement.clientHeight;
seekbar.value = 0;
volumeBar.value = 100;

let audioState = {
    isReplay: false,
    isPaused: true,
};

playPauseButton.addEventListener('click', togglePlayPause);

audioElement.setAttribute('src', `./assets/mp3/John Lennon 'Imagine'.mp3`)
fileSong.addEventListener('change', (ev) => {
    if (ev.target.files[0]) {
        audioElement.setAttribute('src', `./assets/mp3/${ev.target.files[0].name}`);
      }
})

audioElement.addEventListener('timeupdate', setProgress);
audioElement.addEventListener('ended', onEnd);
audioElement.addEventListener('canplay', setDuration);
seekbar.addEventListener('input', onSeek);
volumeBar.addEventListener('input', onVolumeSeek);

const source = audioCtx.createMediaElementSource(audioElement);
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 2048;

source.connect(analyser);
analyser.connect(audioCtx.destination);

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

function draw() {
    analyser.getByteFrequencyData(dataArray);
    canvasCtx.fillStyle = 'rgb(2, 2, 2)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    const barWidth = (WIDTH / bufferLength) * 2;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 1.05;

        //  Colors of bars
        const c = i / bufferLength;
        const redColor = 250;
        const greenColor = 250 * 4 * c;
        const blueColor = barHeight + 30 * c;
        canvasCtx.fillStyle = `rgb(${redColor}, ${greenColor}, ${blueColor})`;
        canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
    }

    requestAnimationFrame(draw);
}
draw();

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

function setProgress() {
    seekbar.value = audioElement.currentTime;
}
function setDuration() {
    seekbar.max = audioElement.duration;
}


function onEnd() {
    playPauseButton.innerHTML = replayIcon;
    audioElement.currentTime = 0;
    seekbar.value = 0;
    audioState.isReplay = true;
}
function onSeek(evt) {
    audioElement.currentTime = evt.target.value;
}

function onVolumeSeek(evt) {
    audioElement.volume = evt.target.value / 100;
}
