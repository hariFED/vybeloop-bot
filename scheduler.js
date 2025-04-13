const cron = require('node-cron');
const { generateFeed } = require('./services/feedGenerator');
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Schedule a feed every 4 hours
cron.schedule('0 */4 * * *', async () => {
    const users = await getAllUsers(); // A helper function to retrieve all users (modify as needed)

    for (let user of users) {
        const feed = await generateFeed(user.id);
        bot.telegram.sendMessage(user.id, feed);
    }
});
