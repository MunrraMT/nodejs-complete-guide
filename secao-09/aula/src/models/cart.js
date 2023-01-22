const fs = require('fs');
const path = require('path');

const pathToDB = path.join(__dirname, '..', 'data', 'cart.json');

module.exports = class Cart {
  static getData(callback) {
    fs.readFile(pathToDB, (err, fileContent) => {
      let cart = {
        products: [],
        productIdList: [],
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
        const findProductById = cart.productIdList.find(
          (id) => id === productId,
        );

        if (!!findProductById) {
          callback({ isExist: true });
        } else {
          callback({ isExist: false });
        }
      }
    });
  }

  static addProduct({ product }, callback) {
    fs.readFile(pathToDB, (err, fileContent) => {
      let cart = {
        products: [],
        productIdList: [],
        totalPrice: 0,
        numberOfProducts: 0,
      };

      if (!err && fileContent.length > 0) {
        cart = JSON.parse(fileContent);
      }

      this.isProductExist({ productId: product.id }, ({ isExist }) => {
        if (isExist) {
          const productIndex = cart.productIdList.findIndex(
            (id) => id === product.id,
          );
          cart.products[productIndex].quantity += 1;
        } else {
          const newProduct = { ...product, quantity: 1 };
          cart.productIdList.push(product.id);
          cart.products.push(newProduct);
        }

        cart.numberOfProducts += 1;
        cart.totalPrice += Number(product.price);

        fs.writeFile(pathToDB, JSON.stringify(cart), (err) => {
          if (err) {
            console.log(err);
          }
          callback();
        });
      });
    });
  }

  static deleteProduct({ productId, productPrice }, callback) {
    fs.readFile(pathToDB, (err, fileContent) => {
      if (!err && fileContent.length > 0) {
        const cart = JSON.parse(fileContent);

        const productIndex = cart.productIdList.findIndex(
          (id) => id === productId,
        );

        cart.productIdList.splice(productIndex, 1);
        cart.products.splice(productIndex, 1);
        cart.totalPrice -= Number(productPrice);
        cart.numberOfProducts -= 1;

        fs.writeFile(pathToDB, JSON.stringify(cart), (err) => {
          if (err) {
            console.log(err);
          } else {
            callback();
          }
        });
      }
    });
  }
};
