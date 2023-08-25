
let boxColor = [0, 55, 0];
let strokeColor = 50;
let columns /* To be determined by window width */
let rows; /* To be determined by window height */
let currentBoard;
let nextBoard;
let fr = 5;
let isRandom = false
let canGen = true
let slider;
let button;
let loneliness = 2;
let overpopulation = 3;
let reproduction = 3;
let bgColor = [49, 80, 65];//dark green//
let sustaincolor = [255, 255, 153]; //yellow//
let diecolour = [220,20,60];//crimson//
let newborn = [76,153,0];//green//
let frameValue = 15;
let unitLength = 20;
// let wSize = window.innerWidth
// let hSize = window.innerHeight
// console.log(wSize,hSize)

window.addEventListener('resize',()=>{
    
    // offsetW = wSize - window.innerWidth
    
    
    // offsetWPercent = offsetW / wSize
    // console.log(offsetWPercent)
    
    // document.querySelector("canvas").style.transform = `scaleX(${1-offsetWPercent})`
    
    setup()
    
})

function setup() {
    
    
    /* Set the canvas to be under the element #canvas*/
    const canvas = createCanvas((windowWidth) - (windowWidth % unitLength) - 100, (windowHeight) - (windowHeight % unitLength) - 100 );
    canvas.parent(document.querySelector("#canvas"));
    frameRate(fr);
    /*Calculate the number of columns and rows */
    columns = floor(width / unitLength);
    rows = floor(height / unitLength);
    /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
    currentBoard = [];
    nextBoard = [];
    for (let i = 0; i < columns; i++) {
        currentBoard[i] = [];
        nextBoard[i] = [];
    }
    
    


    slider = createSlider(0, 60, 15);
    slider.parent(document.querySelector("#slider"));

    // Now both currentBoard and nextBoard are array of array of undefined values.
    init(); // Set the initial values of the currentBoard and nextBoard
}


function init() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            currentBoard[i][j] = 0;
            nextBoard[i][j] = 0;

        }
    }
}


function draw() {
    
    
    frameRate(frameValue);
    

    background(bgColor);
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (currentBoard[i][j] == 1) {
                fill(boxColor);
            if(currentBoard[i][j] == nextBoard[i][j]){
                fill(sustaincolor)};
            if(nextBoard[i][j] == 0){
                fill(diecolour)};
            if(currentBoard[i][j] == 0 && nextBoard[i][j] == 1){
                fill(newborn)};
            } else {
                fill(bgColor);
            }




            stroke(strokeColor);
            rect(i * unitLength, j * unitLength, unitLength, unitLength);
            if (isRandom) {
                currentBoard[i][j] = random() > 0.8 ? 1 : 0// one line if
            }

        }
    }


    if (canGen) {
        generate();
    }

}
function stop() {
    noLoop()
    canGen = false
    isRandom = false
}

function next() {
    generate()
    draw()
    noLoop()
}

function resume() {
    loop()
    canGen = true
}





function generate() {
    
    //Loop over every single box on the board
    for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
            // Count all living members in the Moore neighborhood(8 boxes surrounding)
            let neighbors = 0;
            for (let i of [-1, 0, 1]) {
                for (let j of [-1, 0, 1]) {
                    if (i == 0 && j == 0) {
                        // the cell itself is not its own neighbor
                        continue;
                    }
                    // The modulo operator is crucial for wrapping on the edge
                    neighbors +=
                        currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
                }
            }

            // Rules of Life
            
            if (currentBoard[x][y] == 1 && neighbors < loneliness) {
                // Die of Loneliness
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 1 && neighbors > overpopulation) {
                // Die of Overpopulation
                nextBoard[x][y] = 0;
            } else if (currentBoard[x][y] == 0 && neighbors == reproduction) {
                // New life due to Reproduction
                nextBoard[x][y] = 1;
            } else {
                // Stasis
                nextBoard[x][y] = currentBoard[x][y];
            }
        }
    }

    // Swap the nextBoard to be the current Board
    [currentBoard, nextBoard] = [nextBoard, currentBoard];
}

function mouseDragged() {
    
    if (isLooping()) return;
    /**
     * If the mouse coordinate is outside the board
     */
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);
    currentBoard[x][y] = 1;
    fill(boxColor);
    stroke(strokeColor);
    rect(x * unitLength, y * unitLength, unitLength, unitLength);

    // pattern.forEach((xs,dy) => {
    //     xs.forEach((alive,dx) => {
    //         placeCell(x + dx, y + dy, alive)
    //     })
    // })
}

function placeCell(x, y, alive) {
    let cell = board[x][y]
    cell.alive = alive
    cell.bgColor = bgColor
    cell.boxColor = boxColor
    if (alive) {
        fill(boxColor)
    }   else {
        fill(bgColor)}
    stroke(strokeColor);
    rect(x * unitLength, y * unitLength, unitLength, unitLength);
}
/**
 * When mouse is pressed
 */
function mousePressed() {

    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    // let zonedraw = Document.querySelector("playzone")
    
    noLoop();
    if(!isRle){
        mouseDragged();
    }else{
        mouseDraggedRle();
    }
    
}

/**
 * When mouse is released
 */
function mouseReleased() {
    loop();
}





function randomPattern(){
    isRandom = true
    init();

}




function reset(){

    init()

}














document.querySelector("#loneliness").addEventListener("change", (e)=> {
    
    loneliness = e.target.value;
    
    
});


document.querySelector('#slider').addEventListener('change',(e)=>{
    
    frameValue = e.target.value
    document.querySelector('#fps').innerText = frameValue

})


// rle start here
// let rleStr = "bo$2bo$3o$$$$$$15bo$15b4o$16b4o10b2o$5b2o9bo2bo9bobo$5b2o9b4o8b3o8b2o$15b4o8b3o9b2o$15bo12b3o$29bobo$30b2o$$$$$$$45b2o$44b2o$46bo!"
let rleStr = ""
let rleInput = document.querySelector('#rleInput')
let isRle = false
rleInput.addEventListener('blur',(e)=>{
    if(e.target.value === ""){
        isRle = false
        return
    }else{
        rleStr = e.target.value
        isRle = true
    }
    
})

function mouseDraggedRle(){
    if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
        return;
    }
    const x = Math.floor(mouseX / unitLength);
    const y = Math.floor(mouseY / unitLength);
    let decodeData = decode(rleStr)
    let rowData = decodeData.split('$')
    let idx = 0
    for(let row of rowData){
        
        for(let i in row){
            
            if(row[i] === "o"){
                currentBoard[checkColumn(x + Number (i))][checkRow(y + idx)] = 1
            }else if(row[i] === "b"){
                currentBoard[checkColumn(x + Number (i))][checkRow(y + idx)] = 0
            }else if(row[i] === "!"){
                return
            }
                
        }
        idx++
    }
}


function decode (str) {
    return str.replace(/(\d+)(\w)/g,
    function(m,n,c){
        return new Array( parseInt(n,10)+1 ).join(c);
    }
    );
}

function checkColumn(col){
    if(col >= columns){
        return col - columns
    }else{
        return col
    }
}

function checkRow(row){
    if(row >= rows){
        return row - rows
    }else{
        return row
    }
}

