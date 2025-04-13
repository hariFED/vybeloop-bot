const { getUserPreferences } = require('../services/storage');
const { getTokenData } = require('../services/vybeApi');

module.exports = async (ctx) => {
    const userId = ctx.from.id;
    const preferences = await getUserPreferences(userId);

    if (!preferences || (!preferences.tokens && !preferences.wallets && !preferences.categories)) {
        return ctx.reply('You are not tracking any tokens or wallets. Use /addtoken to track a token.');
    }

    let feed = 'Here’s your personalized feed:\n\n';

    // Handle tokens
    if (preferences.tokens && preferences.tokens.length > 0) {
        for (let token of preferences.tokens) {
            try {
                const tokenData = await getTokenData(token);
                feed += `📊 Token: ${tokenData.name} (${tokenData.symbol})\nPrice: $${tokenData.price}\n\n`;
            } catch (error) {
                feed += `❌ Failed to fetch data for token: ${token}\n`;
            }
        }
    }

    // Handle wallets and categories (Similar logic can be used for these)
    // You can extend this to include wallets, categories, or more metrics

    return ctx.reply(feed || 'No feed data available.');
};
