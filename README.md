# Library Management System API

A RESTful API for managing a library system, built with Node.js, Express, and SQLite.

## Features

- User Authentication (JWT)
- Role-based Access Control (Reader/Author)
- Book Management
- Borrowing System
- Search and Filter Capabilities

## Tech Stack

- Node.js
- Express.js
- SQLite (with Sequelize ORM)
- JSON Web Tokens (JWT)
- bcryptjs for password hashing

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd library-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the root directory:
```env
PORT=8000
JWT_SECRET=your-secret-key
```

4. Start the server:
```bash
npm start
```

## API Endpoints

### User Management
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user account

### Book Management
- `POST /api/books` - Create new book (Author only)
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get book by ID
- `GET /api/books/author/:authorId` - Get books by author
- `PUT /api/books/:id` - Update book (Author only)
- `DELETE /api/books/:id` - Delete book (Author only)

### Borrowing System
- `POST /api/borrow/:bookId` - Borrow a book
- `POST /api/borrow/return/:bookId` - Return a book
- `GET /api/borrow/my-books` - Get user's currently borrowed books
- `GET /api/borrow/history` - Get user's borrowing history

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer [your-jwt-token]
```

## User Roles

1. Reader:
   - Can borrow up to 5 books
   - Can view and search books
   - Can view their borrowing history

2. Author:
   - Can create, update, and delete their books
   - Can view their published books

## Database

The system uses SQLite with Sequelize ORM. The database file (database.sqlite) will be created automatically when you start the server.

## Error Handling

The API includes comprehensive error handling for:
- Invalid requests
- Authentication errors
- Authorization errors
- Database errors
- Validation errors

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
