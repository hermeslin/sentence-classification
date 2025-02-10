const express = require("express");
const authorization = require("./middleware/authorization");
const classification =require('./utils/sentence-classification');
const httpConfig = require('./config/http');

const app = express();

// private route
app.use(authorization);
app.use(express.json());
app.post("/classify", async (req, res) => {
    try {
        const { groupCount, sentences } = req.body;
        const response = await classification(sentences, groupCount);

        res.status(200).send(response);
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Internal Server Error" })
    }
});

app.listen(httpConfig.port, () => {
    console.log(`App listening on port ${httpConfig.port}`)
})