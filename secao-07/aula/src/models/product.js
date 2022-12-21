const fs = require('fs');
const path = require('path');

const pathToDB = path.join(__dirname, '..', 'data', 'products.json');

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    fs.readFile(pathToDB, (readError, fileContent) => {
      let products = [];

      if (!readError) {
        products = JSON.parse(fileContent);
      }

      products.push(this);
      fs.writeFile(pathToDB, JSON.stringify(products), (writeError) => {
        console.log(writeError);
      });
    });
  }

  static fetchAll() {
    fs.readFile(pathToDB, (err, fileContent) => {
      if (err) return [];
      return JSON.parse(fileContent);
    });
  }
};
