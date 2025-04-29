// bot.js
const express = require('express');

const { Telegraf } = require('telegraf');
const dotenv = require('dotenv');
const connectDB = require('./services/db');
const LocalSession = require('telegraf-session-local');
const { buildFeedOnly } = require('./services/feedGenerator');
const { getAllUsers } = require('./services/storage');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');



dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const { setupMenus } = require("./menu/menusetup");

app.use(cors());

// Session middleware (stored locally in JSON)
bot.use(new LocalSession({ database: 'session_db.json' }).middleware());

// Set up menus and commands
setupMenus(bot);

// Command handlers
const start = require('./commands/start');
const handleAddToken = require('./commands/addToken');
const handleAddWallet = require('./commands/addWallet');
const handlemyfeed = require('./commands/myFeed');
const handleAddProgram = require('./commands/addProgram');

// Register command handlers (✅ outside of any listener)
bot.start(start);
bot.command('addtoken', handleAddToken);
bot.command('addwallet', handleAddWallet);
bot.command('myfeed', handlemyfeed);
bot.command('addprogram', handleAddProgram)

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

    if (ctx.session.awaitingProgram) {
        ctx.session.awaitingProgram = false;
        ctx.message.text = `/addprogram ${ctx.message.text}`;
        return handleAddProgram(ctx);
    }


    ctx.reply("❓ I didn't understand that. Use /start or click a menu button.");
});


app.get('/trigger-feed', async (req, res) => {
    try {
        const users = await getAllUsers();

        for (let user of users) {
            const feed = await buildFeedOnly(user.id);
            await bot.telegram.sendMessage(user.id, feed, { parse_mode: 'Markdown' });
        }

        res.send('✅ Feed sent to all users');
    } catch (err) {
        console.error(err);
        res.status(500).send('❌ Failed to send feed');
    }
});

// Launch the bot after DB connection
(async () => {
    await connectDB();
    bot.launch();
    console.log('🤖 VybeLoop is running...');


    app.get('/', (req, res) => {
        res.send('🤖 VybeLoop bot is running!');
    });

    app.listen(PORT, () => {
        console.log(`🌐 Web server listening on port ${PORT}`);
    });
})();

