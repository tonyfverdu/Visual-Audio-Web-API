import { contCanvas } from "../initialization.js"
import { createElemInDOM, deleteElemFromDOM } from "../functions.js"
import { removeCanvasPumpkin } from "../pumpkinSpeaker.js"
import { arrayOfLanguage } from "./languages.js"

let toogleRecord = false

export function createContSpeech() {
  const myCanvasAmp = document.querySelector("#myCanvasAmp")
  const myCanvas = document.querySelector("#myCanvas")

  if (myCanvas) deleteElemFromDOM("myCanvas")
  if (myCanvasAmp) deleteElemFromDOM("myCanvasAmp")

  createElemInDOM(contCanvas, "div", "contSpeech", "contSpeechRecognizer")
  const elemContSpeech = document.querySelector("#contSpeech")

  createElemInDOM(elemContSpeech, "header", "headerSpeech", "headerClassSpeech")
  const elemHeaderSpeech = document.querySelector("#headerSpeech")
  createElemInDOM(elemHeaderSpeech, "h4", "titleSpeechRecog", "titleHeaderSpeech")
  const elemTitleSpeechrecog = document.querySelector("#titleSpeechRecog")
  elemTitleSpeechrecog.innerHTML = "Speech Recognizer"

  createElemInDOM(elemContSpeech, "textarea", "textAreaVoice", "textAreaRecognizer")
  const elemTextArea = document.querySelector("#textAreaVoice")
  elemTextArea.setAttribute("disabled", "true")

  createElemInDOM(elemContSpeech, "div", "contGruppeBtn", "gruppeButton")
  const elemcontBtn = document.querySelector("#contGruppeBtn")

  createElemInDOM(elemcontBtn, "div", "contSelectLanguage", "divSelectLanguage")
  const elemContSelectLanguage = document.querySelector("#contSelectLanguage")

  createElemInDOM(elemContSelectLanguage, "select", "selectLanguages", "select")
  const elemSelectLanguage = document.querySelector("#selectLanguages")

  const optionsOfSelect = []
  const languageOfSelect = arrayOfLanguage.map(leng => leng.language)
  for (let i = 0; i <= arrayOfLanguage.length - 1; i++) {
    createElemInDOM(elemSelectLanguage, "option", arrayOfLanguage[i].language, "optionLanguage")
    optionsOfSelect[i] = document.querySelector(`#${arrayOfLanguage[i].language}`)
    optionsOfSelect[i].innerText = languageOfSelect[i]
  }

  createElemInDOM(elemContSelectLanguage, "button", "btnSelectLanguage", "buttonSpeech")
  const btnLanguage = document.querySelector("#btnSelectLanguage")
  createElemInDOM(btnLanguage, "span", "iconSelect", "material-symbols-outlined")
  const iconSelect = document.querySelector("#iconSelect")
  iconSelect.innerHTML = "check_circle"

  createElemInDOM(elemcontBtn, "div", "contBtnRecognizer", "contBtns")
  const elemContBtnsrecognizer = document.querySelector("#contBtnRecognizer")
  createElemInDOM(elemContBtnsrecognizer, "button", "recordBtn", "buttonSpeech")
  const btnRecord = document.querySelector("#recordBtn")
  createElemInDOM(btnRecord, "span", "iconRecord", "material-symbols-outlined")
  const iconRecord = document.querySelector("#iconRecord")
  iconRecord.innerHTML = "radio_button_checked"

  createElemInDOM(elemContBtnsrecognizer, "button", "playBtn", "buttonSpeech")
  const btnPlay = document.querySelector("#playBtn")
  createElemInDOM(btnPlay, "span", "iconPlay", "material-symbols-outlined")
  const iconPlay = document.querySelector("#iconPlay")
  iconPlay.innerHTML = "play_circle"


  //  Grammar definition
  const grammar =
    "#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;";

  //////
  let isBrowserSupported = false
  // // PASO 1 ::: DETECT TYPEOF BROWSER
  function browserSupported() {
    if (window.navigator.userAgent.indexOf("Chrome") || window.navigator.userAgent.indexOf("Edge") ||
      window.navigator.userAgent.indexOf("Safari")) {
      return true
    } else {
      alert('Navigator does not support Speech Recognition!!');
      return false
    }
  }
  isBrowserSupported = browserSupported()

  // PASO 2 ::: IF THE NAVIGATOR SUPPORTS VOICE RECOGNITION, CONFIGURATION VOICE RECOGNITION
  if (isBrowserSupported) {
    // 2.1 This api has different names depending on the browser because it is still in experimental phase,
    //     so we list all of them and instantiate the first one you get
    const objectRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition ||
      window.msSpeechRecognition)()
    const speechRecognitionList = new (window.SpeechGrammarList || webkitSpeechGrammarList || mozSpeechGrammarList || msSpeechGrammarList)();
    speechRecognitionList.addFromString(grammar, 1);

    objectRecognition.grammars = speechRecognitionList;

    // 2.2 Configuration of object (instance) of objectRecognition
    //  2.2.1.-  Definition the language to be listened (https://en.wikipedia.org/wiki/Language_localisation#:~:text=Examples%20of%20language%20tags)
    let objectLanguageLang = ["en-GB", "en-US", "en-CA", "en-AU", "en-ZA"]
    btnLanguage.addEventListener('click', () => {
      const objectLanguage = arrayOfLanguage.find(leng => leng.language === elemSelectLanguage.value)
      objectRecognition.lang = objectLanguage.lang
      objectLanguageLang = objectLanguage.lang
    }, false)

    //  2.2.2.-  Definition of continuous speech recording (to true)
    objectRecognition.continuos = true
    //  2.2.3.-  Definition of times before the results (to false)
    objectRecognition.interimResults = false

    // 2.3  EventListener in record voice (button "btnRecord")
    btnRecord.addEventListener('click', () => {
      toogleRecord = !toogleRecord
      // 2.3.1.- We configure that when it finishes recognizing something, it will listen again.
      if (toogleRecord) {
        elemTextArea.value += "Start recording:  "
        // 2.4.1.-  start recording
        objectRecognition.start()
      } else {
        //  2.4.2.- abort recording
        elemTextArea.value += "Abort recording  !!"
        objectRecognition.stop()
        // objectRecognition.abort()
      }
    }, false)

    // PASO 3: WE DEFINE THE FUNCTION THAT WILL HANDLE SPEECH RECOGNITION RESULT
    objectRecognition.onresult = ev => {
      const results = ev.results
      const phrase = results[0][0].transcript
      elemTextArea.value += phrase
      const goTo = results[0][0].transcript.toLowerCase().trim()

      switch (goTo) {
        case "hello":
          elemTextArea.value = "Hello everybody"
          readText(elemTextArea.value)
          break;
        case "what is your name":
          elemTextArea.value = "My name is Alejandra, please to meet you"
          readText(elemTextArea.value)
          break;
        case "how are you":
          elemTextArea.value = "I am fine thank you, and you"
          readText(elemTextArea.value)
          break;
      }
      switch (goTo) {
        case "hallo":
          elemTextArea.value = "Hallo zusammen"
          readText(elemTextArea.value)
          break;
        case ("wie heißen sie" || "wie heißen dir"):
          elemTextArea.value = "Ich heiße Alejandra, und Sie"
          readText(elemTextArea.value)
          break;
        case ("wie heißt dir"):
          elemTextArea.value = "Ich heiße Alejandra, und dir"
          readText(elemTextArea.value)
          break;
        case ("wie geht es ihnen" || "wie geht es dir"):
          elemTextArea.value = "mir geht es gut, danke, und Ihnen"
          readText(elemTextArea.value)
          break;
        case ("wie geht es dir"):
          elemTextArea.value = "mir geht es gut, danke, und dir"
          readText(elemTextArea.value)
          break;
      }
      switch (goTo) {
        case "hola":
          elemTextArea.value = "Hola a todos"
          readText(elemTextArea.value)
          break;
        case ("cómo te llamas"):
          elemTextArea.value = "Me llamo Alejandra, y tu?"
          readText(elemTextArea.value)
          break;
        case ("cuál es tu nombre"):
          elemTextArea.value = "Me llamo Alejandra, y tu?"
          readText(elemTextArea.value)
          break;
        case "cómo estás":
          elemTextArea.value = "Estoy bien gracias, y tu"
          readText(elemTextArea.value)
          break;
        case "cómo te encuentras":
          elemTextArea.value = "Estoy bien gracias, y tu"
          readText(elemTextArea.value)
          break;
      }

      if (goTo == 'wikipedia') {
        const childFrame = document.createElement('iframe');
        childFrame.src = "https://es.wikipedia.org/wiki/Wikipedia:Portada";
        childFrame.style.width = "100vw";
        childFrame.style.height = "500px";
        document.body.append(childFrame)
      }

      switch (goTo) {
        case "github":
          location.href = 'http://www.github.com/'
          break;
        case "spotify":
          location.href = 'http://www.spotify.com/'
          break;
        case "facebook":
          location.href = 'http://www.facebook.com/'
          break;
        case "beatles":
          location.href = 'https://en.wikipedia.org/wiki/The_Beatles'
          break;
        default:
          break;
      }
      const elemtContCentral = document.querySelector(".contCentral")
      switch (goTo) {
        case "black":
          elemtContCentral.style.backgroundColor = "black"
          break;
        case "dark":
          elemtContCentral.style.backgroundColor = "black"
          break;
        case "white":
          elemtContCentral.style.backgroundColor = "white"
          break;
        case "hell":
          elemtContCentral.style.backgroundColor = "white"
          break;
        case "red":
          elemtContCentral.style.backgroundColor = "red"
          break;
        case "blue":
          elemtContCentral.style.backgroundColor = "navy"
          break;
        case "green":
          elemtContCentral.style.backgroundColor = "darkgreen"
          break;
        default:
          break;
      }
      if ((results[0][0].transcript.toLowerCase().trim() == 'close') || (results[0][0].transcript.toLowerCase().trim() == 'cerrar') ||
        (results[0][0].transcript.toLowerCase().trim() == 'schließen')) {
        deleteContSpeech()
        removeCanvasPumpkin()
      }
    }

    //   PASO 4:  WE DEFINE THE FUNCTION THAT WILL HANDLE SPEECH RECOGNITION ENDE
    objectRecognition.onend = () => {
      elemTextArea.value += " - "
      if (toogleRecord) {
        objectRecognition.start()
      }
      else {
        objectRecognition.abort()
        elemTextArea.value =""
      }
    }

    //  PASO 5:  REPLAY TEXT  IN VOICE
    function readText(parText) {
      const synth = window.speechSynthesis;
      const objSpeech = new SpeechSynthesisUtterance(parText)

      // objSpeech.text = parText
      objSpeech.lang = objectLanguageLang
      objSpeech.volume = 1
      objSpeech.rate = 1.2
      objSpeech.pitch = 0.8

      synth.speak(objSpeech)
    }
    btnPlay.addEventListener('click', () => {
      readText(elemTextArea.value)
    })
  }
}

export function deleteContSpeech() {
  deleteElemFromDOM("contSpeech")
  removeCanvasPumpkin()
  createElemInDOM(contCanvas, "canvas", "myCanvas", "canvas")
}



/*

  //      Interfaz "SpeechRecognition" - (Reconocimiento de voz)
/*
  La interfaz "SpeechRecognition" de la "Web Speech API" es la interfaz del controlador para el servicio de reconocimiento
  de voz; esto también maneja los eventos: "SpeechRecognitionEvent" enviados desde el servicio de reconocimiento.

  Nota: en algunos navegadores, como Chrome, el uso del "reconocimiento de voz" en una página web implica un "motor de 
        reconocimiento" basado en servidor. Su audio se envía a un servicio web para el procesamiento de reconocimiento, 
        por lo que no funcionará sin conexión.

        ||  EventTarget  ||  ==> ||  SpeechRecognition  ||


  1.-  Constructor:  SpeechRecognition()

       Crea una nueva instancia, objeto, de la clase "SpeechRecognition".

  1.1.-  Propiedades de instancia:  "SpeechRecognition" también hereda propiedades de su interfaz principal: "EventTarget".

         A.-  SpeechRecognition.grammars

        Devuelve y establece una colección de objetos: "SpeechGrammar" que representan las gramáticas que entenderá el 
        actual objeto instanciado "SpeechRecognition".


        B.-  SpeechRecognition.lang

        Devuelve y establece el "idioma del actual" del objeto "SpeechRecognition". Si no se especifica, se establece 
        de forma predeterminada el lang al valor del atributo HTML o la configuración de idioma del agente de usuario 
        si tampoco está configurada.


        C.-  SpeechRecognition.continuous (boolean)

        Controla si se devuelven "resultados continuos" para cada reconocimiento o solo un único resultado. 
        El valor predeterminado es un único resultado( SpeechRecognition.continuous = false.)


        D.-  SpeechRecognition.interimResults

        Controla si los "resultados provisionales" deben devolverse (true) o no (false.) Los "resultados provisionales" 
        son resultados que aún no son definitivos (por ejemplo, la propiedad "SpeechRecognitionResult.isFinal" es false.)


        E.-  SpeechRecognition.maxAlternatives

        Establece el "número máximo de SpeechRecognitionAlternative" correos electrónicos proporcionados por resultado. 
        El valor predeterminado es 1.


  1.2.-  Métodos de la instancia: "SpeechRecognition()"

         "SpeechRecognition" también hereda métodos de su interfaz principal, EventTarget.

  A.-  SpeechRecognition.abort()
  Impide que el "servicio de reconocimiento de voz" escuche el audio entrante y no intenta devolver un archivo (resultado) 
  "SpeechRecognitionResult".


  B.-  SpeechRecognition.start()
  Inicia el "servicio de reconocimiento de voz" escuchando el audio entrante con la intención de reconocer las gramáticas 
  asociadas con el archivo "SpeechRecognition".


  D.-  SpeechRecognition.stop()
  Impide que el servicio de reconocimiento de voz escuche el audio entrante e intenta devolverlo 
  "SpeechRecognitionResult" usando el audio capturado hasta el momento.


  1.3.-  Eventos: escuche estos eventos usando "addEventListener()", o asignando un detector de eventos a la propiedad 
                  "oneventname" de esta interfaz.

  A.-  audiostart:  se activa cuando el agente de usuario ha comenzado a capturar audio. También disponible a través 
                    de la propiedad "onaudiostart".

  B.-  audioend:  se activa cuando el agente de usuario ha terminado de capturar el audio. También disponible a través 
                  de la propiedad "onaudioend".

  C.-  end:  se activa cuando el servicio de reconocimiento de voz se ha desconectado. También disponible a través de la 
             propiedad "onend".

  D.-  error:  se activa cuando se produce un error de reconocimiento de voz. También disponible a través de la 
              propiedad "onerror".

  E.-  nomatch:  se activa cuando el servicio de reconocimiento de voz devuelve un resultado final sin un reconocimiento 
                 significativo. 

                 Esto puede implicar cierto grado de reconocimiento, que no alcanza ni supera el umbral de 
                 "confidenceumbral". También disponible a través de la propiedad "onnomatch".

  F.-  result: se activa cuando el servicio de reconocimiento de voz devuelve un resultado: una palabra o frase ha sido 
               reconocida positivamente y esto se ha comunicado a la aplicación. También disponible a través de la 
               propiedad "onresult".

  G.-  soundstart:  se activa cuando se detecta cualquier sonido, ya sea un habla reconocible o no. También disponible 
                    a través de la propiedad "onsoundstart"

  H.-  soundend:  se activa cuando cualquier sonido, reconocible o no, ha dejado de detectarse. También disponible a 
                  través de la propiedad "onsoundend".

  I.-  speechstart:  se activa cuando se detecta un sonido que el servicio de reconocimiento de voz reconoce como voz. 
                     También disponible a través de la propiedad "onspeechstart".

  J.-  speechend:  se activa cuando el habla reconocida por el servicio de reconocimiento de voz ha dejado de detectarse.
                   También disponible a través de la propiedad "onspeechend".

  K.-  start:  se activa cuando el servicio de reconocimiento de voz ha comenzado a escuchar el audio entrante con la 
               intención de  reconocer las gramáticas asociadas con el actual "SpeechRecognition". También disponible 
               a través de la propiedad "onstart".



Ejemplos:  En nuestro ejemplo simple de un "cambiador de color" por voz, creamos una nueva instancia de la clase 
           "SpeechRecognition" usando el constructor: "SpeechRecognition()", creamos un nuevo "SpeechGrammarList" 
           y lo configuramos para que sea la gramática que reconocerá la instancia "SpeechRecognition" usando la 
           propiedad:  "SpeechRecognition.grammars".

           Después de definir algunos otros valores, lo configuramos para que el "servicio de reconocimiento de voz"
           se inicie cuando se produce un evento "click" => "SpeechRecognition.start()"
           Cuando un resultado se ha reconocido con éxito, el resultevento se dispara, extraemos el color que se 
           pronunció del objeto del evento, y a continuación, establezca el color de fondo del elemento: <html> 
           en ese color.


           const grammar = 
           "#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;";

           //  1.-  Crea una nueva instancia, objeto, de la clase "SpeechRecognition".
           const recognition = new SpeechRecognition(); 

           //  1.1.-  new SpeechGrammarList(): definicion de una colección de objetos: "SpeechGrammar" 
           //                                  Le anadimos las gramaticas definidas en el string definido en "grammar"
           const speechRecognitionList = new SpeechGrammarList();
           speechRecognitionList.addFromString(grammar, 1);

           recognition.grammars = speechRecognitionList;

           //  2.-  Configuracion de la instancia del objeto de clase "SpeechRecognition"
          recognition.continuous = false;
          recognition.lang = "en-US";
          recognition.interimResults = false;
          recognition.maxAlternatives = 1;

          //  3.-  definicion de referencias a elementos del DOM
          const diagnostic = document.querySelector(".output");
          const bg = document.querySelector("html");

          //  4.-  Definicion de evento "click" sobre el "body" => 
          document.body.onclick = () => {
            recognition.start();    //  <==   Inicia el "servicio de reconocimiento de voz" escuchando el audio entrante 
                                    //        con la intención de reconocer las gramáticas 
                                    //        asociadas con el archivo "SpeechRecognition".

            console.log("Ready to receive a color command!");
          };

          //  5.-  result: se activa cuando el servicio de reconocimiento de voz devuelve un resultado: una palabra o 
          //               frase ha sido reconocida positivamente y esto se ha comunicado a la aplicación. 
          //               También disponible a través de la propiedad "onresult".

            recognition.onresult = (event) => {
              const color = event.results[0][0].transcript;
              diagnostic.textContent = `Result received: ${color}`;
              bg.style.backgroundColor = color;
            };
*/