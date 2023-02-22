import {
  endSeekBar, playPauseButton, elemValueVolume, seekBar, songSelect,
  optionElementSongs, buttonSelectSong, currentSeekBar, mutedVolume, volumeDown, volumeUp, volumenBar
} from "./initialization.js"
import { audio, audioState, audioCtx } from "../VisualPlayAudio1.js"
import { playIcon, replayIcon, pauseIcon, mutedIcon, notMutedIcon } from "./graphic.js"

export let fileSong = "../assets/mp3/John Lennon 'Imagine'.mp3"
let durationMinuten

//  1.-  Event of audio element:  "loadeddata" => definition of "durationMinuten" and "endSeekbar.innerHTML"
audio.addEventListener("loadeddata", function () {
  durationMinuten = (this.duration / 60).toFixed(2);
  endSeekBar.innerHTML = `${durationMinuten}m`
})

//  2.-  Event "click" in the button "playPause"  (click => togglePlayPause)
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

// 3.-  Event 'change' in the "select" of songs  ('change' => "fileSong" is value selected)
songSelect.addEventListener('change', (ev) => {
  fileSong = optionElementSongs[ev.target.selectedIndex].value
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
  // this.style.background = `linear-gradient('red' ${audio.currentTime}, 'transparent')`;
})

// 5.-  Event "input" in the bar (input type "range") "volumenBar", (input => onVolumenSeek)
volumenBar.addEventListener('input', onVolumenSeek);
function onVolumenSeek(ev) {
  audio.volume = ev.target.value / 100;
  elemValueVolume.innerHTML = `${ev.target.value}%`
}










//  2.-  Event "change" in the input type="file" (fileSong) (change => ev.target.files[0].name --> src of audioElement)

// fileSong.addEventListener('change', (ev) => {
//     if (ev.target.files[0]) {
//         audioElement.setAttribute('src', `./assets/mp3/${ev.target.files[0].name}`);
//     }
// })