const express = require('express')
const app = express();
const { port, hostname, db } = require('./config/config')
const router = require('./router/route')
const authrouter = require('./router/router.auth')
const cors = require('cors');
const cron = require('node-cron');
const http = require('http');

const ConnectDB = require('./config/config.db');
ConnectDB(db);

app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

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

// Cron job to keep server alive - runs every 10 minutes
cron.schedule('*/10 * * * *', () => {
  const serverUrl = `http://${hostname}:${port}`;
  console.log(`Ping server to keep alive at: ${new Date().toISOString()}`);

  http.get(serverUrl, (res) => {
    if (res.statusCode === 200) {
      console.log('Server is alive');
    } else {
      console.log('Server ping failed with status:', res.statusCode);
    }
  }).on('error', (err) => {
    console.error('Error pinging server:', err.message);
  });
});

app.listen(port, () => {
  console.log(`Server Started on PORT http://${hostname}:${port}`);
});