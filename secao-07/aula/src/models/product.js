const fs = require('fs');
const path = require('path');

const pathToDB = path.join(__dirname, '..', 'data', 'products.json');

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save(callBack) {
    fs.readFile(pathToDB, (readError, fileContent) => {
      let products = [];

      if (!readError) {
        products = JSON.parse(fileContent);
      }

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
    fs.readFile(pathToDB, (err, fileContent) => {
      if (err) callBack([]);
      callBack(JSON.parse(fileContent));
    });
  }
};
