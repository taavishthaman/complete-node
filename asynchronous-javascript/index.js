const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject('I could not file that file 😰');
      }
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) {
        reject('Could not write the file 😱');
      }

      resolve('Successfully wrote to file!');
    });
  });
};

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     return writeFilePro('dog-img.txt', res.body.message);
//   })
//   .then(() => {
//     return console.log('Random dog image saved to file!');
//   })
//   .catch((err) => console.log(err));

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Random dog image saved to file!');
  } catch (err) {
    throw err;
  }
  return '2: Ready 🏁';
};

// console.log('1: Will get Dogpics!');
// getDogPic()
//   .then((res) => {
//     console.log(res);
//     console.log('3: Done getting Dogpics!');
//   })
//   .catch((err) => {
//     console.log(err);
//   });
//IFFY pattern
(async () => {
  try {
    console.log('1: Will get Dogpics!');
    const res = await getDogPic();
    console.log(res);
    console.log('3: Done getting Dogpics!');
  } catch (err) {
    console.log(err);
  }
})();
