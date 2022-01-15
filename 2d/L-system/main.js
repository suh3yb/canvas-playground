'use strict';

import examples from './examples.js';

const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');

const onResize = () => {
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  const isRetinaDisplay = window.devicePixelRatio > 1;

  if (isRetinaDisplay) {
    canvas.width = canvas.clientWidth * 2;
    canvas.height = canvas.clientHeight * 2;
    ctx.scale(2, 2);
  } else {
    canvas.width = width;
    canvas.height = height;
  }

  startPoint = isRetinaDisplay
    ? { x: canvas.width / 4, y: canvas.height / 2 }
    : { x: canvas.width / 2, y: canvas.height };

  ctx.translate(startPoint.x, startPoint.y);
  initialTransform = ctx.getTransform();

  render(sentence);
};

const generate = () => {
  sentence = sentence
    .split('')
    .map((char, i) => {
      const matchingRule = rules.find(rule => char === rule.test);
      if (matchingRule) {
        return matchingRule.replace;
      }
      return char;
    })
    .join('');

  render(sentence);
  length *= 0.55;
};

const render = sentence => {
  // loop through characters of the sentence
  sentence.split('').forEach(char => {
    switch (char) {
      case 'F':
        const { red, green, blue } = strokeStyle;
        ctx.strokeStyle = `rgb(${red}, ${green}, ${blue})`;
        ctx.lineWidth = ctx.lineWidth / 1.01;
        if (strokeStyle.red > 0) {
          strokeStyle.red -= 0.1;
        } else {
          strokeStyle.red = 0;
        }
        if (strokeStyle.blue > 0) {
          strokeStyle.blue -= 0.1;
        } else {
          strokeStyle.blue = 0;
        }
        if (strokeStyle.green < 255) {
          strokeStyle.green += 0.1;
        } else {
          strokeStyle.green = 255;
        }
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -length);
        ctx.translate(0, -length);
        ctx.stroke();
        break;
      case '+':
        ctx.rotate(angle);
        break;
      case '-':
        ctx.rotate(-angle);
        break;
      case '[':
        ctx.save();
        break;
      case ']':
        ctx.restore();
        break;
      default:
    }
  });
};

window.addEventListener('resize', onResize);
canvas.addEventListener('click', generate);
onResize();

const getConfig = number => {
  const config = examples[number];
  const startPoint = getStartPoint(config.startFrom);
  return {
    ...config,
    startPoint,
  };
};

const getStartPoint = startFrom => {
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  const isRetinaDisplay = window.devicePixelRatio > 1;
  const retinaRatio = 2;

  const adjustment = {
    x: 0,
    y: 0,
  };

  switch (startFrom) {
    case 'top':
      adjustment.x = 0.5;
      adjustment.y = 0;
      break;
    case 'bottom':
      adjustment.x = 1 / 2;
      adjustment.y = 1;
      break;
    default:
    case 'center':
      adjustment.x = 1 / 2;
      adjustment.y = 1 / 2;
      break;
  }

  if (isRetinaDisplay) {
    canvas.width = canvas.clientWidth * retinaRatio;
    canvas.height = canvas.clientHeight * retinaRatio;
    ctx.scale(retinaRatio, retinaRatio);
    adjustment = {
      x: adjustment.x / retinaRatio,
      y: adjustment.y / retinaRatio,
    };
  } else {
    canvas.width = width;
    canvas.height = height;
  }

  return { x: canvas.width * adjustment.x, y: canvas.height * adjustment.y };
};

// const clearCanvas = initialTransform => {
//   ctx.setTransform(initialTransform);
//   ctx.clearRect(-canvas.width / 2, -canvas.height, canvas.width, canvas.height);
// };

const initCanvas = config => {
  const { startPoint, lineCap, lineJoin, lineWidth, strokeStyle } = config;

  ctx.translate(startPoint.x, startPoint.y);
  ctx.lineCap = lineCap;
  ctx.lineJoin = lineJoin;
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeStyle;

  return ctx.getTransform();
};
