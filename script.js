const game = document.getElementById('game');
const paddle1 = document.getElementById('paddle1');
const paddle2 = document.getElementById('paddle2');
const ball = document.getElementById('ball');
const player1ScoreElem = document.getElementById('player1-score');
const player2ScoreElem = document.getElementById('player2-score');

let ballSpeedX = 3;
let ballSpeedY = 2;
let ballPosX = 400;
let ballPosY = 200;
let paddle1Y = 150;
let paddle2Y = 150;
let paddle1Speed = 0;
let paddle2Speed = 0;
let scorePlayer1 = 0;
let scorePlayer2 = 0;
let gameSpeedMultiplier = 1;

const paddleSpeed = 5;
const paddleHeight = 100;
const gameHeight = 400;
const gameWidth = 800;
const ballSize = 20;

// Função para resetar a bola após pontuação
function resetBall() {
    ballPosX = gameWidth / 2;
    ballPosY = gameHeight / 2;
    ballSpeedX = ballSpeedX > 0 ? 3 : -3;
    ballSpeedY = 2;
    gameSpeedMultiplier = 1;
}

// Função para aumentar a velocidade da bola a cada 20 segundos
function increaseBallSpeed() {
    setInterval(() => {
        gameSpeedMultiplier += 0.2;
    }, 20000);
}

function update() {
    // Movimento da bola
    ballPosX += ballSpeedX * gameSpeedMultiplier;
    ballPosY += ballSpeedY * gameSpeedMultiplier;

    // Rebater nas bordas superiores e inferiores
    if (ballPosY <= 0 || ballPosY >= gameHeight - ballSize) {
        ballSpeedY *= -1;
    }

    // Verificar colisão com as raquetes
    if (ballPosX <= 30 && ballPosY > paddle1Y && ballPosY < paddle1Y + paddleHeight) {
        ballSpeedX *= -1;
    }
    if (ballPosX >= gameWidth - 50 && ballPosY > paddle2Y && ballPosY < paddle2Y + paddleHeight) {
        ballSpeedX *= -1;
    }

    // Pontuação
    if (ballPosX <= 0) {
        scorePlayer2++;
        player2ScoreElem.textContent = scorePlayer2;
        resetBall();
    }
    if (ballPosX >= gameWidth) {
        scorePlayer1++;
        player1ScoreElem.textContent = scorePlayer1;
        resetBall();
    }

    // Movimento das raquetes
    paddle1Y += paddle1Speed;
    paddle2Y += paddle2Speed;

    // Limitar movimento das raquetes
    paddle1Y = Math.max(0, Math.min(gameHeight - paddleHeight, paddle1Y));
    paddle2Y = Math.max(0, Math.min(gameHeight - paddleHeight, paddle2Y));

    // Aplicar posições atualizadas
    paddle1.style.top = `${paddle1Y}px`;
    paddle2.style.top = `${paddle2Y}px`;
    ball.style.left = `${ballPosX}px`;
    ball.style.top = `${ballPosY}px`;
}

// Controle suave das raquetes
document.addEventListener('keydown', function (event) {
    if (event.key === 'w') {
        paddle1Speed = -paddleSpeed;
    } else if (event.key === 's') {
        paddle1Speed = paddleSpeed;
    }

    if (event.key === 'ArrowUp') {
        paddle2Speed = -paddleSpeed;
    } else if (event.key === 'ArrowDown') {
        paddle2Speed = paddleSpeed;
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key === 'w' || event.key === 's') {
        paddle1Speed = 0;
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        paddle2Speed = 0;
    }
});

// Iniciar o aumento de velocidade da bola
increaseBallSpeed();

function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
