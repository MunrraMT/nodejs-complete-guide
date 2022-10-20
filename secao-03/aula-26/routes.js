const defaultPage = require('./defaultPage');
const homePage = require('./homePage');
const messagePost = require('./messagePost');

const requestHandler = (request, response) => {
  const { url, method } = request;

  if (url === '/') {
    return homePage(response);
  }

  if (url === '/message' && method === 'POST') {
    return messagePost(request, response);
  }

  return defaultPage(response);
};

module.exports = {
  handler: requestHandler,
};
