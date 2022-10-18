const http = require('http');

const server = http.createServer((request, response) => {
  console.log([request.url, request.method, request.headers]);
  process.exit();
});

server.listen(3000);
