const { DataTypes } = require('sequelize');
const db = require('./index');

const BorrowedBook = db.sequelize.define('BorrowedBook', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  borrowDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  returnDate: {
    type: DataTypes.DATE
  }
});

module.exports = BorrowedBook;
