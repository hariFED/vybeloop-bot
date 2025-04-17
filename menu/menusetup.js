// vybeloop-bot/menuSetup.js

const { Markup } = require('telegraf');
const handlemyfeed = require('../commands/myFeed');
const start = require('../commands/start');
const commonmenu = require('../commands/commonmenu');
const { storeUserPreference, removeUserPreference, getUserPreferences } = require('../services/storage');
const { pendingTokens } = require('../commands/addToken');
const { pendingPrograms } = require('../commands/addProgram');

// Utility: shorten string for display
function shorten(str) {
    return str.length > 12 ? str.slice(0, 4) + '...' + str.slice(-4) : str;
}

const removeConfirmStore = {}; // { [id]: { type, value } }
const { v4: uuidv4 } = require('uuid'); // npm install uuid


function setupMenus(bot) {

    //
    // 1. Set persistent command menu
    //
    bot.telegram.setMyCommands([
        { command: 'start', description: 'Start the bot and view menu' },
        { command: 'addtoken', description: 'Track a token by its mint address' },
        { command: 'addwallet', description: 'Track a wallet address' },
        { command: 'addprogram', description: 'Track a program ID' },
        { command: 'myfeed', description: 'View your personalized insights feed' },
        { command: 'remove', description: 'Remove an item from your feed' },
        { command: 'stop', description: 'Stop the bot and clear your feed' },
    ]);


    //
    // 2. Command handlers
    //
    bot.start(start);
    bot.action('common_menu', commonmenu);


    //
    // 3. Feed menu + tracking entry points
    //
    bot.action('feed_menu', (ctx) => {
        ctx.reply('🔍 What would you like to follow?', Markup.inlineKeyboard([
            [Markup.button.callback('👛 Wallet', 'feed_wallet')],
            [Markup.button.callback('📈 Token', 'feed_token')],
            [Markup.button.callback('🧠 Program', 'feed_program')],
            [Markup.button.callback('⬅️ Back', 'common_menu')],
        ]));
    });

    bot.action('feed_wallet', (ctx) => {
        ctx.session.awaitingWallet = true;
        return ctx.reply('🧾 Please send the wallet address');
    });

    bot.action('feed_token', (ctx) => {
        ctx.session.awaitingToken = true;
        return ctx.reply('📩 Send the token mint address you want to track.');
    });

    bot.action('feed_program', (ctx) => {
        ctx.session.awaitingProgram = true;
        return ctx.reply('🧠 Please send the program ID');
    });


    //
    // 4. View Feed
    //
    bot.action('unfeed_menu', async (ctx) => {
        ctx.reply('📋 Your current feed:');
        handlemyfeed(ctx);
    });


    //
    // 5. Remove Menu + Removal Handlers
    //
    bot.action('remove_menu', async (ctx) => {
        const userId = ctx.from.id;
        const user = await getUserPreferences(userId);

        if (!user) return ctx.reply('⚠️ No preferences found.');

        const buttons = [];

        if (user.wallets?.length) {
            user.wallets.forEach(addr => {
                buttons.push([Markup.button.callback(`🧾 Remove Wallet ${shorten(addr)}`, `remove_wallet_${addr}`)]);
            });
        }

        if (user.tokens?.length) {
            user.tokens.forEach(mint => {
                buttons.push([Markup.button.callback(`📉 Remove Token ${shorten(mint)}`, `remove_token_${mint}`)]);
            });
        }

        if (user.program?.length) {
            user.program.forEach(programId => {
                buttons.push([Markup.button.callback(`🧠 Remove Program ${shorten(programId)}`, `remove_program_${programId}`)]);
            });
        }

        if (!buttons.length) return ctx.reply('📭 Your feed is empty!');

        buttons.push([Markup.button.callback('⬅️ Back', 'common_menu')]);

        return ctx.reply('🧹 Select an item to remove from your feed:', Markup.inlineKeyboard(buttons));
    });

    const removeHandlers = ['token', 'wallet', 'program'];

    removeHandlers.forEach((type) => {
        const emojiMap = {
            token: '📉',
            wallet: '👛',
            program: '🧠',
        };

        const labelMap = {
            token: 'Token',
            wallet: 'Wallet',
            program: 'Program',
        };

        // Step 1: Ask for confirmation before removal
        bot.action(new RegExp(`^remove_${type}_(.+)$`), async (ctx) => {
            const value = ctx.match[1];
            const shortVal = shorten(value);
            const id = uuidv4().slice(0, 8); // 8-char ID

            removeConfirmStore[id] = { type, value };

            await ctx.reply(
                `⚠️ *Confirm Removal*\n\n${emojiMap[type]} ${labelMap[type]}: \`${shortVal}\`\n\nAre you sure you want to remove this from your feed?`,
                {
                    parse_mode: 'Markdown',
                    ...Markup.inlineKeyboard([
                        [
                            Markup.button.callback('✅ Yes, remove it', `confirm_remove_${id}`),
                            Markup.button.callback('❌ Cancel', 'common_menu'),
                        ],
                    ]),
                }
            );
        });

        // Step 2: Actual removal if confirmed
        bot.action(new RegExp(`^confirm_remove_(.+)$`), async (ctx) => {
            const id = ctx.match[1];
            const data = removeConfirmStore[id];

            if (!data) return ctx.reply('⚠️ This item has expired or is invalid.');

            const { type, value } = data;
            const userId = ctx.from.id;
            const shortVal = shorten(value);
            const dbType = type === 'token' ? 'tokens' : type === 'wallet' ? 'wallets' : 'program';

            const result = await removeUserPreference(userId, dbType, value);

            delete removeConfirmStore[id]; // Clear after use

            if (result.success) {
                await ctx.reply(`✅ ${emojiMap[type]} *${labelMap[type]}* \`${shortVal}\` has been removed from your feed.`, {
                    parse_mode: 'Markdown',
                });
            } else if (result.notFound) {
                await ctx.reply(`⚠️ Couldn't find this ${labelMap[type]} in your feed.`);
            } else {
                await ctx.reply(`❌ Something went wrong while removing this ${labelMap[type]}.`);
            }

            return commonmenu(ctx);
        });

    });



    //
    // 6. Stop the bot and clear settings (placeholder)
    //
    bot.action('stop_bot', async (ctx) => {
        ctx.reply('👋 Your feed and settings have been cleared. You can restart anytime by sending /start.');
        // You could also wipe the user from DB here if needed.
    });


    //
    // 7. Token Confirmation Handlers
    //
    bot.action('confirm_token', async (ctx) => {
        const userId = ctx.from.id;
        const tokenInfo = pendingTokens[userId];

        if (!tokenInfo) return ctx.reply('⚠️ No token to confirm.');

        const { tokenAddress, tokenData } = tokenInfo;
        const result = await storeUserPreference(userId, 'tokens', tokenAddress);

        delete pendingTokens[userId];

        if (result.duplicate) {
            await ctx.reply(`🔁 You’re already tracking ${tokenData.name} (${tokenData.symbol})`);
        } else {
            await ctx.reply(`✅ Token *${tokenData.name}* is now added to your feed!`, { parse_mode: 'Markdown' });
        }

        return commonmenu(ctx);
    });

    bot.action('cancel_token', (ctx) => {
        delete pendingTokens[ctx.from.id];
        ctx.reply('❌ Token tracking cancelled.');
        return commonmenu(ctx);
    });


    //
    // 8. Program Confirmation Handlers
    //
    bot.action('confirm_program', async (ctx) => {
        const userId = ctx.from.id;
        const programInfo = pendingPrograms[userId];

        if (!programInfo) return ctx.reply('⚠️ No Program to confirm.');

        const { programAddress, programData } = programInfo;
        const result = await storeUserPreference(userId, 'program', programAddress);

        delete pendingPrograms[userId];

        if (result.duplicate) {
            await ctx.reply(`🔁 You’re already tracking ${programData.name}`);
        } else {
            await ctx.reply(`✅ Program *${programData.name}* is now added to your feed!`, { parse_mode: 'Markdown' });
        }

        return commonmenu(ctx);
    });

    bot.action('cancel_program', (ctx) => {
        delete pendingPrograms[ctx.from.id];
        ctx.reply('❌ Program tracking cancelled.');
        return commonmenu(ctx);
    });


    //
    // 9. Graceful Shutdown
    //
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
}


module.exports = { setupMenus };
