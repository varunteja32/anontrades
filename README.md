# AnonTrades Telegram Bot

AnonTrades is a Telegram bot designed to facilitate anonymous investment discussions. Members are assigned unique aliases like "Panther" or "Falcon" to contribute trade ideas, market insights, and financial thoughts without revealing their identities. This creates a space where everyone can focus on ideas rather than personalities.

## Features

- **Anonymous Messaging**: Users are assigned an alias when they first interact with the bot, allowing them to share messages without revealing their identity.
- **Alias Management**: Unique aliases are assigned to users, and each alias is used only once, ensuring uniqueness and anonymity.
- **Support for Multiple Message Types**: Supports forwarding of text, photos, videos, documents, and more to the group.
- **Gamified Participation**: Users can build reputations under their alias, creating a fun and engaging environment.

## Getting Started

### Prerequisites

- **Node.js**: Ensure Node.js is installed on your machine.
- **Telegram Bot Token**: Obtain a bot token from [BotFather](https://t.me/botfather) on Telegram.
- **Netlify Account**: You need a Netlify account for deployment.

### Installation

1. **Clone the Repository**:

   ```sh
   git clone <repository-url>
   cd AnonTradesBot
   ```

2. **Install Dependencies**:

   ```sh
   npm install
   ```

3. **Create a `.env` File**:
   In the root directory, create a `.env` file and add the following:

   ```env
   BOT_TOKEN=your_telegram_bot_token_here
   GROUP_ID=your_group_id_here
   ```

4. **Run the Bot Locally**:
   ```sh
   node index.js
   ```
   The bot should now be running and can be tested locally.

### Deployment

1. **Push Code to GitHub**:

   - Push your project to a GitHub repository.

2. **Deploy to Netlify**:

   - Log in to [Netlify](https://www.netlify.com/).
   - Click "New Site from Git" and link your GitHub repository.
   - Add the environment variables (`BOT_TOKEN` and `GROUP_ID`) in Netlify's dashboard.

3. **Set the Webhook**:
   - After deployment, set the webhook to link Telegram with your deployed bot:
     ```
     https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://your-netlify-app-name.netlify.app/api/bot
     ```

## Usage

- **Start the Bot**: Users can type `/start` to receive their unique alias and start anonymously contributing to the group.
- **Send Messages**: Any message sent to the bot will be forwarded to the group under the assigned alias, including text, photos, and videos.

## Configuration

- **Aliases**: The bot assigns aliases from a predefined list. If you want to modify the list, edit the `aliasList` array in `bot.js`.
- **Group ID**: Ensure the correct group ID is added to the `.env` file to allow the bot to forward messages properly.

## Tech Stack

- **Node.js**: Backend runtime for the bot.
- **Telegraf**: Library to interact with Telegram Bot API.
- **Netlify**: Used to deploy the serverless function for the bot.

## Contributing

Feel free to fork the repository and submit pull requests. Contributions are welcome to improve the functionality or add new features!

## Acknowledgments

- Thanks to [Telegraf](https://telegraf.js.org/) for simplifying interactions with the Telegram Bot API.
- Inspired by friends wanting a fun, anonymous trading discussion environment.
