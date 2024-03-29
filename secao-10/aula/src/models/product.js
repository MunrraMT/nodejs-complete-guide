const { v4: uuidv4 } = require('uuid');

const db = require('../data/database');

module.exports = class Product {
  constructor({ title, imageUrl, description, price, existentId = 0 }) {
    this.existentId = existentId;
    this.id = !!existentId ? existentId : uuidv4();
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return Product.findById(this.existentId)
      .then(
        () =>
          new Promise((resolve, reject) => {
            db.query(
              'UPDATE products SET title = ?, imageUrl = ?, description = ?, price =? WHERE id = ?',
              [
                this.title,
                this.imageUrl,
                this.description,
                this.price,
                this.existentId,
              ],
              (messageError, result) => {
                if (messageError) {
                  reject(messageError);
                } else {
                  resolve(result);
                }
              },
            );
          }),
      )
      .catch(
        () =>
          new Promise((resolve, reject) => {
            db.query(
              'INSERT INTO products (id, title, imageUrl, description, price) VALUES (?, ?, ?, ?, ?)',
              [
                this.id,
                this.title,
                this.imageUrl,
                this.description,
                this.price,
              ],
              (messageError, result) => {
                if (messageError) {
                  reject(messageError);
                } else {
                  resolve(result);
                }
              },
            );
          }),
      );
  }

  static delete(deleteId) {
    return new Promise((resolve, reject) => {
      db.query(
        'DELETE FROM products WHERE id = ?',
        [deleteId],
        (messageError, result) => {
          if (messageError) reject(messageError);
          resolve(result);
        },
      );
    });
  }

  static fetchAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM products', (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  }

  static findById(productId) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM products WHERE id = ?',
        [productId],
        (err, results) => {
          if (err) return reject(err);
          return resolve(results[0]);
        },
      );
    });
  }
};
