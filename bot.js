// bot.js

const { Telegraf } = require('telegraf');
const dotenv = require('dotenv');
const connectDB = require('./services/db');
const LocalSession = require('telegraf-session-local');

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const { setupMenus } = require("./menu/menusetup");

// Session middleware (stored locally in JSON)
bot.use(new LocalSession({ database: 'session_db.json' }).middleware());

// Set up menus and commands
setupMenus(bot);

// Command handlers
const start = require('./commands/start');
const handleAddToken = require('./commands/addToken');
const handleAddWallet = require('./commands/addWallet');
const handlemyfeed = require('./commands/myFeed');

// Register command handlers (✅ outside of any listener)
bot.start(start);
bot.command('addtoken', handleAddToken);
bot.command('addwallet', handleAddWallet);
bot.command('myfeed', handlemyfeed);

// Handle plain text messages (for sessions like awaitingToken/Wallet)
bot.on('text', async (ctx) => {
    if (!ctx.session.greeted) {
        ctx.session.greeted = true;
        await ctx.reply(
            `👋 Welcome to VybeLoop!\nYour personalized on-chain insights bot powered by Vybe APIs.\n\nUse /feed or tap a menu button to get started!`
        );
    }

    // Handle token input
    if (ctx.session.awaitingToken) {
        ctx.session.awaitingToken = false;
        ctx.message.text = `/addtoken ${ctx.message.text}`;
        return handleAddToken(ctx);
    }

    // Handle wallet input
    if (ctx.session.awaitingWallet) {
        ctx.session.awaitingWallet = false;
        ctx.message.text = `/addwallet ${ctx.message.text}`;
        return handleAddWallet(ctx);
    }

    ctx.reply("❓ I didn't understand that. Use /start or click a menu button.");
});

// Launch the bot after DB connection
(async () => {
    await connectDB();
    bot.launch();
    console.log('🤖 VybeLoop is running...');
})();
