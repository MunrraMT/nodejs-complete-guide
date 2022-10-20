const http = require('http');
const fs = require('fs');

function messagePost(request, response) {
  const body = [];
  request.on('data', (chunk) => body.push(chunk));
  return request.on('end', () => {
    const parsedBody = Buffer.concat(body).toString();
    const message = parsedBody.split('=')[1];
    return fs.writeFile('message.txt', message, (err) => {
      response.statusCode = 302;
      response.setHeader('Location', '/');
      console.log('terminou');
      return response.end();
    });
  });
}

function homePage(response) {
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

function defaultPage(response) {
  response.setHeader('Content-Type', 'text/html');
  response.write(`<html>
    <head>
      <title>My first page</title>
      <body><h1>Hello from my node server!</h1></body>
    </head>
  </html>`);

  return response.end();
}

const server = http.createServer((request, response) => {
  const { url, method } = request;

  if (url === '/') {
    return homePage(response);
  }

  if (url === '/message' && method === 'POST') {
    return messagePost(request, response);
  }

  return defaultPage(response);
});

server.listen(3000);
