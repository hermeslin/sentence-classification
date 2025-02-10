require('dotenv').config();
const { env } = require('node:process');

module.exports = {
    port: env.HTTP_PORT
}