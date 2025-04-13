const { getTokenData } = require('../services/vybeApi');
const { storeUserPreference } = require('../services/storage');

module.exports = async (ctx) => {
    const tokenAddress = ctx.message.text.split(' ')[1];
    if (!tokenAddress) {
        return ctx.reply('Please provide a valid token address after /addtoken command.');
    }

    try {
        const tokenData = await getTokenData(tokenAddress);
        storeUserPreference(ctx.from.id, 'tokens', tokenAddress);
        ctx.reply(`You are now tracking the token: ${tokenData.name} (${tokenData.symbol})`);
    } catch (error) {
        console.error('Error fetching token data:', error);
        ctx.reply('Sorry, there was an error fetching token data.');
    }
};
