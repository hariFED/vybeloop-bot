const { Markup } = require('telegraf');
const { getProgramData } = require('../services/vybeApi');
const commonmenu = require('./commonmenu');

// Temporary store for pending tokens per user (can be Redis/DB if needed)
const pendingPrograms = {};

module.exports = async function handleAddProgram(ctx) {

    await ctx.sendChatAction('typing');

    const programAddress = ctx.message.text.split(' ')[1];
    if (!programAddress) {
        return ctx.reply('❗ Please provide a correct program address like: /addprogram <address>');
    }

    try {
        const programData = await getProgramData(programAddress);

        console.log('Program Data:', programData);
        // Save token temporarily until user confirms
        pendingPrograms[ctx.from.id] = { programAddress, programData };

        const programImage = programData.logoUrl?.endsWith('.svg')
            ? 'https://i.imgur.com/M5tqq7L.png'
            : programData.logoUrl || 'https://i.imgur.com/M5tqq7L.png';

        await ctx.replyWithPhoto(programImage, {
            caption: `🤔 Do you want to track this Program?\n`
                + `\n` +
                `📛 *Name:* ${programData.name}` +
                `\n` +
                `💱 *Enity Name:* ${programData.entityName}` +
                `\n` +
                `💰 *Program Id:* $${programData.programId}` +
                `\n` +
                `🔥 *Daily Active Users:* $${programData.dau}` +
                `\n [Live Data](https://vybe.fyi/programs/${programData.programId})`,
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                [Markup.button.callback('✅ Yes', 'confirm_program')],
                [Markup.button.callback('❌ No', 'cancel_program')]
            ])
        });

    } catch (error) {

        console.error('Error fetching program data:', error);
        ctx.reply('⚠️ Sorry, couldn’t fetch that program. Try again.');
        return commonmenu(ctx);
    }
};

// Export pendingTokens so menuSetup.js can access it
module.exports.pendingPrograms = pendingPrograms;
