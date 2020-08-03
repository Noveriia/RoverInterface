/**
 * Basic implementation of a history and realtime server.
 */

var Rovers = require('./rovers');
var RealtimeServer = require('./realtime-server');
var HistoryServer = require('./history-server');
var StaticServer = require('./static-server');

var expressWs = require('express-ws');
var app = require('express')();
expressWs(app);

var rovers = new Rovers();
var realtimeServer = new RealtimeServer(rovers);
var historyServer = new HistoryServer(rovers);
var staticServer = new StaticServer();

app.use('/realtime', realtimeServer);
app.use('/history', historyServer);
app.use('/', staticServer);

var port = process.env.PORT || 8080

app.listen(port, function () {
    console.log('Open MCT hosted at http://localhost:' + port);
    console.log('History hosted at http://localhost:' + port + '/history');
    console.log('Realtime hosted at ws://localhost:' + port + '/realtime');
});
