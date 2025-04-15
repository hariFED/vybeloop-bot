const { Markup } = require('telegraf');

module.exports = async function (ctx) {
    await ctx.reply(
        `👋 Choose your action \n\n*Feed* – Add tokens, wallets, and programs to track\n*View Feed* – View the tokens, wallets, and programs added to your Feed\n*Remove* – Remove any tokens, wallets, or programs\n*Stop Bot* – Stop all tracking and restart fresh\n\nYou can get your token/wallet/program address from [Vybe Explorer](https://vybe.fyi/)`,
        {
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                [Markup.button.callback('➕ Feed', 'feed_menu')],
                [Markup.button.callback('📋 View Feed', 'unfeed_menu')],
                [Markup.button.callback('❌ Remove', 'remove_menu')],
                [Markup.button.callback('🛑 Stop Bot', 'stop_bot')],
            ])
        }
    );
};
