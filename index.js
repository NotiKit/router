const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const clouds = [
    "wataniya-test.djenidi-dev.workers.dev",
    "wataniya-test.djenidi-dev.workers.dev"
];


// 1. GET Request to Root Path /
app.get('/', (req, res) => {
    res.json("GOOD");
});

// 2. GET Request to /set
app.get('/set', async (req, res) => {
    try {
        const response = await axios.get(`https://${clouds[Math.floor(Math.random() * clouds.length)]}/set`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. GET Request to /ip
app.get('/ip', async (req, res) => {
    try {
        const response = await axios.get(`https://${clouds[Math.floor(Math.random() * clouds.length)]}/ip`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. GET Request to /status with Query Parameter num
app.get('/status', async (req, res) => {
    const { num } = req.query;
    try {
        const response = await axios.get(`https://${clouds[Math.floor(Math.random() * clouds.length)]}/status?num=${num}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. GET Request to /info with Query Parameter num
app.get('/info', async (req, res) => {
    const { num } = req.query;
    try {
        const response = await axios.get(`https://${clouds[Math.floor(Math.random() * clouds.length)]}/info?num=${num}`);
        if (response.status === 204) {
            res.json({ info: true });
        } else if (response.status === 404) {
            res.json({ info: false });
        } else {
            res.json({ error: "Unexpected status code" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 6. GET Request to /sendotp with Query Parameter num
app.get('/sendotp', async (req, res) => {
    const { num } = req.query;
    try {
        const response = await axios.get(`https://${clouds[Math.floor(Math.random() * clouds.length)]}/sendotp?num=${num}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 7. GET Request to /verifyotp with Query Parameters num and otp
app.get('/verifyotp', async (req, res) => {
    const { num, otp } = req.query;
    try {
        const response = await axios.get(`https://${clouds[Math.floor(Math.random() * clouds.length)]}/verifyotp?num=${num}&otp=${otp}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 8. POST Request to /refresh
app.post('/refresh', async (req, res) => {
    const { rtoken } = req.body;
    try {
        const response = await axios.post(`https://${clouds[Math.floor(Math.random() * clouds.length)]}/refresh`, { rtoken });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 9. POST Request to /time
app.post('/time', async (req, res) => {
    const { token } = req.body;
    try {
        const response = await axios.post(`https://${clouds[Math.floor(Math.random() * clouds.length)]}/time`, { token });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 10. POST Request to /gift
app.post('/gift', async (req, res) => {
    const { token } = req.body;
    try {
        const response = await axios.post(`https://${clouds[Math.floor(Math.random() * clouds.length)]}/gift`, { token });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 11. Fallback for All Other Paths
app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});

app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`);
});