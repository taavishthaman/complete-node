const EventEmmitter = require('events');
const http = require('http');

class Sales extends EventEmmitter {
  constructor() {
    super();
  }
}

const myEmmitter = new Sales();

//Observers, Listeners
myEmmitter.on('newSale', () => {
  console.log('There was a new sale!');
});

myEmmitter.on('newSale', () => {
  console.log('Customer Name: Jonas');
});

myEmmitter.on('newSale', (stock) => {
  console.log(`There are now ${stock} items left in stock.`);
});

//Emmitter
myEmmitter.emit('newSale', 9);

////////////////////////////
const server = http.createServer();

server.on('request', (req, res) => {
  console.log('Request Recieved!');
  res.end('Request Recieved!');
});

server.on('request', (req, res) => {
  console.log('Another request!!!');
});

server.close('close', () => {
  console.log('Server Closed!');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Waiting for requests!');
});
