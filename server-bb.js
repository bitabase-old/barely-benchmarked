const path = require('path');
const http = require('http');

const axios = require('axios');

function createCollection () {
  return axios({
    url: 'http://localhost:8000/v1/databases/test/collections',
    method: 'post',
    data: JSON.stringify({
      name: 'test',
      schema: {
        test1: ['string']
      }
    })
  }).catch(error => {
    if (!error.response || error.response.status !== 422) {
      throw error;
    }
  });
}

const server = http.createServer(function (request, response) {
  axios({
    url: 'http://localhost:8000/v1/databases/test/records/test'
  }).then((res) => {
    response.writeHead(200, { 'content-type': 'application/json' });
    response.end(JSON.stringify(res.data));
  });
});

server.on('listening', () => {
  console.log(path.parse(__filename).name, 'listening on port', server.address().port);
});

createCollection().then(() => {
  server.listen(9000);
});
