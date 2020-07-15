// A client for the python echo server.

const net = require('net');
const { Socket } = require('dgram');

const client = new net.Socket();
client.connect({ port: 10000, host: process.argv[2]});

// code that reads data that server sends
var reconstruct
client.on('data', (data) => {
 reconstruct = data.toString('utf-8');
 console.log(data.toString('utf-8'));

 var fs = require('fs');
 fs.writeFile("test.json", reconstruct, function(err) {
    if (err) {
        console.log(err);
    }
});
 
});

