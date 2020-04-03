let healthy = 500;
let infected;
let dead;

let radius = 8;

let canvasWidth = 800;
let canvasHeight = 800;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(255);
    noStroke();

    fill('#03bafc');
    for (let i = 0; i < healthy; i++) {
        let xPos = random(radius*2, canvasWidth - (radius*2));
        let yPos = random(radius*2, canvasHeight - (radius*2));
        ellipse(xPos, yPos, radius);
    }
}