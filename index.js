const PlayerScore1 = document.querySelector("#PlayerScore1")
const PlayerScore2 = document.querySelector("#PlayerScore2")

const SimpleMessage = document.querySelector("h1")

const ball = document.querySelector("#ball")
const paddle1 = document.querySelector("#paddle1")
const paddle2 = document.querySelector("#paddle2")

const startGame = document.querySelector("#startGame")
const up1 = document.querySelector("#up1")
const up2 = document.querySelector("#up2")
const down1 = document.querySelector("#down1")
const down2 = document.querySelector("#down2")
const arrows = document.querySelector("#arrows")

const resetGame = document.querySelector("#resetGame")

const score_played = new Audio("2.mp3")
const collision = new Audio("1.mp3")

let scorePlayer1 = 0
let scorePlayer2 = 0
let ballY = 220
let ballX = 240
let paddleY1 = 0
let paddleY2 = 0
let ballSpeedX = 3
let ballSpeedY = 3
let intrvalId = null

function startgame() {
    startGame.style.display = "none"
    arrows.style.display = "flex"
    intrvalId = setInterval(updateGame,16)
    score_played.play()
    SimpleMessage.style.display = "none"
    resetGame.style.display = "inline"
}

function updateGame() {
    ballY += ballSpeedY
    ballX += ballSpeedX
    ball.style.top = ballY + "px"
    ball.style.left = ballX + "px"

    if(ballY <= 10 || ballY >= 430){
        ballSpeedY = -ballSpeedY
    }
    if(ballX >= 470) {
        scorePlayer1 += 1
        PlayerScore1.textContent = "Player1 Score: " + scorePlayer1
        ballSpeedX = -ballSpeedX
    }
    if(ballX <= 10) {
        scorePlayer2 += 1
        PlayerScore2.textContent = "Player2 Score: " + scorePlayer2
        ballX = 240
        ballY = 220
        ballSpeedX = -ballSpeedX
    }
    // make collision with paddles
    if(ballX <= 20 && ballY > paddle1.offsetTop && ballY < paddle1.offsetTop + 100){
        collision.play()
        ballSpeedX = -ballSpeedX
    }
    if(ballX >= 450 && ballY > paddle2.offsetTop && ballY < paddle2.offsetTop + 100){
        collision.play()
        ballSpeedX = -ballSpeedX
    }
    if(paddleY1 == 10) {
        paddleY1 = 10
        paddle1.style.top = paddleY1+"px"
    }
}

startGame.addEventListener("click",startgame)
document.addEventListener("keydown",(e)=>{
    if(e.key === "w"){
        paddleY1 -= 10
        paddle1.style.top = paddleY1 + "px"
    }
    if(e.key === "s"){
        paddleY1 += 10
        paddle1.style.top = paddleY1 + "px"
    }
    if(e.key === "ArrowUp"){
        paddleY2 -= 10
        paddle2.style.top = paddleY2 + "px"
    }
    if(e.key === "ArrowDown"){
        paddleY2 += 10
        paddle2.style.top = paddleY2 + "px"
    }

    if(scorePlayer1 >= 10){
        alert("Player 1 won")
        scorePlayer1 = 0
        scorePlayer2 = 0
        PlayerScore1.textContent = "Player1 Score: " + scorePlayer1
        PlayerScore2.textContent = "Player2 Score: " + scorePlayer2
        ballX = 240
        ballY = 220
        clearInterval(intrvalId)
    }

    if(scorePlayer2 >= 10){
        alert("Player 2 won")
        scorePlayer1 = 0
        scorePlayer2 = 0
        PlayerScore1.textContent = "Player1 Score: " + scorePlayer1
        PlayerScore2.textContent = "Player2 Score: " + scorePlayer2
        ballX = 240
        ballY = 220
        clearInterval(intrvalId)
    }
})

up1.addEventListener("click",() => {
    paddleY1 -= 10
    paddle1.style.top = paddleY1 + "px"
})

down1.addEventListener("click",() => {
    paddleY1 += 10
    paddle1.style.top = paddleY1 + "px"
})

up2.addEventListener("click",() => {
    paddleY2 -= 10
    paddle2.style.top = paddleY2 + "px"
})

down2.addEventListener("click",() => {
    paddleY2 += 10
    paddle2.style.top = paddleY2 + "px"
})

resetGame.addEventListener("click",() => {
    scorePlayer1 = 0
    scorePlayer2 = 0
    PlayerScore1.textContent = "Player1 Score: " + scorePlayer1
    PlayerScore2.textContent = "Player2 Score: " + scorePlayer2
    ballX = 240
    ballY = 220
    clearInterval(intrvalId)
    resetGame.style.display = "none"
    startGame.style.display = "inline"
})