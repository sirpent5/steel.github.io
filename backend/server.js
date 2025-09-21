// backend/server.js
const express = require('express');
const cors = require('cors');
const { compareServices } = require('./queries');
const { SERVICES, GENRES } = require('./constants'); 

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/compare-services', async (req, res) => {
    try {
        const serviceIdA = parseInt(req.query.serviceA, 10);
        const serviceIdB = parseInt(req.query.serviceB, 10);
        console.log(`Comparing services: ${serviceIdA} and ${serviceIdB}`);
        if (!serviceIdA || !serviceIdB) {
            return res.status(400).json({ error: 'Two service IDs are required' });
        }
        
        const jaccardIndex = await compareServices(serviceIdA, serviceIdB);
        res.json({ jaccardIndex });
    } catch (error) {
        console.error('Error comparing services:', error);
        res.status(500).json({ error: 'Failed to compare services' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});