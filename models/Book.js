const { DataTypes } = require('sequelize');
const db = require('./index');

const Book = db.sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 0
    }
  },
  borrowedBy: {
    type: DataTypes.ARRAY(DataTypes.JSON)
  }
});

module.exports = Book;
