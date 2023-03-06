//  Definition of Classes
//  2.-  Class Microphone
export default class Microphone {
  constructor() {
    this.initialized = false
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(function (stream) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
        this.microphone = this.audioContext.createMediaStreamSource(stream)
        this.analyser = this.audioContext.createAnalyser()
        this.analyser.minDecibels = -90;
        this.analyser.maxDecibels = -10;

        this.analyser.fftSize = 512  //  Fast Fourier transform
        const bufferLength = this.analyser.frequencyBinCount
        this.dataArray = new Uint8Array(bufferLength)
        this.microphone.connect(this.analyser)

        this.initialized = true
      }.bind(this))
      .catch(err => alert(err))

    this.normSamples

    //  Is a only "read property" that returns a "built-in MediaDevices object", which provides 
    //  access to "connected media input devices", such as: cameras, microphones and screen sharing

    //  "getUserMedia()" => metodo del objeto "mediaDevices", que retorna una "promise", que se resuelve con un objeto "media stream", 
    //                      el cual contiene los datos del audio del microfono

    //  audioContex.createMediaStreamSource(fuenteStream) => takes raw media stream (in this case audio data comming from microphone) and it converts it 
    //  into audio nodes
    //  audioContex.createAnalyser => creates analyser node, whisch can be used to expose audio time and frequency data to create visualisations
    //  analyser.frequencyBinCount => is a only red property and it's always equal to half of fftSize value
    //  connect => allows us to direct "connect" audio node of the audio grafo, direct data from one audio node to another
  }

  getSamples() {
    if (this.analyser) {
      this.analyser.getByteTimeDomainData(this.dataArray)
      this.normSamples = [...this.dataArray].map(e => e / 128 - 1)
      return this.normSamples
    }
    //  analyser.getbyteTimeDomainData() => copies the current waveform or time domain data
    //  into a Uint8Array(unsigned byte) array we pass to it
  }

  getVolume() {
    if (this.analyser) {
      this.analyser.getByteTimeDomainData(this.dataArray)
      const normSamples = [...this.dataArray].map(e => e / 128 - 1)
      let sum = 0
      for (let i = 0; i < normSamples.length; i++) {
        sum += Math.pow(normSamples[i], 2)
      }
      let volume = Math.sqrt(sum / normSamples.length)

      return volume
    }
  }
}



  //  Navigator.mediaDevices
/*
    Note:  Secure context: This feature is available only in "secure contexts (HTTPS)", in some or all supporting 
    browsers.
 
    The Navigator.mediaDevices read-only property returns a MediaDevices object, which provides access to connected 
    media input devices like cameras and microphones, as well as screen sharing.
 
    Syntax:  navigator.mediaDevices
 
    Return value:  The "MediaDevices singleton object". 
                   Usually, you just use this object's members directly, such as by calling 
                   "navigator.mediaDevices.getUserMedia()"
 
    El objeto "MediaDevices" es el "punto de entrada" a la API que se utiliza para examinar y obtener acceso a los 
    dispositivos de medios disponibles para el agente de usuario .
 
    MediaDevices:  The "MediaDevices interface" provides access to "connected media input devices", like cameras and 
    microphones, as well as screensharing.
 
    Methods:  "MediaDevices.getUserMedia()" and "MediaDevices.enumerateDevices()"
 
              1.-  MediaDevices.getUserMedia()  =>>  With the user's permission through a prompt, turns on a camera or 
                                                     screensharing and/or a microphone on the system and provides a 
                                                     MediaStream (en-US) containing a video track and/or an 
                                                     audio track with the input.
 
              2.-  MediaDevices.enumerateDevices() ==>>  Obtains an array of information about the media input and output 
                                                         devices available on the system.
 
 
'use strict';
 
// Put variables in global scope to make them available to the browser console.
var video = document.querySelector('video');
var constraints = window.constraints = {
  audio: false,
  video: true
};
var errorElement = document.querySelector('#errorMsg');
 
navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
  var videoTracks = stream.getVideoTracks();
  console.log('Got stream with constraints:', constraints);
  console.log('Using video device: ' + videoTracks[0].label);
  stream.onended = function() {
    console.log('Stream ended');
  };
  window.stream = stream; // make variable available to browser console
  video.srcObject = stream;
})
.catch(function(error) {
  if (error.name === 'ConstraintNotSatisfiedError') {
    errorMsg('The resolution ' + constraints.video.width.exact + 'x' +
        constraints.video.width.exact + ' px is not supported by your device.');
  } else if (error.name === 'PermissionDeniedError') {
    errorMsg('Permissions have not been granted to use your camera and ' +
      'microphone, you need to allow the page access to your devices in ' +
      'order for the demo to work.');
  }
  errorMsg('getUserMedia error: ' + error.name, error);
});
 
function errorMsg(msg, error) {
  errorElement.innerHTML += '<p>' + msg + '</p>';
  if (typeof error !== 'undefined') {
    console.error(error);
  }
}
 
*/