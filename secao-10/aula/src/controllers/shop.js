const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getProducts = (request, response, next) => {
  Product.fetchAll()
    .then((products) => {
      const data = {
        pageTitle: 'All Products',
        products,
        hasProducts: !!products && products.length > 0,
        activeProducts: true,
        productCSS: true,
      };

      response.render('shop/product-list', data);
    })
    .catch((err) => console.log(err));
};

exports.getProductDetails = (request, response, next) => {
  const { productId } = request.params;

  Product.findById(productId, (result) => {
    if (!result.success) {
      response.redirect('/');
    } else {
      const data = {
        pageTitle: result.data.title,
        product: result.data,
        activeProducts: true,
        productCSS: true,
      };

      response.render('shop/product-detail', data);
    }
  });
};

exports.getIndex = (request, response, next) => {
  Product.fetchAll()
    .then((products) => {
      const hasProducts = !!products && products.length > 0;
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
    Product.fetchAll((productsDb) => {
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
  const { productId, productPrice } = request.body;
  Product.findById(productId, (product) => {
    if (product.success) {
      Cart.addProduct({ productId, productPrice }, () => {
        response.redirect('/cart');
      });
    } else {
      response.redirect('/cart');
    }
  });
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
