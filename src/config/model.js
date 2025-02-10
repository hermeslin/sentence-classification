require('dotenv').config();
const { env } = require('node:process');

module.exports = env.MODEL_URL && env.VOCAB_URL
    ? {
        'modelUrl': env.MODEL_URL,
        'vocabUrl': env.VOCAB_URL
    }
    : null;