const { kmeans } = require('ml-kmeans');

module.exports = (sentences, clusterCount, embeddings) => {
    const clusters = kmeans(embeddings, clusterCount, {
        initialization: "random",
    }).clusters;

    return sentences.map((sentence, index) => {
        return {
            ...sentence,
            group: clusters[index]
        };
    });
};