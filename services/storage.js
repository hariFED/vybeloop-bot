const User = require('../models/User'); // Import the User model

// Retrieve preferences for a user from MongoDB
const getUserPreferences = async (userId) => {
    try {
        const user = await User.findOne({ telegramId: userId });
        return user ? user : null;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Store user preferences in MongoDB
const storeUserPreference = async (userId, type, value) => {
    try {
        let user = await User.findOne({ telegramId: userId });
        if (!user) {
            user = new User({ telegramId: userId });
        }
        if (!user[type]) {
            user[type] = [];
        }
        user[type].push(value);
        await user.save();
    } catch (error) {
        console.error(error);
    }
};

module.exports = { getUserPreferences, storeUserPreference };
