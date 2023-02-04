const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'maria', {
  dialect: 'mysql',
  host: 'localhost',
});

module.export = sequelize;
