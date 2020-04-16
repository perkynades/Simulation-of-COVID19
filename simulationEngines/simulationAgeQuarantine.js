var totalPerson = 200;
var persons = [];
var infected = [];
var recovered = [];

var dead = [];

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
            if (person.borderCollision(quarantineBorder.xPos, quarantineBorder.yPos, quarantineBorder.width, quarantineBorder.height)) {
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
}

function draw() {
    background(255);
    angleMode(RADIANS);
    quarantineBorder.display();
    quarantineBorder.move();
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

        if (persons[i].borderCollision(quarantineBorder.xPos, quarantineBorder.yPos, quarantineBorder.width, quarantineBorder.height)) {
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