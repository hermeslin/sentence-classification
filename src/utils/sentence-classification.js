const embedding = require('./word-embedding');
const classify = require('./k-means');

module.exports = async (sentences, clusterCount) => {
    const embeddings = await embedding(sentences);
    return classify(sentences, clusterCount, embeddings);
};
