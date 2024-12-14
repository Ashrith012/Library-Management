const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

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

// Create a new book (Author only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, genre, stock } = req.body;
    const user = await User.findByPk(req.user.userId);

    if (!user || user.role !== 'author') {
      return res.status(403).json({ message: 'Only authors can create books' });
    }

    const book = await Book.create({
      title,
      genre,
      stock,
      author: req.user.userId
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    const { genre, title } = req.query;
    let whereClause = {};

    if (genre) {
      whereClause.genre = genre;
    }
    if (title) {
      whereClause.title = {
        [Op.like]: `%${title}%`
      };
    }

    const books = await Book.findAll({
      where: whereClause,
      include: [{
        model: User,
        as: 'Author',
        attributes: ['name']
      }]
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get books by author
router.get('/author/:authorId', async (req, res) => {
  try {
    const books = await Book.findAll({
      where: { author: req.params.authorId }
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'Author',
        attributes: ['name']
      }]
    });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update book (Author only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const user = await User.findByPk(req.user.userId);
    if (!user || (user.role !== 'author' || book.author !== req.user.userId)) {
      return res.status(403).json({ message: 'Only the author can update their books' });
    }

    const [updated] = await Book.update(req.body, {
      where: { id: req.params.id }
    });

    if (updated) {
      const updatedBook = await Book.findByPk(req.params.id);
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete book (Author only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const user = await User.findByPk(req.user.userId);
    if (!user || (user.role !== 'author' || book.author !== req.user.userId)) {
      return res.status(403).json({ message: 'Only the author can delete their books' });
    }

    await Book.destroy({
      where: { id: req.params.id }
    });

    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
