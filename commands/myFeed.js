const { getUserPreferences } = require('../services/storage');
const { getTokenData, getWalletData } = require('../services/vybeApi');

module.exports = async function handlemyfeed(ctx) {
    const userId = ctx.from.id;
    const preferences = await getUserPreferences(userId);

    if (!preferences || (!preferences.tokens && !preferences.wallets && !preferences.categories)) {
        return ctx.reply('You are not tracking any tokens or wallets. Use /addtoken to track a token.');
    }

    await ctx.sendChatAction('typing');

    const message = await ctx.replyWithAnimation('https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnVkMjE2YTU5NDI5aHluazYyOWx0cXN4eXF6dzM5cmRhaXAxemR5eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HUpt2s9Pclgt9Vm/giphy.gif', {
        caption: '🕸 *Loading your personalized feed...*'
    })

    let feed = '🕸 *Here’s your personalized feed:*\n\n';

    // Handle tokens
    if (preferences.tokens && preferences.tokens.length > 0) {
        let index = 1;
        feed += '💎 *_Tokens Owned:_*\n\n';
        for (let token of preferences.tokens) {
            try {
                const tokenData = await getTokenData(token);
                feed += `*${index} Token Address:*\n 📛 \`${tokenData.mintAddress}\`\n${tokenData.name} - (${tokenData.symbol})\nPrice: $${tokenData.price}\n[Live Data](https://vybe.fyi/tokens/${tokenData.mintAddress})\n\n`;
                index++;
            } catch (error) {
                feed += `❌ Failed to fetch data for token: ${token}\n`;
            }
        }
    }

    if (preferences.wallets && preferences.wallets.length > 0) {

        feed += '💳 *_Wallets Owned:_*\n\n';
        let index = 1;
        for (let wallets of preferences.wallets) {
            try {
                const walletData = await getWalletData(wallets);
                const tokenList = walletData.data
                    .map((item) => `• ${item.name} (${item.symbol}) — ${item.amount}`)
                    .join('\n');

                feed += `${index}) *Wallet Address:*\n📛 \`${walletData.ownerAddress}\`\n🔢 *Tokens:* ${walletData.totalTokenCount}\n${tokenList}\n[Live Data](https://vybe.fyi/wallets/${walletData.ownerAddress})\n\n`;
                index++;

            } catch (error) {
                feed += `❌ Failed to fetch data for token: ${token}\n`;
            }
        }
    }

    // Handle wallets and categories (Similar logic can be used for these)
    // You can extend this to include wallets, categories, or more metrics
    await ctx.deleteMessage(message.message_id);
    return ctx.reply(feed || 'No feed data available.', { parse_mode: 'Markdown' });

};
