

let unitLength = 20;
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

let fps = document.querySelector(".fps")



function setup() {
    noLoop()
    console.log('setup')
    /* Set the canvas to be under the element #canvas*/
    const canvas = createCanvas(windowWidth - 100, windowHeight - 100);
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
    
    
    // frameRate(slider.value());

    // button = createButton('Stop');
    // button.position(0, 0);
    // button.mousePressed(stop);

    // button = createButton('Next');
    // button.position(50, 0);
    // button.mousePressed(next);

    // button = createButton('Resume');
    // button.position(100, 0);
    // button.mousePressed(resume);

    // button = createButton('Random Pattern');
    // button.position(175, 0);
    // button.mousePressed(randompattern);

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
    // console.log(draw)
    let frameValue = slider.value();
    frameRate(frameValue);
    fps.innerHTML = slider.value();

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

function randompattern() {
    isRandom = true
    init();
    
}

// function slide() {
//     fr = slider.value(1, 96, 12);
// }

function generate() {
    console.log('generate')
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
            console.log('loneiness',loneliness)
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
    mouseDragged();
}

/**
 * When mouse is released
 */
function mouseReleased() {
    loop();
}



//rle
document.querySelector("#rle").addEventListener("change", (event) => {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function () {
        var node = document.getElementById('output');
        let x = 0;
        let y = 0;
        let data;
        const rows = reader.result.split("\n");
        for(let row of rows){
            if (row[0] != "#"){
                const info = row.split(",");
                if (info.length > 1) {
                    for (let i of info) {
                        //x,y
                        const pair = i.replace(/[" "]/g,"").split("=");
                        switch (pair[0]) {
                            case "x":
                                x = parseInt(pair[1]);
                                break;
                            case "y":
                                y = parseInt(pair[1]);
                                break;
                        }
                    }
                }else{
                    //data
                    data = decode(info[0]);
                }
            }
        }
        const pos = data.reduce((acc,_,idx)=>{
            if (idx%2 > 0){
                acc.push([ data[idx-1],data[idx] ])
                return acc;
            }else{
                return acc;
            }
        },[]);
        
        //Draw the pattern
        node.innerHTML = "";
        for (let j=0;j<y;j++){
            let content = ""
            for(let i=0;i<x;i++){
                const check = pos.filter(p=>p[0] === i && p[1] === j);
                if (check.length > 0){
                    content += "<div style='width:30px;height:30px;background-color:gray;border:1px black solid;margin:1px 1px 1px 1px'></div>";
                }else{
                    content += "<div style='width:30px;height:30px;margin:1px 1px 1px 1px'></div>";
                }
            }
            node.innerHTML += `<div style='display:flex;width:${30*x}px'>${content}<div>`;
        }
    };
    reader.readAsText(input.files[0]);
});

document.querySelector("#randompattern").addEventListener("click", function () {

    isRandom = true
    init();
});
document.querySelector("#stop").addEventListener("click", function () {

    noLoop()
    canGen = false
});

document.querySelector("#next").addEventListener("click", () => {

    generate()
    draw()
    noLoop()
})

document.querySelector("#resume").addEventListener("click", function () {

    loop()
    canGen = true
});

// document.querySelector("#slider").addEventListener("change", function () {

//     var frameRateValue = document.getElementById("slider").value;
//         frameRate(fr);
// });








sel = document.getElementById("loneliness")
console.log(sel)
sel.addEventListener("change", (e)=> {
    
    loneliness = e.target.value;
    console.log(loneliness)
    //noLoop();
    // document.getElementById("canvas").blur();
});
