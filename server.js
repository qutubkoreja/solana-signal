// Load environment variables
require('dotenv').config();

const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

// Serve static files from the 'public' directory (adjust if your files are elsewhere)
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the HTML file (if not using the 'public' directory)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API route to fetch SOL/USDT market data
app.get('/api/signal', async (req, res) => {
    const url = 'https://api.binance.com/api/v3/ticker/24hr?symbol=SOLUSDT';

    try {
        // Log to ensure the API key is available
        console.log("Binance API Key:", process.env.BINANCE_API_KEY);
        
        const response = await axios.get(url, {
            headers: {
                'X-MBX-APIKEY': process.env.BINANCE_API_KEY
            }
        });
        res.json({
            priceChangePercent: response.data.priceChangePercent,
            lastPrice: response.data.lastPrice
        });
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
