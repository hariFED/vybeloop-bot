const { Telegraf } = require('telegraf');
const dotenv = require('dotenv');
const connectDB = require('./services/db');

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

const { setupMenus } = require("./menu/menusetup");



setupMenus(bot);

// Import command handlers
const start = require('./commands/start');
const addToken = require('./commands/addToken');
const myFeed = require('./commands/myFeed');
const stop = require('./commands/stop');

// Set up commands
bot.start(start);
bot.command('addtoken', addToken);
bot.command('myfeed', myFeed);
bot.command('stop', stop);

// Launch the bot

(async () => {
    await connectDB();  // 💡 Make sure Mongo is connected before using models

    bot.launch();
    console.log('🤖 Bot is running...');
})();
