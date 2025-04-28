const cron = require('node-cron');
const { generateFeed } = require('./services/feedGenerator');
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Schedule a feed every 5 minutes
cron.schedule('*/5 * * * *', async () => {
    const users = await getAllUsers(); // A helper function to retrieve all users (modify as needed)

    for (let user of users) {
        const feed = await generateFeed(user.id);
        bot.telegram.sendMessage(user.id, feed);
    }
});
