const axios = require('axios');

let resolved = 0;
console.time('timer');
function main () {
  const promises = [];
  for (let i = 0; i < 1000; i++) {
    const promise = axios({
      url: 'http://localhost:9000'
    }).then(() => {
      resolved = resolved + 1;
      if (resolved % 100 === 0) {
        console.log(resolved, 'resolved');
      }
    });
    promises.push(promise);
  }

  return Promise.all(promises);
}

main()
  .then(() => {
    console.timeEnd('timer');
  });
