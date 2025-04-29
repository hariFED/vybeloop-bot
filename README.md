
# 🤖 VybeLoop Bot

[![Watch the demo](https://img.youtube.com/vi/cIxCeMB8wMc/hqdefault.jpg)](https://youtu.be/cIxCeMB8wMc)

Welcome to **VybeLoop**, your personalized on-chain insights companion on Telegram powered by **Vybe APIs**.  
Track wallets, tokens, and programs effortlessly—right inside Telegram.

---
Get personalized on-chain insights directly on Telegram!

👉 [Launch VybeLoop on Telegram](https://t.me/Vybe_loop_BOT)

No setup needed. Just tap the link and start exploring token, wallet, and program analytics instantly!

> 🟡 **Notice:**  
> VybeLoop is currently hosted on [Render](https://render.com), which may cause a short delay in responses (cold starts).  
> If you experience slow replies, please be patient.  
> For a faster and more responsive experience, consider setting up the bot locally by following the instructions below.


## 🚀 What is VybeLoop?

VybeLoop is a **Telegram bot** that delivers **real-time, personalized on-chain analytics**.  
With just a few commands, users can:

- Track wallets & tokens
- Get program updates
- Receive daily summaries

Perfect for:
- 🧠 On-chain analysts
- 💰 Crypto traders
- 🧵 Curious explorers

---

## 🔧 Core Features

### 🧠 Personalized Feed
Your on-chain watchlist is delivered to you—no dashboard required.

### ➕ Add Data via Commands
- `/addwallet <address>` – Track wallet activity
- `/addtoken <token>` – Track specific tokens
- `/addprogram <program>` – Monitor program usage

### 🧾 See What You're Following
- `/myfeed` – Lists all tracked wallets, tokens, and programs

### ❌ Clean Removals
- Click ❌ to remove anything from your feed
- Includes a **confirmation prompt** to avoid mistakes

### ⏰ Scheduled Updates
- Uses `node-cron` to fetch data every few minutes
- Pushes it directly to your Telegram

---

## 🛠️ Setup Locally

> 💻 To run this bot on your machine:

### 1. Clone the Repository
```
git clone https://github.com/hariFED/vybeloop-bot.git
cd vybeloop-bot
```

### 2. Install Dependencies
```
npm install
```

### 3. Configure `.env` File
Create a file named `.env` with:
```
TELEGRAM_BOT_TOKEN=your_bot_token_here
MONGO_URI=your_mongodb_backend
VYBE_API=your_vybe_api_key
```

### 4. Run the Bot
```
npm run dev
```
This uses `nodemon` and keeps local sessions in `session_db.json`.

---

## 📁 Folder Structure

```
vybeloop-bot/
├── bot.js              # Entry point
├── commands/           # Telegram command handlers
│   ├── addToken.js
│   ├── addWallet.js
│   ├── addProgram.js
│   ├── myFeed.js
│   ├── start.js
│   └── stop.js
├── menu/               # Menu logic
│   └── menusetup.js
├── models/
│   └── User.js 
├── services/
│   ├── db.js           # MongoDB connection
│   ├── feedGenerator.js
│   ├── storage.js      # Handles storage logic
│   └── vybeApi.js      # Handles API logic
|
├── session_db.json     # Local sessions
├── .env                # Environment variables
├── .api                # Vybe API SDK
└── package.json
```

---

## ❤️ Powered By

- [Vybe APIs](https://vybe.fyi/)
- [Telegraf.js](https://telegraf.js.org/)
- [MongoDB](https://mongodb.com)

---

## 📜 License

ISC — Open to contributions!
