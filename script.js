//Grid
const grid = document.querySelector('.grid');
//Create worm block
const worm = document.querySelector('.pacman');

//Eyes and mouth CSS variables
const r = document.querySelector(':root');
const pacman__mouth = document.querySelector('.pacman__mouth');

const score = document.getElementById("score");
let scoreCount = 0;

let lastPressedDirection = 'right';

//Speed variables
let speed = 1;
let xDirection = speed;
let yDirection = 0;

//Ghost speed variables
let xGhostDirection = speed;
let yGhostDirection = 0;

//Wall dimensions
const WALL_WIDTH = 10;
const WALL_HEIGHT = 10;

const BALL_WIDTH = 10;
const BALL_HEIGHT = 10;

//Create checkpoints----------------------------------------------------------------------
class Checkpoint{
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + WALL_WIDTH, yAxis];
        this.topLeft = [xAxis, yAxis + WALL_HEIGHT];
        this.topRight = [xAxis + WALL_WIDTH, yAxis + WALL_HEIGHT];
    }
}


let checkpoints = [
                    new Checkpoint(755, 195),   //A  11
                    new Checkpoint(595, 195),
                    new Checkpoint(525, 195),
                    new Checkpoint(395, 195),
                    new Checkpoint(265, 195),
                    new Checkpoint(195, 195),
                    new Checkpoint(35, 195),
                    new Checkpoint(395, 355),
                    new Checkpoint(395, 285),
                    new Checkpoint(395, 105),
                    new Checkpoint(395, 35),
                    new Checkpoint(755, 35), //UL  15
                    new Checkpoint(595, 35),
                    new Checkpoint(125, 35),
                    new Checkpoint(525, 105),
                    new Checkpoint(35, 35), //UR  19
                    new Checkpoint(195, 35),
                    new Checkpoint(265, 105),
                    new Checkpoint(665, 35),
                    new Checkpoint(35, 355), //DR  23
                    new Checkpoint(195, 355),
                    new Checkpoint(265, 285),
                    new Checkpoint(665, 355),
                    new Checkpoint(125, 355), //DL  27
                    new Checkpoint(525, 285),
                    new Checkpoint(595, 355),
                    new Checkpoint(755, 355),
                    new Checkpoint(35, 125), //UDR  31
                    new Checkpoint(35, 265),
                    new Checkpoint(595, 125),
                    new Checkpoint(595, 265),
                    new Checkpoint(125, 265), //URL  33
                    new Checkpoint(665, 265),
                    new Checkpoint(125, 125), //DLR  35
                    new Checkpoint(665, 125),
                    new Checkpoint(195, 125), //UDL  39
                    new Checkpoint(195, 265),
                    new Checkpoint(755, 265),
                    new Checkpoint(755, 125)
                  ];

for(let i=0;i<checkpoints.length;i++){
    let checkpoint = document.createElement('div');
    checkpoint.classList.add('checkpoint');
    checkpoint.style.left = checkpoints[i].bottomLeft[0]+"px";
    checkpoint.style.bottom = checkpoints[i].bottomLeft[1]+"px";
    grid.appendChild(checkpoint);
}


//Create ghosts----------------------------------------------------------------------

let orangeGhost = document.querySelector('.ghost.orangeGhost');

const startingGhostPosition = [[320, 180], [360, 180], [360, 220], [320, 220]];
let currentGhostPosition = startingGhostPosition;

drawGhost();

//Ghost collision with pacman
function ghostCollisionWithPlayer(){
    if(
        (((currentGhostPosition[1][0]>=currentWormPosition[0][0])&&(currentGhostPosition[1][0]<=currentWormPosition[1][0])) &&
        ((currentGhostPosition[1][1]>=currentWormPosition[0][1]&&currentGhostPosition[1][1]<=currentWormPosition[2][1]))) ||
        (((currentGhostPosition[2][0]>=currentWormPosition[0][0])&&(currentGhostPosition[2][0]<=currentWormPosition[1][0])) &&
        ((currentGhostPosition[2][1]>=currentWormPosition[0][1]&&currentGhostPosition[2][1]<=currentWormPosition[3][1]))) ||
        (((currentGhostPosition[0][0]>=currentWormPosition[0][0])&&(currentGhostPosition[0][0]<=currentWormPosition[1][0])) &&
        ((currentGhostPosition[0][1]>=currentWormPosition[0][1]&&currentGhostPosition[0][1]<=currentWormPosition[2][1]))) ||
        (((currentGhostPosition[3][0]>=currentWormPosition[0][0])&&(currentGhostPosition[3][0]<=currentWormPosition[1][0])) &&
        ((currentGhostPosition[3][1]>=currentWormPosition[1][1]&&currentGhostPosition[3][1]<=currentWormPosition[2][1])))
    ){
        lost();
    } 
}

//Move ghost
function moveGhost(){
    teleport(currentGhostPosition, drawGhost, xGhostDirection, yGhostDirection);
    changeGhostDirection();
    ghostCollisionWithPlayer();
}

function drawGhost(){
    orangeGhost.style.left = startingGhostPosition[0][0]+"px";
    orangeGhost.style.bottom = startingGhostPosition[0][1]+"px";
}

function randomGhostDirection(directions){
    return directions[Math.floor(Math.random()*directions.length)];
}


function checkpointCollisionWithGhost(i){
    if(currentGhostPosition[0][0]+20 === (checkpoints[i].bottomLeft[0]+5) &&
       currentGhostPosition[0][1]+20 === (checkpoints[i].bottomLeft[1]+5)){
        return true;
    }
    return false
}
let direction = randomGhostDirection(['UP', 'DOWN', 'LEFT','RIGHT']);

function changeGhostDirection(){
    
    for(let i=0;i<checkpoints.length;i++){

        if(checkpointCollisionWithGhost(i)){

            if(i<11){
                direction = randomGhostDirection(['UP', 'DOWN', 'LEFT','RIGHT']);
                console.log(direction);
            }else if(i>=11 && i<15){
                direction = randomGhostDirection(['UP', 'LEFT']);
                console.log(direction);
            }else if(i>=15 && i<19){
                direction = randomGhostDirection(['UP', 'RIGHT']);
                console.log(direction);
            }else if(i>=19 && i<23){
                direction = randomGhostDirection(['DOWN', 'RIGHT']);
                console.log(direction);
            }else if(i>=23 && i<27){
                direction = randomGhostDirection(['DOWN', 'LEFT']);
                console.log(direction);
            }else if(i>=27 && i<31){
                direction = randomGhostDirection(['UP', 'DOWN', 'RIGHT']);
                console.log(direction);
            }else if(i>=31 && i<33){
                direction = randomGhostDirection(['UP', 'RIGHT', 'LEFT']);
                console.log(direction);
            }else if(i>=33 && i<35){
                direction = randomGhostDirection(['DOWN', 'LEFT', 'RIGHT']);
                console.log(direction);
            }else if(i>=35 && i<39){
                direction = randomGhostDirection(['UP', 'DOWN', 'LEFT']);
                console.log(direction);
            }

            if(direction === 'UP'){
                xGhostDirection = 0;
                yGhostDirection = speed;
            }else if(direction === 'DOWN'){
                xGhostDirection = 0;
                yGhostDirection = -speed;
            }else if(direction === 'RIGHT'){
                xGhostDirection = speed;
                yGhostDirection = 0;
            }else if(direction === 'LEFT'){
                xGhostDirection = -speed;
                yGhostDirection = 0;
            }else{
                console.log("No direction");
            }
            

        }
    }

}

//Create walls----------------------------------------------------------------------
class Wall{
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + WALL_WIDTH, yAxis];
        this.topLeft = [xAxis, yAxis + WALL_HEIGHT];
        this.topRight = [xAxis + WALL_WIDTH, yAxis + WALL_HEIGHT];
    }
}

const walls = [];
let startingHorizontalPosition = 1;
let startingVerticalPosition = 1;

//Create wall array
for(let i=0;i<452;i++){
    if(i === 0){                            //horizontal
        startingHorizontalPosition = 1;
        startingVerticalPosition = 1;
    }else if(i === 37){
        startingHorizontalPosition = 431;
        startingVerticalPosition = 1;
    }else if(i === 74){
        startingHorizontalPosition = 1;
        startingVerticalPosition = 391;
    }else if(i === 111){
        startingHorizontalPosition = 431;
        startingVerticalPosition = 391;     //vertical
    }else if(i === 148){                    
        startingHorizontalPosition = 1;
        startingVerticalPosition = 1;
    }else if(i === 165){                    
        startingHorizontalPosition = 1;
        startingVerticalPosition = 231;
    }else if(i === 182){                    
        startingHorizontalPosition = 791;
        startingVerticalPosition = 1;
    }else if(i === 199){                    
        startingHorizontalPosition = 791;
        startingVerticalPosition = 231;
    }else if(i === 216){
        startingHorizontalPosition = 161;
        startingVerticalPosition = 301;
    }else if(i === 225){
        startingHorizontalPosition = 161;
        startingVerticalPosition = 11;
    }else if(i === 234){
        startingHorizontalPosition = 629;
        startingVerticalPosition = 301;
    }else if(i === 243){
        startingHorizontalPosition = 629;
        startingVerticalPosition = 11;
    }else if(i === 252){                //Horizontal
        startingHorizontalPosition = 71;
        startingVerticalPosition = 161;
    }else if(i === 262){
        startingHorizontalPosition = 71;
        startingVerticalPosition = 231;
    }else if(i === 272){
        startingHorizontalPosition = 629;
        startingVerticalPosition = 161;
    }else if(i === 282){
        startingHorizontalPosition = 629;
        startingVerticalPosition = 231;
    }else if(i === 292){                
        startingHorizontalPosition = 230;
        startingVerticalPosition = 71;
    }else if(i === 306){
        startingHorizontalPosition = 430;
        startingVerticalPosition = 71;
    }else if(i === 320){
        startingHorizontalPosition = 230;
        startingVerticalPosition = 319;
    }else if(i === 334){
        startingHorizontalPosition = 430;
        startingVerticalPosition = 319;
    }else if(i === 348){                    //Vertical
        startingHorizontalPosition = 230;
        startingVerticalPosition = 81;
    }else if(i === 357){
        startingHorizontalPosition = 560;
        startingVerticalPosition = 81;
    }else if(i === 366){                   
        startingHorizontalPosition = 230;
        startingVerticalPosition = 231;
    }else if(i === 375){
        startingHorizontalPosition = 560;
        startingVerticalPosition = 231;
    }else if(i === 384){
        startingHorizontalPosition = 490;
        startingVerticalPosition = 141;
    }else if(i === 387){
        startingHorizontalPosition = 490;
        startingVerticalPosition = 231;
    }else if(i === 390){
        startingHorizontalPosition = 300;
        startingVerticalPosition = 141;
    }else if(i === 393){
        startingHorizontalPosition = 300;
        startingVerticalPosition = 231;
    }else if(i === 396){                    //Horizontal
        startingHorizontalPosition = 310;
        startingVerticalPosition = 141;
    }else if(i === 402){                    
        startingHorizontalPosition = 430;
        startingVerticalPosition = 141;
    }else if(i === 408){                    
        startingHorizontalPosition = 310;
        startingVerticalPosition = 251;
    }else if(i === 414){                    
        startingHorizontalPosition = 430;
        startingVerticalPosition = 251;
    }else if(i === 420){                    
        startingHorizontalPosition = 71;
        startingVerticalPosition = 71;
    }else if(i === 423){                    
        startingHorizontalPosition = 71;
        startingVerticalPosition = 91;
    }else if(i === 426){                    
        startingHorizontalPosition = 71;
        startingVerticalPosition = 299;
    }else if(i === 429){                    
        startingHorizontalPosition = 71;
        startingVerticalPosition = 319;
    }else if(i === 432){                    
        startingHorizontalPosition = 699;
        startingVerticalPosition = 71;
    }else if(i === 435){                    
        startingHorizontalPosition = 699;
        startingVerticalPosition = 91;
    }else if(i === 438){                    
        startingHorizontalPosition = 699;
        startingVerticalPosition = 299;
    }else if(i === 441){                    
        startingHorizontalPosition = 699;
        startingVerticalPosition = 319;
    }else if(i === 444){//----------------------
        startingHorizontalPosition = 71;
        startingVerticalPosition = 81;
    }else if(i === 445){
        startingHorizontalPosition = 91;
        startingVerticalPosition = 81;
    }else if(i === 446){
        startingHorizontalPosition = 71;
        startingVerticalPosition = 309;
    }else if(i === 447){
        startingHorizontalPosition = 91;
        startingVerticalPosition = 309;
    }else if(i === 448){
        startingHorizontalPosition = 699;
        startingVerticalPosition = 81;
    }else if(i === 449){
        startingHorizontalPosition = 719;
        startingVerticalPosition = 81;
    }else if(i === 450){
        startingHorizontalPosition = 699;
        startingVerticalPosition = 309;
    }else if(i === 451){
        startingHorizontalPosition = 719;
        startingVerticalPosition = 309;
    }


    walls.push(new Wall(startingHorizontalPosition, startingVerticalPosition));

    if(i<148){
        startingHorizontalPosition+=WALL_WIDTH;
    }else if(i<252){
        startingVerticalPosition+=WALL_HEIGHT;
    }else if(i<348){
        startingHorizontalPosition+=WALL_WIDTH;
    }else if(i<396){
        startingVerticalPosition+=WALL_HEIGHT;
    }else {
        startingHorizontalPosition+=WALL_WIDTH;
    }
            
}

function addWalls(){
    for(let i = 0; i < walls.length; i++){
        let wall = document.createElement('div');
        wall.classList.add('wall');
        wall.style.left = walls[i].bottomLeft[0]+'px';
        wall.style.bottom = walls[i].bottomLeft[1]+'px';
        grid.appendChild(wall);
    }
}

addWalls();

//Create balls----------------------------------------------------------------------
class Ball{
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + WALL_WIDTH, yAxis];
        this.topLeft = [xAxis, yAxis + WALL_HEIGHT];
        this.topRight = [xAxis + WALL_WIDTH, yAxis + WALL_HEIGHT];
    }
}

let ballStartingHorizontalPosition = 1;
let ballStartingVerticalPosition = 1;

const balls = [ 
                new Ball(36, 355),
                new Ball(81, 355),
                new Ball(126, 355),
                new Ball(36, 310),
                new Ball(36, 265),
                new Ball(36, 125),
                new Ball(36, 80),
                new Ball(36, 35),
                new Ball(81, 35),
                new Ball(126, 35),
                new Ball(200, 35),
                new Ball(245, 35),
                new Ball(290, 35),
                new Ball(335, 35),
                new Ball(455, 35),
                new Ball(500, 35),
                new Ball(545, 35),
                new Ball(590, 35),
                new Ball(665, 35),
                new Ball(710, 35),
                new Ball(755, 35),
                new Ball(755, 80),
                new Ball(755, 125),
                new Ball(755, 265),
                new Ball(755, 310),
                new Ball(755, 355),
                new Ball(710, 355),
                new Ball(665, 355),
                new Ball(200, 355),
                new Ball(245, 355),
                new Ball(290, 355),
                new Ball(335, 355),
                new Ball(455, 355),
                new Ball(500, 355),
                new Ball(545, 355),
                new Ball(590, 355),
                new Ball(266, 285),
                new Ball(301, 285),
                new Ball(336, 285),
                new Ball(266, 250),
                new Ball(266, 141),
                new Ball(266, 106),
                new Ball(301, 106),
                new Ball(336, 106),
                new Ball(455, 106),
                new Ball(490, 106),
                new Ball(525, 106),
                new Ball(525, 141),
                new Ball(525, 250),
                new Ball(525, 285),
                new Ball(490, 285),
                new Ball(455, 285)
            ];

function addBalls(){
    for(let i = 0; i < balls.length; i++){
        let ball = document.createElement('div');
        ball.classList.add('ball');
        ball.style.left = balls[i].bottomLeft[0]+'px';
        ball.style.bottom = balls[i].bottomLeft[1]+'px';
        grid.appendChild(ball);
    }
}

addBalls();

//Remove ball
function removeBall(i){ 
    const allBalls = Array.from(document.querySelectorAll('.ball'));
    allBalls[i].classList.remove('ball');
    balls.splice(i, 1);
}

//Draw worm----------------------------------------------------------------------
function drawWorm(){
    worm.style.left = currentWormPosition[0][0]+'px';
    worm.style.bottom = currentWormPosition[0][1]+'px';
}

//Add worm
const startingPosition = [[380, 180], [420, 180], [420, 220], [380, 220]];
let currentWormPosition = startingPosition;
drawWorm();
grid.appendChild(worm);

//Set pacman location
function setPlayerLocation(currentPosition, bottomLeftX, bottomLeftY, bottomRightX, buttonRightY, topRightX, topRightY, topLeftX, topLeftY){
    currentPosition[0][0] = bottomLeftX;
    currentPosition[0][1] = bottomLeftY;
    currentPosition[1][0] = bottomRightX;
    currentPosition[1][1] = buttonRightY;
    currentPosition[2][0] = topRightX;
    currentPosition[2][1] = topRightY;
    currentPosition[3][0] = topLeftX;
    currentPosition[3][1] = topLeftY;
}

function moveWorm(){
    teleport(currentWormPosition, drawWorm, xDirection, yDirection);
    checkForCollisions();
    if(scoreCount === 52){
        setTimeout(won, 100);
    }
}
//Set eye position
function setEyePosition(top, right){
    r.style.setProperty('--eye-top', top);
    r.style.setProperty('--eye-right', right);
}

//Set mouth position
function setMouthPosition(position){
    r.style.setProperty('--mouth-direction', position);
}

//pacman controller
function onKeyDown(e){
    switch(e.key){
        case 'ArrowLeft':
            xDirection = -speed;
            yDirection = 0;
            setEyePosition('8px', '22px');
            setMouthPosition('eat-left');
            lastPressedDirection = 'left';
            break;
        case 'ArrowRight':
            xDirection = speed;
            yDirection = 0;
            setEyePosition('8px', '14px');
            setMouthPosition('eat-right');
            lastPressedDirection = 'right';
            break;
        case 'ArrowUp':
            xDirection = 0;
            yDirection = speed;
            setEyePosition('14px', '26px');
            setMouthPosition('eat-up');
            lastPressedDirection = 'up';
            break;
        case 'ArrowDown':
            xDirection = 0;
            yDirection = -speed;
            setEyePosition('22px', '26px');
            setMouthPosition('eat-down');
            lastPressedDirection = 'down';
            break;
    }
}

function checkClassCollision(thing, currentPosition, i){
    if(
        ((thing[i].bottomLeft[0] >= currentPosition[0][0] && thing[i].bottomLeft[0] <= currentPosition[1][0]) &&
        (thing[i].bottomLeft[1] >= currentPosition[0][1] && thing[i].bottomLeft[1] <= currentPosition[3][1])) ||

        ((thing[i].bottomRight[0] >= currentPosition[0][0] && thing[i].bottomRight[0] <= currentPosition[1][0]) &&
        (thing[i].bottomRight[1] >= currentPosition[1][1] && thing[i].bottomRight[1] <= currentPosition[2][1])) ||

        ((thing[i].topRight[0] >= currentPosition[3][0] && thing[i].topRight[0] <= currentPosition[2][0]) &&
        (thing[i].topRight[1] >= currentPosition[1][1] && thing[i].topRight[1] <= currentPosition[2][1])) ||

        ((thing[i].topLeft[0] >= currentPosition[3][0] && thing[i].topLeft[0] <= currentPosition[2][0]) &&
        (thing[i].topLeft[1] >= currentPosition[0][1] && thing[i].bottomRight[1] <= currentPosition[3][1]))
    ){
        return true;
    }
    return false;
}


//Check for collisions
function checkForCollisions(){
    for(let i = 0; i < walls.length; i++){
        if(checkClassCollision(walls, currentWormPosition, i)){
            xDirection = 0;
            yDirection = 0;
            if(lastPressedDirection === 'right'){
                currentWormPosition[0][0] -= 1;
            }else if(lastPressedDirection === 'left'){
                currentWormPosition[0][0] += 1;
            }else if(lastPressedDirection === 'up'){
                currentWormPosition[0][1] -= 1;
            }else if(lastPressedDirection === 'down'){
                currentWormPosition[0][1] += 1;
            }
        }
    }

    for(let i = 0; i < balls.length; i++){
        if(checkClassCollision(balls, currentWormPosition, i)){
            removeBall(i);
            scoreCount++;
            score.textContent = scoreCount;
        }
    }

}

function teleport(currentPosition, draw, xDirection, yDirection){
    if(currentPosition[0][0] === 760 && xDirection > 0){
        currentPosition[0][0] = 0;
        draw();
    }else if(currentPosition[0][0] === 0 && xDirection < 0){
        currentPosition[0][0] = 760;
        draw();
    }else if(currentPosition[0][1] === 360 && yDirection > 0){
        currentPosition[0][1] = 0;
        draw();
    }else if(currentPosition[0][1] === 0 && yDirection < 0){
        currentPosition[0][1] = 360;
        draw();
    }else{
        currentPosition[0][0] += xDirection;
        currentPosition[0][1] += yDirection;
        draw();
    }
    setPlayerLocation(currentPosition, currentPosition[0][0], currentPosition[0][1],
        currentPosition[0][0] + 40, currentPosition[0][1],
        currentPosition[0][0] + 40, currentPosition[0][1] + 40,
        currentPosition[0][0], currentPosition[0][1] + 40);
}

function won(){
    score.textContent = "You won!";
    clearInterval(theInterval);
}

function lost(){
    score.textContent = "You lost!";
    clearInterval(theInterval);
}

function moveAll(){
    moveWorm();
    moveGhost();
}

document.addEventListener("keydown", onKeyDown);

let theInterval = setInterval(moveAll, 5);