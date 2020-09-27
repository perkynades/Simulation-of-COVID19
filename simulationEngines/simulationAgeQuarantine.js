var totalPerson = 200;
var infectedPersons = 0;
var recoveredPersons = 0;
var deadPersons = 0;

var persons = [];

var person;

let quarantineBorder;

let canvasWidth = 800;
let canvasHeight = 400;

let protection = 0;

let personRadius = 4;

function setup() {
    createCanvas(canvasWidth, canvasHeight);


    while (persons.length < totalPerson) {
        let xPos = random(personRadius * 2, canvasHeight - (personRadius * 2));
        let yPos = random(personRadius * 2, canvasHeight - (personRadius * 2));

        person = new Person(xPos, yPos, personRadius, false, '#34d2eb', true);

        quarantineBorder = new QuarantineBorder(380, 0, 40, 400, 0);

        let overlapping = false;
        let overLappingNorthBorder = false;
        for (let j = 0; j < persons.length; j++) {
            let other = persons[j];
            let distanceBetweenPersons = dist(person.xPos, person.yPos, other.xPos, other.yPos);

            if (distanceBetweenPersons < (person.personRadius) + (other.personRadius)) {
                overlapping = true;
            }
            if (person.checkIfQuarantineBorderCollision(quarantineBorder.xPos, quarantineBorder.yPos, quarantineBorder.width, quarantineBorder.height)) {
                overLappingNorthBorder = true;
            }
        }
        if (!overlapping && !overLappingNorthBorder) {
            persons.push(person);
        }

        protection++;
        if (protection > 1000) {
            console.log("Not enough space for all the people");
            break;
        }
    }

    //Quarantine all the old people
    for (let i = 0; i < persons.length; i++) {
        if (persons[i].getAge() === 66 || persons[i].getAge() === 79 || persons[i].getAge() === 90) {
            persons[i].moveToSpecificPoint(500, 200);
        }
    }

    persons[Math.floor(Math.random() * persons.length)].moveToSpecificPointAndGetInfected(200, 200);
    infectedPersons++;
}

function draw() {
    background(255);
    angleMode(RADIANS);
    quarantineBorder.display();
    for (let i = 0; i < persons.length; i++) {
        persons[i].move();
        persons[i].display();
        persons[i].bounceOfCanvasWall();

        if (persons[i].checkIfQuarantineBorderCollision(quarantineBorder.xPos, quarantineBorder.yPos, quarantineBorder.width, quarantineBorder.height)) {
            persons[i].mirrorMovement();
        }

        for (let j = 0; j < persons.length; j++) {
            if (i != j && persons[i].checkCollisionWithOtherPerson(persons[j])) {
                if (persons[i].atCollisionCheckIfInfected(persons[j])) {
                    persons[j].setInfected();
                    persons[j].changeColorToRed();
                    infectedPersons++;
                    totalPerson--;
                }
            }
        }
    }
}
