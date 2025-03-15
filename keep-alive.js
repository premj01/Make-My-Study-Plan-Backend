const axios = require('axios');

const SERVER_URL = 'https://make-my-study-plan-backend.onrender.com';
const INTERVAL = 10 * 60 * 1000;

const keepAlive = async () => {
  try {
    await axios.get(SERVER_URL);
    console.log(`Pinged ${SERVER_URL} to keep it alive`);
  } catch (error) {
    console.error(`Error pinging ${SERVER_URL}:`, error.message);
  }
};

setInterval(keepAlive, INTERVAL);

keepAlive();

module.exports = keepAlive; 