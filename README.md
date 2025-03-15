# Study Planner Backend

A robust backend system for the Study Planner application built with Node.js, Express, and MongoDB.

## 🚀 Features

- User Authentication & Authorization
- CORS enabled for cross-origin requests
- MongoDB database integration
- JWT-based authentication
- Email notifications using Nodemailer
- Auto-server ping (every 10 minutes to keep the server alive)
- Google Auth integration
- RESTful API architecture

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT, Google Auth
- **Email Service**: Nodemailer
- **Other Tools**:
  - bcryptjs (password hashing)
  - cors (Cross-Origin Resource Sharing)
  - node-cron (task scheduling)
  - uuid (unique identifier generation)

## 🔧 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/Make-My-Study-Plan-Backend.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```env
   PORT=your_port
   HOSTNAME=your_hostname
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

## 📁 Project Structure

```
├── config/         # Configuration files
├── controller/     # Request handlers
├── middleware/     # Custom middleware functions
├── model/         # Database models
├── router/        # Route definitions
├── utils/         # Utility functions
└── index.js       # Application entry point
```

## 🔒 Security Features

- CORS configuration with specific allowed methods and headers
- Password hashing using bcryptjs
- JWT-based authentication
- Protected routes using middleware
- Error handling middleware
- Environment variables for sensitive data

## 🔄 Automatic Server Ping

The server implements an automatic ping mechanism that runs every 10 minutes to prevent idle timeout on hosting platforms. This is implemented using node-cron.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

Prem Jadhav

---

For more information or questions, please open an issue in the repository.
