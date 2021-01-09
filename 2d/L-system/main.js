'use strict';

const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');

let startPoint;

const onResize = () => {
  let width = canvas.offsetWidth;
  let height = canvas.offsetHeight;

  if (window.devicePixelRatio > 1) {
    canvas.width = canvas.clientWidth * 2;
    canvas.height = canvas.clientHeight * 2;
    ctx.scale(2, 2);
  } else {
    canvas.width = width;
    canvas.height = height;
  }

  startPoint =
    window.devicePixelRatio > 1
      ? { x: canvas.width / 4, y: canvas.height / 2 }
      : { x: canvas.width / 2, y: canvas.height };

  // ctx.globalCompositeOperation = 'destination-over';
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  // render(canvas.width, canvas.height, []);
};

const generate = () => {
  const axiom = 'X';
  const rules = [];
  rules[0] = {
    a: 'X',
    b: 'F+[[X]-X]-F[-FX]+X',
  };
  rules[1] = {
    a: 'F',
    b: 'FF',
  };
  let sentence = axiom;
  let nextSentence = '';

  for (let i = 0; i < sentence.length; i++) {
    const current = sentence.charAt(i);
    let found = false;
    for (let j = 0; j < rules.length; j++) {
      if (current === rules[j].a) {
        found = true;
        nextSentence += rules[j].b;
      }
    }
    if (!found) {
      nextSentence += current;
    }
  }
  sentence = nextSentence;
  console.log(sentence);

  render(sentence);
};

const render = sentence => {
  const angle = 0.436332; // 25 degrees in radians
  let length = 50;

  ctx.strokeStyle = 'rgb(255, 255, 255)';
  // ctx.translate(startPoint.x, startPoint.y);
  // ctx.translate(50, 50);
  ctx.beginPath();
  ctx.moveTo(startPoint.x, startPoint.y);
  //
  for (var i = 0; i < sentence.length; i++) {
    var current = sentence.charAt(i);

    if (current === 'F') {
      ctx.lineTo(0, -length);
      // ctx.moveTo()
      ctx.translate(0, -length);
    } else if (current === '+') {
      ctx.rotate(angle);
    } else if (current === '-') {
      ctx.rotate(-angle);
    } else if (current === '[') {
      ctx.save();
    } else if (current === ']') {
      ctx.restore();
    }
  }
  // ctx.lineTo(startPoint.x, startPoint.y - length);
  // ctx.lineTo(600, 400);
  // ctx.closePath();
  ctx.stroke();

  // window.requestAnimationFrame(
  //   render.bind(undefined, sceneWidth, sceneHeight, assets)
  // );
};

window.addEventListener('resize', onResize);
canvas.addEventListener('click', generate);
onResize();
