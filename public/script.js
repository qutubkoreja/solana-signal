async function fetchMarketData() {
    const url = '/api/signal';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch market data');
        }

        const data = await response.json();
        displaySignal(data);
    } catch (error) {
        document.getElementById('signal-output').innerText = "Error fetching signal. Please try again later.";
        console.error('Error:', error);
    }
}

function displaySignal(data) {
    const { priceChangePercent, lastPrice } = data;

    // Example buy signal logic for a 4-5 hour window
    const buySignal = priceChangePercent > 2.5 && priceChangePercent < 5;

    if (buySignal) {
        const signalMessage = `Buy SOL at $${lastPrice} - Expected price increase over the next 4-5 hours.`;
        const guidance = `Suggested Action: Buy SOL at the current price of $${lastPrice}. Consider selling if the price rises by 2-3% or within the next 4 hours.`;
        
        document.getElementById('signal-output').innerText = signalMessage;
        document.getElementById('buy-sell-guide').innerText = guidance;
    } else {
        const explanation = "No significant upward trend detected at the moment.";
        document.getElementById('signal-output').innerText = `No signal currently. ${explanation}`;
        document.getElementById('buy-sell-guide').innerText = "Suggested Action: Wait for a stronger buy signal (2.5-5% positive change over 4-5 hours).";
    }
    
    document.getElementById('current-price').innerText = `Current Price: $${lastPrice}`;
}

function showSignal() {
    document.getElementById('welcome').classList.add('hidden');
    document.getElementById('signal').classList.remove('hidden');
    fetchMarketData();
}

function backToWelcome() {
    document.getElementById('signal').classList.add('hidden');
    document.getElementById('welcome').classList.remove('hidden');
}
