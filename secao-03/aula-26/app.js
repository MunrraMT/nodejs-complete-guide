const http = require('http');

const server = http.createServer((request, response) => {
  const { url } = request;

  if (url === '/') {
    response.write(`<html>
      <head>
        <title>Enter message</title>
        <body>
          <form>
            <input type="text" action="/message" method="POST" name="message" />
            <button type="submit">Send</button>
          </form>
        </body>
      </head>
    </html>`);
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
