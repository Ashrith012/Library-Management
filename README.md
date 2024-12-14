# 📚 Library Management System API

A comprehensive RESTful API for managing a modern library system, built with Node.js, Express, and SQLite. This system allows libraries to manage their books, users, and borrowing processes digitally.

## 🌟 Features

### User Management
- 👥 User registration and authentication
- 🔐 JWT-based authentication
- 👨‍👩‍👧‍👦 Role-based access control (Reader/Author)
- 🔄 Profile management

### Book Management
- 📖 Complete CRUD operations for books
- 🔍 Advanced search and filtering
- 📊 Stock management
- 👨‍🎨 Author-specific book management

### Borrowing System
- 📚 Borrow and return books
- 📋 Track borrowed books
- 📅 Borrowing history
- ⏰ 15-day borrowing period
- 🔢 Maximum 5 books per user limit

## 🛠️ Tech Stack

- **Runtime Environment**: Node.js
- **Framework**: Express.js
- **Database**: SQLite
- **ORM**: Sequelize
- **Authentication**: JSON Web Tokens (JWT)
- **Password Security**: bcryptjs
- **API Testing**: Postman/Curl

## 📥 Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Ashrith012/Library-Management.git
   cd Library-Management
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a .env file in the root directory:
   ```env
   PORT=8000
   JWT_SECRET=your-secret-key-change-this-in-production
   ```

4. **Start the Server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 🔗 API Endpoints

### 👤 User Management
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/users/register` | Register new user | No |
| POST | `/api/users/login` | Login user | No |
| PUT | `/api/users/:id` | Update user profile | Yes |
| DELETE | `/api/users/:id` | Delete user account | Yes |

### 📚 Book Management
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/books` | Create new book | Yes (Author) |
| GET | `/api/books` | Get all books | No |
| GET | `/api/books/:id` | Get book by ID | No |
| GET | `/api/books/author/:authorId` | Get books by author | No |
| PUT | `/api/books/:id` | Update book | Yes (Author) |
| DELETE | `/api/books/:id` | Delete book | Yes (Author) |

### 📖 Borrowing System
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/borrow/:bookId` | Borrow a book | Yes (Reader) |
| POST | `/api/borrow/return/:bookId` | Return a book | Yes (Reader) |
| GET | `/api/borrow/my-books` | Get borrowed books | Yes (Reader) |
| GET | `/api/borrow/history` | Get borrowing history | Yes (Reader) |

## 🔒 Authentication

For protected routes, include the JWT token in the Authorization header:
```http
Authorization: Bearer <your-jwt-token>
```

## 👥 User Roles & Permissions

### 📖 Reader
- Can borrow up to 5 books at a time
- View and search available books
- Track personal borrowing history
- Update own profile

### ✍️ Author
- Create and manage own books
- Update book information
- Track book availability
- View reader statistics

## 💾 Database Schema

### Users Table
- id (Primary Key)
- name
- email (Unique)
- password (Hashed)
- role (reader/author)
- createdAt
- updatedAt

### Books Table
- id (Primary Key)
- title
- author (Foreign Key)
- genre
- stock
- createdAt
- updatedAt

### BorrowedBooks Table
- id (Primary Key)
- userId (Foreign Key)
- bookId (Foreign Key)
- borrowDate
- returnDate
- createdAt
- updatedAt

## 🔍 API Testing

### Using Curl
```bash
# Register a new user
curl -X POST http://localhost:8000/api/users/register \
-H "Content-Type: application/json" \
-d '{"name":"John Doe","email":"john@example.com","password":"password123","role":"reader"}'

# Login
curl -X POST http://localhost:8000/api/users/login \
-H "Content-Type: application/json" \
-d '{"email":"john@example.com","password":"password123"}'
```

### Using Postman
1. Import the provided Postman collection
2. Set up environment variables
3. Use the pre-configured requests

## 🛡️ Error Handling

The API implements comprehensive error handling for:
- Invalid requests
- Authentication errors
- Authorization errors
- Database constraints
- Validation errors

## 🚀 Deployment

1. **Prepare Your Environment**
   - Set up production environment variables
   - Configure your database
   - Set up proper security measures

2. **Deploy to Your Server**
   ```bash
   # Install production dependencies
   npm install --production

   # Start the server
   npm start
   ```

## 👨‍💻 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

## 🙏 Acknowledgments

- Node.js community
- Express.js team
- Sequelize team
- All contributors

---
Made with ❤️ by [Your Name]
