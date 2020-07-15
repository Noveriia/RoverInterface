// A client for the python echo server.

const net = require('net');
const { Socket } = require('dgram');

const client = new net.Socket();
client.connect({ port: 9999, host: process.argv[2]});

//send whatever data you want
client.write('Hello :)');
client.write('Connected to server!');

// code that reads data that server sends
client.on('data', (data) => {
 // var reconstruct = data.toJSON;
  console.log(data.toString('utf-8'));
});