/*


            _               _ _                                           __  
           | |             | | |                                       _  \ \ 
  __ _  ___| |_ _   _  __ _| | |_   _   _ __ _____   _____ _ __ ___   (_)  | |
 / _` |/ __| __| | | |/ _` | | | | | | | '__/ _ \ \ / / _ \ '__/ __|       | |
| (_| | (__| |_| |_| | (_| | | | |_| | | | | (_) \ V /  __/ |  \__ \   _   | |
 \__,_|\___|\__|\__,_|\__,_|_|_|\__, | |_|  \___/ \_/ \___|_|  |___/  ( )  | |
                                 __/ |                                |/  /_/ 
                                |___/                                         

 rovers.js represents a group of small rovers from the roverdomain code

 I kept it named spacecraft because the rest of the servers (realtime/history) were already linked to a 
 "spacecraft" object and I really didn''t want to change all the name instances haha
*/

//rovers object
function Spacecraft() {
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

    setInterval(function () { //updates rovers state every second?
        this.updateState();
        this.generateTelemetry();
    }.bind(this), 1000);
};

/**
 * Function to pull python data from server
 */
const fetch = require("node-fetch");//random fetch note: also had to install fetch into node packages with "npm i node-fetch --save"
async function getDomainData() {
    try {
        var result = await fetch(`http://127.0.0.1:5000/api/v1/resources/domaindata/all`); //url to python server
        var data = await result.json();
        var perf = data[0].performance;
        //console.log(`Current performance is ${perf}`);
        return perf;
    } catch(error) {
        console.log(error);
    }
}

/**
 * Updates current performance value by pulling from roverdomain API. 
 * If the roverdomain server isn't running, this will fail. 
 */
Spacecraft.prototype.updateState = function () {
    getDomainData().then(data => {
        this.state["performance"] = data;
        //console.log(this.state["performance"]);
    });
    this.generateTelemetry();
    this.state['comms.recd'] += 32;
};

/**
 * Takes a measurement of Spacecraft state, stores in history, and notifies 
 * listeners.
 */
Spacecraft.prototype.generateTelemetry = function () {
    var timestamp = Date.now(), sent = 0;
    Object.keys(this.state).forEach(function (id) {
        var state = { timestamp: timestamp, value: this.state[id], id: id};
        this.notify(state);
        this.history[id].push(state);
        this.state["comms.sent"] += JSON.stringify(state).length;
    }, this);
};

Spacecraft.prototype.notify = function (point) {
    this.listeners.forEach(function (l) {
        l(point);
    });
};

Spacecraft.prototype.listen = function (listener) {
    this.listeners.push(listener);
    return function () {
        this.listeners = this.listeners.filter(function (l) {
            return l !== listener;
        });
    }.bind(this);
};

module.exports = function () {
    return new Spacecraft()
};
