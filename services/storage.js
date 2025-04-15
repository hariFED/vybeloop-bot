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
            user[type] = [value]; // Initialize with first item
        } else {
            if (!user[type]) {
                user[type] = [];
            }

            // Check for duplicates
            if (user[type].includes(value)) {
                console.log(`🔁 User ${userId} already tracking ${value} under ${type}`);
                return { duplicate: true };
            }

            user[type].push(value);
        }

        await user.save();
        return { success: true };
    } catch (error) {
        console.error('Error in storeUserPreference:', error);
        return { error };
    }
};

module.exports = { getUserPreferences, storeUserPreference };
