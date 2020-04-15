var totalPerson = 200;
var persons = [];
var infected = [];
var recovered = [];
let dead;

var person;

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
            if (person.borderCollision(northQuarantineBorder.xPos, northQuarantineBorder.yPos, northQuarantineBorder.width, northQuarantineBorder.height)) {
                overLappingNorthBorder = true;
            }
            if (person.borderCollision(southQuarantineBorder.xPos, southQuarantineBorder.yPos, southQuarantineBorder.width, southQuarantineBorder.height)) {
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
        persons[i].bounceOfWall();

        for (let j = 0; j < persons.length; j++) {
            if (i != j && persons[i].collision(persons[j])) {
                if (persons[i].atCollisionCheckIfInfected(persons[j])) {
                    persons[i].setInfected();
                    persons[j].setInfected();
                    persons[i].changeColor();
                    persons[j].changeColor();
                    infected.push(persons[i]);
                    infected.push(persons[j]);
                    totalPerson--;
                }
            }
        }

        if (persons[i].borderCollision(northQuarantineBorder.xPos, northQuarantineBorder.yPos, northQuarantineBorder.width, northQuarantineBorder.height)) {
            persons[i].changeDirection();
        }
        if (persons[i].borderCollision(southQuarantineBorder.xPos, southQuarantineBorder.yPos, southQuarantineBorder.width, southQuarantineBorder.height)) {
            persons[i].changeDirection();
        }
    }
}

function distanceFromPersonToBorder(borderX, borderY, borderW, borderH, personX, personY) {
    let testX = personY;
    let testY = personX;

    if (personX < borderX) {
        testX = borderX;
    } else if (personX > borderX + borderW) {
        testX = borderX + borderW;
    }

    if (personY < borderY) {
        testY = borderY;
    } else if (personY > borderY + borderH) {
        testY = borderY + borderH;
    }

    let distX = personX - testX;
    let distY = personY - testY;

    return Math.sqrt((distX*distX) + (distY*distY));
}