//  Element Canvas Visualizator
const myCanvas = document.querySelector("#myCanvasVisualizator")
const ctx = myCanvas.getContext("2d")

const WIDTH = myCanvas.width
const HEIGHT = myCanvas.height

ctx.fillStyle = "rgba(3, 3, 3, 1)"
ctx.fillRect(0, 0, WIDTH, HEIGHT)

//  Elements audio HTML
const audioElementSong = new Audio()
audioElementSong.src = "../../assets/mp3/The Beatles - Revolver - 02 Eleanor Rigby.mp3"
audioElementSong.preload = "metadata"

const audioElementOscilator = new Audio()
// audioElementOscilator.src ="../../assets/albums_mp3/18 Others/The Ballad Of John And Yoko (Remastered 2015) (128 kbps).mp3"
// audioElementOscilator.preload = "metadata"

//  AudioContexts
const audioCtxSong = new (window.AudioContext || window.webkitAudioContext)()
const audioCtxOscillator = new (window.AudioContext || window.webkitAudioContext)()

//  Create "audio source Node" (with "createMediaElementSource") and a node "analyzer" of song
const audioSource = audioCtxSong.createMediaElementSource(audioElementSong)


//  Nodos de ganancia (gain Node)
// const gainNodeSong = audioCtxSong.createGain();
// audioElementSong.connect(gainNodeSong);
// gainNodeSong.connect(audioCtxSong.destination);

//  Button Play
let toggleButtonPlay = false
const buttonPlay = document.querySelector("#btnPlay")

buttonPlay.addEventListener('click', () => {
  const analyzerSong = audioCtxSong.createAnalyser()
  audioSource.connect(analyzerSong)  //  audioSource ==> analyzerSong
  analyzerSong.connect(audioCtxSong.destination)  //  analyzerSong ==> audioCtxSong.destination

  //  Define fftSizeof analyser
  analyzerSong.fftSize = 256

  const bufferLength = analyzerSong.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  //analyzerSong.getByteTimeDomainData(dataArray);

  //  Draw bar
  const barWidth = WIDTH / bufferLength
  let barHeight;
  let x;  //  coordenate x

  function drawBarVisualizator() {
    x = 0
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, WIDTH, HEIGHT)

    analyzerSong.getByteTimeDomainData(dataArray);

    for (let i = 0; i < dataArray.length; i++) {
      barHeight = dataArray[i];
      //  Colors of bars
      const g = i * 1.2 / bufferLength;
      const b = i * 1.1 / bufferLength;
      const redColor = 255;
      const greenColor = 255 * 2.5 * g;
      const blueColor = barHeight * 1.5 * b;
      ctx.fillStyle = `rgb(${redColor}, ${greenColor}, ${blueColor})`;
      // ctx.fillStyle = `hsl(${bufferLength / dataArray[i] * 359 }, ${dataArray[i] * 359 / bufferLength}%, ${dataArray[i] * 359 / bufferLength}%)`
      ctx.fillRect(x, HEIGHT / 0.8 - barHeight, barWidth, barHeight* 100)
      x += barWidth + 0.3
    }

    requestAnimationFrame(drawBarVisualizator);
  }

  // function draw() {
  //  requestAnimationFrame(draw);

  //   analyzerSong.getByteTimeDomainData(dataArray);

  //   ctx.fillStyle = "rgb(200, 200, 200)";
  //   ctx.fillRect(0, 0, WIDTH, HEIGHT);

  //   ctx.lineWidth = 2;
  //   ctx.strokeStyle = "rgb(0, 0, 0)";

  //   ctx.beginPath();

  //   const sliceWidth = (WIDTH * 1.0) / bufferLength;
  //   let x = 0;

  //   for (let i = 0; i < bufferLength; i++) {
  //     const v = dataArray[i] / 128.0;
  //     const y = (v * HEIGHT) / 2;

  //     if (i === 0) {
  //       ctx.moveTo(x, y);
  //     } else {
  //       ctx.lineTo(x, y);
  //     }

  //     x += sliceWidth;
  //   }

  //   ctx.lineTo(myCanvas.width, myCanvas.height / 2);
  //   ctx.stroke();
  // }

  toggleButtonPlay = !toggleButtonPlay
  if (toggleButtonPlay) {
    audioElementSong.play()
    //draw()
  } else {
    audioElementSong.pause()
  }
  audioElementSong.addEventListener('playing', () => {
    drawBarVisualizator()
  })
  audioElementSong.addEventListener('ended', () => {
    console.log('ended')
  })

})

//  Button Note (sound font "oscillator")
let toggleButtonNote = false
const buttonNote = document.querySelector("#btnOscillator")

buttonNote.addEventListener('click', soundOscillator)

function soundOscillator() {
  const oscillator1 = audioCtxOscillator.createOscillator()
  oscillator1.type = "triangle";  // sine, square, sawtooth, triangle
  //oscillator1.frequency.setValueAtTime(3000, audioCtxOscillator.currentTime); // value in hertz
  oscillator1.connect(audioCtxOscillator.destination);

  toggleButtonNote = !toggleButtonNote
  if (toggleButtonNote) {
    oscillator1.start()
    setTimeout(function () {
      oscillator1.stop()
    }, 200)
  } else {
    oscillator1.stop()
  }
}

//  Button Muted
let toggleButtonMuted = false
const buttonMuted = document.querySelector("#btnMuted")

buttonMuted.addEventListener('click', () => {
  console.log('toggleButtonMuted:  ', toggleButtonMuted)
  toggleButtonMuted = !toggleButtonMuted
  if (toggleButtonMuted) {
    audioElementSong.muted = true
    audioElementOscilator.muted = true
  } else {
    audioElementSong.muted = false
    audioElementOscilator.muted = false
  }
})



//  Theory

/*    BaseAudioContext.createOscillator()

    El metodo de la interfaz BaseAudioContext: "createOscillator()" crea un AudioNode: "Oscillator", 
    que es "fuente de sonido para una nota - tono de sonido, y que representa una "forma de onda periódica". 
    Básicamente genera un "tono constante".

    Nota: El constructor: "OscillatorNode()"" es la forma recomendada de crear un OscillatorNode; 

    Sintaxis:  createOscillator()

    Parámetros:  Ninguno.

    Valor de retorno:  un "OscillatorNode"

    Ejemplo:const gainNode = audioCtx.createGain();
    // create web audio api context
    const audioCtx = new AudioContext();

    // create Oscillator node
    const oscillator = audioCtx.createOscillator();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTiconst gainNode = audioCtx.createGain();
    El metodo de la interfaz AudioNode "connect()" permite "conectar" una de las salidas del nodo a un "destino especificado", 
    que puede ser otro AudioNode (dirigiendo así los datos de sonido al nodo especificado) o un "AudioParam", de modo que los datos de salida 
    del nodo se utilicen automáticamente para cambiar el valor de ese parámetro con el tiempo.

    Sintaxis:  ObjectAudioNode.connect(destination)

                connect(destination, outputIndex)
                connect(destination, outputIndex, inputIndex)

    Parámetros:
                destination:  el "AudioNode" o "AudioParam" al que conectarse.

                outputIndex (Opcional)const gainNode = audioCtx.createGain();repetidos se ignoran), puede conectar una salida a varias entradas llamando connect() repetidamente. 
                                      Esto hace posible el fan-out . El valor predeterminado es 0.

                inputIndex (Opcional) Un índice que describe a qué entrada del destino desea conectar la corriente AudioNode; el valor 
                                      predeterminado es 0. Los números de índice se definen según el número de canales de entrada (consulte Canales 
                                      de audio ). Es posible conectar un AudioNodea otro AudioNode, que a su vez se conecta de nuevo al primero 
                                      AudioNode, creando un ciclo.

    Valor de retorno:  Si el destino es otro Audionode, connect() devuelve una referencia al AudioNode objeto de destino, lo que le permite encadenar 
                       varias llamadas a "connect()". En algunos navegadores, las implementaciones anteriores de esta interfaz devuelven undefined.

                        Si el destino es un "AudioParam", "connect()" devuelve undefined.


    Ejemplo:  Conexión a una "entrada de audio"

              El uso más obvio del metodo "connect()" es dirigir la salida de audio de un nodo a la entrada de audio de otro nodo para su posterior 
              procesamiento. Por ejemplo, puede enviar el audio desde un "MediaElementAudioSourceNode", es decir, el audio desde un elemento 
              multimedia HTML como <audio>, por ejemplo, a través de un filtro de paso de banda implementado mediante un BiquadFilterNodepara reducir 
              el ruido antes de enviar el audio a los altavoces.

              Este ejemplo crea un "oscilador" (audioNode source oscillator) y luego lo vincula a un "nodo de ganancia", de modo que el "nodo de 
              ganancia" controla el volumen del nodo del oscilador.

                const audioCtx = new AudioContext();

                const oscillator = audioCtx.createOscillator();
                const gainNode = audioCtx.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);


    Ejemplo de parámetros de audio:  En este ejemplo, alteraremos el "valor de ganancia" de un "GainNode" usando un "OscillatorNode" con un valor de 
                                     frecuencia lento. Esta técnica se conoce como "parámetro controlado por LFO".

        const audioCtx = new AudioContext();

        // create an normal oscillator to make sound
        const oscillator = audioCtx.createOscillator();

        // create a second oscillator that will be used as an LFO (Low-frequency oscillator), and will control a parameter
        const lfo = audioCtx.createOscillator();

      // set the frequency of the second oscillator to a low number
      lfo.frequency.value = 2.0; // 2Hz: two oscillations per second

     // create a gain whose gain AudioParam will be controlled by the LFO
      const gain = audioCtx.createGain();

    // connect the LFO to the gain AudioParam. This means the value of the LFO will not produce any audio, but will change the value of the gain instead
      lfo.connect(gain.gain);

    // connect the oscillator that will produce audio to the gain
      oscillator.connect(gain);

    // connect the gain to the destination so we hear sound
    gain.connect(audioCtx.destination);

    // start the oscillator that will produce audio
    oscillator.start();

    // start the oscillator that will modify the gain value
    lfo.start();

*/

/*  Interfaz "gainNode"

    La interfaz "GainNode" representa un "cambio de volumen" (de ganancia de senal de audio). Es un modulo "AudioNode" de procesamiento de audio 
    que hace que se aplique una "ganancia" dada a los datos de entrada antes de su propagación a la salida. A "GainNode" siempre tiene exactamente 
    una entrada y una salida, ambas con el mismo número de canales.

    La "ganancia" es un valor sin unidades, que cambia con el tiempo, que se multiplica por cada muestra correspondiente de todos los canales de 
    entrada. Si se modifica, la nueva ganancia se aplica instantáneamente, provocando 'clics' antiestéticos en el audio resultante. Para evitar 
    que esto suceda, nunca cambie el valor directamente, pero use los métodos de interpolación exponencial en la interfaz "AudioParam".

    El GainNode aumenta la ganancia de la salida.

    Constructor:  GainNode()  Crea y devuelve un nuevo objeto "GainNode". Como alternativa, puede utilizar el metodo: "BaseAudioContext.createGain()"
    método de fábrica; ver Crear un AudioNode .

    Propiedades de instancia:  Hereda las propiedades de su padre,AudioNode .

    GainNode.gain Solo lectura
    Una tasa a AudioParam que representa la cantidad de ganancia a aplicar. Tiene que configurar AudioParam.valueo usar los métodos de AudioParampara cambiar el efecto de la ganancia.

    Métodos de instancia:  Ningún método específico; hereda métodos de su padre,AudioNode .

*/

/*  Propiedad del analyser:  fftSize

    La propiedad "fftSize" de la interfaz "AnalyserNode" es un valor largo sin signo y representa el "tamaño de la ventana en muestras" que se 
    utiliza cuando se realiza una "transformada rápida de Fourier (FFT)" para obtener "datos de dominio de frecuencia".

    Valor:  Un número entero sin signo, que representa el "tamaño de la ventana de la FFT", dado en número de muestras. Un valor más alto dará 
    como resultado más detalles en el dominio de la frecuencia pero menos detalles en el dominio del tiempo.

    Debe ser una potencia de 2 entre 2^5 y 2^15, entonces uno de: 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, y 32768. 
    El valor predeterminado es 2048.
*/