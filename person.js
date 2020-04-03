class Person {
    constructor(xPos, yPos, personRadius) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.xSpeed = random(-1, 1);
        this.ySpeed = random(-1, 1);
        this.personRadius = personRadius;
    }

    display() {
        fill('#34d2eb');
        noStroke();
        ellipse(this.xPos, this.yPos, this.personRadius*2, this.personRadius*2);
    }

    move() {
        this.xPos = this.xPos + this.xSpeed;
        this.yPos = this.yPos + this.ySpeed;
    }

    bounceOfWall() {
        if (this.xPos <= this.personRadius || this.xPos >= (canvasWidth - this.personRadius)) {
            this.xSpeed = this.xSpeed * -1;
        }
        if (this.yPos <= this.personRadius || this.yPos >= (canvasHeight - this.personRadius)) {
            this.ySpeed = this.ySpeed * -1;
        }
    }
}