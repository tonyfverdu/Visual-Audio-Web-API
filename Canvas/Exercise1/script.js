function draw() {
  const myCanvas = document.querySelector("#myCanvas")
  const ctx = myCanvas.getContext("2d")

  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, myCanvas.width - 1, myCanvas.height - 1)

  ctx.font = "0.6rem Arial";
  ctx.fillStyle = 'red'
  ctx.fillText(`${ctx.canvas.id}  ||  Width:  ${ctx.canvas.width}, Height: ${ctx.canvas.height}`, 10, ctx.canvas.height / 2);

  myCanvas.addEventListener('dblclick', () => {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, ctx.canvas.width - 1, ctx.canvas.height - 1)

    ctx.fillStyle = 'red'
    ctx.font = "0.6rem Arial";
    ctx.fillText(`${ctx.canvas.id}  ||  Width:  ${ctx.canvas.width}, Height: ${ctx.canvas.height}`, 10, ctx.canvas.height / 2);

  })
  myCanvas.addEventListener('click', () => {
    ctx.clearRect(0, 0, ctx.canvas.width - 1, ctx.canvas.height - 1)

    const linearGrad = ctx.createLinearGradient(0, 0, ctx.canvas.width - 1, 0)
    linearGrad.addColorStop(0.02, 'white')
    linearGrad.addColorStop(0.5, 'red')
    linearGrad.addColorStop(0.98, 'black')
    ctx.fillStyle = linearGrad
    ctx.fillRect(0, 0, ctx.canvas.width - 1, ctx.canvas.height - 1)

    ctx.fillStyle = randomColor()
    const rectWidth1 = randomNumber(20, ctx.canvas.width / 2 - 20)
    const rectHeight1 = randomNumber(20, ctx.canvas.height / 2 - 20)
    const rectWidth2 = randomNumber(20, ctx.canvas.width / 2 - 20)
    const rectHeight2 = randomNumber(20, ctx.canvas.height / 2 - 20)
    const x0 = randomNumber(5, ctx.canvas.width / 2 - 5)
    const y0 = randomNumber(5, ctx.canvas.height / 2 - 5)
    ctx.fillRect(x0, y0, rectWidth1, rectHeight1)
    ctx.strokeStyle = 'black'
    ctx.lineWidth = '5px'
    ctx.strokeRect(x0, y0, rectWidth1, rectHeight1)

    ctx.strokeStyle = 'white'
    ctx.strokeRect(randomNumber(5, ctx.canvas.width / 2 - 5), randomNumber(5, ctx.canvas.height / 2 - 5), rectWidth2, rectHeight2)
    const radialGrad = ctx.createRadialGradient((ctx.canvas.width / 2) - 100, (ctx.canvas.height / 2) - 100, 30, (ctx.canvas.width / 2) + 50, (ctx.canvas.height / 2) + 50, 30)
    radialGrad.addColorStop(0, "white")
    radialGrad.addColorStop(1, "black")
    ctx.fillStyle = radialGrad
    ctx.fillRect((ctx.canvas.width / 2) - 100, (ctx.canvas.height / 2) - 100, 80, 80)


  })
}

window.onload = draw;

////////////////////////////////////
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