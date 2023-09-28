const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  //Solution 1 - Entire file would have to be loaded in memory, so not a good solution
  // fs.readFile('./test-file.txt', 'utf-8', (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });
  //Soulution 2: Streams
  //Problem: Backpressure - The response cannot be written as fast on the writeable stream as it is being read.
  // const readable = fs.createReadStream('./test-file.txt');
  // //Write chunks to res
  // readable.on('data', (chunk) => {
  //   res.write(chunk);
  // });
  // //Once no more data is present, do res.end()
  // readable.on('end', () => {
  //   res.end();
  // });
  // readable.on('error', (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end('File not found!');
  // });
  //Soulution 3: Pipe operator
  const readable = fs.createReadStream('./test-file.txt');
  readable.pipe(res);
  //Readable source, put a pipe on it and add a writeable destination
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listeneing on port 8000');
});
