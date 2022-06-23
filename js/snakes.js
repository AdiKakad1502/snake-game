
//Game Constants and Variables
let inputDir = { x: 0, y: 0 };
let foodSound = new Audio("audio/food.mp3");
let gameOverSound = new Audio("audio/gameover.mp3");
let moveSound = new Audio("audio/move.mp3");
let musicSound = new Audio("audio/music.mp3");
let speed = 8;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 9, y: 6 };
let score = 0;

//Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    for(let i = 1; i < snakeArr.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
        if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
            return true;
        }
    return false;

}

function gameEngine() {
//Part 1: Updating the snake array & food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
    }
//Score Increment and Food Random Allotment
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1; 
        if(score > HiScoreVal){
            HiScoreVal = score;
            localStorage.setItem("HiScore",JSON.stringify(HiScoreVal));
            hiscorebox.innerHTML = "High Score: " + HiScoreVal;
        }
        scorebox.innerHTML = "Score: " + score;
        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y
        });
        food = { 
            x: Math.round(a + (b-a)*Math.random()),
            y: Math.round(a + (b-a)*Math.random())
        }
    }

//Moving the snake
    for(let i = snakeArr.length - 2; i >= 0; i--) {
        
        snakeArr[i+1] = {...snakeArr[i]};

    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Displaying the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    });

    //Displaying the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//Main Logic
musicSound.play();
let HiScore = localStorage.getItem("HiScore");
if(HiScore === null){
    HiScoreVal = 0;
    localStorage.setItem("HiScore",JSON.stringify(HiScoreVal));
}
else{
    HiScoreVal = JSON.parse(HiScore);
    hiscorebox.innerHTML = "High Score: " + HiScore;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
    inputDir = { x: 0, y: 1 };
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});
