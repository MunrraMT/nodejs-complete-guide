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
    const body = [];
    request.on('data', (chunk) => body.push(chunk));
    request.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFileSync('message.txt', message);
    });
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
