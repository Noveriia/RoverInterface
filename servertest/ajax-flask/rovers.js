/*
 A TESTING COPY OF 
 rovers.js represents a group of small rovers from the roverdomain code
*/

//rovers object
function Rovers() {
    this.state = { 
        "performance": 0, 
        "comms.recd": 0,
        "comms.sent": 0,      
    };

    this.history = {}; 
    this.listeners = [];

    Object.keys(this.state).forEach(function (k) { //clears history? not sure
        this.history[k] = [];
    }, this);

    setInterval(function () { //updates rovers state every second
        this.generateTelemetry();
    }.bind(this), 1000);
};

/**
 * Function to pull python data from server
 */
const fetch = require("node-fetch");
/* var dat; //global var for sloppy testing shenanigans

async function getDomainData() {
    var result = await fetch(`http://127.0.0.1:5000/api/v1/resources/domaindata/all`)
    .then(result => {
        return result.json();
    })
    .then(data => {
        //console.log(data);
        //console.log(`Performance data pulled is: ${data[0].performance}`);
        dat = data[0].performance;
    })
    .catch(error => console.log(error));
} */

async function getDomainData() {
    try {
        var result = await fetch(`http://127.0.0.1:5000/api/v1/resources/domaindata/all`);
        var data = await result.json();
        var perf = data[0].performance;
        console.log(`Current performance is ${perf}`);
        return perf;
    } catch(error) {
        alert(error);
    }
}

/**
 * Updates current performance value by pulling from roverdomain API. 
 * If the roverdomain server isn't running, this will fail. 
 */
Rovers.prototype.updateState = function () {
    getDomainData().then(data => {
        this.state["performance"] = data
        //console.log(this.state["performance"]);
    });
};

/**
 * Takes a measurement of Rovers state, stores in history, and notifies 
 * listeners.
 */
Rovers.prototype.generateTelemetry = function () {
    var timestamp = Date.now(), sent = 0;
    Object.keys(this.state).forEach(function (id) {
        var state = { timestamp: timestamp, value: this.state[id], id: id};
        this.notify(state);
        this.history[id].push(state);
        this.state["comms.sent"] += JSON.stringify(state).length;
    }, this);
};

Rovers.prototype.notify = function (point) {
    this.listeners.forEach(function (l) {
        l(point);
    });
};

Rovers.prototype.listen = function (listener) {
    this.listeners.push(listener);
    return function () {
        this.listeners = this.listeners.filter(function (l) {
            return l !== listener;
        });
    }.bind(this);
};

module.exports = function () {
    return new Rovers()
};

//run code with test rover
var test = new Rovers();
test.updateState();