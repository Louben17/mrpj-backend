require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;

app.get('/api/instagram', async (req, res) => {
  try {
    const response = await axios.get(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${INSTAGRAM_TOKEN}`);
    const posts = response.data.data.slice(0, 5);
    res.json(posts);
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    res.status(500).json({ error: 'Error fetching Instagram posts' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});