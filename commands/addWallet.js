const { getWalletdata } = require('../services/vybeApi');
const { storeUserPreference } = require('../services/storage');

module.exports = async (ctx) => {
    const walletAddress = ctx.message.text.split(' ')[1];
    if (!walletAddress) {
        return ctx.reply('Please provide a valid token address after /addtoken command.');
    }

    try {
        const walletData = await getWalletdata(walletaddress);
        storeUserPreference(ctx.from.id, 'wallets', walletAddress);
        ctx.reply(`You are now tracking the token: ${walletData.data.name} (${walletData.data.symbol})`);
    } catch (error) {
        console.error('Error fetching token data:', error);
        ctx.reply('Sorry, there was an error fetching token data.');
    }
};
