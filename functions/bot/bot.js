const { Telegraf } = require("telegraf");
const dotenv = require("dotenv");
const { handleTextMessage } = require("./handlers");
const { getUserAlias } = require("./aliasManager");

dotenv.config();
const bot = new Telegraf(process.env.BOT_TOKEN);

console.log("Using Group ID:", process.env.GROUP_ID);

// Start command handler
bot.start(async (ctx) => {
  const alias = getUserAlias(ctx.from.id);
  return ctx.reply(
    `Welcome to *AnonTrades*! You have been assigned the alias *${alias}*. \nYou can now start sending your trade ideas or comments anonymously, and they will be forwarded to the group.`,
    {
      parse_mode: "Markdown",
      reply_to_message_id: ctx.message?.message_id,
      allow_sending_without_reply: true,
      reply_markup: { force_reply: true, selective: true },
    }
  );
});

// Help command handler
bot.help((ctx) =>
  ctx.reply(
    "Send me any messages, and I will forward them anonymously to the group under your assigned alias. Stay active and contribute to the community! 🙃"
  )
);

// Handle text messages
bot.on("text", handleTextMessage);

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

console.log("Bot is running");

module.exports = bot; // Change this line to export the bot instance directly
