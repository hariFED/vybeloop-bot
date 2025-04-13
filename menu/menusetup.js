// vybeloop-bot/menuSetup.js
const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN); // Ensure BOT_TOKEN is in your .env file


function setupMenus(bot) {
    // 1. Set persistent command menu
    bot.telegram.setMyCommands([
        { command: 'feed', description: 'Add wallet, token, or program to your feed' },
        { command: 'unfeed', description: 'View your current feed items' },
        { command: 'remove', description: 'Remove an item from your feed' },
        { command: 'stop', description: 'Stop updates and delete feed' },
    ]);

    // 2. Handle /start command with a welcome message and inline menu
    bot.start((ctx) => {
        ctx.reply(
            `👋 Welcome to VybeLoop!
Your personalized on-chain insight bot powered by Vybe APIs.`,
            Markup.inlineKeyboard([
                [Markup.button.callback('➕ Feed', 'feed_menu')],
                [Markup.button.callback('📋 View Feed', 'unfeed_menu')],
                [Markup.button.callback('❌ Remove', 'remove_menu')],
                [Markup.button.callback('🛑 Stop Bot', 'stop_bot')],
            ])
        );
    });

    // 3. Feed menu
    bot.action('feed_menu', (ctx) => {
        ctx.editMessageText('🔍 What would you like to follow?', Markup.inlineKeyboard([
            [Markup.button.callback('👛 Wallet', 'feed_wallet')],
            [Markup.button.callback('📈 Token', 'feed_token')],
            [Markup.button.callback('🧠 Program', 'feed_program')],
            [Markup.button.callback('⬅️ Back', 'start')],
        ]));
    });

    // 4. Placeholder actions for each feed type
    bot.action('feed_wallet', (ctx) => ctx.reply('Please send the wallet address 🧾'));
    bot.action('feed_token', (ctx) => ctx.reply('Please send the token mint address 💱'));
    bot.action('feed_program', (ctx) => ctx.reply('Please send the program ID 🧠'));

    // 5. Unfeed and Remove logic placeholder
    bot.action('unfeed_menu', async (ctx) => {
        // Fetch user feed from DB here (e.g. MongoDB)
        ctx.reply(`📋 Your current feed:

        (Wallets, Tokens, Programs...)`);
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

    // 6. Start polling
   
    // Optional: graceful shutdown
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));

}
module.exports = { setupMenus };