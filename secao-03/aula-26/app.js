const http = require('http');

const server = http.createServer((request, response) => {
  console.log([request.url, request.method, request.headers]);
  response.setHeader('Content-Type', 'text/html');
  response.write(`<html>
    <head>
      <title>My first page</title>
      <body><h1>Hello from my node server!</h1></body>
    </head>
  </html>`);
  response.end();
});

server.listen(3000);
