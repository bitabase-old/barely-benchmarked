const path = require('path');
const http = require('http');

const pg = require('pg');
const client = new pg.Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'example'
});
client.connect();

const server = http.createServer(function (request, response) {
  client.query('SELECT NOW()', (err, res) => {
    if (err) throw err;
    response.writeHead(200, { 'content-type': 'application/json' });
    response.end(JSON.stringify(res.rows));
  });
});

server.on('listening', () => {
  console.log(path.parse(__filename).name, 'listening on port', server.address().port);
});

server.listen(8000);
