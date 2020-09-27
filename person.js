/**
 * Class used to represent a person for a SIR simulation.
 * Each person instance is designed to be implemented with a cell-based simulation
 * This means that each person instance has the responsibility of simulating themselves, and not the canvas.
 * @author Emil Elton Nilsen
 * @version 1.0
 */
class Person {

    /**
     * Response for constructing each person instance
     * @param xPos The starting position of each person instance on the x-axis
     * @param yPos The starting position of each person instance on the y-axis
     * @param personRadius The starting radius of each person instance
     * @param isInfected If each person instance is infected or not
     * @param color The color of each person instance
     * @param willMove If each person instance is going to move or not
     */
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

    /**
     * Displays the person
     */
    display() {
        fill(this.color);
        noStroke();
        ellipse(this.xPos, this.yPos, this.personRadius*2, this.personRadius*2);
    }

    /**
     * Moves the person, if they are supposed to be moved
     */
    move() {
        if (this.willMove) {
            this.xPos += this.xSpeed;
            this.yPos += this.ySpeed;
        }
    }

    /**
     * Responsible for making the person bounce of the canvas walls
     * Does a check to see if the radius of the person is touching a canvas wall
     * If it touches, mirror their movement
     */
    bounceOfCanvasWall() {
        if (this.xPos <= this.personRadius || this.xPos >= (canvasWidth - this.personRadius)) {
            this.xSpeed = this.xSpeed * -1;
        }
        if (this.yPos <= this.personRadius || this.yPos >= (canvasHeight - this.personRadius)) {
            this.ySpeed = this.ySpeed * -1;
        }
    }

    /**
     * Mirrors the movement of the person
     */
    mirrorMovement() {
        this.xSpeed = this.xSpeed * -1;
        this.ySpeed = this.ySpeed * -1;
    }

    /**
     * Checks if the person is colliding with another person
     * @param other The other person to check if colliding with
     * @returns {boolean} True if colliding, False if not colliding
     */
    checkCollisionWithOtherPerson(other) {
        let distance = dist(this.xPos, this.yPos, other.xPos, other.yPos);

        if (distance < this.personRadius + other.personRadius) {
            this.changeDirectionRandomly();
            return true;
        } else {
            return false;
        }
    }

    /**
     * Checks if the person is colliding with a quarantine border
     * First checks which of the quarantine border walls the person is closest to
     * Then checks if the borders closest to the person are colliding
     * @param borderX The position of the quarantine border on the x-axis
     * @param borderY The position of the quarantine border on the y-axis
     * @param borderW The width of the quarantine border
     * @param borderH The height of the quarantine border
     * @returns {boolean} True if colliding, False if not
     */
    checkIfQuarantineBorderCollision(borderX, borderY, borderW, borderH) {
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

    /**
     * Changes the persons color to red
     */
    changeColorToRed() {
        this.color = color('#ed2d2d');
    }

    /**
     * Changes the direction of the person randomly
     */
    changeDirectionRandomly() {
        this.speed = random(1, 1.1) * random([-1, 1]);

        let ang = random(PI / 2);
        this.changeXSpeed(ang);
        this.changeYSpeed(ang);
    }

    /**
     * Change the x-speed of the person
     * @param ang The angle you want to change the x-speed to
     */
    changeXSpeed(ang) {
        this.xSpeed = this.speed * cos(ang);
    }

    /**
     * Changes the y-speed of the person
     * @param ang The angle you want to change the y-speed to
     */
    changeYSpeed(ang) {
        this.ySpeed = this.speed * sin(ang);
    }

    /**
     * Sets the persons SIR status to infected
     */
    setInfected() {
        this.isInfected = true;
        this.changeColorToRed();
        this.setRecoveredTimer();
        this.setDeadTimer();
    }

    /**
     * Sets if the person will move to false
     */
    setWillNotMoveToFalse() {
        this.willMove = false;
    }

    /**
     * Set a 14 second recovered timer to the person
     * If the person did not die, it:
     *  sets it color to purple
     *  sets recovered to true
     */
    setRecoveredTimer() {
        setTimeout(() => {
            if (!this.dead) {
                let newColor = '#d176d6';
                this.isRecovered = true;
                this.color = color(newColor);
                recoveredPersons++;
                infectedPersons--;
            }
        }, 14000);
    }

    /**
     * At a collision with another person, check if other person is infected or not
     * @param other The other person to check if infected
     * @returns {boolean} True if other person is infected, False if not
     */
    atCollisionCheckIfInfected(other) {
        if (other.isInfected === false && this.isInfected === true && this.isRecovered === false && this.dead === false) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Sets the age of the person
     * The assigning of age is reflective of the population of Norway in 2014
     * @returns {number} The assigned age of the person
      */
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

    /**
     * Gets the age of the person
     * @returns {number} Age of the person
     */
    getAge() {
        return this.age;
    }

    /**
     * Assigns the dying probability of the person, the higher the age, the higher the dying probability
     * These dying probabilities are made up, and do not necessarily represent the dying probability of COVID-19
     * @returns {number} The dying probability of the person
     */
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

    /**
     * Moves the person to a specific point, and infects the person
     * @param x The x-coordinate where we want to move our person
     * @param y The y-coordinate where we want to move our person
     */
    moveToSpecificPointAndGetInfected(x, y) {
        this.xPos = x;
        this.yPos = y;

        this.setInfected();
        this.changeColorToRed();
    }

    /**
     * Moves the person to a specific point
     * @param x The x-coordinate where we want to move our person
     * @param y The y-coordinate where we want to move our person
     */
    moveToSpecificPoint(x, y) {
        this.xPos = x;
        this.yPos = y;
    }

    /**
     * Sets a timer of 7 seconds, and when complete, it will or will not set the persons SIR status to dead
     */
    setDeadTimer() {
        setTimeout(() => {
            if (Math.random() * 100 < this.dyingProbability) {
                this.color = color('#2e333b');
                this.dead = true;
                deadPersons++;
                infectedPersons--;
            }
        },7000);
    }
}
