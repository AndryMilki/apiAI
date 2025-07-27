const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
    const {noteText} = req.body;
    try{
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'tngtech/deepseek-r1t2-chimera:free',
                messages: [
                    {
                        role: 'system',
                        content: 'Ти помічник, який допомагає користувачам створювати короткий виклад з нотаток.'
                    },
                    {
                        role: 'user',
                        content: `Зроби короткий виклад з наступної нотатки: ${noteText}`
                    }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        const summary = response.data.choices[0].message.content;
        res.json({summary});
    }catch (error) {
        console.error('Помилка при виклику OpenRouter API:', error);
        return res.status(500).json({message: 'Помилка при створенні резюме'});
    }
});

module.exports = router;