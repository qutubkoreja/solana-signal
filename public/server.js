// Load environment variables
require('dotenv').config();

const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API route to fetch SOL/USDT market data
app.get('/api/signal', async (req, res) => {
    const url = 'https://api.binance.com/api/v3/ticker/24hr?symbol=SOLUSDT';

    try {
        console.log("Attempting to fetch data from Binance API...");

        // Fetch data from Binance API
        const response = await axios.get(url, {
            headers: {
                'X-MBX-APIKEY': process.env.BINANCE_API_KEY
            }
        });

        // If the response is successful, send back data to the frontend
        console.log("Data successfully fetched from Binance API:", response.data);
        res.json({
            priceChangePercent: response.data.priceChangePercent,
            lastPrice: response.data.lastPrice
        });
    } catch (error) {
        // Log detailed error message
        console.error("Error fetching data from Binance API:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
