// This file contains the game logic for the Pong game, including functions for paddle movement, ball physics, and scoring.

const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');
const scoreboard = document.getElementById('scoreboard');

const paddleHeight = 80, paddleWidth = 10;
let leftY = 160, rightY = 160, ballX = 300, ballY = 200, ballVX = 4, ballVY = 2;
let leftScore = 0, rightScore = 0;

function draw() {
    ctx.clearRect(0, 0, 600, 400);
    // Draw paddles
    ctx.fillStyle = "#fff";
    ctx.fillRect(10, leftY, paddleWidth, paddleHeight);
    ctx.fillRect(580, rightY, paddleWidth, paddleHeight);
    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, 10, 0, Math.PI*2);
    ctx.fill();
}

function update() {
    ballX += ballVX;
    ballY += ballVY;
    // Bounce top/bottom
    if (ballY < 10 || ballY > 390) ballVY = -ballVY;
    // Bounce paddles
    if (ballX < 20 && ballY > leftY && ballY < leftY + paddleHeight) ballVX = -ballVX;
    if (ballX > 570 && ballY > rightY && ballY < rightY + paddleHeight) ballVX = -ballVX;
    // Simple AI
    if (rightY + paddleHeight/2 < ballY) rightY += 3;
    if (rightY + paddleHeight/2 > ballY) rightY -= 3;
    // Score and reset
    if (ballX < 0) {
        rightScore++;
        resetBall();
    }
    if (ballX > 600) {
        leftScore++;
        resetBall();
    }
    scoreboard.textContent = `${leftScore} : ${rightScore}`;
}

function resetBall() {
    ballX = 300; ballY = 200; ballVX = -ballVX; ballVY = 2 * (Math.random() > 0.5 ? 1 : -1);
}

// Keyboard controls (optional, you can remove if you want only mouse/touch)
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' && leftY > 0) leftY -= 20;
    if (e.key === 'ArrowDown' && leftY < 320) leftY += 20;
});

// Mouse drag on canvas
let dragging = false;

canvas.addEventListener('mousedown', e => {
    dragging = true;
    movePaddleToMouse(e);
});
canvas.addEventListener('mouseup', () => {
    dragging = false;
});
canvas.addEventListener('mouseleave', () => {
    dragging = false;
});
canvas.addEventListener('mousemove', e => {
    if (dragging) {
        movePaddleToMouse(e);
    }
});

function movePaddleToMouse(e) {
    const rect = canvas.getBoundingClientRect();
    const y = e.clientY - rect.top;
    // Clamp so the paddle stays fully visible
    leftY = Math.max(0, Math.min(canvas.height - paddleHeight, y - paddleHeight / 2));
}

// Touch drag on canvas
canvas.addEventListener('touchstart', e => {
    dragging = true;
    movePaddleToTouch(e);
});
canvas.addEventListener('touchend', () => {
    dragging = false;
});
canvas.addEventListener('touchcancel', () => {
    dragging = false;
});
canvas.addEventListener('touchmove', e => {
    if (dragging) {
        movePaddleToTouch(e);
    }
});

function movePaddleToTouch(e) {
    if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const y = e.touches[0].clientY - rect.top;
        // Clamp so the paddle stays fully visible
        leftY = Math.max(0, Math.min(canvas.height - paddleHeight, y - paddleHeight / 2));
    }
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}
loop();