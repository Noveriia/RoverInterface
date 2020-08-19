/*                               
 rovers.js represents a group of small rovers from the roverdomain code
*/

//rovers object
function Rovers() {
    this.state = { 
        "performance": 0, 
        "performanceDiff": 0,
        "comms.recd": 0,
        "comms.sent": 0,
        "reward": 0,
        "generation": 0,
        "screencap": "http://127.0.0.1:5000/api/image.jpg"         
    };

    this.history = {}; 
    this.listeners = [];

    Object.keys(this.state).forEach(function (k) { 
        this.history[k] = [];
    }, this);

    setInterval(function () { //updates rovers state every second
        this.updateState();
        this.generateTelemetry();
    }.bind(this), 2000);// changing this value will change how often the rover pulls data from the server
};

/**
 * Function to pull python data from server
 */
const fetch = require("node-fetch");
async function getDomainData() {
    try {
        var result = await fetch(`http://127.0.0.1:5000/api/data`); //url to python server
        var data = await result.json();
        return data;
    } catch(error) {
        console.log(error);
    }
}

/**
 * Updates current performance value by pulling from roverdomain API. 
 * If the roverdomain server isn't running, this will fail. 
 */
Rovers.prototype.updateState = function () {
    getDomainData().then(data => {
        this.state["performance"] = data[0].performance;
        this.state["performanceDiff"] = data[0].performanceDiff;
        this.state["reward"] = data[0].reward;
        this.state["generation"] = data[0].generation;   
    });
    this.generateTelemetry();
    this.state['comms.recd'] += 32;
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
