class QuarantineBorder {
    constructor(xPos, yPos, width, height, ySpeed) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        this.ySpeed = ySpeed;
    }

    display() {
        fill('black');
        noStroke();
        rect(this.xPos, this.yPos, this.width, this.height);
    }

    move() {
        setTimeout(() => {
            this.yPos = this.yPos + this.ySpeed;
        }, 5000);
    }


}