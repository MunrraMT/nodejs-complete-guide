const { writeFile } = require('fs');

function messagePost(request, response) {
  const body = [];
  request.on('data', (chunk) => body.push(chunk));
  return request.on('end', () => {
    const parsedBody = Buffer.concat(body).toString();
    const message = parsedBody.split('=')[1];
    return writeFile('message.txt', message, (err) => {
      response.statusCode = 302;
      response.setHeader('Location', '/');
      console.log('terminou');
      return response.end();
    });
  });
}

module.exports = messagePost;
