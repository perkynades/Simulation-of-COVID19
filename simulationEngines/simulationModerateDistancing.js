var totalPerson = 200;
var infectedPersons = 0;
var recoveredPersons = 0;
var deadPersons = 0;

var persons = [];
let person;
let personsInQuarantine = 180;
let movingPeople = [];

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

        let overlapping = false;
        for (let j = 0; j < persons.length; j++) {
            let other = persons[j];
            let distanceBetweenPersons = dist(person.xPos, person.yPos, other.xPos, other.yPos);

            if (distanceBetweenPersons < (person.personRadius) + (other.personRadius)) {
                overlapping = true;
            }
        }
        if (!overlapping) {
            persons.push(person);
        }

        protection++;
        if (protection > 1000) {
            console.log("Not enough space for all the people");
            break;
        }
    }

    let chooser = randomNoRepeats(persons);
    for (let i = 0; i < personsInQuarantine; i++) {
        chooser().setWillNotMoveToFalse();
    }

    //The rest in the array will be the people who are moving
    for (let i = 0; i < (persons.length - personsInQuarantine); i++) {
        movingPeople.push(chooser());
    }

    movingPeople[Math.floor(Math.random() * movingPeople.length)].setInfected();
    infectedPersons++;
}

function draw() {
    background(255);
    angleMode(RADIANS);
    for (let i = 0; i < persons.length; i++) {
        persons[i].move();
        persons[i].display();
        persons[i].bounceOfCanvasWall();

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

function randomNoRepeats(array) {
    let copy = array.slice(0);
    return function () {
        if (copy.length < 1) {
            copy = array.slice(0);
        }
        let index = Math.floor(Math.random() * copy.length);
        let item = copy[index];
        copy.splice(index, 1);
        return item;
    };
}
