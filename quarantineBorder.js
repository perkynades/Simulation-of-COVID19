/**
 * Class used to represent a quarantine border for a SIR simulation
 * Each quarantine border instance is designed to be implemented with a cell-based simulation
 * This means that each quarantine border instance has the responsibility of simulation themselves, and not the canvas
 * @author Emil Elton Nilsen
 * @version 1.0
 */
class QuarantineBorder {

    /**
     * Responsible for constructing each quarantine border instance
     * @param xPos The starting position of each quarantine border instance on the x-axis
     * @param yPos The starting position of each quarantine border instance on the y-axis
     * @param width The width of each quarantine border instance
     * @param height The height of each quarantine border instance
     * @param ySpeed The speed of the quarantine border on the y-axis
     */
    constructor(xPos, yPos, width, height, ySpeed = 0) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        this.ySpeed = ySpeed;
    }

    /**
     * Displays the quarantine border
     */
    display() {
        fill('black');
        noStroke();
        rect(this.xPos, this.yPos, this.width, this.height);
    }

    /**
     * Moves the quarantine border for 5 seconds
     */
    move() {
        setTimeout(() => {
            this.yPos = this.yPos + this.ySpeed;
        }, 5000);
    }

    /**
     * Moves the quarantine border out of the canvas
     * @param canvasWidth The width oh the canvas where the quarantine border is being displayed
     * @param canvasHeight The height oh the canvas where the quarantine border is being displayed
     */
    moveOutOfCanvas(canvasWidth, canvasHeight) {
        this.xPos = canvasWidth;
        this.yPos = canvasHeight;
    }

}
