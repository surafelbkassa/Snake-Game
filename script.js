const Canvas=document.getElementById('playGround');

const grid=20;
Canvas.width = Math.min(window.innerWidth - 20, 300);
Canvas.height = Math.min(window.innerHeight - 100, 300);
const row=Canvas.height/grid;
const column=Canvas.width/grid;
const ctx=Canvas.getContext("2d");
ctx.fillStyle="white";

let dx=0;
let dy=0;
let v;
let w;
let x=Math.floor(Math.random()*row)*grid;
let y=Math.floor(Math.random()*column)*grid;

//lengthening the Snake
let Snake = [{x: x, y: y}];

let score = 0;
let speed = 150;
let gameInterval;

let obstacles = [
    {x: 100, y: 100},
    {x: 200, y: 200}
];

function updateScore() {
    document.getElementById('score').innerText = `Score: ${score}`;
}

function increaseSpeed() {
    if (speed > 50) {
        speed -= 10;
        clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, speed);
    }
}

document.addEventListener('keydown',function (event) {
    switch (event.key) {
        case "ArrowUp":
            if (dy===0) {
                dy=-grid
                dx=0
            }
            break;
        case "ArrowDown":
            if (dy===0) {
                dy=grid
                dx=0
            }
            break;
        case "ArrowLeft":
            if (dx===0) {
                dx=-grid
                dy=0
            }
            break;
        case "ArrowRight":
            if (dx===0) {
                dx=grid
                dy=0
            }
            break;
        default:
            break;
    }
});
function placeApple() {
    v=Math.floor(Math.random()*row)*grid;
    w=Math.floor(Math.random()*column)*grid;
    ctx.fillStyle='red';
    ctx.fillRect(v,w,grid,grid);
}
placeApple();

function drawObstacles() {
    ctx.fillStyle = 'gray';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, grid, grid);
    });
}

function checkCollision() {
    for (let i = 0; i < Snake.length - 1; i++) {
        if (Snake[i].x === x && Snake[i].y === y) {
            alert(`Game Over! Your score: ${score}`);
            document.location.reload();
        }
    }
    obstacles.forEach(obstacle => {
        if (x === obstacle.x && y === obstacle.y) {
            alert(`Game Over! Your score: ${score}`);
            document.location.reload();
        }
    });
}

function gameLoop() {
    // First move the snake
    y += dy;
    x += dx;
    
    // Check boundaries
    if (x < 0) x = Canvas.width - grid;
    if (x >= Canvas.width) x = 0;       
    if (y < 0) y = Canvas.height - grid;
    if (y >= Canvas.height) y = 0;
    
    // Clear the canvas
    ctx.clearRect(0, 0, Canvas.width, Canvas.height);
    
    // Update snake body
    Snake.push({x: x, y: y}); // Add new head position
    if (x !== v || y !== w) { // If not eating apple
        Snake.shift(); // Remove tail
    }
    
    // Draw snake segments
    ctx.fillStyle = 'white';
    Snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, grid, grid);
    });
    
    // Draw apple
    ctx.fillStyle = 'red';
    ctx.fillRect(v, w, grid, grid);
    
    // Draw obstacles
    drawObstacles();
    
    // Check for apple collision
    if (x === v && y === w) {
        score++;
        updateScore();
        placeApple();
        increaseSpeed();
    }

    // Check for snake collision
    checkCollision();
}

gameInterval = setInterval(gameLoop, speed);

document.getElementById('startButton').addEventListener('click', () => {
    document.location.reload();
});
