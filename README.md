# Study Planner Backend

A robust backend system for the Study Planner application built with Node.js, Express, and MongoDB.

# Watch Video
[![Watch the video](https://lh3.googleusercontent.com/fife/ALs6j_GqU0kN5AZwBA9lVMkSulfxx_1G9wXlNsLw77zx5sjYTJINx0wStqpWnG_peyigQnoZsW9yk8pM5lhUCM0uZi9aiSdbB7RXuGvV1GFjPqgA81-e4MK_FgvGPZrqWERNu22KHnL0uyDH-PuCfOpqEQlJz2Z1ekNSlrlQdBwhlHv8AqYZgGouzBsLHYGBJfmH5DcQnfXZ6F8sfT3fr-5IHNuZWQTy4ywYl6RkFcKSxtmWQSMRPeHUf8Oneb4w1OgaBbB4J9Bmg583nT2fbhdpz4a3nkINtMs9ph7Sh5NDZakPpJwHKbR3-gvctsxe2APVOmrl2Os-EvhT6pZtu9WP3GnTCNeed0SDH93y7go2PvQHyvRckMUo6AbTDM2nHNE4S9LiQQU-SV2fDEUYIZfMAAW-MAKH7b21-lkbUpoZnvvQOlAux8khPCnmT-KvlvyET70r2NHi3W5jms8nDcTcZhYAHi4Iwdp4VFyjKxFUlS_Z9pS8tqqZK6Sf1eiDxDPdJ-6F_lrp4H-1PKax3QLHF-qCNjoV3zO3Ms58RNUfobre91_fuMdJi37GSWxhv4enU4UloeuR_Z7VvAtuX23-o9OZlsIrlmYwMMTxGBDZqtHc-I2_dw8XToiOUimHZZzJknfq37tNPHGIHRaV4mP0VDD_vSqdFJxs4YaxSXphKrC1k4qZjxM4kmgKnmktY_FlBtkCoYEegbXkhQAWmZvSf0FghhTvuUPfR6YAkWYOA9Mkz-_oiHMP9oV74t6NSA5gr5DRpVvJXQKa7BpYQ07WGV4KbdJ71Cz-TtrdimykJiOc15jqURv3AfK0VxH-8PVSmd0qxH-wEumSVTnNSV9Sg8Qtx-6NU0JcGIw8cS4seBnpTBoBNZ5KBshyNHMhogusicV4K5Coc5DqDSYSyoKAXzD-_X2PS_84RMxTElsiTgPNmQa8uEAVWErUUdPxtRUjqMJvPj6yhbtqiGILefB6uQc9K8C2ldF_qRpl65f0MSvNe7getL7cjLEm_JXzex1xitT84-kPeizN12hRvo_yJrke8JXRgqQHVsjkDBZ0OOYLCclFwFAsdItd13-P7gfIiusJasCjzURDiAokceRFQTICyQW99c2sfwYOH2xJRzD0zRkJX_83lMftByhiNJ3CKqcWD3kXXKysHdC2_7CLcEWT3jeG2FzUdPFpaMdc-Gh5qUo9d3ynfoKZJV6DC3xIlyTRu114BPkjgBQyPzv_NAqxuntiu9JCz_RV_oPxYAxXiG2QWbbCE0dmBYx-qQ12UV_sIedcD4JR4DGazQcX-8fC5iTDs7fMApu6uU8tQQwXJSLUDPc0s6UZbkDHtPKaBGo1ZoUF2VeSHaYkHjg4fazXTHtgBIuR8ubqE3fkjgymlU5FA5yd9Ob-Amk74GiMT45IS5FY98TS4Mcfy8wh6kokmFrN0nelLsTWWUyd4_HHJRTNfmt4r-zoBdCeXwR0vtRJTbyxKsuVIq3NPdEixWbhvaI5L5OcRgpVIRsxuuFl0-unNrxzBpZzZoeVUEtKfeZpEI3CyOWiYeDZ74GWDAp3pcNvLsvgQqJB9D_-zMg0tId_c6pO34oFKsX4zHeZjg8vxpdxOXtClJ2g=w1920-h840)](https://youtu.be/XilwOyj5dns?si=7HFcQamWPqh4QVru)


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
   git clone https://github.com/premj01/Make-My-Study-Plan-Backend.git
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
