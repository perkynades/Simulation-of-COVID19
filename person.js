class Person {
    constructor(xPos, yPos, width, height) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
    }

    display() {
        fill('#34d2eb');
        noStroke();
        ellipse(this.xPos, this.yPos, this.width, this.height);
    }
}