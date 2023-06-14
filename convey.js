
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


    var start = true;


        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');
        gameObjects = [];
        var numColumns = Math.floor(canvas.offsetWidth/4);
        var numRows = Math.floor(window.innerHeight/4);

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

function StyleElements() {

    start = true;
}

window.onload = function() {

StyleElements();

}






