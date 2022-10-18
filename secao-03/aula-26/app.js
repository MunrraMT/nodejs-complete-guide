const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
  const { url, method } = request;

  if (url === '/') {
    response.write(`<html>
      <head>
        <title>Enter message</title>
        <body>
          <form action="/message" method="POST">
            <input type="text" name="message" />
            <button type="submit">Send</button>
          </form>
        </body>
      </head>
    </html>`);
    return response.end();
  }

  if (url === '/message' && method === 'POST') {
    console.log('POST');
    fs.writeFileSync('message.txt', 'DUMMY');
    response.statusCode = 302;
    response.setHeader('Location', '/');
    return response.end();
  }

  response.setHeader('Content-Type', 'text/html');
  response.write(`<html>
    <head>
      <title>My first page</title>
      <body><h1>Hello from my node server!</h1></body>
    </head>
  </html>`);

  return response.end();
});

server.listen(3000);
