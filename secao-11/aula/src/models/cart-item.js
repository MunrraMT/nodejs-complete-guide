const { DataTypes } = require('sequelize');

const sequelize = require('../data/database');

const CartItem = sequelize.define('cartItem', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
});

module.exports = CartItem;
