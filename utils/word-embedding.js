const use = require('@tensorflow-models/universal-sentence-encoder');
const tf = require('@tensorflow/tfjs-node');
const modelConfig = require('../config/model');

module.exports = async function (sentences) {
    const model = await use.load(modelConfig);
    const embeddings = await model.embed(sentences);
    
    return await embeddings.array();
}