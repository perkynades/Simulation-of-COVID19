class Person {
    constructor(xPos, yPos, personRadius) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.xSpeed = random(-1, 1);
        this.ySpeed = random(-1, 1);
        this.personRadius = personRadius;
        this.color = color('#34d2eb')
    }

    display() {
        fill(this.color);
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

    collision(other) {
        let distance = dist(this.xPos, this.yPos, other.xPos, other.yPos);

        if (distance < this.personRadius + other.personRadius) {
            return true;
        } else {
            return false;
        }
    }

    changeColor() {
        this.color = color('#ed2d2d');
    }
}