const { kmeans } = require('ml-kmeans');

module.exports = (sentence, clusterCount, embeddings) => {
    const clusters = kmeans(embeddings, clusterCount, {
        initialization: "random",
    }).clusters;

    return clusters.reduce((previousValue, currentValue, currentIndex) => {
        const group = previousValue[currentValue] ?? [];
        group.push(sentence[currentIndex]);

        previousValue[currentValue] = group;
        return previousValue;
    }, []);
};