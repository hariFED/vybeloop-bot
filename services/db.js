const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://hariusertesting:9791868671@habitdb.tjrmxzf.mongodb.net/');

        console.log('✅ MongoDB connected!');
    } catch (err) {
        console.error('❌ MongoDB connection failed:', err.message);
        process.exit(1); // stop app if DB fails
    }
};

module.exports = connectDB;






