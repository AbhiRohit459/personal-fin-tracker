const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
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
