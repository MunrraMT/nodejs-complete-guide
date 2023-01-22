const fs = require('fs');
const path = require('path');

const pathToDB = path.join(__dirname, '..', 'data', 'cart.json');

module.exports = class Cart {
  static getData(callback) {
    fs.readFile(pathToDB, (err, fileContent) => {
      let cart = {
        products: [],
        totalPrice: 0,
        numberOfProducts: 0,
      };

      if (!err && fileContent.length > 0) {
        cart = JSON.parse(fileContent);
      }

      callback(cart);
    });
  }

  static isProductExist({ productId }, callback) {
    fs.readFile(pathToDB, (err, fileContent) => {
      if (!!err || fileContent.length === 0) {
        callback({ isExist: false });
      } else {
        const cart = JSON.parse(fileContent);
        const findProductById = cart.products.find(
          ({ id }) => id === productId,
        );

        if (!!findProductById) {
          callback({ isExist: true });
        } else {
          callback({ isExist: false });
        }
      }
    });
  }

  static addProduct({ productId, productPrice }, callback) {
    fs.readFile(pathToDB, (err, fileContent) => {
      let cart = {
        products: [],
        totalPrice: 0,
        numberOfProducts: 0,
      };

      if (!err && fileContent.length > 0) {
        cart = JSON.parse(fileContent);
      }

      this.isProductExist({ productId }, ({ isExist }) => {
        if (isExist) {
          const productIndex = cart.products.findIndex(
            ({ id }) => id === productId,
          );
          cart.products[productIndex].quantity += 1;
        } else {
          const newProduct = {
            id: productId,
            price: Number(productPrice),
            quantity: 1,
          };
          cart.products.push(newProduct);
        }

        cart.numberOfProducts += 1;
        cart.totalPrice += Number(productPrice);

        fs.writeFile(pathToDB, JSON.stringify(cart), (err) => {
          if (err) {
            console.log(err);
          }
          callback();
        });
      });
    });
  }

  static deleteProduct({ productId, productPrice, quantity }, callback) {
    fs.readFile(pathToDB, (err, fileContent) => {
      if (!err && fileContent.length > 0) {
        const cart = JSON.parse(fileContent);
        const productIndex = cart.products.findIndex(
          ({ id }) => id === productId,
        );

        cart.products.splice(productIndex, 1);
        cart.totalPrice -= Number(productPrice) * Number(quantity);
        cart.numberOfProducts -= Number(quantity);

        fs.writeFile(pathToDB, JSON.stringify(cart), (err) => {
          if (err) {
            console.log(err);
          } else {
            callback();
          }
        });
      } else {
        callback();
      }
    });
  }
};
