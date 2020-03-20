'use strict';

import Dot from './assets/dot.js';
import Particle from './assets/particle.js';

const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');

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

  const PERSPECTIVE = width * 0.8;
  const projectionCenters = { x: width / 2, y: height / 2 };
  const dots = [];
  const particles = [];

  // for (let i = 0; i < 100; i++) {
  //   dots.push(new Dot(width, height, PERSPECTIVE, projectionCenters));
  // }

  // for (let i = 0; i < 1; i++) {
  //   particles.push(new Particle(width, height, PERSPECTIVE, projectionCenters));
  // }

  ctx.globalCompositeOperation = 'destination-over';
  render(canvas.width, canvas.height, dots);
};

const render = (sceneWidth, sceneHeight, assets) => {
  ctx.clearRect(0, 0, sceneWidth, sceneHeight);

  assets.forEach(asset => {
    asset.draw(ctx);
  });
  // console.log(assets[0].z, assets[0].perspective);
  assets.push(
    new Dot(sceneWidth, sceneHeight, sceneWidth * 0.4, {
      x: sceneWidth / 4,
      y: sceneHeight / 4,
    })
  );

  if (assets.length > 800) assets.shift();

  window.requestAnimationFrame(
    render.bind(undefined, sceneWidth, sceneHeight, assets)
  );
};

window.addEventListener('resize', onResize);
onResize();
