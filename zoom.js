
$(document).ready(function(){
  $(this).scrollTop(0);
});

//window.onresize = function(){ location.reload(); }


//const zoomElement = document.querySelector(".center");
//document.getElementById("center").style.maxWidth = window.innerWidth;
//document.getElementById("hei").style.height = (2*window.innerHeight)+'px';
document.querySelector(".zoom").style.height = Math.max(600, window.innerHeight) +'px';
document.getElementById("img-fit").style.height = Math.max(600, window.innerHeight) +'px';
document.getElementById("img-fit").style.width = Math.max(600, window.innerWidth) +'px';
document.getElementById("my-img").style.height = Math.max(600, window.innerHeight) +'px';
document.getElementById("canvas").style.height = Math.max(600, window.innerHeight) +'px';
document.getElementById("canvas").style.width = Math.max(600, window.innerWidth) +'px';

let diff = window.innerWidth - window.innerHeight;

if(window.innerWidth > 600){
    document.getElementById("bbig").style.scale = 1+(diff/1200);
} else {
    document.querySelector(".color_chg-btn").style.right = (window.innerWidth-600)*100/window.innerWidth + '%' ;
}


class Cell
{
    static width = 4;
    static height = 4;

    constructor (context, gridX, gridY)
    {
        this.context = context;

        // Store the position of this cell in the grid
        this.gridX = gridX;
        this.gridY = gridY;

        // Make random cells alive
        this.alive = Math.random() > 0.5;
    }

    draw() {
        // Draw a simple square
        this.context.fillStyle = this.alive?'white':'black';
        this.context.fillRect(this.gridX * Cell.width, this.gridY * Cell.height, Cell.width, Cell.height);
    }
}


    var numColumns = Math.floor(Math.max(600, window.innerWidth)/4);
    var numRows = Math.floor(Math.max(600, window.innerHeight)/4);
    var start = false;


        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');
        gameObjects = [];

        createGrid();

        // Request an animation frame for the first time
        // The gameLoop() function will be called as a callback of this request
        window.requestAnimationFrame(() => gameLoop());


    function createGrid()
    {
        for (let y = 0; y < numRows; y++) {
            for (let x = 0; x < numColumns; x++) {
                gameObjects.push(new Cell(context, x, y));
            }
        }
    }

    function isAlive(x, y)
    {
        if (x < 0 || x >= numColumns || y < 0 || y >= numRows){
            return false;
        }

        return gameObjects[gridToIndex(x, y)].alive?1:0;
    }

    function gridToIndex(x, y){
        return x + (y * numColumns);
    }

    function checkSurrounding ()
    {
        // Loop over all cells
        for (let x = 0; x < numColumns; x++) {
            for (let y = 0; y < numRows; y++) {

                // Count the nearby population
                let numAlive = isAlive(x - 1, y - 1) + isAlive(x, y - 1) + isAlive(x + 1, y - 1) + isAlive(x - 1, y) + isAlive(x + 1, y) + isAlive(x - 1, y + 1) + isAlive(x, y + 1) + isAlive(x + 1, y + 1);
                let centerIndex = gridToIndex(x, y);

                if (numAlive == 2){
                    // Do nothing
                    gameObjects[centerIndex].nextAlive = gameObjects[centerIndex].alive;
                }else if (numAlive == 3){
                    // Make alive
                    gameObjects[centerIndex].nextAlive = true;
                }else{
                    // Make dead
                    gameObjects[centerIndex].nextAlive = false;
                }
            }
        }

        // Apply the new state to the cells
        for (let i = 0; i < gameObjects.length; i++) {
            gameObjects[i].alive = gameObjects[i].nextAlive;
        }
    }

    function gameLoop() {
        if(start){
        // Check the surrounding of each cell
        checkSurrounding();

        // Clear the screen
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw all the gameobjects
        for (let i = 0; i < gameObjects.length; i++) {
            gameObjects[i].draw();
        }
        }   

        // The loop function has reached it's end, keep requesting new frames
        setTimeout( () => {
            window.requestAnimationFrame(() => gameLoop());
        }, 100)
    }

    document.getElementById("reset_game").onclick = function() {
        for (let x = 0; x < numColumns; x++) {
            for (let y = 0; y < numRows; y++) {
    
                let centerIndex = gridToIndex(x, y);
                gameObjects[centerIndex].alive = Math.random() > 0.5;
            }
        }
    };

    document.getElementById("start_game").onclick = function() {
        if(start){
            start = false;
            document.getElementById("play_button").src = "play.png";
        } else {
            start = true;
            document.getElementById("play_button").src = "pause.png";
        }
    };

window.onload = function() {
  setTimeout(function () {
    document.getElementById("preloader").remove();
    document.getElementById("myDiv").style.display = "block";
    // The page has loaded, start the game
    //let gameWorld = new GameWorld('canvas', window.innerHeight%10, window.innerWidth%10);
    start = true;
}, 1);

}





