var totalPerson = 200;
var infectedPersons = 0;
var recoveredPersons = 0;
var deadPersons = 0;

var persons = [];
let person;

let northQuarantineBorder;
let southQuarantineBorder;

let canvasWidth = 400;
let canvasHeight = 400;

let protection = 0;

let personRadius = 4;

function setup() {
    createCanvas(canvasWidth, canvasHeight);


    while (persons.length < totalPerson) {
        let xPos = random(personRadius * 2, canvasHeight - (personRadius * 2));
        let yPos = random(personRadius * 2, canvasHeight - (personRadius * 2));

        person = new Person(xPos, yPos, personRadius, false, '#34d2eb', true);

        northQuarantineBorder = new QuarantineBorder(199, 0, 10, 200, -0.06);
        southQuarantineBorder = new QuarantineBorder(199, 200, 10, 200, 0.06);

        let overlapping = false;
        let overLappingNorthBorder = false;
        let overLappingSouthBorder = false;
        for (let j = 0; j < persons.length; j++) {
            let other = persons[j];
            let distanceBetweenPersons = dist(person.xPos, person.yPos, other.xPos, other.yPos);

            if (distanceBetweenPersons < (person.personRadius) + (other.personRadius)) {
                overlapping = true;
            }
            if (person.checkIfQuarantineBorderCollision(northQuarantineBorder.xPos, northQuarantineBorder.yPos, northQuarantineBorder.width, northQuarantineBorder.height)) {
                overLappingNorthBorder = true;
            }
            if (person.checkIfQuarantineBorderCollision(southQuarantineBorder.xPos, southQuarantineBorder.yPos, southQuarantineBorder.width, southQuarantineBorder.height)) {
                overLappingSouthBorder = true;
            }
        }
        if (!overlapping && !overLappingNorthBorder && !overLappingSouthBorder) {
            persons.push(person);
        }

        protection++;
        if (protection > 1000) {
            console.log("Not enough space for all the people");
            break;
        }
    }

    persons[Math.floor(Math.random() * persons.length)].setInfected();
    infectedPersons++;
}

function draw() {
    background(255);
    angleMode(RADIANS);
    northQuarantineBorder.display();
    southQuarantineBorder.display();
    northQuarantineBorder.move();
    southQuarantineBorder.move();
    for (let i = 0; i < persons.length; i++) {
        persons[i].move();
        persons[i].display();
        persons[i].bounceOfCanvasWall();


        if (persons[i].checkIfQuarantineBorderCollision(northQuarantineBorder.xPos, northQuarantineBorder.yPos, northQuarantineBorder.width, northQuarantineBorder.height)) {
            persons[i].mirrorMovement();
        }
        if (persons[i].checkIfQuarantineBorderCollision(southQuarantineBorder.xPos, southQuarantineBorder.yPos, southQuarantineBorder.width, southQuarantineBorder.height)) {
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
