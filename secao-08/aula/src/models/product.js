const fs = require('fs');
const path = require('path');

const pathToDB = path.join(__dirname, '..', 'data', 'product.json');

const getProductsFromFiles = (callBack) => {
  fs.readFile(pathToDB, (err, fileContent) => {
    if (err) return callBack([]);
    return callBack(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.id = title.replace(/ /g, '-').toLowerCase();
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save(callBack) {
    getProductsFromFiles((products) => {
      products.push(this);

      fs.writeFile(pathToDB, JSON.stringify(products), (writeError) => {
        if (writeError) {
          console.error(writeError);
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
