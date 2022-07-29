
const canvas = document.getElementById("canvasMain");
const c = canvas.getContext('2d');
const player1Score = document.getElementById("score1");
const player2Score = document.getElementById("score2");
const canvasHeight = canvas.height;
const canvasWidth = canvas.width;
const ballSpeed = .7;
const ballIncrement = .10;
let ballX = canvasWidth / 2;
let ballY = canvasHeight / 2;
const ballRadius = 12.5;
const paddleSpeed = 50;
let intervalID;
let ballXDirection = 0;
let ballYDirection = 0;
c.clearRect(0, 0, canvasWidth, canvasHeight);


const paddle1 = {
    width : 10,
    height : 40,
    x : 0,
    y : canvasHeight / 2
}
const paddle2 = {
    width : 10,
    height : 40,
    x : canvasWidth - 10,
    y : canvasHeight / 2
}

const ball = {
    x : canvasWidth / 2,
    y : canvasHeight / 2,
    radius : 4,
    start : 0,
    end : 2 * Math.PI
}

function updateTicks(){
    intervalID = setTimeout(() => {
        c.clearRect(0, 0, canvasWidth, canvasHeight);
        drawPaddle1();
        drawPaddle2();
        drawBallInit();
        checkCollision();
        drawBall();
        updateTicks();
    }, 10);
}

function moveBall(){
    if (Math.random() > .5){
        ballXDirection = 1;
    } else {
        ballXDirection = -1;
    }

     if (Math.random() > .5){
        ballYDirection = 1;
    } else {
        ballYDirection = -1;
    }
}

function drawBall(){
    ball.x += ballXDirection * ballSpeed;
    ball.y += ballYDirection * ballSpeed;
}

function checkCollision(){
    if (ball.y <= (0 + ball.radius)){
        ballYDirection = -1;
        ball.y += ballYDirection * ballSpeed;
    } 
    if (ball.y >= canvasHeight - ball.radius){
        ballYDirection = 1;
        ball.y += ballYDirection * ballSpeed;
    }
}

function drawPaddle1(){
    c.beginPath();
    c.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    c.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    
}

function drawPaddle2(){
    c.beginPath();
    c.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    c.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}

function drawBallInit(){
    c.beginPath();
    c.arc(ball.x, ball.y, ball.radius, ball.start, ball.end, false);
    c.fill();
}

function movePaddles1(event){
    const buttonPressed = event.keyCode;
    const paddle1Up = 87;
    const paddle1Down = 83;
    const paddle2Up = 38;
    const paddle2Down = 40;
    const paddleSpeed = 5;

    switch(buttonPressed){
        case(paddle1Up):
            if (paddle1.y > 0){
                paddle1.y -= paddleSpeed;
            }
            break;
        case(paddle1Down):
            if (paddle1.y < canvasHeight - paddle1.height){
                    paddle1.y += paddleSpeed;
                }
            break;
        case(paddle2Up):
            if (paddle2.y > 0){
                paddle2.y -= paddleSpeed;
            }
            break;
        case(paddle2Down):
            if (paddle2.y < canvasHeight - paddle2.height){
                paddle2.y += paddleSpeed;
            }
            break;

    }
}

function movePaddles2(event){
    const buttonPressed = event.keyCode;
    const paddle1Up = 87;
    const paddle1Down = 83;
    const paddle2Up = 38;
    const paddle2Down = 40;
    const paddleSpeed = 5;

    switch(buttonPressed){
        case(paddle2Up):
            if (paddle2.y > 0){
                paddle2.y -= paddleSpeed;
            }
            break;
        case(paddle2Down):
            if (paddle2.y < canvasHeight - paddle2.height){
                paddle2.y += paddleSpeed;
            }
            break;

    }
}

window.addEventListener('keydown', movePaddles1);
window.addEventListener('keydown', movePaddles2)

function startGame(){
    drawPaddle1();
    drawPaddle2();
    drawBallInit();
    moveBall();
    checkCollision();
    updateTicks();
    
}

startGame();
