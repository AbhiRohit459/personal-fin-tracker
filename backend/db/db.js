const mongoose = require('mongoose');

const db = async () => {
    try {
        if (!process.env.MONGO_URL) {
            console.error('MONGO_URL is not set in environment variables');
            throw new Error('Database connection string is missing');
        }
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Db Connected');
    } catch (error) {
        console.error('DB Connection Error:', error?.message || error);
        // Don't throw here, let the app start but log the error
        // The app will fail when trying to use the database
    }
}

module.exports = {db}