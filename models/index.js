const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),
  logging: false
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
