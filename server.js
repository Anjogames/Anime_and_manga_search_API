const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.get('/anime', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: 'Parâmetro de busca "q" é obrigatório.' });
    }

    const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}&limit=10`);
    
    if (!response.data || !response.data.data || response.data.data.length === 0) {
      return res.status(404).json({ error: 'Nenhum anime encontrado.' });
    }

    res.json(response.data.data);
  } catch (error) {
    console.error('Erro na busca de anime:', error.message);
    res.status(500).json({ error: 'Erro ao buscar anime.' });
  }
});

app.get('/manga', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: 'Parâmetro de busca "q" é obrigatório.' });
    }

    const response = await axios.get(`https://api.jikan.moe/v4/manga?q=${query}&limit=10`);

    if (!response.data || !response.data.data || response.data.data.length === 0) {
      return res.status(404).json({ error: 'Nenhum mangá encontrado.' });
    }

    res.json(response.data.data);
  } catch (error) {
    console.error('Erro na busca de mangá:', error.message);
    res.status(500).json({ error: 'Erro ao buscar mangá.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
