const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getProducts = (request, response, next) => {
  Product.findAll()
    .then((result) => {
      const hasProducts = result.length > 0;
      const products = result.map((product) => product.dataValues);
      const data = {
        pageTitle: 'All Products',
        products,
        hasProducts,
        activeProducts: true,
        productCSS: true,
      };

      response.render('shop/product-list', data);
    })
    .catch((err) => console.log(err));
};

exports.getProductDetails = (request, response, next) => {
  const { productId } = request.params;

  Product.findByPk(productId)
    .then((result) => {
      if (!!result) {
        const product = result.dataValues;
        const data = {
          pageTitle: product.title,
          product,
          activeProducts: true,
          productCSS: true,
        };

        response.render('shop/product-detail', data);
      } else {
        response.redirect('/');
      }
    })
    .catch((err) => {
      console.log(err);
      response.redirect('/');
    });
};

exports.getIndex = (request, response, next) => {
  Product.findAll()
    .then((result) => {
      const hasProducts = result.length > 0;
      const products = result.map((product) => product.dataValues);
      const data = {
        pageTitle: 'Shop',
        products,
        hasProducts,
        activeShop: true,
        productCSS: true,
      };

      response.render('shop/index', data);
    })
    .catch((err) => console.log(err));
};

exports.getCartProducts = (request, response, next) => {
  Cart.getData(({ products, totalPrice, numberOfProducts }) => {
    Product.findAll(() => {
      const productList = [...products];
      for (let index = 0; index < productList.length; index++) {
        const product = productsDb.find(
          ({ id }) => id === productList[index].id,
        );

        if (!!product) {
          productList[index].title = product.title;
          productList[index].price = product.price;
        }
      }

      const data = {
        pageTitle: 'Your cart',
        activeCart: true,
        productCSS: true,
        hasProductsInsideCart: numberOfProducts > 0,
        numberOfProducts,
        products: productList,
        totalPrice,
      };

      response.render('shop/cart', data);
    });
  });
};

exports.postCartAddProduct = (request, response, next) => {
  // const { productId, productPrice } = request.body;
  // Product.findById(productId, (product) => {
  //   if (product.success) {
  //     Cart.addProduct({ productId, productPrice }, () => {
  //       response.redirect('/cart');
  //     });
  //   } else {
  //     response.redirect('/cart');
  //   }
  // });
};

exports.postCartDeleteProduct = (request, response, next) => {
  const { productId, productPrice, quantity } = request.body;

  Cart.isProductExist({ productId }, (result) => {
    if (result.isExist) {
      Cart.deleteProduct({ productId, productPrice, quantity }, () => {
        response.redirect('/cart');
      });
    } else {
      response.redirect('/cart');
    }
  });
};

exports.getCheckout = (request, response, next) => {
  const data = {
    pageTitle: 'Your checkout',
    activeCheckout: true,
    productCSS: true,
  };

  response.render('shop/checkout', data);
};

exports.getOrders = (request, response, next) => {
  const data = {
    pageTitle: 'Your orders',
    activeOrders: true,
    productCSS: true,
  };

  response.render('shop/orders', data);
};
