const mongoose = require('mongoose');
const { db } = require('../config/config');

const ConnectDB = async () => {
  const options = {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  };

  let retries = 5; // Number of retries allowed
  const retryDelay = 5000; // Delay between retries in milliseconds

  const connectWithRetry = async () => {
    try {
      await mongoose.connect(db, options);
      console.log("Connected to MongoDB successfully");

      mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
        mongoose.disconnect(); // Disconnect to retry later
      });

      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
      });
    } catch (error) {
      console.error("MongoDB connection error:", error);
      if (retries > 0) {
        retries -= 1;
        console.log(`Retrying to connect to MongoDB... Retries left: ${retries}`);
        setTimeout(connectWithRetry, retryDelay);
      } else {
        console.error("Failed to connect to MongoDB after multiple attempts.");
      }
    }
  };

  connectWithRetry();
};

module.exports = ConnectDB;
