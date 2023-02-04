const pageNotFountController = (request, response) => {
  const data = { pageTitle: 'Page not found' };
  response.status(404).render('404', data);
};

exports.pageNotFountController = pageNotFountController;
