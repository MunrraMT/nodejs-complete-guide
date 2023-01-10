const fs = require('fs');
const path = require('path');

const pathToDB = path.join(__dirname, '..', 'data', 'cart.json');

module.exports = class Cart {
  static addProduct(product) {
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

      const existingProduct = cart.productIdList.find(
        (id) => id === product.id,
      );

      if (existingProduct) {
        const findProductIndex = cart.products.findIndex(
          ({ id }) => id === product.id,
        );
        const findProduct = cart.products[findProductIndex];
        const updateProduct = { ...findProduct };
        updateProduct.quantity += 1;
        cart.products = [...cart.products];
        cart.products[findProductIndex] = updateProduct;
      } else {
        const newProduct = { ...product, quantity: 1 };

        cart.productIdList.push(product.id);
        cart.products.push(newProduct);
      }

      cart.numberOfProducts += 1;
      cart.totalPrice = Number(cart.totalPrice) + Number(product.price);

      fs.writeFile(pathToDB, JSON.stringify(cart), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }
};
