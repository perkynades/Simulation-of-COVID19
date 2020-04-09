class Person {
    constructor(xPos, yPos, personRadius, isInfected, color) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.xSpeed = random(-1, 1);
        this.ySpeed = random(-1, 1);
        this.personRadius = personRadius;
        this.color = color;
        this.isInfected = isInfected;
        this.isRecovered = false;
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
            this.changeDirection();
            return true;
        } else {
            return false;
        }
    }

    changeColor() {
        if (this.isInfected == true) {
            this.color = color('#ed2d2d');
        }
    }

    changeDirection() {
        this.mirrorXSpeed();
        this.mirrorYSpeed();
    }

    mirrorXSpeed() {
        this.xSpeed = this.xSpeed * -1;
    }

    mirrorYSpeed() {
        this.ySpeed = this.ySpeed * -1;
    }

    getInfected() {
        return this.isInfected;
    }

    setInfected() {
        this.isInfected = true;
        this.setRecoveredTimer();
    }

    getRecovered() {
        return this.isRecovered;
    }

    setRecoveredTimer() {
        setTimeout(() => {
            let newColor = '#d176d6';
            this.isRecovered = true;
            this.isInfected = false;
            this.color = color(newColor);
        }, 14000);
    }

    atCollisionCheckIfInfected(other) {
        if (other.isInfected === false && this.isInfected === true) {
            return true;
        } else if (this.isRecovered === true){
            return false;
        } else {
            return false;
        }
    }
}