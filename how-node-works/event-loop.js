const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => {
  console.log('Timer 1 Finished!');
}, 0);

setImmediate(() => {
  console.log('Immediate 1 Finished!');
}, 0);

fs.readFile('test-file.txt', () => {
  console.log('I/O Finished');
  console.log('-------------------------------------------');
  setTimeout(() => {
    console.log('Timer 2 Finished!');
  }, 0);

  //This is printed first even though the Timer phase is above Immediate phase because eventloop actually waits inside
  //the I/O polling phase and since immediate phase comes after that phase, this is executed first.
  //Executed once per Tick(Tick is one event loop cycle)
  setImmediate(() => {
    console.log('Immediate 2 Finished!');
  }, 0);

  setTimeout(() => {
    console.log('Timer 3 Finished!');
  }, 3000);

  //Next Tick is a misleading name
  process.nextTick(() => {
    console.log('Process Next Tick');
  });

  //Async functions hence offloaded to thread pool
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password Encrypted!');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password Encrypted!');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password Encrypted!');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'Password Encrypted!');
  });
});

console.log('Hello from the top level code');
