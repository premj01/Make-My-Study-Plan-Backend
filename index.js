const express = require('express')
const app = express();
const { port, hostname, db } = require('./config/config')
const router = require('./router/route')
const authrouter = require('./router/router.auth')
const cors = require('cors');
const http = require('http');

const keepAlive = require('./keep-alive')

const ConnectDB = require('./config/config.db');
ConnectDB(db);

app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

keepAlive();


app.use("/auth", authrouter)
app.use("/", router);

app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? 'An error occurred' : err.message
  });
});

app.get("*", (req, res) => {
  res.status(200).json({ message: "Route not found" });
});



app.listen(port, () => {
  console.log(`Server Started on PORT http://${hostname}:${port}`);
});