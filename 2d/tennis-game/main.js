'use strict';

let canvas;
let ctx;
let ballX = 50;
let ballY = 50;
let ballSpeedX = 10;
let ballSpeedY = 4;

const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;
let paddle1Y = 250;
let paddle2Y = 250;

let player1Score = 0;
let player2Score = 0;
const WINNING_SCORE = 3;

let showingWinScreen = false;

const onLoad = () => {
  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');

  const framesPerSecond = 30;
  setInterval(() => {
    drawEverything();
    moveEverthing();
  }, 1000 / framesPerSecond);

  canvas.addEventListener('mousemove', evt => {
    const mousePos = calculateMousePos(evt);
    paddle1Y = mousePos.y - PADDLE_HEIGHT / 2;
  });

  canvas.addEventListener('click', handleMouseClick);
};

const handleMouseClick = () => {
  if (showingWinScreen) {
    player1Score = 0;
    player2Score = 0;
    showingWinScreen = false;
  }
};

const calculateMousePos = evt => {
  const rect = canvas.getBoundingClientRect();
  const root = document.documentElement;
  const mouseX = evt.clientX - rect.left - root.scrollLeft;
  const mouseY = evt.clientY - rect.top - root.scrollTop;
  return { x: mouseX, y: mouseY };
};

const resetBall = () => {
  if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
    showingWinScreen = true;
  }

  ballSpeedX *= -1;
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
};

const runComputerMovement = () => {
  const paddle2YCenter = paddle2Y + PADDLE_HEIGHT / 2;
  if (paddle2YCenter < ballY - 35) {
    paddle2Y += 6;
  } else if (paddle2YCenter > ballY + 35) {
    paddle2Y -= 6;
  }
};

const moveEverthing = () => {
  if (showingWinScreen) return;

  runComputerMovement();

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX <= 0) {
    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      ballSpeedX *= -1;
      // when ball hits near the edges of paddle, set speed y accordingly
      const deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      // update score before
      player2Score++;
      resetBall();
    }
  }

  if (ballX >= canvas.width) {
    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
      ballSpeedX *= -1;
      // when ball hits near the edges of paddle, set speed y accordingly
      const deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      // update score before
      player1Score++;
      resetBall();
    }
  }
  if (ballY >= canvas.height || ballY <= 0) {
    ballSpeedY *= -1;
  }
};

const drawNet = () => {
  for (let i = 10; i < canvas.height; i += 40) {
    drawRect(canvas.width / 2 - 1, i, 2, 20, 'white');
  }
};

const drawEverything = () => {
  // blanks out canvas with black
  drawRect(0, 0, canvas.width, canvas.height, 'black');

  if (showingWinScreen) {
    const winner = player1Score >= WINNING_SCORE ? 'Player' : 'Computer';

    ctx.fillStyle = 'white';
    ctx.fillText(`${winner} Won!`, canvas.width / 2 - 50, canvas.height / 2);
    ctx.fillText(
      'Click to restart',
      canvas.width / 2 - 50,
      canvas.height - 100
    );
    return;
  }

  drawNet();
  // draw left paddle
  drawRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
  // draw right paddle
  drawRect(
    canvas.width - PADDLE_WIDTH,
    paddle2Y,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    'white'
  );
  // draw ball
  drawCircle(ballX, ballY, 10, 'white');
  // draw score
  ctx.fillText(player1Score, 100, 100);
  ctx.fillText(player2Score, canvas.width - 100, 100);
};

const drawRect = (x, y, width, height, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

const drawCircle = (centerX, centerY, radius, color) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  ctx.fill();
};

window.addEventListener('load', onLoad);
