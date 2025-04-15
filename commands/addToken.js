const { Markup } = require('telegraf');
const { getTokenData } = require('../services/vybeApi');

// Temporary store for pending tokens per user (can be Redis/DB if needed)
const pendingTokens = {};

module.exports = async function handleAddToken(ctx) {

    await ctx.sendChatAction('typing');

    const tokenAddress = ctx.message.text.split(' ')[1];
    if (!tokenAddress) {
        return ctx.reply('❗ Please provide a token address like: /addtoken <address>');
    }

    try {
        const tokenData = await getTokenData(tokenAddress);

        // Save token temporarily until user confirms
        pendingTokens[ctx.from.id] = { tokenAddress, tokenData };

        const tokenImage = tokenData.logoUrl || 'https://example.com/default-logo.png';

        await ctx.replyWithPhoto(tokenImage, {
            caption: `🤔 Do you want to track this token?\n`
                + `\n` +
                `📛 *Name:* ${tokenData.name}` +
                `\n` +
                `💱 *Symbol:* ${tokenData.symbol}` +
                `\n` +
                `💰 *Price:* $${tokenData.price}` +
                `\n` +
                `🔥 *Market Cap:* $${tokenData.marketCap}` +
                `\n [Live Data](https://vybe.fyi/tokens/${tokenData.mintAddress})`,
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                [Markup.button.callback('✅ Yes', 'confirm_token')],
                [Markup.button.callback('❌ No', 'cancel_token')]
            ])
        });

    } catch (error) {
        console.error('Error fetching token data:', error);
        ctx.reply('⚠️ Sorry, couldn’t fetch that token. Try again.');
    }
};

// Export pendingTokens so menuSetup.js can access it
module.exports.pendingTokens = pendingTokens;
