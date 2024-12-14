const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./models');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// API documentation route
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to Library Management System API',
    endpoints: {
      users: {
        register: 'POST /api/users/register',
        login: 'POST /api/users/login',
        update: 'PUT /api/users/:id',
        delete: 'DELETE /api/users/:id'
      },
      books: {
        create: 'POST /api/books',
        getAll: 'GET /api/books',
        getByAuthor: 'GET /api/books/author/:authorId',
        update: 'PUT /api/books/:id',
        delete: 'DELETE /api/books/:id'
      },
      borrow: {
        borrowBook: 'POST /api/borrow/:bookId',
        returnBook: 'POST /api/borrow/return/:bookId'
      }
    }
  });
});

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/books', require('./routes/books'));
app.use('/api/borrow', require('./routes/borrow'));

const PORT = process.env.PORT || 3000;

// Sync database and start server
db.sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
  });
