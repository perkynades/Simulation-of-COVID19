let healthy = 50;
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
        let xPos = random(0, width);
        let yPos = random(0, height);
        if (xPos < (canvasWidth - radius) || yPos < (canvasHeight - radius)) {
            ellipse(xPos, yPos, radius);
        }
    }
}