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

module.exports = defaultPage;
