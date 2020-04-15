class Person {
    constructor(xPos, yPos, personRadius, isInfected, color, willMove) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.speed = 0.1;
        this.xSpeed = random(-1, 1);
        this.ySpeed = random(-1, 1);
        this.personRadius = personRadius;
        this.color = color;
        this.isInfected = isInfected;
        this.isRecovered = false;
        this.dead = false;
        this.age = this.assignAge();
        this.dyingProbability = this.assignDyingProbability();
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
        this.speed = random(1, 1.1) * random([-1, 1]);

        let ang = random(PI);
        this.changeXSpeed(ang);
        this.changeYSpeed(ang);
    }

    changeXSpeed(ang) {
        this.xSpeed = this.speed * cos(ang);
    }

    changeYSpeed(ang) {
        this.ySpeed = this.speed * sin(ang);
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
            if (Math.random() * 100 < this.dyingProbability) {
                this.color = color('#2e333b');
                this.dead = true;
                dead.push(this);
            }
        },7000);

        setTimeout(() => {
            if (!this.dead) {
                let newColor = '#d176d6';
                this.isRecovered = true;
                this.color = color(newColor);
                recovered.push(this);
                infected.shift();
            }
        }, 14000);
    }

    atCollisionCheckIfInfected(other) {
        if (other.isInfected === false && this.isInfected === true && this.isRecovered === false && this.dead === false) {
            return true;
        } else {
            return false;
        }
    }

    // The assigning of age is reflective of the population of Norway in 2014
    assignAge() {
        let newAge;

        let agePercent = Math.random() * 100;

        //
        if (agePercent < 18.5) {
            newAge = 15;
        } else if (agePercent < 23.6) {
            newAge = 19;
        } else if (agePercent < 57.8) {
            newAge = 44;
        } else if (agePercent < 85.4) {
            newAge = 66;
        } else if (agePercent < 94.8) {
            newAge = 79;
        } else {
            newAge = 90;
        }

        return newAge;
    }

    getAge() {
        return this.age;
    }

    // THESE NUMBERS ARE NOT CORRECT, THIS IS JUST WHAT I ASSUME IS RIGHT
    assignDyingProbability() {
        let newDyingProbability;

        if (this.age === 15) {
            newDyingProbability = 15;
        }
        if (this.age === 19) {
            newDyingProbability = 8;
        }
        if (this.age === 44) {
            newDyingProbability = 10;
        }
        if (this.age === 66) {
            newDyingProbability = 17;
        }
        if (this.age === 79) {
            newDyingProbability = 25;
        }
        if (this.age === 90) {
            newDyingProbability = 35;
        }

        return newDyingProbability;
    }
}