//////////////Observer Pattern/////////
const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter {
  constructor() {
    super(); //This is important as this class will get access to all the methods of the parent class
  }
}

const myEmitter = new Sales();

//Listen to Events
myEmitter.on('newSale', () => {
  console.log('There was a new Sale!');
});

myEmitter.on('newSale', () => {
  console.log('Customer Name : Jonas');
});

myEmitter.on('newSale', (stock) => {
  console.log(`There are now ${stock} items left in stock.`);
});

//Emit Event
myEmitter.emit('newSale', 9);
//////////////Observer Pattern/////////

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('Request Received');
  console.log(req.url);
  res.end('Request Received');
});

server.on('request', (req, res) => {
  console.log('Another Request 🍄');
});

server.on('close', () => {
  console.log('Server Closed');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Waiting for requests');
});
