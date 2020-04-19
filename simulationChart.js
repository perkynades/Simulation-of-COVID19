var ctx = document.getElementById('infectedChart').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [""],
        datasets: [{
            data: [200],
            label: "Susceptible",
            borderColor: '#34d2eb',
            fill: false
        }, {
            data: [0],
            label: "Infected",
            borderColor: "#ed2d2d",
            fill: false
        }, {
            data: [0],
            label: "Recovered",
            borderColor: "#d176d6",
            fill: false
        }, {
            data: [0],
            label: "Dead",
            borderColor: "#2e333b",
            fill: false
        }
        ]
    },
    options: {
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Cases'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Days'
                }
            }]
        }
    }
});

var xx = 0;
function addData(chart, data) {
    var count = chart.data.labels.push(xx);
    xx++;

    var dataset, i;

    for (i = 0; i < data.length; i++) {
        dataset = chart.data.datasets[i];
        dataset.data.push(data[i]);
    }

    chart.update(0);
}

var simulationDays = 0;
let chartInterval = setInterval(() => {
    addData(chart,[totalPerson, infectedPersons, recoveredPersons, deadPersons]);
    simulationDays++;
    if (simulationDays === 51) {
        clearInterval(chartInterval);
        noLoop();
    }
}, 1000);

