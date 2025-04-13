const { getTokenData } = require('./vybeApi');
const { getUserPreferences } = require('./storage');

const generateFeed = async (userId) => {
    const preferences = getUserPreferences(userId);
    let feed = '';

    if (preferences.tokens) {
        for (let token of preferences.tokens) {
            const tokenData = await getTokenData(token);
            feed += `📊 Token: ${tokenData.name} (${tokenData.symbol})\nPrice: $${tokenData.price}\n\n`;
        }
    }

    return feed || 'No feed data available.';
};

module.exports = { generateFeed };
