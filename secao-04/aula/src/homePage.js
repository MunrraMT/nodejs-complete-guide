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

module.exports = homePage;
