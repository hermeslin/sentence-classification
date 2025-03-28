require('dotenv').config();
const { env } = require('node:process');

module.exports = {
    gemini_api_key: env.GOOGLE_GEMINI_API_KEY
}