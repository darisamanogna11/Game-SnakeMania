//Game constants and variables
let inputDir = {x: 0,y: 0};         //before starting game
const foodsound=new Audio('food.mp3');
const gameoversound=new Audio('gameover.mp3');
const movesound=new Audio('move.mp3');
const musicsound=new Audio('music.mp3');
let speed=5;
let score=0;

let lastPaintTime=0;
let snakeArray=[
    {x:13 , y:15}
]
food={x:6,y:7};            // food is just a particle and it is not an array
//Game functions
//game loop
function main(ctime)       //ctime is current time
{
    window.requestAnimationFrame(main);
    // console.log(ctime);        //ctime in console
    if((ctime-lastPaintTime)/1000<1/speed)
    {
        return;
    }
    lastPaintTime=ctime;
    gameEngine();       

}

function isCollide(snake){
    // if you bump into yourself
    for (let i = 1; i < snakeArray.length; i++) {   //this loop checks that it have collided from behind or not
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y ) 
            {
                return true;
            } 
        }
        // if you bump into the wall
        if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0)      
        {
            return true;
        }
}

function gameEngine()
{
    //part 1 : updating the snake array & food
    if(isCollide(snakeArray)){
        gameoversound.play();
        musicsound.pause();
        inputDir={x:0,y:0};
        alert("Game Over. Press any key to play again!");
        snakeArray=[{x:13 , y:15}];
        musicsound.play();
        score=0;
    }
 
    //if you have eaten the food,increment the score and regenerate the food
    if(snakeArray[0].y===food.y && snakeArray[0].x===food.x){
        foodsound.play()           //this plays the foodsound when it eats the food
        score +=1;
        if(score > HighScoreval)
        {
            HighScoreval=score;
            localStorage.setItem("HighScore",JSON.stringify(HighScoreval))
            HighScoreBox.innerHTML="HighScore: " + HighScoreval;
        }
        ScoreBox.innerHTML="Score: " +score;
        snakeArray.unshift({x:snakeArray[0].x+inputDir.x,y:snakeArray[0].y+inputDir.y});
        let a= 2;
        let b=16;
        food={x:Math.round(a + (b-a) * Math.random()),y:Math.round(a + (b-a) * Math.random())}
    }

    //moving the snake
    for (let i = snakeArray.length-2; i >=0; i--) {
        snakeArray[i+1]={...snakeArray[i]};
    }
    
    snakeArray[0].x +=inputDir.x;
    snakeArray[0].y +=inputDir.y;

    //part 2 : Display the snake & food
    // Display the snake
    ground.innerHTML="";
    snakeArray.forEach((e,index)=>{                        //after eating food the snake size increases
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;         //vertical is our row
        snakeElement.style.gridColumnStart=e.x;       //horizontal is our column
          
        if(index===0){
            snakeElement.classList.add('head');
        }   
        else{
            snakeElement.classList.add('snake');
        }   
        ground.appendChild(snakeElement);
    })
    // Display the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;         //vertical is our row
    foodElement.style.gridColumnStart=food.x;       //horizontal is our column
    foodElement.classList.add('food');        //after eating food the snake size increases
    ground.appendChild(foodElement);
}



// Main logic starts here
musicsound.play();
let HighScore =localStorage.getItem("HighScore");
if(HighScore===null)
{
    HighScoreval=0;
    localStorage.setItem("HighScore",JSON.stringify(HighScoreval));
}
else
{
    HighScoreval=JSON.parse(HighScore)
    HighScoreBox.innerHTML="HighScore: "+ HighScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1} //start the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
    
        default:
            break;
    }
});
