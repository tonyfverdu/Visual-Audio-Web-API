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