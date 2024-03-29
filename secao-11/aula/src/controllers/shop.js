const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getProducts = (request, response, next) => {
  request.user
    .getProducts()
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

  request.user
    .getProducts({ where: { id: productId } })
    .then((result) => {
      if (!!result) {
        const product = result[0].dataValues;
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
  request.user
    .getProducts()
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
  request.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          const data = {
            pageTitle: 'Your cart',
            activeCart: true,
            productCSS: true,
            hasProductsInsideCart: products.length > 0,
            numberOfProducts: products.length,
            products: products.map((product) => ({
              ...product.dataValues,
              quantity: product.cartItem.dataValues.quantity,
            })),
            totalPrice: products.reduce((acc, product) => {
              return (acc +=
                product.dataValues.price *
                product.cartItem.dataValues.quantity);
            }, 0),
          };

          response.render('shop/cart', data);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.postCartAddProduct = (request, response, next) => {
  const { productId } = request.body;
  let fetchedCart;
  let newQuantity = 1;

  request.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.dataValues.quantity;
        newQuantity += oldQuantity;
        return product;
      }

      return Product.findByPk(productId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      response.redirect('/cart');
    })
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (request, response, next) => {
  const { productId, productPrice, quantity } = request.body;

  request.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then((result) => {
      response.redirect('/cart');
    })
    .catch((err) => console.log(err));
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
  request.user
    .getOrders()
    .then((orders) => {
      return orders.map((order) => {
        return order.getProducts().then((products) => products);
      });
    })
    .then((products) => {
      console.log(products);

      // const data = {
      //   pageTitle: 'Your Orders',
      //   activeCart: true,
      //   productCSS: true,
      //   hasProductsInsideOrder: products.length > 0,
      //   numberOfProducts: products.length,
      //   products: products.map((product) => ({
      //     ...product.dataValues,
      //     quantity: product.cartItem.dataValues.quantity,
      //   })),
      //   totalPrice: products.reduce((acc, product) => {
      //     return (acc +=
      //       product.dataValues.price * product.cartItem.dataValues.quantity);
      //   }, 0),
      // };

      // response.render('shop/orders', data);
    })
    .catch((err) => console.log(err));

  const data = {
    pageTitle: 'Your orders',
    activeOrders: true,
    productCSS: true,
  };

  response.render('shop/orders', data);
};

exports.postOrders = (request, response, next) => {
  let fetchedCart;
  request.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return request.user
        .createOrder()
        .then((order) => {
          const productsFormatted = products.map((product) => {
            product.orderItem = {
              quantity: product.cartItem.quantity,
            };

            return product;
          });

          return order.addProducts(productsFormatted);
        })
        .catch((err) => console.log(err));
    })
    .then((result) => {
      return fetchedCart.setProducts(null);
    })
    .then((result) => {
      response.redirect('/checkout');
    })
    .catch((err) => console.log(err));
};
