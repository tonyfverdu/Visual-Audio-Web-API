const elemDiv = document.querySelector('.contCentral')

const myCanvas = document.getElementById("myCanvas");
const ctx = myCanvas.getContext("2d");

const WIDTH = myCanvas.width;
const HEIGHT = myCanvas.height;

//  Create un pattern de imagen
const imgPattern = new Image()
imgPattern.src = "../assets/images/BeatlesManic2.jpg"
imgPattern.display = "block"
imgPattern.style.objectFit = 'contain'

imgPattern.onload = () => {
  const myPattern = ctx.createPattern(imgPattern, 'repeat')
  ctx.fillStyle = myPattern
  ctx.fillRect(0, 0, WIDTH - 1, HEIGHT - 1);
}


// const styleOtherCanvas = {
//   "position": "relative",
//   "display": "flex",
//   "flexDirection": "row",
//   "justifyContent": "center",
//   "alignItems": "center",
//   "margin": "0% auto",
//   "border": "1px solid rgba(23, 23, 24, 0.85)",
//   "borderRadius": "9px",
//   "backgroundColor": "black",
//   "boxShadow": "4px 5px 6px 3px rgb(184, 255, 134), inset 1px 1px 3px 3px #03fb03, 1px 1px 2px 2px #99f0b6"
// }

const otherCanvas = document.createElement('canvas')
otherCanvas.setAttribute('width', '580px');
otherCanvas.setAttribute('height', '320px');
const WIDTH_otherCanvas = otherCanvas.width;
const HEIGHT_otherCanvas = otherCanvas.height;
const theContext = otherCanvas.getContext("2d");
// otherCanvas.style = `
// "position": "relative";
// "display": "flex";
// "flex-direction": "row";
// "justify-content": "center";
// "align-items": "center";
// "margin": "0% auto";
// "border": "1px solid rgba(23, 23, 24, 0.85)";
// "border-radius": "9px";
// "background-color": "black";
// "box-shadow": "4px 5px 6px 3px rgb(184, 255, 134), inset 1px 1px 3px 3px #03fb03, 1px 1px 2px 2px #99f0b6"
// `

// const otraForma = {
//   "position": "relative",
//   "display": "flex",
//   "flex-direction": "row",
//   "justify-content": "center",
//   "align-items": "center",
//   "margin": "0% auto",
//   "border": "1px solid rgba(23, 23, 24, 0.85)",
//   "border-radius": "9px",
//   "background-color": "black",
//   "box-shadow": "4px 5px 6px 3px rgb(184, 255, 134), inset 1px 1px 3px 3px #03fb03, 1px 1px 2px 2px #99f0b6"
// }
otherCanvas.style.position = "relative";
otherCanvas.style.display = "flex";
otherCanvas.style.flexDirection = "row";
otherCanvas.style.justifyContent = "center";
otherCanvas.style.alignContent = "center";
otherCanvas.style.margin = "0% auto";
otherCanvas.style.border = "1px solid rgba(23, 23, 24, 0.85)";
otherCanvas.style.borderRadius = "9px";
otherCanvas.style.backgroundColor = "black";
otherCanvas.style.boxShadow = "4px 5px 6px 3px rgb(184, 255, 134), inset 1px 1px 3px 3px #03fb03, 1px 1px 2px 2px #99f0b6";

elemDiv.appendChild(otherCanvas);

theContext.fillStyle = randomColor();
theContext.fillRect(WIDTH_otherCanvas / 2, HEIGHT_otherCanvas / 2, 30, 30);

//  Events of Canvas
otherCanvas.addEventListener('click', () => {
  
  theContext.fillStyle = 'black';

  theContext.fillRect(0, 0, WIDTH_otherCanvas, HEIGHT_otherCanvas)
  theContext.fillStyle = randomColor();
  theContext.fillRect(randomNumber(30, WIDTH_otherCanvas - 30), randomNumber(30, HEIGHT_otherCanvas - 30), 30, 30);

  theContext.beginPath();
  theContext.arc(randomNumber(10, WIDTH_otherCanvas - 20), randomNumber(10, HEIGHT_otherCanvas - 20), randomNumber( 5, 20), 0, 2 * Math.PI)
  theContext.fillStyle = randomColor();
  // theContext.fillStyle = 'rgb(246, 240, 240)';
  theContext.stroke();

  rectangleGradLinear (otherCanvas, theContext) 
  circleGradRadial (otherCanvas, theContext) 
  textFill(theContext, "2rem Arial bolder", 'center', 'Canvas Examples', 'red', otherCanvas.width/2, otherCanvas.height/2)
  
  otherCanvas.style.border = "1px solid rgba(23, 23, 24, 0.85)";
  otherCanvas.style.boxShadow = "4px 5px 6px 3px rgb(184, 255, 134), inset 1px 1px 3px 3px #03fb03, 1px 1px 2px 2px #99f0b6";
})
otherCanvas.addEventListener('dblclick', () => { 
  const img = document.createElement('img')  //  o bien:  const img = new Image()
  const imgenMy = '../assets/images/BeatlesManic2.jpg'
  img.setAttribute('src', imgenMy)   //  o bien:  img-src = imgenMy
  img.setAttribute('width', otherCanvas.width/2)
  img.setAttribute('height', otherCanvas.height/2)

  img.style.display = 'block'
  img.style.objectFit = 'contain'

  img.onload = () => {
    theContext.drawImage(img, 5, 5)
  }
  otherCanvas.appendChild(img)

 
});

myCanvas.addEventListener('dblclick', () => { 
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  const imgMy = '../assets/images/beatlesmaniac1Logo.png'
  const widthImg = randomNumber (25, 90)
  const heightImg = randomNumber (25, 90)
  const x0 = randomNumber(widthImg + 5, myCanvas.width - (widthImg + 5))
  const y0 = randomNumber(heightImg + 5, myCanvas.height - (heightImg + 5)) 
  drawMyImage2(myCanvas, ctx, imgMy, x0, y0, widthImg, heightImg)
  drawMyImage2(otherCanvas, theContext, imgMy, x0, y0, widthImg, heightImg)
});



//  Dibujo de una linea:
myCanvas.addEventListener('click', () => {
  ctx.fillRect(0,0, WIDTH, HEIGHT)
  ctx.moveTo(randomNumber(10, 30), randomNumber(10, 30));
  ctx.lineTo(randomNumber(WIDTH, HEIGHT), randomNumber(WIDTH, HEIGHT));
  ctx.fillStyle = randomColor().toString();
  ctx.stroke();
  // ctx.fillStyle = 'black'
})

//  Dibujo de un rectangulo con degradado lineal
function rectangleGradLinear (parCanvas, parContext) {
  const gradienteLinear = parContext.createLinearGradient(0, 0, 200, 0);
  const color1 = randomColor()
  const color2 = randomColor()
  gradienteLinear.addColorStop(0, color1);
  gradienteLinear.addColorStop(1, color2);
  
  parContext.fillStyle = gradienteLinear;
  const x0 = randomNumber(10, parCanvas.width/2 - 20)
  const y0 = randomNumber(10, parCanvas.height/2 - 20)
  const parLenghtX = randomNumber(5, parCanvas.width/2 - 40)
  const parLenghtY = randomNumber(5, parCanvas.height/2 - 40)
  parContext.fillRect(x0, y0, x0 + parLenghtX, y0 + parLenghtY);
}

//  Dibujo de un circulo con degradado radial
function circleGradRadial (parCanvas, parContext) {
  const parX0 = randomNumber ( 10, otherCanvas.width/2 - 10)
  const parXf = randomNumber ( otherCanvas.width, otherCanvas.width - 10)
  const parY0 = randomNumber ( 10, otherCanvas.height/2 - 10)
  const parYf = randomNumber ( otherCanvas.height/2, otherCanvas.height - 10)
  const parRadiusIni= randomNumber (3, 10)
  const parRadiusEnde= randomNumber (3, 10)

  const gradRadial = parContext.createRadialGradient(parX0, parY0, parRadiusIni, parXf, parYf, parRadiusEnde);
  const color1 = randomColor();
  const color2 = randomColor();
  gradRadial.addColorStop(0, color1);
  gradRadial.addColorStop(1, color2);

  const randomRadius = randomNumber(5, 30)
  const x0 = randomNumber(randomRadius + 5, parCanvas.width - (randomRadius + 5))
  const y0 = randomNumber(randomRadius + 5, parCanvas.height - (randomRadius + 5))
  parContext.fillStyle = gradRadial;
  parContext.beginPath()
  parContext.arc(x0, y0, randomRadius, 0, 2 * Math.PI)
  parContext.stroke();
}

//  Dibujo de un texto relleno
function textFill(parContext, parTypeText, parTextAlig, parText, parColor, parX0, parY0) {
  parContext.font = parTypeText;
  parContext.textAlign = parTextAlig;
  parContext.fillStyle = parColor;
  parContext.fillText(parText, parX0, parY0)
}

//  Dibujo de una imagen dentro de otra imagen en canvas
function drawMyImage2(parCanvas, parContext, parImg, parX0, parY0, widthImg, heightImg) {
  const img = new Image()
  img.src = parImg
  img.style.display = 'block'
  img.style.objectFit = 'contain'

  img.onload = ()=> {
    parContext.drawImage(img, parX0, parY0, widthImg, heightImg)
  }
  parCanvas.appendChild(img)
}

//  Functions
function randomNumber(parMin, parMax) {
  let numberRandom = 0;

  if ((typeof parMin === 'number' && Number.isInteger(parMin)) && (typeof parMax === 'number' && Number.isInteger(parMax))) {
    numberRandom = Math.floor(Math.random() * (parMax - parMin) + parMin);
  } else {
    console.log('Error:  The arguments of the function "randomNumber" must be numbers integers!!');
    numberRandom = null;
  }
  return numberRandom;
}

function randomColor() {
  let colorRandomOut = '';

  const RR = randomNumber(0, 255);
  const GG = randomNumber(0, 255);
  const BB = randomNumber(0, 255);

  colorRandomOut = `rgb(${RR},${GG},${BB})`;

  return colorRandomOut;
}
//////////////////////////////////      EFFECTS      ///////////////////////////////////////////////////////////////////
/*  document.createElement('style'):

El método document.createElement('style') se usa para crear el "elemento de estilo" usando JavaScript. pasos:

1.-  Metodo <<document.creteElement('style')>>, crear el elemento "style" en el document, podemos poner opcionalmente:

            dynamicStyles.type = 'text/css';

2.-  Metodo <<.setAttribute ('style', )>>:   Utilice el metodo:  <<.setAttribute()>> para establecer el atributo: <<style>> 
                                             en el elemento.

3.-  Metodo <<.appendChild()>>: Agrega el elemento a la página usando el metodo: <<document.head.appendChild()>>.


Example: 
            let dynamicStyles  = null;  //  "futur" element "style", global variable

            function addAnimation(body) {
                                if (!dynamicStyles) {
                                             dynamicStyles = document.createElement('style');
                                             // dynamicStyles.type = 'text/css';  //  Optional
                                            document.head.appendChild(dynamicStyles);
                                }

                                dynamicStyles.sheet.insertRule(body, dynamicStyles.length);
            }

            addAnimation(`
                @keyframes name_animation {
                    from {
                        ....
                    }
                    to {
                        ....
                    }
                }
            `);

... and in production code:

        elementToAnimate.style.animation = "name_animation 12s ease alternate infinite ";

*/