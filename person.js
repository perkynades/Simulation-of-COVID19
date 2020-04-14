class Person {
    constructor(xPos, yPos, personRadius, isInfected, color, willMove) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.xSpeed = random(-1, 1);
        this.ySpeed = random(-1, 1);
        this.personRadius = personRadius;
        this.color = color;
        this.isInfected = isInfected;
        this.isRecovered = false;
        this.willMove = willMove;
    }

    display() {
        fill(this.color);
        noStroke();
        ellipse(this.xPos, this.yPos, this.personRadius*2, this.personRadius*2);
    }

    move() {
        if (this.willMove) {
            this.xPos += this.xSpeed;
            this.yPos += this.ySpeed;
        }
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

    borderCollision(borderX, borderY, borderW, borderH) {
        let testX = this.xPos;
        let testY = this.yPos;

        if (this.xPos < borderX) {
            testX = borderX;
        } else if (this.xPos > borderX + borderW) {
            testX = borderX + borderW;
        }

        if (this.yPos < borderY) {
            testY = borderY;
        } else if (this.yPos > borderY + borderH) {
            testY = borderY + borderH;
        }

        let distance = dist(this.xPos, this.yPos, testX, testY);

        if (distance <= this.personRadius) {
            return true;
        } else {
            return false;
        }
    }

    changeColor() {
        this.color = color('#ed2d2d');
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

    setWillNotMove() {
        this.willMove = false;
    }

    getWillMove() {
        return this.willMove;
    }

    setRecoveredTimer() {
        setTimeout(() => {
            let newColor = '#d176d6';
            this.isRecovered = true;
            this.color = color(newColor);
            recovered.push(this);
            infected.shift();
        }, 14000);
    }

    atCollisionCheckIfInfected(other) {
        if (other.isInfected === false && this.isInfected === true) {
            return true;
        } else {
            return false;
        }
    }
}