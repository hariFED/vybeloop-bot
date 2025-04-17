const { getWalletData } = require('../services/vybeApi');
const { storeUserPreference } = require('../services/storage');

module.exports = async function handleWalletToken(ctx) {
    const walletAddress = ctx.message.text.split(' ')[1];
    if (!walletAddress) {
        return ctx.reply('Please provide a valid token address');
    }

    try {
        await ctx.sendChatAction('typing');
        const walletData = await getWalletData(walletAddress);
        const result = await storeUserPreference(ctx.from.id, 'wallets', walletAddress);

        if (result.duplicate) {
            return ctx.reply(`🔁 You are already tracking this wallet: \n Owner Address : ${walletData.ownerAddress}  \n\n Check your Feed to see the tokens your following`);
        }
        const tokenList = walletData.data
            .map((item) => `• ${item.name} (${item.symbol}) — ${item.amount}`)
            .join('\n');

        await ctx.reply(
            `✅ You are now tracking this wallet:\n\n` +
            `📛 *Owner Address:* \`${walletData.ownerAddress}\`\n` +
            `🔢 *Total Tokens:* ${walletData.totalTokenCount}\n\n` +
            `🚦 *Tokens Owned:*\n${tokenList}\n\n` +
            `🧐 View your tracked tokens anytime with /myfeed`,
            { parse_mode: 'Markdown' }
        );

    } catch (error) {
        console.error('Error fetching token data:', error);
        ctx.reply('Sorry, there was an error fetching token data.');
    }
};
