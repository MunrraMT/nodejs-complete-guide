const { writeFile, readFile } = require('fs');
const http = require('http');

const server = http.createServer((request, response) => {
  const { url, method } = request;

  if (url === '/' && method === 'GET') {
    response.setHeader('Content-Type', 'text/html');
    response.write('Hello!');
    response.write(`
    <html>
      <body>
        <form method="post" action="/create-user">
          <label for="input-username">Username</label>
          <input id="input-username" type="text" name="username" />
          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
    `);
    return response.end();
  }

  if (url === '/users' && method === 'GET') {
    response.setHeader('Content-Type', 'text/html');
    response.write(`
      <html>
        <body>
          <ul>
            <li>User 1</li>
            <li>User 2</li>
            <li>User 3</li>
            <li>User 4</li>
            <li>User 5</li>
          </ul>
        </body>
      </html>
    `);
    return response.end();
  }

  if (url === '/create-user') {
    if (method === 'POST') {
      const body = [];
      request.on('data', (chunk) => body.push(chunk));
      return request.on('end', () => {
        const parseBody = Buffer.concat(body).toString();
        const username = parseBody.split('=')[1];
        return writeFile('username-list.txt', username, (err) => {
          response.setHeader('Content-Type', 'text/html');
          response.write(`
          <html>
            <body>
              <h1>Send username: ${username}</h1>
            </body>
          </html>
          `);
          return response.end();
        });
      });
    }

    if (method === 'GET') {
      return readFile('./username-list.txt', 'utf8', (err, data) => {
        response.setHeader('Content-Type', 'text/html');
        response.write(`
        <html>
          <body>
            <h1>Username: ${data}</h1>
          </body>
        </html>
        `);
        console.log(data);
        return response.end();
      });
    }
  }

  response.write('404');
  return response.end();
});

server.listen(3000);
