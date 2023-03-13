import {
  myCanvas, canvasCtx, WIDTH, HEIGHT, toogleCircleBtn, canvasGain, ctxCanvasGain,
  elemImgAlbumOfSong, elemVocalsOfSong, elemTitleSongOfAlbum, elemInfoAlbum, elemInfoYear,
  elemInfoDuration
} from "./graphic.js"
import { contCanvas, audioElement } from "./initialization.js"
import { uploadAlbums, uploadSongs, setInfoSong } from "./functions.js"
import dataSongsBeatles from "./dataSongs.js"
import dataRecordsBeatles from "./dataRecords.js"
import displayFrecWave from "./analyzerFrec.js"

import displayAmpWave from "./displayAmp.js"


//  0.-  Upload of ini data from JSON files (albums and songs)
//  0.-  Albums and songs
export const elemSelectAlbum = document.querySelector("#selectAlbum")
export const elemSelectSong = document.querySelector("#selectSong")

// const contCanvas = document.querySelector(".contCanvas")
export const myNewCanvas = document.createElement("canvas")
export const newCtx = myNewCanvas.getContext("2d")

//  Inicial values of albums and songs
export let albumIsSelected = "1 (2015 Version)"
uploadAlbums(dataRecordsBeatles, elemSelectAlbum)
uploadSongs(albumIsSelected, dataSongsBeatles, elemSelectSong)

setInfoSong(0, dataSongsBeatles, elemImgAlbumOfSong, elemVocalsOfSong, elemTitleSongOfAlbum, elemInfoAlbum,
  elemInfoYear, elemInfoDuration, newCtx)

//  1.-  Create an Audio Context
export const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
export let audioState = {
  isPlay: false,
  isReplay: false,
  isPaused: true,
}
//  2.-  Node Audio fonts: "audio node font of audio grafo"  => element <audio> (referencie in initialization.js)
// export const audioElement = document.createElement("audio")
// audioElement.src = urlSong
// audioElement.preload = "auto"

//  2.1.-  Create un "MediaElementSource". Pass the "audio font" into the "audio context": 
//         audio font (element HTML <audio>) =>  "audioCtx"
export const track = audioCtx.createMediaElementSource(audioElement)  //  track => "MediaElementAudioSourceNode" 

//  2.1.-  Create "Node of Gain":  gainNode => control of audio-volume
export const gainNode = audioCtx.createGain();
gainNode.gain.value = 0.7
export const elemPercentageVolume = document.querySelector("#percentageVolume")
elemPercentageVolume.innerHTML = `${(gainNode.gain.value * 100 / 3.40).toFixed(2)}%`

//  2.2.-  Create "Node of panner stereo":  pannerStereo => audio balance
const pannerOptions = { pan: 0 };
export const pannerStereo = new StereoPannerNode(audioCtx, pannerOptions);


//  ********************************   AUDIO DISPLAY OF FRECUENCY AND AMPLITUDE     *************************
//  Analyzers of audio:  frecuency and amplitude of wave
export const analyser = audioCtx.createAnalyser();  //  Create a analyser of audio
let IdAnimation   //  Last animation ID number

let countCanvasFrec = 0   //  Counter of canvas of frecuency
let countCanvasAmp = 0    //  Counter of canvas of amplitude

//  1.- Audio Displays of frecuency:  analyserFrec
const elemtSelectFrecuency = document.querySelector("#selectVisuaFrec")

//  1.1.-  Initial animation of application => displayFrecWave(IdAnimation, optSelectDisplayFrec)
let optSelectDisplayFrec = "Bars"  //  Defect visualizator:  "Bars"
myCanvas.style.filter = 'blur(0px) contrast(3)'
toogleCircleBtn.style.display = 'none'
displayFrecWave(myCanvas, canvasCtx, IdAnimation, "Bars")

//  1.2.-  Event of "change" of graphic of frecuency
elemtSelectFrecuency.addEventListener('change', function (ev) {
  optSelectDisplayFrec = ev.target.value

  //  1.3.-  Remove element "canvas" and create new element "canvas" (for best performes)
  if (countCanvasFrec < 1 && countCanvasAmp > 0) {
    const myCanvasAmp = document.querySelector("#myCanvasAmp")
    myCanvasAmp.remove()

    const myCanvas = document.createElement("canvas")
    myCanvas.setAttribute("id", "myCanvas")
    myCanvas.classList.add("canvas")
    contCanvas.appendChild(myCanvas)

    countCanvasFrec++
  }
  const myCanvas = document.querySelector("#myCanvas")
  const canvasCtx = myCanvas.getContext("2d")
  //  1.4.-  Select type of visualizator
  switch (optSelectDisplayFrec) {
    case "Bars":
      myCanvas.style.filter = 'blur(0px) contrast(3)'
      toogleCircleBtn.style.display = 'none'
      displayFrecWave(myCanvas, canvasCtx, IdAnimation, optSelectDisplayFrec)
      break;
    case "Hell Doom":
      myCanvas.style.filter = 'blur(2px) contrast(5)'
      toogleCircleBtn.style.display = 'none'
      displayFrecWave(myCanvas, canvasCtx, IdAnimation, optSelectDisplayFrec)
      break
    case "Fireworks":
      myCanvas.style.filter = 'blur(0px) contrast(3)'
      toogleCircleBtn.style.display = 'block'
      displayFrecWave(myCanvas, canvasCtx, IdAnimation, optSelectDisplayFrec)
      break
    case "Circles Rainbow":
      myCanvas.style.filter = 'blur(0px) contrast(3)'
      toogleCircleBtn.style.display = 'block'
      displayFrecWave(myCanvas, canvasCtx, IdAnimation, optSelectDisplayFrec)
      break
    default:
      break
  }
  countCanvasAmp = 0
}, false)


//  2.- 1.- Audio Displays of amplitude:  displayAmpWave(optSelectDisplay)
let optSelectDisplayAmp = "Sine Wave"   //  Defect visualizator:  "Sine Wave"

//  2.1.- Audio Displays of amplitude (volume):  displayAmp
const elemtSelectAmplitude = document.querySelector("#selectVisuaAmp")

//  2.2.-  Event of "change" of graphic of amplitude
elemtSelectAmplitude.addEventListener('change', function (ev) {
  optSelectDisplayAmp = ev.target.value

  //  2.3.-  Remove element "canvas" and create new element "canvas" (for best performes)
  if (countCanvasAmp < 1) {
    const myCanvas = document.querySelector("#myCanvas")
    myCanvas.remove()

    const TheCanvasAmp = document.createElement("canvas")
    TheCanvasAmp.setAttribute("id", "myCanvasAmp")
    TheCanvasAmp.classList.add("canvas")
    contCanvas.appendChild(TheCanvasAmp)

    countCanvasAmp++
  }
  const myCanvasAmp = document.querySelector("#myCanvasAmp")
  const canvasCtxAmp = myCanvasAmp.getContext("2d")

  //  2.4.-  Select type of visualizator
  switch (optSelectDisplayAmp) {
    case "Sine Wave":
      displayAmpWave(myCanvasAmp, canvasCtxAmp, IdAnimation, optSelectDisplayAmp)
      break
    case "Circles":
      displayAmpWave(myCanvasAmp, canvasCtxAmp, IdAnimation, optSelectDisplayAmp)
      break
    default:
      break
  }
  countCanvasFrec = 0
}, false)

//  ******************************** ************************************************************************

//  *********************************************************************************************************

////  Theory Audio Web API
/*
    1.-  PeriodicWave() => constructor off object of class: "Periodicwave"
    The PeriodicWave() constructor of the Web Audio API creates a new PeriodicWave object instance.

         Syntax:  new PeriodicWave(context)
                  new PeriodicWave(context, options)

    
         Parameters:  "context"  =>  A BaseAudioContext representing the "audio context" you want the node to be associated with.

                      "options" (Optional) => A "PeriodicWaveOptions dictionary object", defining the properties you want the PeriodicWave to have 
                                              (It also inherits the options defined in the PeriodicWaveConstraints dictionary):

                                              "real":  A "Float32Array" containing the "cosine terms" that you want to use to form the wave 
                                              (equivalent to the real parameter of BaseAudioContext.createPeriodicWave).

                                              "imag":  A "Float32Array" containing the "sine terms" that you want to use to form the wave 
                                              (equivalent to the imag parameter of BaseAudioContext.createPeriodicWave).

                      "channelCount" =>  Represents an "integer" used to determine how many channels are used when up-mixing and down-mixing 
                                         connections to any inputs to the node. (See AudioNode.channelCount for more information.) 
                                         Its usage and precise definition depend on the value of channelCountMode.

                      "channelCountMode" => Represents an enumerated value describing the way channels must be matched between the node's inputs 
                                            and outputs. (See AudioNode.channelCountMode for more information including default values.)

                      "channelInterpretation" => Represents an "enumerated value" describing the meaning of the channels. This interpretation will 
                                                 define how audio up-mixing and down-mixing will happen. The possible values are "speakers" or 
                                                 "discrete". (See AudioNode.channelCountMode for more information including default values.)

        Return value: A new "PeriodicWave object instance".

    Example:  

              const real = new Float32Array(2);
              const imag = new Float32Array(2);
              const ac = new AudioContext();

              real[0] = 0;
              imag[0] = 0;
              real[1] = 1;
              imag[1] = 0;

              const wave = new PeriodicWave(ac, {
                real,
                imag,
                disableNormalization: false,
              });
*/

/*  1.-  Grafico de Audio

    Todo dentro de "Web Audio API" se basa en el concepto de un "gráfico de audio", que se compone de "nodos de audio".

    La "Web Audio API" maneja las operaciones de audio dentro de un "contexto de audio" y ha sido diseñada para permitir 
    el "enrutamiento modular". Las operaciones de audio básicas se realizan con "nodos de audio", que se vinculan entre sí 
    para formar un "gráfico de enrutamiento de audio" . 
    
    Un "gráfico de enrutamiento de audio" tiene "nodos de entrada de audio", que son la fuente de los sonidos que está 
    manipulando, "nodos de modificación" que cambian esos sonidos según lo desee y "nodos de salida" ( o destinos de audio),
    que permiten guardar o escuchar esos sonidos.

    Se admiten varias fuentes de audio con diferentes "diseños de canales", incluso dentro de un solo "contexto". 
    Debido a este diseño modular, puede crear funciones de audio complejas con efectos dinámicos.

    2.-  El "contexto de audio".

    Para poder hacer cualquier cosa con "Web Audio API", necesitamos primero crear una "instancia" del "contexto de audio". 
    Esto nos da acceso a todas las características y funciones (propiedades y metodos) de la API.

    // for legacy browsers
    const audioContext = (window.AudioContext || window.webkitAudioContext)();

    Qué está pasando cuando hacemos esto? Se crea un "BaseAudioContext" automáticamente y se extiende a un "contexto de 
    audio" en línea (en vivo). Querremos esto porque estamos buscando tocar sonido en vivo.

    Nota: Si solo desea procesar datos de audio, por ejemplo, almacenarlos en búfer y transmitirlos, pero no reproducirlos,
          es posible que desee considerar la creación de un archivo "OfflineAudioContext".


    3.-  Cargar las fuentes de audio del sistema.

    Una vez creada una instancia del "contexto de audio" necesita algo de sonido para reproducirlo (fuentes de soniodo o 
    audio). Hay varias maneras de hacer esto con la API. 
    
    Comencemos con un método simple (elemento HTML: <audio></audio>): como tenemos un boombox, lo más probable es que 
    queramos reproducir una pista ("track") de una canción completa. Además, por accesibilidad, es bueno "exponer" esa 
    pista en el DOM. Expondremos la canción en la página usando el elemento HTML: <audio></audio>

    <audio src="myCoolTrack.mp3" preload="metadata"></audio>

    Nota: si el "archivo de sonido" que está cargando se encuentra en un dominio diferente, deberá usar el 
          atributo: "crossorigin"; consulte Intercambio de recursos de origen cruzado (CORS) para obtener más información.

          Para usar todas las cosas buenas que obtenemos con la "API de audio web", debemos tomar la fuente de este elemento 
          y canalizarla al "contexto de audio" que hemos creado. Por suerte para nosotros, hay un método que nos permite 
          hacer exactamente eso: "audioContext.createMediaElementSource":

          // get the audio element HTML
          const audioElement = document.querySelector("audio");

          // pass the "audio font" into the "audio context":  fuente de audio (element <audio>)  =>  audioContext
          const track = audioContext.createMediaElementSource(audioElement);

        Nota: El elemento HTML <audio> anterior está representado en el DOM por un objeto de tipo "HTMLMediaElement", 
              que viene con su propio conjunto de funciones (metodos). Todo esto se ha mantenido intacto; simplemente estamos 
              permitiendo que el sonido esté disponible para la "API de audio web".

    
    4.-  El "control del sonido".

    Al reproducir sonido en la web, es importante permitir que el usuario lo controle. Dependiendo del caso de uso, hay una 
    gran cantidad de opciones, pero proporcionaremos funciones para "reproducir/pausar" el sonido, modificar el "volumen" de 
    la pista (track) y moverlo de "izquierda" a "derecha" (caracteristica estereo)

    COOR:  El "control del sonido" mediante programación desde el código JavaScript está cubierto por las políticas de soporte 
    de reproducción automática de los navegadores, por lo que es probable que se bloquee sin que el usuario otorgue 
    permiso (o una lista de permitidos). Las políticas de reproducción automática generalmente requieren un "permiso 
    explícito" o una interacción del usuario con la página antes de que los scripts puedan activar la reproducción de audio.

    Estos "requisitos especiales" existen esencialmente porque los sonidos inesperados pueden ser molestos e intrusivos y 
    pueden causar problemas de accesibilidad. Puede obtener más información sobre esto en nuestro artículo Guía de 
    reproducción automática para medios y API de audio web .

    Dado que nuestros scripts están reproduciendo audio en respuesta a un evento de entrada del usuario (un "clic" en un 
    botón de reproducción, por ejemplo), estamos en buen camino y no deberíamos tener problemas con el bloqueo de 
    reproducción automática. 


    4.1.-  Control de la funcionalidad de reproduccion del audio: play/paused
    
    Entonces, comencemos por echar un vistazo a nuestra "funcionalidad de reproducción" (Play) y pausa (Paused). 
    Tenemos un "botón de reproducción" que cambia a un "botón de pausa" cuando se reproduce la pista:

      <button data-playing="false" role="switch" aria-checked="false">
        <span>Play/Pause</span>
      </button>

    Antes de que podamos reproducir nuestra pista, necesitamos "conectar" (canalizar) nuestro "gráfico de audio" desde 
    la fuente de audio/nodo de entrada (element <audio>) al destino (por defecto los altavoces del equipo).

    Ya hemos creado un "nodo de entrada de audio" (una "fuente de audio"), pasando nuestro "elemento de audio" (<audio>) 
    a la API. En la mayoria de los casos, no se necesita crear un "nodo de salida", pues el "grafo de audio" que creamos 
    solo puede conectar sus otros nodos a: "BaseAudioContext.destination":

      const audioElement = document.querySelector("audio"); // o bien:  const audioElement = document.createElement("audio")
      const track = audioContext.createMediaElementSource(audioElement);

      track.connect(audioContext.destination);


    Una buena manera de visualizar estos "nodos de audio", es dibujar un "gráfico de audio" para que pueda visualizarlo. 
    Así es como se ve nuestro gráfico de audio actual:

        Source (mediaElementSource)  ==> track.connect(audioContext.destination)  => Destination (audioCtx.destination)

    Ahora podemos agregar la funcionalidad de control de audio: "reproducir" y "pausar".


    // Select our play button
    const playButton = document.querySelector("button");

    playButton.addEventListener("click", () => {
      // Check if context is in "suspended" state (autoplay policy)
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

      // "Play" or "pause" the track depending on state
      if (playButton.dataset.playing === "false") {
        audioElement.play();
        playButton.dataset.playing = "true";
      } else if (playButton.dataset.playing === "true") {
        audioElement.pause();
        playButton.dataset.playing = "false";
      }
    },
    false
  );

  También debemos tener en cuenta qué hacer cuando la pista (el track) termine de reproducirse. 
  Nuestro "HTMLMediaElementSource" dispara un evento "ende" una vez que termina de reproducirse, por lo que podemos escucharlo
  y ejecutar el código en consecuencia:

  audioElement.addEventListener("ended", () => {
      playButton.dataset.playing = "false";
    },
    false
  );

  
  4.2.- Modificación del sonido del sistema.

  Profundicemos en algunos "nodos de audio" de modificación básicos, para cambiar el sonido que tenemos. 

  Aquí es donde la "Web Audio API" realmente comienza a ser verdaderamente útil. 

  1.-  Cambio del volumen del sonido:  En primer lugar, vamos a cambiar el "volumen". Esto se puede hacer usando un "GainNode", 
                                       que representa qué tan "grande" (amplitud de onda) es nuestra onda de sonido.

     Hay dos formas de crear "nodos de audio" con Web Audio API. Puede usar el "método de fábrica" en el propio contexto 
     (por ejemplo, audioContext.createGain()) o mediante un "constructor del nodo" (por ejemplo, new GainNode()). 
     Usaremos el "método de fábrica" (audioCtx.createGain()) en nuestro código:

      const gainNode = audioContext.createGain();

     Ahora tenemos que "actualizar" nuestro gráfico de audio de antes, por lo que la entrada (audio node source) se conecta a 
     la "nodo de ganancia", luego el "nodo de ganancia" se conecta al destino:

      const gainNode = audioContext.createGain();
      track.connect(gainNode).connect(audioContext.destination);

    Esto hará que nuestro gráfico de audio se vea así:

    Source (mediaElementSource) => Modification (gainNode) => Destination (audioCtx.destination)

    Un "gráfico de audio" con una "fuente de elemento de audio" (un node mediaElementSource), conectado a un nodo de ganancia 
    (gainNode) que modifica la fuente de audio y luego yendo al destino predeterminado.

    El valor predeterminado para la ganancia es "1"; esto mantiene el volumen actual igual. La "ganancia" se puede establecer 
    en un mínimo de aproximadamente -3,4028235E38 y un máximo de aproximadamente 3,4028235E38 (rango de números flotantes 
    en JavaScript). Aquí permitiremos que el estéreo portátil suba la ganancia a 2 (el doble del volumen original) y la baje a 0
    (esto silenciará efectivamente nuestro sonido).

      
    Démosle al usuario el control para hacer esto; usaremos una "entrada de rango" (element input type="range"):

      <input type="range" id="rangeVolume" min="0" max="2" value="1" step="0.01" />

    Nota: Las "entradas de rango" son un tipo de entrada realmente útil para actualizar valores en nodos de audio. 
          Puede especificar los "valores de un rango" y usarlos directamente con los "parámetros del nodo de audio"(gainNode).

    Entonces, tomemos el valor de esta entrada y actualicemos el valor de ganancia cuando el usuario cambie el valor del "nodo 
    de entrada":

    const volumeControl = document.querySelector("#rangeVolume");
    volumeControl.addEventListener("input", () => {
      gainNode.gain.value = volumeControl.value;
    }, false);

  ¡Genial, ahora el usuario puede actualizar el volumen de la pista! El "nodo de ganancia" (gainNode) es el nodo perfecto para 
  usar si desea agregar la funcionalidad de silencio.


  3.-  "Panorama estéreo" a nuestra aplicación: "StereoPannerNode"

  Agreguemos otro nodo de modificación para practicar lo que acabamos de aprender.

  Hay un nodo de audio: "StereoPannerNode" que cambia el "balance del sonido" entre los altavoces izquierdo y derecho, 
  si el usuario tiene capacidades estéreo.

  Nota: El "StereoPannerNode" es para casos simples en los que solo desea panoramización estéreo de izquierda a derecha. 
        También hay un "PannerNode", que permite un gran control sobre el espacio 3D, o la espacialización del sonido , 
        para crear efectos más complejos. Esto se usa en juegos y aplicaciones 3D para crear pájaros que vuelan por encima 
        de la cabeza o sonidos que vienen detrás del usuario, por ejemplo.

  La propiedad: "pan" toma un valor sin unidades entre: "-1" (panorámica izquierda completa) y "1" (panorámica derecha completa).
  Esta interfaz se introdujo como una forma mucho más sencilla de aplicar un "efecto panorámico simple" que tener que usar un 
  archivo "PannerNode".

  Para visualizarlo, haremos que nuestro "gráfico de audio" se vea así:

  Source(mediaElementSource)  ==> track.connect(gainNode) => Modificacion (stereoPannerNode)  => Destination (audioCtx.destination)

  El "gráfico de audio" muestra un "nodo de entrada" (mediaElementSource)), dos nodos de modificación (un nodo de ganancia y 
  un nodo de panorama estéreo) y un nodo de "destino".

  Usaremos el "método constructor" para crear un nodo esta vez. Cuando lo hacemos de esta manera, tenemos que pasar el contexto
  y cualquier "opción" que pueda tomar el nodo en particular:

  const pannerOptions = { pan: 0 };
  const panner = new StereoPannerNode(audioContext, pannerOptions);

  Nota: el "método constructor" (StereoPannerNode) que crea nodos no es compatible con todos los navegadores en este momento. 
        Los métodos de fábrica más antiguos tienen un soporte más amplio.

  Aquí nuestros valores van desde: -1 (extremo izquierdo) y 1 (extremo derecho). Nuevamente, usemos una entrada "input" element
  de tipo de "range" para variar este parámetro:

        <input type="range" id="panner" min="-1" max="1" value="0" step="0.01" />

 Usamos los "valores de esa entrada2 de este elemento HTML "range" para ajustar nuestros valores panorámicos de la misma manera 
 que lo hicimos antes:

        const pannerControl = document.querySelector("#panner");

        pannerControl.addEventListener("input", () => {
          panner.pan.value = pannerControl.value;
        }, false);

  Ajustemos nuestro gráfico de audio nuevamente, para conectar todos los nodos:

        track.connect(gainNode).connect(panner).connect(audioContext.destination);
*/

/*  <audio>: The Embed Audio element HTML

    El elemento "audio" se usa para insertar contenido de audio en un documento HTML o XHTML. El elemento audio se agregó 
    como parte de HTML 5.  Hay tres formatos de audio admitidos en HTML: MP3, WAV y OGG.

    Nota: actualmente Gecko admite solamente Vorbis, en contenedores Ogg, así como formato WAV. Asimismo, el servidor debe 
          servir el archivo mediante el tipo MIME correcto con el fin de que Gecko lo reproduzca correctamente.

    Puedes usar las características "API de audio" mejoradas - que son específicas de Gecko - para generar y manipular 
    directamente secuencias de audio a partir de código JavaScript. Consulta Manipular sonido a través de la API de audio 
    mejorada para tener más detalles.

    Atributos

      autoplay:  Un atributo booleano; si se especifica (incluso aunque el valor sea "false"), el sonido comenzará a 
                 reproducirse automáticamente en cuanto sea posible, sin detenerse para terminar de cargar los datos.

      autobuffer Deprecated. Un atributo booleano; si se especifica, el sonido comenzará a reproducirse automáticamente, 
                             incluso aunque no se haya configurado para la reproducción automática. Esto continuará hasta 
                             que la caché de medios esté llena o se haya descargado el archivo de audio completo, lo que 
                             suceda primero. Debería usarse sólo si se espera que el usuario elija reproducir el audio; 
                             por ejemplo si el usuario ha navegado hasta una página usando un vínculo de "Reproducir este 
                             audio". Este atributo se eliminó de Gecko 2.0 (Firefox 4 / Thunderbird 3.3 / SeaMonkey 2.1) 
                             en favor del atributo "preload".

      preload:  El objetivo de este atributo enumerado es proporcionar una "sugerencia" al navegador sobre qué cree el 
                autor que proporcionará la mejor experiencia para el usuario . Puede tener uno de los siguientes valores:

                none: sugiere bien que el autor cree que el usuario no tendrá que consultar ese video, bien que el servidor 
                      desea minimizar su tráfico; es decir, esta sugerencia indica que no se debe almacenar en caché este 
                      video;

                metadata: sugiere que aunque el autor piensa que el usuario no tendrá que consultar ese video, es razonable 
                          capturar los metadatos (p. ej. longitud);

                auto: sugiere que el usuario necesita tener prioridad; es decir, esta sugerencia indica que, si es necesario,
                      se puede descargar el video completo, incluso aunque el usuario no vaya a usarlo;

                the empty string: que es sinónimo del valor auto.

                Si no está configurado, su valor predeterminado está definido por el navegador (es decir, cada navegador 
                puede elegir su propio valor predeterminado), aunque la especificación aconseje que se establezca a 
                metadatos.

      buffered: Un atributo que se puede leer para determinar qué intervalos de tiempo del multimedia se han almacenado en 
                búfer. Este atributo contiene un objeto TimeRanges (en-US).

      controls: Si está presente este atributo, el navegador ofrecerá "controles" para permitir que el usuario controle 
                la reproducción de audio, incluyendo volumen, búsqueda y pausar/reanudar reproducción.

      loop:  Un atributo booleano; si se especifica, al alcanzar el final del audio, realizaremos la búsqueda automáticamente 
             hasta el principio.

      muted:  Specifies that the audio output should be muted

      mozCurrentSampleOffset Non-standard.  La posición de desplazamiento, que se especifica como el número de muestras 
                             desde el comienzo de la secuencia de audio, en la cual el audio se está reproduciendo 
                             actualmente.

  Nota: Observaciones sobre uso:

  El atributo "autoplay" tiene prioridad sobre éste puesto que si se desea reproducir automáticamente un video, el navegador
  obviamente tendrá que descargarlo. La especificación permite establecer los atributos autoplay y preload.

  La especificación no fuerza al navegador a seguir el valor de este atributo; es tan sólo una sugerencia.

      src:  La "URL del audio" que se va a insertar. Está sujeta a los Controles de acceso HTTP. Es opcional; en su lugar 
            puedes usar el "elemento source" dentro del bloque de audio para especificar el audio que se va a insertar.

             Las compensaciones de tiempo se especifican como valores float que indican el número de segundos que se va a 
             compensar.

Nota: la definición del valor de compensación de tiempo no se ha completado en HTML 5 aún y está sujeta a cambios.

Example:

          <audio src="audiotest_(1).ogg" autoplay controls preload="metadata">
            Your browser does not support the <code>audio</code> element.
          </audio>
*/