let totalPerson = 500;
let persons = [];
let infected;
let dead;

let canvasWidth = 800;
let canvasHeight = 800;

let protection = 0;

let personRadius = 4;

function setup() {
    createCanvas(canvasWidth, canvasHeight);

    while(persons.length < totalPerson) {
        let person = {
            xPos: random(personRadius*2, canvasHeight - (personRadius*2)),
            yPos: random(personRadius*2, canvasHeight - (personRadius*2)),
            personRadius: personRadius
        };

        let overlapping = false;
        for (let j = 0; j < persons.length; j++) {
            let other = persons[j];
            let distanceBetweenPersons = dist(person.xPos, person.yPos, other.xPos, other.yPos);

            if (distanceBetweenPersons < person.personRadius + other.personRadius) {
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

    for (let i = 0; i < persons.length; i++) {
        fill('#34d2eb');
        noStroke();
        ellipse(persons[i].xPos, persons[i].yPos, persons[i].personRadius*2, persons[i].personRadius*2);
    }
}