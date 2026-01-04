const canvas = document.getElementById("gameCanvas")
const context = canvas.getContext("2d")
let scoreIS = document.getElementById("score")
let best = document.getElementById("best")
let message = document.getElementById("message")
let restart = document.getElementById("restart")
let messages = ["+1", "Nice!", "Yummy!", "Grow!", "Collected!","Awesome!","Cool!","Great Move!","Well Done!","Smooth!","Clean Eat!","Delicious!","Superb!", "Keep Going!",]
let newHighScore = ["New High Score!","You're unstoppable!","Record Breaker!","New Best!","You crushed it","Top Snake!","Incredible!","On Fire!","New Record!"]
let box = 20
let score = 0
let highScoreAchieved = false
const cols = canvas.width / box  
const rows = canvas.height / box  
if ( !localStorage.getItem("GAMEON")){
    localStorage.setItem("GAMEON",JSON.stringify({ HIGHSCORE : {SNAKEGAME : 0} }))
}
let highScore = JSON.parse(localStorage.getItem("GAMEON"))
if ( !highScore.HIGHSCORE){
    highScore.HIGHSCORE = {SNAKEGAME : 0}
    localStorage.setItem("GAMEON", JSON.stringify(highScore))
}
let highScoreIs = highScore.HIGHSCORE.SNAKEGAME
best.textContent = highScoreIs


let snake = [
    {
        x : 15 * box,
        y : 8 * box
    }
]

let food = {
    x : Math.floor(Math.random() * cols) * box,
    y : Math.floor(Math.random() * rows) * box
}

let direction = "LEFT"

document.addEventListener("keydown", changeDirection)

function changeDirection(event){
    if ( event.key === "ArrowUp" && direction !== "DOWN") direction = "UP"
    else if ( event.key === "ArrowDown" && direction !== "UP") direction = "DOWN"
    else if ( event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT"
    else if ( event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT"
}

function collision(head, body){
    for(i=0; i<body.length; i++){
        if(head.x === body[i].x && head.y === body[i].y){
            return true
        }
    }
    return false
}

function showMessage() {
    message.textContent = "start"
    message.classList.add("blink")
    setTimeout(() => {
        message.classList.remove("blink")
        message.textContent = ""
    }, 2000)
}

message.textContent = "start"
message.classList.add("blink")
setTimeout(()=>{
    message.classList.remove("blink")
    message.textContent = ""
},2000)

function draw(){
    context.clearRect(0,0,canvas.width, canvas.height)

    for(i=0; i<snake.length; i++){
        context.fillStyle = i===0? "#00e30fff":"#145600ff"
        context.fillRect(snake[i].x,snake[i].y,box,box)
    }

    context.fillStyle = "red"
    context.fillRect(food.x,food.y,box,box)

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if (direction === "UP") snakeY -= box
    if (direction === "DOWN") snakeY += box
    if (direction === "LEFT") snakeX -= box
    if (direction === "RIGHT") snakeX += box

    if ( food.x === snakeX && food.y === snakeY ){
        score++
        if ( score > highScoreIs ){
            let theCurrentHighScoreIs = JSON.parse(localStorage.getItem("GAMEON"))
            theCurrentHighScoreIs.HIGHSCORE.SNAKEGAME = score
            localStorage.setItem("GAMEON",JSON.stringify(theCurrentHighScoreIs))
            if ( !highScoreAchieved ){
                let recordBreakMessage = Math.floor(Math.random()*newHighScore.length)
                message.textContent = newHighScore[recordBreakMessage]
                setTimeout(()=>{
                    message.textContent = ""
                },1000)
                highScoreAchieved = true
            }
            else{
                let randomMessage = Math.floor(Math.random() * messages.length)
                message.textContent = messages[randomMessage]
                setTimeout(() => {
                    message.textContent = ""
                }, 1000)
            }
        }
        if ( score <= highScore || !highScoreAchieved ){
            let randomMessage = Math.floor(Math.random() * messages.length)
            message.textContent = messages[randomMessage]
            setTimeout(() => {
                message.textContent = ""
            }, 1000)
        }
        scoreIS.textContent = score
        food = {
            x: Math.floor(Math.random() * cols) * box,
            y: Math.floor(Math.random() * rows) * box
        }   
    }
    else{
        snake.pop()
    }

    let newHead = { 
        x:snakeX,
        y:snakeY
    }

    if (
        snakeX < 0 ||
        snakeY < 0 ||
        snakeX >= canvas.width ||
        snakeY >= canvas.height ||
        collision(newHead, snake)
    ){
        clearInterval(game)
        clearTimeout(message.textContent)
        message.textContent = "game over!"
        let highScore = JSON.parse(localStorage.getItem("GAMEON")).HIGHSCORE
        best.textContent = highScore.SNAKEGAME
        message.classList.remove("blink")
        void message.offsetWidth
        message.classList.add("blink")
        setTimeout(() => {
            message.classList.remove("blink")
        },600000);
    }
    snake.unshift(newHead)
}

let game = setInterval(draw,100)

restart.addEventListener("click",()=>{
    clearInterval(game)
    message.textContent = ""
    snake = [{ x: 15*box, y: 8*box }];
    score = 0;
    highScoreAchieved = false;
    scoreIS.textContent = score;
    food = {
        x: Math.floor(Math.random() * cols) * box,
        y: Math.floor(Math.random() * rows) * box
    };
    showMessage()
    game = setInterval(draw,100)
})