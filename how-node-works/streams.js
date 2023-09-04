const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  //Soultion 1
  //   fs.readFile('test-file.txt', (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });
  //Solution 2 (Streams)
  //This solution causes BACKPRESSURE as the data is read much faster by the readable stream than it can be written on the
  //writable stream.
  //   const readable = fs.createReadStream('test-file.txt');
  //   readable.on('data', (chunk) => {
  //     //Writable stream
  //     res.write(chunk);
  //   });
  //   //Data has been written completely
  //   readable.on('end', () => {
  //     res.end();
  //   });
  //   readable.on('error', (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end('File not found!');
  //   });
  //Solution 3
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);
  //readableSource.pipe(writeableDest)
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Loading...');
});
