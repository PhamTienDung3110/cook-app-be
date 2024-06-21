require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const openaiApiKey = process.env.OPENAI_API_KEY;

app.get('/ping',async (req, res) => {
    return res.json('halo')
})

app.post('/chat', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4o',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 1000,
                n: 1,
                stop: null,
                temperature: 0.7,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${openaiApiKey}`,
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error calling OpenAI:', error);
        res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
