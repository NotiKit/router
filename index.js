const express = require('express');
const axios = require('axios');
const https = require('https');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const clouds = [
    "flare.cloud1-917.workers.dev",
    "flare.cloud2-d98.workers.dev",
    "flare.cloud3-aa8.workers.dev",
    "flare.cloud4-8ec.workers.dev",
    "flare.cloud5-2cd.workers.dev"
];


function keepRunning() {
    setInterval(() => {
        https.get(`${process.env.RENDER_EXTERNAL_URL}/poke`, (resp) => {
            if (resp.statusCode === 200) {
                console.log('Poke successful');
            } else {
                console.error('Poke failed');
            }
        });
    }, 5 * 60 * 1000);
};

app.get('/poke', (req, res) => { res.status(200).json({ message: 'Ping successful' }); });

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
       res.status(error.response && error.response.status || 500).json({ error: error.message });
    }
});

// 3. GET Request to /ip
app.get('/ip', async (req, res) => {
    try {
        const response = await axios.get(`https://${clouds[Math.floor(Math.random() * clouds.length)]}/ip`);
        res.json(response.data);
    } catch (error) {
       res.status(error.response && error.response.status || 500).json({ error: error.message });
    }
});

// 4. GET Request to /status with Query Parameter num
app.get('/status', async (req, res) => {
    const { num } = req.query;
    try {
        const response = await axios.get(`https://${clouds[Math.floor(Math.random() * clouds.length)]}/status?num=${num}`);
        res.json(response.data);
    } catch (error) {
       res.status(error.response && error.response.status || 500).json({ error: error.message });
    }
});

// 5. GET Request to /info with Query Parameter num
app.get('/info', async (req, res) => {
    const { num } = req.query;
    try {
        const response = await axios.get(`https://${clouds[Math.floor(Math.random() * clouds.length)]}/info?num=${num}`);
        res.json(response.data);
    } catch (error) {
       res.status(error.response && error.response.status || 500).json({ error: error.message });
    }
});

// 6. GET Request to /sendotp with Query Parameter num
app.get('/sendotp', async (req, res) => {
    const { num } = req.query;
    try {
        const response = await axios.get(`https://${clouds[Math.floor(Math.random() * clouds.length)]}/sendotp?num=${num}`);
        res.json(response.data);
    } catch (error) {
       res.status(error.response && error.response.status || 500).json({ error: error.message });
    }
});

// 7. GET Request to /verifyotp with Query Parameters num and otp
app.get('/verifyotp', async (req, res) => {
    const { num, otp } = req.query;
    try {
        const response = await axios.get(`https://${clouds[Math.floor(Math.random() * clouds.length)]}/verifyotp?num=${num}&otp=${otp}`);
        res.json(response.data);
    } catch (error) {
       res.status(error.response && error.response.status || 500).json({ error: error.message });
    }
});

// 8. POST Request to /refresh
app.post('/refresh', async (req, res) => {
    const { rtoken } = req.body;
    try {
        const response = await axios.post(`https://${clouds[Math.floor(Math.random() * clouds.length)]}/refresh`,
            `rtoken=${rtoken}`,
            {
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                }
            }
        );
        res.json(response.data);
    } catch (error) {
       res.status(error.response && error.response.status || 500).json({ error: error.message });
    }
});

// 9. POST Request to /time
app.post('/time', async (req, res) => {
    const { token } = req.body;
    try {
        const response = await axios.post(`https://${clouds[Math.floor(Math.random() * clouds.length)]}/time`,
            `token=${token}`,
            {
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(error.response && error.response.status || 500).json({ error: error.message });
    }
});

// 10. POST Request to /gift
app.post('/gift', async (req, res) => {
    const { token } = req.body;
    try {
        const response = await axios.post(`https://${clouds[Math.floor(Math.random() * clouds.length)]}/gift`,
            `token=${token}`,
            {
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                }
            }
        );
        res.json(response.data);
    } catch (error) {
       res.status(error.response && error.response.status || 500).json({ error: error.message });
    }
});

// 11. Fallback for All Other Paths
app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});

app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`);
    keepRunning();
});
