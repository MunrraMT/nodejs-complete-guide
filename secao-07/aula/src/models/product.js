const fs = require('fs');
const path = require('path');

const pathToDB = path.join(__dirname, '..', 'data', 'products.json');
const getProductsFromFiles = (callBack) => {
  fs.readFile(pathToDB, (err, fileContent) => {
    if (err) return callBack([]);
    return callBack(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save(callBack) {
    getProductsFromFiles((products) => {
      products.push(this);

      fs.writeFile(pathToDB, JSON.stringify(products), (writeError) => {
        if (writeError) {
          console.log(writeError);
          callBack('error');
        }

        callBack('success');
      });
    });
  }

  static fetchAll(callBack) {
    getProductsFromFiles(callBack);
  }
};
