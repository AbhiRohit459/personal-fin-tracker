const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { db } = require('./db/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Health check endpoint
app.get('/health', (req, res) => {
    const dbStatus = mongoose.connection.readyState;
    const dbStatusText = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting'
    }[dbStatus] || 'unknown';
    
    const health = {
        status: dbStatus === 1 ? 'OK' : 'WARNING',
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        database: {
            status: dbStatusText,
            connected: dbStatus === 1
        },
        environment: {
            hasMongoUrl: !!process.env.MONGO_URL,
            hasJwtSecret: !!process.env.JWT_SECRET,
            nodeEnv: process.env.NODE_ENV || 'not set'
        }
    };
    
    res.status(dbStatus === 1 ? 200 : 503).json(health);
});

// Routes
app.use("/api/transactions", require("./routes/transactions"));
app.use("/api/auth", require("./routes/authRoutes")); // Assuming you have this too

// Server
const server = () => {
    db();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

server();
