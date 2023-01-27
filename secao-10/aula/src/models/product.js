const { v4: uuidv4 } = require('uuid');

const db = require('../data/database');

module.exports = class Product {
  constructor({ title, imageUrl, description, price, existentId }) {
    this.existentId = existentId;
    this.id = !!existentId ? existentId : uuidv4();
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {}

  static delete(deleteId) {}

  static fetchAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM products', (err, dbContent) => {
        if (err) return reject(err);
        return resolve(dbContent);
      });
    });
  }

  static findById(productId) {}
};
