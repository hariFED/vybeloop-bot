// vybeloop-bot/menuSetup.js

const { Markup } = require('telegraf');
const handlemyfeed = require('../commands/myFeed');
const { storeUserPreference } = require('../services/storage');
const { pendingTokens } = require('../commands/addToken');
const start = require('../commands/start');
const commonmenu = require('../commands/commonmenu');


function setupMenus(bot) {

    // 1. Set persistent command menu

    bot.telegram.setMyCommands([
        { command: 'start', description: 'Start the bot and view menu' },
        { command: 'addtoken', description: 'Track a token by its mint address' },
        { command: 'addwallet', description: 'Track a wallet address' },
        { command: 'addprogram', description: 'Track a program ID' },
        { command: 'myfeed', description: 'View your personalized insights feed' },
        { command: 'remove', description: 'Remove an item from your feed' },
        { command: 'stop', description: 'Stop the bot and clear your feed' },
    ]);


    // 2. Handle /start command with a welcome message and inline menu

    bot.start(start);


    // 3. Feed menu

    bot.action('feed_menu', (ctx) => {
        ctx.reply('🔍 What would you like to follow?', Markup.inlineKeyboard([
            [Markup.button.callback('👛 Wallet', 'feed_wallet')],
            [Markup.button.callback('📈 Token', 'feed_token')],
            [Markup.button.callback('🧠 Program', 'feed_program')],
            [Markup.button.callback('⬅️ Back', 'common_menu')],
        ]));
    });

    bot.action('common_menu', commonmenu);
    // 4. Placeholder actions for each feed type

    bot.action('feed_wallet', (ctx) => {
        ctx.session.awaitingWallet = true;
        return ctx.reply('🧾 Please send the wallet address ')
    });
    bot.action('feed_token', (ctx) => {
        ctx.session.awaitingToken = true;
        return ctx.reply('📩 Send the token mint address you want to track.');
    });
    bot.action('feed_program', (ctx) => ctx.reply('Please send the program ID 🧠'));

    // 5. Unfeed and Remove logic placeholder

    bot.action('unfeed_menu', async (ctx) => {

        // Fetch user feed from DB here (e.g. MongoDB)

        ctx.reply(`📋 Your current feed:)`);

        handlemyfeed(ctx); // Call the function to show the feed

    });

    bot.action('remove_menu', async (ctx) => {

        // Fetch and show inline buttons with user's feed items

        ctx.reply('Select an item to remove:', Markup.inlineKeyboard([
            [Markup.button.callback('Remove Wallet X', 'remove_wallet_x')],
            [Markup.button.callback('Remove Token Y', 'remove_token_y')],
            [Markup.button.callback('⬅️ Back', 'start')],
        ]));
    });

    bot.action('stop_bot', async (ctx) => {

        // Remove from MongoDB

        ctx.reply('👋 Your feed and settings have been cleared. You can restart anytime by sending /start.');

    });

    bot.action('confirm_token', async (ctx) => {
        const userId = ctx.from.id;
        const tokenInfo = pendingTokens[userId];

        if (!tokenInfo) return ctx.reply('⚠️ No token to confirm.');

        const { tokenAddress, tokenData } = tokenInfo;
        const result = await storeUserPreference(userId, 'tokens', tokenAddress);

        delete pendingTokens[userId]; // Clear from temp store

        if (result.duplicate) {
            await ctx.reply(`🔁 You’re already tracking ${tokenData.name} (${tokenData.symbol})`);
            return start(ctx);
        }

        await ctx.reply(`✅ Token *${tokenData.name}* is now added to your feed!`, { parse_mode: 'Markdown' });
        return start(ctx); // Redirect to start menu
    });

    bot.action('cancel_token', (ctx) => {
        delete pendingTokens[ctx.from.id];
        ctx.reply('❌ Token tracking cancelled. Use /addtoken to try again or /start to return.');
    });

    // 6. Start polling

    // Optional: graceful shutdown
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));

}









module.exports = { setupMenus };