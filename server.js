require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const INSTAGRAM_TOKEN = process.env.INSTAGRAM_TOKEN;

console.log('Server starting...');
console.log('INSTAGRAM_TOKEN:', INSTAGRAM_TOKEN ? 'Is set' : 'Is not set');

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.get('/api/instagram', async (req, res) => {
  console.log('Received request for Instagram posts');
  try {
    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${INSTAGRAM_TOKEN}`;
    console.log('Fetching from URL:', url);
    const response = await axios.get(url);
    const posts = response.data.data.slice(0, 5);
    console.log('Fetched posts:', posts);
    res.json(posts);
  } catch (error) {
    console.error('Error fetching Instagram posts:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Error fetching Instagram posts', 
      details: error.response?.data?.error?.message || error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
