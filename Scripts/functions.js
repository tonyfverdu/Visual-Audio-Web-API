import { elemMyCanvas, urlImgSong } from "./initialization.js"
import { myCanvas, canvasCtx, WIDTH, HEIGHT } from "./graphic.js"
import { myNewCanvas, newCtx, audioCtx, track, gainNode, pannerStereo } from "./main.js"
import Microphone from "./microphone.js"
import { toogleAnimation } from "./events.js"

////////////////////////////////////
//  Functions
export function randomNumber(parMin, parMax) {
  let numberRandom = 0;

  if ((typeof parMin === 'number' && Number.isInteger(parMin)) && (typeof parMax === 'number' && Number.isInteger(parMax))) {
    numberRandom = Math.floor(Math.random() * (parMax - parMin) + parMin);
  } else {
    console.log('Error:  The arguments of the function "randomNumber" must be numbers integers!!');
    numberRandom = null;
  }
  return numberRandom;
}

export function randomColor() {
  let colorRandomOut = '';

  const RR = randomNumber(0, 255);
  const GG = randomNumber(0, 255);
  const BB = randomNumber(0, 255);

  colorRandomOut = `rgb(${RR},${GG},${BB})`;

  return colorRandomOut;
}

export function fireWorks(posX, posY, parCtx) {
  setInterval(() => {
    const colorRandom = randomColor()
    parCtx.fillStyle = colorRandom
    parCtx.beginPath()
    parCtx.moveTo(posX, posY)
    parCtx.arc(posX, posY, randomNumber(3, 6), 0, Math.PI * 2)
    parCtx.fill()
  }, randomNumber(2000, 5000))

}

export function calculateIndex(parTitle, parJSON) {
  let resultIndex = 0
  if (typeof parTitle === 'string' && Array.isArray(parJSON)) {
    const result = parJSON.findIndex(element => element.title === parTitle)
    if (result === -1) {
      console.log(`There is not  "${parTitle}"  into the array`)
      resultIndex = null
    } else {
      resultIndex = result
    }
  } else {
    console.error('Error: The arguments of the function "calculateIndex" must be a string("parTitle") and an array("parJSON")!')
    resultIndex = null
  }
  return resultIndex
}

//  Album data upload
export function uploadAlbums(parJSON, parElemSelect) {
  let arrayOfAlbums = []
  if (Array.isArray(parJSON)) {
    arrayOfAlbums = parJSON.map((elem, index) => {
      const optionElem = document.createElement("option")
      if (index === 0) {
        const atrSelected = document.createAttribute("selected")
        optionElem.setAttributeNode(atrSelected)
      }
      optionElem.classList.add("optionAlbums")
      optionElem.value = elem.title
      optionElem.innerHTML = `${elem.title}`
      parElemSelect.appendChild(optionElem)
    })
  } else {
    console.error('Error:  The argument "parJSON" of the function "uploadData" must be an array (JSON of data)!')
    arrayOfAlbums = null
  }
  return arrayOfAlbums
}

//  Songs from albums upload
export function uploadSongs(parNameOfAlbum, parJSONSong, parElemSelect) {
  let arraySongs = []
  if (Array.isArray(parJSONSong) && (typeof parNameOfAlbum === 'string')) {
    for (let i = 0; i < parJSONSong.length; i++) {
      for (let j = 0; j < parJSONSong[i].album.length; j++) {
        if (parNameOfAlbum === parJSONSong[i].album[j]) {
          arraySongs.push({ title: parJSONSong[i].title, song: parJSONSong[i].mp3 })
        }
      }
    }
    arraySongs.map(elem => {
      const optionElem = document.createElement("option")
      optionElem.classList.add("optionSongs")
      optionElem.value = elem.song
      optionElem.innerHTML = `${elem.title}`
      parElemSelect.appendChild(optionElem)
    })

  } else {
    console.error('Error:  The argument "parJSONAlbum" of the function "uploadSongs" must be arrays (JSON of data) and the argument "parNameOfAlbum" a string!')
    arraySongs = null
  }
  return arraySongs
}

//  set image in canvas
export function imageInCanvas(urlImg, parCtx) {
  const img = new Image()
  img.src = urlImg
  // if (audioElement.play()) {
  //   myNewCanvas.style.animation = 'rotateRecord 18s linear infinite'
  // }
  img.onload = function () {
    parCtx.drawImage(img, 0, 0, myCanvas.width, myCanvas.height);
  }
}

//  Set song info
export function setInfoSong(parIndexSong, parJSON_OFSongs, parElemImage, parElemVocals, parElemTitleSong,
  parElemInfoAlbum, parYear, parElemInfoDuration, parCtxCanvas) {

  if (typeof parIndexSong === 'number' && Number.isInteger(parIndexSong)
    && !Number.isNaN(parIndexSong) && parIndexSong >= 0 && Array.isArray(parJSON_OFSongs)) {
    const iniImgSong = parJSON_OFSongs[parIndexSong].image[0]
    const urlIniImgSong = `./assets/images/portadas/${iniImgSong}`
    parElemImage.setAttribute('src', urlIniImgSong)

    let iniSongVocals = '(by '
    for (let i = 0; i < parJSON_OFSongs[parIndexSong].vocals.length; i++) {
      iniSongVocals += parJSON_OFSongs[parIndexSong].vocals[i] + ' '
    }
    parElemVocals.innerHTML = iniSongVocals + ')'

    parElemTitleSong.innerHTML = parJSON_OFSongs[parIndexSong].title
    parElemInfoAlbum.innerHTML = parJSON_OFSongs[parIndexSong].album[0]
    parYear.innerHTML = parJSON_OFSongs[parIndexSong].year
    parElemInfoDuration.innerHTML = parJSON_OFSongs[parIndexSong].duration + 'm'
    imageInCanvas(urlIniImgSong, parCtxCanvas)
  } else {
    console.error('Error:  The argument "parIndexSong" of the function "setInfoSong" must be a integer number, and parJSON_OFSongs an array of songs!')
  }
}

//  Config ini canvas
// export function configCanvas(parIdCanvas, parCtxCanvas) {
//   const myCanvas = document.querySelector(parIdCanvas)

//   parCtxCanvas.reset()
//   parCtxCanvas.fillStyle = 'rgb(0, 0, 0)';
//   parCtxCanvas.fillRect(0, 0, myCanvas.width, myCanvas.height);
// }

//  Create element HTML intro DOM (parent is parElemtCont) => createElement
export function createElemInDOM(parElemtCont, parElement, parId, parClass) {
  const elemCont = document.createElement(parElement)
  elemCont.setAttribute("id", parId)
  elemCont.classList.add(parClass)

  parElemtCont.appendChild(elemCont)
}

//  Delete element HTML from DOM => remove()
export function deleteElemFromDOM(parIdElement) {
  const elemInDOM = document.querySelector('#' + parIdElement)
  elemInDOM.remove()
}

