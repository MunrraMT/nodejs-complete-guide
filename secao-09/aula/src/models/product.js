const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const pathToDB = path.join(__dirname, '..', 'data', 'product.json');

const getProductsFromFile = (callBack) => {
  fs.readFile(pathToDB, (err, fileContent) => {
    if (err || fileContent.length === 0) return callBack([]);
    return callBack(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor({ title, imageUrl, description, price, existentId }) {
    this.existentId = existentId;
    this.id = !!existentId ? existentId : uuidv4();
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save(callBack) {
    getProductsFromFile((products = []) => {
      if (!!this.existentId) {
        const existingProductIndex = products.findIndex(
          ({ id }) => id === this.existentId,
        );

        const updateProducts = [...products];
        const updateProduct = {
          id: this.id,
          title: this.title,
          imageUrl: this.imageUrl,
          description: this.description,
          price: this.price,
        };
        updateProducts[existingProductIndex] = updateProduct;

        fs.writeFile(pathToDB, JSON.stringify(updateProducts), (writeError) => {
          if (writeError) {
            console.log('edit error');
            console.error(writeError);
          } else {
            console.log('edit success');
            callBack();
          }
        });
      } else {
        products.push(this);

        fs.writeFile(pathToDB, JSON.stringify(products), (writeError) => {
          if (writeError) {
            console.log('add error');
            console.error(writeError);
          } else {
            console.log('add success');
            callBack();
          }
        });
      }
    });
  }

  static delete(deleteId, callBack) {
    getProductsFromFile((products = []) => {
      const existingProductIndex = products.findIndex(
        ({ productId }) => productId === deleteId,
      );
      const updateProducts = [...products];

      updateProducts.splice(existingProductIndex, 1);

      fs.writeFile(pathToDB, JSON.stringify(updateProducts), (writeError) => {
        if (writeError) {
          console.log('delete error');
          console.error(writeError);
        } else {
          console.log('delete success');
          callBack();
        }
      });
    });
  }

  static fetchAll(callBack) {
    getProductsFromFile(callBack);
  }

  static findById(productId, callBack) {
    getProductsFromFile((products) => {
      const product = products.find(({ id }) => id === productId);
      if (!!product) {
        callBack({
          success: true,
          data: product,
        });
      } else {
        callBack({
          success: false,
        });
      }
    });
  }
};
