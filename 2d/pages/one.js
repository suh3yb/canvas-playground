'use strict';

import render from '../src/render.js';
import Particle from '../assets/particle.js';

const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');

const start = () => {
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

  const PERSPECTIVE = width * 0.8;
  const PROJECTION_CENTERS = { x: width / 2, y: height / 2 };

  const canvasObj = {
    ctx,
    sceneWidth: width,
    sceneHeight: height,
    perspective: PERSPECTIVE,
    projectionCenters: PROJECTION_CENTERS,
  };

  ctx.globalCompositeOperation = 'destination-over';
  render(canvasObj, Particle);
};

window.addEventListener('resize', start);
start();
