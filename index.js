const express = require('express');
const app = express();
const OpenAI = require('openai');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(express.static('public'))
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON requests

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

app.post('/chat', async (req, res) => { 
    try { 
        const resp = await openai.chat.completions.create(
            { model: "gpt-3.5-turbo", messages: [
                { role: "system", content: "You are a helpful assistant." }, 
                { role: "user", content: req.body.question }] 
            }); 
            res.status(200).json({ 
                message: resp.data.choices[0].message.content 
            }); } catch (e) { 
                res.status(400).json({ message: e.message }); 
            } 
        });


app.listen(3000, () => {
    console.log("Server is active")
})