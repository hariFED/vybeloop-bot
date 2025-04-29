const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    telegramId: { type: String, required: true, unique: true },
    tokens: [{ type: String }],
    wallets: [{ type: String }],
    categories: [{ type: String }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
