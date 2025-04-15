const { getUserPreferences } = require('../services/storage');
const { getTokenData, getWalletData } = require('../services/vybeApi');

module.exports = async function handlemyfeed(ctx) {
    const userId = ctx.from.id;
    const preferences = await getUserPreferences(userId);

    if (!preferences || (!preferences.tokens && !preferences.wallets && !preferences.categories)) {
        return ctx.reply('You are not tracking any tokens or wallets. Use /addtoken to track a token.');
    }

    let feed = '🕸 *Here’s your personalized feed:*\n\n';

    // Handle tokens
    if (preferences.tokens && preferences.tokens.length > 0) {
        let index = 1;
        feed += '💎 *_Tokens Owned:_*\n\n';
        for (let token of preferences.tokens) {
            try {
                const tokenData = await getTokenData(token);
                feed += `*${index} Token Address:*\n 📛 \`${tokenData.mintAddress}\`\n${tokenData.name} - (${tokenData.symbol})\nPrice: $${tokenData.price}\n\n[Live Data](https://vybe.fyi/tokens/${tokenData.mintAddress})\n`;
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

                feed += `${index}) *Wallet Address:*\n📛 \`${walletData.ownerAddress}\`\n🔢 *Tokens:* ${walletData.totalTokenCount}\n${tokenList}\n\n[Live Data](https://vybe.fyi/wallets/${walletData.ownerAddress})`;
                index++;

            } catch (error) {
                feed += `❌ Failed to fetch data for token: ${token}\n`;
            }
        }
    }

    // Handle wallets and categories (Similar logic can be used for these)
    // You can extend this to include wallets, categories, or more metrics

    return ctx.reply(feed || 'No feed data available.', { parse_mode: 'Markdown' });

};
