const sun = new Image();
const moon = new Image();
const earth = new Image();

function init() {
  sun.src = './Planets/sunAnimato.gif';
  moon.src = './Planets/moonAnimate.gif';
  earth.src = './Planets/earthAnimato.gif';
  window.requestAnimationFrame(drawSytemSolar);
}

function drawSytemSolar() {
  const myCanvas = document.querySelector("#canvasSolar")
  let ctx = myCanvas.getContext('2d');
  const WIDTH = myCanvas.width;
  const HEIGHT = myCanvas.height;

  if (ctx) {
    // ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, WIDTH, HEIGHT);   // limpiar canvas

    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'rgba(0,153,255,0.4)';
    ctx.save();

    //  The Sun
    ctx.drawImage(sun, 0, 0, WIDTH, HEIGHT);

    // The Earht
    ctx.save();
    ctx.scale(0.6, 0.6);
    let time = new Date();
    ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
    ctx.translate(WIDTH/2 + 50, HEIGHT/2);
    ctx.fillStyle = 'black'
    ctx.arc(0, -12, 24, 0, 2 * Math.PI)
    ctx.fill();
    ctx.drawImage(earth, -6, -6);
    ctx.restore();

    // The Moon
    ctx.save();
    ctx.scale(0.20, 0.20);
    ctx.translate(WIDTH/2 + 50, HEIGHT/2);
    ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds());
    ctx.drawImage(moon, -3.5, -3.5);
    ctx.restore();

    ctx.restore();

    ctx.beginPath();
    ctx.stroke();
  }

  window.requestAnimationFrame(drawSytemSolar);
}

init();