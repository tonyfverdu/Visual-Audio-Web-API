import { track, gainNode, pannerStereo } from "./main.js"
import { urlImgSong } from "./initialization.js"
import { randomNumber, randomColor, imageInCanvas } from "./functions.js"
import { WIDTH, HEIGHT } from "./graphic.js"


//  Analyser Frecuency:  analyserFrec()
export default function analyserFrec(parCanvas, parCtxCanvas, parAudioCtx, parContCanvas, parMyNewCanvas, parNewCtx,
    parAnalyser, parfftSize) {
    const toogleCircleBtn = document.querySelector("#changeCircleBtn")

    //  1.-   Connects of AudioNodes:
    //  1.1-  Connect the "track" (sound of font audioNode) to the node of Gain: "gainNode" (track => gainNode)
    track.connect(gainNode);
    //  1.2.- Connect the "gainNode" to the audioNode: "pannerStereo" (gainNode => pannerStereo)
    gainNode.connect(pannerStereo)
    //  1.3.-  Connect the audioNode "pannerStereo" to the audioNode "analyser" (pannerStereo ==> analyzer Node)
    pannerStereo.connect(parAnalyser);
    //  1.4.-  Connect the node "analyser" to "destination" of system (speakers) (analyser => audioCtx.destination)
    parAnalyser.connect(parAudioCtx.destination)

    //  2.-  Definition of variables of analyser  (get frecuency of the sound audioNode with:  frequencyBinCount)
    const bufferLength = parAnalyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // 3.-    Vidualizators of frecuencys
    // 3.1.-  Draw the exit of analyser in canvas
    let visualizator = "Bars"  //  Defect visualizator:  "Bars"

    // 3.2-   Events of select visualizator, 'change' in the "select" of visualizator  ('change' => "visualizator" is value selected)
    const optionElemVisualizator = document.querySelectorAll('.optionVisualizator')
    const visualizatorSelect = document.querySelector('#selectVisuaFrec')

    visualizatorSelect.addEventListener('change', (ev) => {
        visualizator = optionElemVisualizator[ev.target.selectedIndex].value
    })

    // 3.3.-  Select Fast Fourier transfrorm size (fftSize)
    parAnalyser.fftSize = parfftSize;  //  Fast Fourier Transform (fft)

    // 4.-  Style of parCanvas, put image of album in the newcanvas
    function newCanvas(parCanvas) {
        const styleNewCanvas = {
            display: 'flex',
            position: 'absolute',
            top: '15px',
            right: '15px',
            width: '120px',
            height: '120px',
            padding: '0%',
            margin: '0% auto',
            borderRadius: '50%',
            border: '1px solid v.$backgroundColorHellGrayT',
            backgroundColor: 'black',
            zIndex: '50'
        }
        for (const atributteCSS in styleNewCanvas) {
            parCanvas.style[atributteCSS] = styleNewCanvas[atributteCSS]
        }
        parContCanvas.appendChild(parCanvas)
    }

    newCanvas(parMyNewCanvas)
    imageInCanvas(urlImgSong, parNewCtx)

    // 5.-  Switch of type of frecuency visualizator ("Bars", "Hell Doom", "Fireworks", "Circles Rainbow")
    function drawFrecuencySound() {
        let x
        switch (visualizator) {
            case "Bars":
                parCanvas.style.filter = 'blur(0px) contrast(3)'
                toogleCircleBtn.style.display = 'none'
                visualizerBars(bufferLength, x)
                break;
            case "Hell Doom":
                parCanvas.style.filter = 'blur(1px) contrast(5)'
                toogleCircleBtn.style.display = 'none'
                visualizatorHell(bufferLength, x)
                break
            case "Fireworks":
                parCanvas.style.filter = 'blur(1px) contrast(5)'
                toogleCircleBtn.style.display = 'none'
                visualizatorFirework(bufferLength, x)
                break
            case "Circles Rainbow":
                parCanvas.style.filter = 'blur(0px) contrast(3)'
                toogleCircleBtn.style.display = 'block'
                visualizatorCircles(bufferLength)
                // visualizator2(bufferLength)
                break
            case "no se":
                toogleCircleBtn.style.display = 'none'
                break
            default:
            // code block
        }
        requestAnimationFrame(drawFrecuencySound);
    }

    //  6.1-  Functions definitions of the frecuency visualizers:  visualizerBars 
    function visualizerBars(bufferLength, x) {
        parAnalyser.fftSize = parfftSize;  //  Fast Fourier Transform (fft)
        parAnalyser.getByteFrequencyData(dataArray);

        parCtxCanvas.reset()
        parCtxCanvas.fillStyle = 'rgb(0, 0, 0)';
        parCtxCanvas.fillRect(0, 0, WIDTH, HEIGHT);
        const barWidth = (parCanvas.width / bufferLength) + 0.5;
        x = 0

        for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i] * 0.5
            const g = i * 1.5 / bufferLength
            const b = i * 1.5
            const colorRed = i * barHeight / randomNumber(5, 6)
            const colorGreen = 255 * 3 * g
            const colorBlue = 255 - b

            const colorRandom = `rgb(${colorRed}, ${colorGreen}, ${colorBlue})`
            parCtxCanvas.fillStyle = colorRandom
            parCtxCanvas.fillRect(x, parCanvas.height - barHeight, barWidth, barHeight);
            parCtxCanvas.beginPath()
            parCtxCanvas.fillStyle = "white"
            parCtxCanvas.arc(x, parCanvas.height - barHeight - 3, 0.5, 0, Math.PI * 2)
            parCtxCanvas.fill()
            x += barWidth + 0.6;
        }
    }

    //  6.2-  Functions definitions of the frecuency visualizers:  visualizatorHell 
    function visualizatorHell(bufferLength, x) {
        //  Fast Fourier Transform (fft)
        parAnalyser.fftSize = parfftSize;
        parAnalyser.getByteFrequencyData(dataArray);
        parCtxCanvas.fillStyle = 'rgb(0, 0, 0)';
        parCtxCanvas.fillRect(0, 0, parCanvas.width, parCanvas.height);
        const barWidth = (parCanvas.width / bufferLength) + 0.5
        x = 0
        const colorFire = ['red', 'rgb(255, 51, 0)', 'rgb(255, 128, 128)', 'rgb(255, 180, 180)', 'orange', 'rgb(255, 102, 102)', 'rgb(255, 153, 153)', 'rgb(204, 255, 102)',
            'rgb(204, 255, 51)', 'rgb(255, 255, 153)', 'rgb(255, 255, 102)', 'rgb(255, 255, 0)', 'rgb(230, 255, 230)', 'rgb(255, 230, 230)', 'rgb(255, 255, 230)', 'white']
        for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i] * 0.56

            //  Colors of bars
            const colorRed = i * barHeight / 5
            const colorGreen = i * randomNumber(2, 4)
            const colorBlue = randomNumber(80, 255)

            const indexColorFire = randomNumber(0, colorFire.length - 1)
            parCtxCanvas.fillStyle = colorFire[indexColorFire]
            parCtxCanvas.fillRect((parCanvas.width / 2) - x, parCanvas.height - barHeight - randomNumber(6, 24), barWidth, randomNumber(4, 9))
            const colorRGB = `rgb(${colorRed}, ${colorGreen}, ${colorBlue})`
            parCtxCanvas.fillStyle = colorRGB
            parCtxCanvas.fillRect((parCanvas.width / 2) - x, parCanvas.height - barHeight, barWidth, barHeight)
            x += barWidth + 0.2
        }
        x = parCanvas.width / 2 - 2
        for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i] * 0.56

            //  Colors of bars
            const colorRed = i * barHeight / 5
            const colorGreen = i * randomNumber(2, 4)
            const colorBlue = randomNumber(80, 255)

            const indexColorFire = randomNumber(0, colorFire.length - 1)
            parCtxCanvas.fillStyle = colorFire[indexColorFire]
            parCtxCanvas.fillRect(x, parCanvas.height - barHeight - randomNumber(6, 24), barWidth, randomNumber(4, 9))
            const colorRGB = `rgb(${colorRed}, ${colorGreen}, ${colorBlue})`
            parCtxCanvas.fillStyle = colorRGB
            parCtxCanvas.fillRect(x, parCanvas.height - barHeight, barWidth, barHeight)
            x += barWidth + 0.2
        }
    }

    //  6.3-  Functions definitions of the frecuency visualizers:  visualizatorFirework 
    function visualizatorFirework(bufferLength, x) {
        //  Fast Fourier Transform (fft)
        parAnalyser.fftSize = parfftSize / 2;
        parAnalyser.getByteFrequencyData(dataArray);
        parCtxCanvas.fillStyle = 'rgb(0, 0, 0)';
        parCtxCanvas.fillRect(0, 0, parCanvas.width, parCanvas.height);
        const barWidth = ((parCanvas.width / 2) / bufferLength) + 1.4
        x = 0

        for (let i = 0; i < bufferLength; i++) {
            const randomGanancia = randomNumber(4, 6) / 10
            const barHeight = dataArray[i] * randomGanancia
            //  Colors of bars
            const colorRed = i * barHeight / randomNumber(2, 15)
            const colorGreen = i * randomNumber(1, 5)
            const colorBlue = randomNumber(50, 255)
            parCtxCanvas.fillStyle = randomColor()
            parCtxCanvas.fillRect((parCanvas.width / 2) - x, parCanvas.height - barHeight - randomNumber(randomNumber(4, 8), randomNumber(20, 68)), barWidth, randomNumber(1, 3))
            const colorRGB = `rgb(${colorRed}, ${colorGreen}, ${colorBlue})`
            parCtxCanvas.lineCap = "round";
            parCtxCanvas.fillStyle = colorRGB
            parCtxCanvas.fillRect((myCanvas.width / 2) - x, parCanvas.height - barHeight, barWidth, barHeight)
            x += barWidth + 0.2
        }
        x = myCanvas.width / 2
        for (let i = 0; i < bufferLength; i++) {
            const randomGanancia = randomNumber(4, 6) / 10
            const barHeight = dataArray[i] * randomGanancia
            //  Colors of bars
            const colorRed = i * barHeight / randomNumber(2, 15)
            const colorGreen = i * randomNumber(1, 5)
            const colorBlue = randomNumber(50, 255)
            parCtxCanvas.fillStyle = randomColor()
            parCtxCanvas.fillRect(x, parCanvas.height - barHeight - randomNumber(randomNumber(4, 8), randomNumber(20, 68)), barWidth, randomNumber(1, 3))
            const colorRGB = `rgb(${colorRed}, ${colorGreen}, ${colorBlue})`

            parCtxCanvas.lineCap = "round";
            parCtxCanvas.fillStyle = colorRGB
            parCtxCanvas.fillRect(x, parCanvas.height - barHeight, barWidth, barHeight)
            x += barWidth + 0.2
        }
    }

    //  6.4-  Functions definitions of the frecuency visualizers:  visualizatorCircles 
    let randomX = parCanvas.width / 2
    let randomY = parCanvas.height / 2
    let randomGanancia = randomNumber(4, 5) / 10
    let contClick = 0
    let isCircle = true
    let colorCanvas = 'rgb(0, 0, 0)'
    let barWidth = (parCanvas.width / bufferLength) * randomNumber(1, 3) + randomNumber(1, 3)
    let barHeight
    let Fauerwerk = true

    function appearCircle() {
        setInterval(() => {
            myCanvas.style.filter = `blur(${randomNumber(0, 1)}px) contrast(${randomNumber(1, 2)})`
            randomX = randomNumber(4, myCanvas.width - 4)
            randomY = randomNumber(4, myCanvas.height - 4)
            circle(randomX, randomY, barWidth)
            isCircle = !isCircle
        }, 5000)
    }
    function circle(parRandomX, parRandomY, barWidth) {
        barWidth = (myCanvas.width / bufferLength) * randomNumber(1, 3) + randomNumber(2, 4)
        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] * randomGanancia
            parCtxCanvas.save()
            parCtxCanvas.translate(parRandomX, parRandomY)
            if (toogleCircleBtn.dataset.playing === "true") {
                const hue = i * 12
                parCtxCanvas.fillStyle = 'hsl(' + hue + ',100%,50%)'
                parCtxCanvas.beginPath();
                parCtxCanvas.rotate(i + Math.PI * 6 / bufferLength)
                parCtxCanvas.arc(randomNumber(0, 20), barHeight * 0.4, barHeight * 0.4, 0, Math.PI / randomNumber(6, 8))
                parCtxCanvas.fill()
                if (Fauerwerk) {
                    parCtxCanvas.arc(0, barHeight * 2, barHeight / 80, 0, Math.PI * 2)
                    parCtxCanvas.fill()
                }
            } else {
                if (isCircle) {
                    parCtxCanvas.rotate(i + Math.PI * 6 / bufferLength)
                } else {
                    parCtxCanvas.rotate(i * Math.PI * 8 / bufferLength)
                }
                //  Colors of circles
                const hue = i * 1.5
                parCtxCanvas.fillStyle = 'hsl(' + hue + ',100%,' + barHeight / 1.08 + '%)'
                parCtxCanvas.fillRect(0, 0, barWidth, barHeight)
            }
            parCtxCanvas.restore()
        }
    }

    toogleCircleBtn.addEventListener('click', function () {
        // "Black" or "random" the background color of canvas depending on state
        if (this.dataset.playing === "true") {
            colorCanvas = "black"
            this.dataset.playing = "false"
        } else {
            colorCanvas = "black"
            this.dataset.playing = "true"
            Fauerwerk = !Fauerwerk
        }
        parCanvas.style.backgroundColor = colorCanvas
        appearCircle()
    }, false)

    function visualizatorCircles(bufferLength) {
        contClick += 1
        //  Fast Fourier Transform (fft)
        const arrayFFT = [512, 1024, 2048, 4096]
        const randomIndex = randomNumber(0, arrayFFT.length - 1)
        parAnalyser.fftSize = arrayFFT[randomIndex];
        if (contClick < 2) {
            appearCircle()
        }
        parAnalyser.getByteFrequencyData(dataArray);
        parCtxCanvas.fillStyle = colorCanvas;
        parCtxCanvas.fillRect(0, 0, parCanvas.width, parCanvas.height);
        circle(randomX, randomY, barWidth)
    }

    drawFrecuencySound()
}