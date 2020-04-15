var totalPerson = 200;
var persons = [];
var infected = [];
var recovered = [];

var dead = [];

let person;

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

    persons[Math.floor(Math.random() * persons.length)].setInfected();

}

function draw() {
    background(255);
    angleMode(RADIANS);
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
    }
}