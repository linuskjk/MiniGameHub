const canvas = document.getElementById('snake');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');

const grid = 16;
let count = 0;
let snake = [{x: 160, y: 160}];
let dx = grid, dy = 0;
let apple = {x: 320, y: 160};
let score = 0;

function gameLoop() {
    requestAnimationFrame(gameLoop);
    if (++count < 16) return; // Slow down game
    count = 0;

    // Move snake
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    // Eat apple
    if (head.x === apple.x && head.y === apple.y) {
        score++;
        scoreEl.textContent = "Score: " + score;
        apple.x = grid * Math.floor(Math.random() * 20);
        apple.y = grid * Math.floor(Math.random() * 20);
    } else {
        snake.pop();
    }

    // Wall collision
    if (head.x < 0 || head.x >= 320 || head.y < 0 || head.y >= 320) reset();
    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) reset();
    }

    // Draw
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, 320, 320);
    ctx.fillStyle = "lime";
    snake.forEach(s => ctx.fillRect(s.x, s.y, grid-1, grid-1));
    ctx.fillStyle = "red";
    ctx.fillRect(apple.x, apple.y, grid-1, grid-1);
}

function reset() {
    snake = [{x: 160, y: 160}];
    dx = grid; dy = 0;
    score = 0;
    scoreEl.textContent = "Score: 0";
}

document.addEventListener('keydown', e => {
    const key = e.key.toLowerCase();
    if ((key === 'a' || key === 'arrowleft') && dx === 0) { dx = -grid; dy = 0; }
    if ((key === 'w' || key === 'arrowup') && dy === 0) { dx = 0; dy = -grid; }
    if ((key === 'd' || key === 'arrowright') && dx === 0) { dx = grid; dy = 0; }
    if ((key === 's' || key === 'arrowdown') && dy === 0) { dx = 0; dy = grid; }
    // Prevent scrolling for WASD and arrows
    if (['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright'].includes(key)) {
        e.preventDefault();
    }
}, { passive: false });

// Touch controls for mobile
let touchStartX = 0, touchStartY = 0;
canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}, { passive: false });

canvas.addEventListener('touchend', e => {
    e.preventDefault();
    const dxTouch = e.changedTouches[0].clientX - touchStartX;
    const dyTouch = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dxTouch) > Math.abs(dyTouch)) {
        if (dxTouch > 0 && dx === 0) { dx = grid; dy = 0; }
        else if (dxTouch < 0 && dx === 0) { dx = -grid; dy = 0; }
    } else {
        if (dyTouch > 0 && dy === 0) { dx = 0; dy = grid; }
        else if (dyTouch < 0 && dy === 0) { dx = 0; dy = -grid; }
    }
}, { passive: false });

document.getElementById('btn-up').addEventListener('click', () => {
    if (dy === 0) { dx = 0; dy = -grid; }
});
document.getElementById('btn-down').addEventListener('click', () => {
    if (dy === 0) { dx = 0; dy = grid; }
});
document.getElementById('btn-left').addEventListener('click', () => {
    if (dx === 0) { dx = -grid; dy = 0; }
});
document.getElementById('btn-right').addEventListener('click', () => {
    if (dx === 0) { dx = grid; dy = 0; }
});

gameLoop();