const express = require("express");
const authorization = require("./middleware/authorization");
const classification =require('./utils/sentence-classification');
const httpConfig = require('./config/http');
const googleConfig = require('./config/google');
const { GoogleGenAI } = require('@google/genai');

const app = express();

// private route
app.use(authorization);
app.use(express.json());
app.post("/classify", async (req, res) => {
    try {
        const { groupCount, sentences } = req.body;
        const response = await classification(sentences, groupCount);

        res.status(200).send({
            ...req.body,
            sentences: response
        });
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Internal Server Error" })
    }
});

app.post('/gemini/classify', async (req, res) => {
    try {
        const { question, data, config } = req.body;

        if (! question || ! data) {
            res.status(422).send({ message: "Contents required" });
        }

        const ai = new GoogleGenAI({ apiKey: googleConfig.gemini_api_key });
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [question, JSON.stringify(data)],
            config
        });

        res.status(200).json({
            message: response.text
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(httpConfig.port, () => {
    console.log(`App listening on port ${httpConfig.port}`)
})