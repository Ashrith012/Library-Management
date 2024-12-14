const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const User = require('../models/User');
const BorrowedBook = require('../models/BorrowedBook');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Borrow a book
router.post('/:bookId', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    if (!user || user.role !== 'reader') {
      return res.status(403).json({ message: 'Only readers can borrow books' });
    }

    // Check if user has already borrowed 5 books
    const borrowedCount = await BorrowedBook.count({
      where: {
        userId: req.user.userId,
        returnDate: null
      }
    });

    if (borrowedCount >= 5) {
      return res.status(400).json({ message: 'You have reached the maximum limit of borrowed books (5)' });
    }

    const book = await Book.findByPk(req.params.bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.stock < 1) {
      return res.status(400).json({ message: 'Book is out of stock' });
    }

    // Create borrow record
    await BorrowedBook.create({
      userId: req.user.userId,
      bookId: book.id
    });

    // Update book stock
    book.stock -= 1;
    await book.save();

    res.json({ message: 'Book borrowed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Return a book
router.post('/return/:bookId', authenticateToken, async (req, res) => {
  try {
    const borrowedBook = await BorrowedBook.findOne({
      where: {
        userId: req.user.userId,
        bookId: req.params.bookId,
        returnDate: null
      }
    });

    if (!borrowedBook) {
      return res.status(404).json({ message: 'No active borrow record found for this book' });
    }

    const book = await Book.findByPk(req.params.bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Update borrow record
    borrowedBook.returnDate = new Date();
    await borrowedBook.save();

    // Update book stock
    book.stock += 1;
    await book.save();

    res.json({ message: 'Book returned successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's borrowed books
router.get('/my-books', authenticateToken, async (req, res) => {
  try {
    const borrowedBooks = await BorrowedBook.findAll({
      where: {
        userId: req.user.userId,
        returnDate: null
      },
      include: [{
        model: Book,
        include: [{
          model: User,
          as: 'Author',
          attributes: ['name']
        }]
      }]
    });

    res.json(borrowedBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get borrow history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const borrowHistory = await BorrowedBook.findAll({
      where: {
        userId: req.user.userId
      },
      include: [{
        model: Book,
        include: [{
          model: User,
          as: 'Author',
          attributes: ['name']
        }]
      }],
      order: [['borrowDate', 'DESC']]
    });

    res.json(borrowHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
