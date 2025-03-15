require('dotenv').config();
const os = require('os')

module.exports = {
  port: process.env.PORT || 8000,
  hostname: os.hostname(),
  db: process.env.MONGODB,
  mailid: process.env.MAILID,
  mailpass: process.env.MAILPASS,
  secretKey: process.env.SECRETKEY,
  gemini_api_key: process.env.GEMINI_API_KEY
}