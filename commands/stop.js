const { getUserPreferences, storeUserPreference } = require('../services/storage');

module.exports = async (ctx) => {
    const userId = ctx.from.id;
    const preferences = await getUserPreferences(userId);

    if (!preferences) {
        return ctx.reply('You have no tracked data to stop.');
    }

    // Optionally, you could ask the user what they want to stop tracking.
    // For now, we’ll remove all tokens, wallets, and categories.
    preferences.tokens = [];
    preferences.wallets = [];
    preferences.categories = [];

    await preferences.save(); // Save changes to MongoDB

    return ctx.reply('You have successfully stopped tracking all tokens, wallets, and categories.');
};

