const { getUserPreferences } = require('./storage');
const { getTokenData, getWalletData } = require('./vybeApi');

async function buildFeedOnly(userId) {
    const preferences = await getUserPreferences(userId);

    if (!preferences || (!preferences.tokens && !preferences.wallets && !preferences.categories)) {
        return 'You are not tracking any tokens or wallets. Use /addtoken to track a token.';
    }

    let feed = '🕸 *Here’s your personalized feed:*\n\n';

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
        for (let wallet of preferences.wallets) {
            try {
                const walletData = await getWalletData(wallet);
                const tokenList = walletData.data
                    .map((item) => `• ${item.name} (${item.symbol}) — ${item.amount}`)
                    .join('\n');

                feed += `${index}) *Wallet Address:*\n📛 \`${walletData.ownerAddress}\`\n🔢 *Tokens:* ${walletData.totalTokenCount}\n${tokenList}\n[Live Data](https://vybe.fyi/wallets/${walletData.ownerAddress})\n\n`;
                index++;
            } catch (error) {
                feed += `❌ Failed to fetch data for wallet: ${wallet}\n`;
            }
        }
    }

    return feed;
}

module.exports = { buildFeedOnly };
