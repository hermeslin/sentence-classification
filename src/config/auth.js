require('dotenv').config();
const { env } = require('node:process');

module.exports = env.AUTH_HEADER_NAME && env.AUTH_API_KEY
    ? {
        header_name: env.AUTH_HEADER_NAME,
        api_key: env.AUTH_API_KEY
    }
    : null;