const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();
const bot = new Telegraf(process.env.BOT_TOKEN);

// Load or initialize alias mappings
let aliases = {};
try {
  aliases = JSON.parse(fs.readFileSync("./aliases.json", "utf8"));
} catch (error) {
  console.log("No existing aliases found, starting fresh.");
}

// List of available aliases
const aliasList = [
  "Gorilla",
  "Falcon",
  "Panther",
  "Viper",
  "Wolf",
  "Eagle",
  "Tiger",
  "Lion",
  "Leopard",
  "Hawk",
  "Cheetah",
  "Jaguar",
  "Rhino",
  "Cobra",
  "Puma",
  "Shark",
  "Orca",
  "Bear",
  "Bull",
  "Whale",
  "Fox",
  "Bison",
  "Lynx",
  "Raven",
  "Mongoose",
  "Gazelle",
  "Stag",
  "Otter",
  "Boar",
  "Badger",
];

// Function to get or assign an alias to a user
function getUserAlias(userId) {
  if (!aliases[userId]) {
    aliases[userId] = generateAlias();
    fs.writeFileSync("./aliases.json", JSON.stringify(aliases, null, 2));
  }
  return aliases[userId];
}

// Function to generate a unique alias
function generateAlias() {
  const usedAliases = Object.values(aliases);
  const availableAliases = aliasList.filter(
    (alias) => !usedAliases.includes(alias)
  );
  if (availableAliases.length === 0) {
    return `User${Object.keys(aliases).length + 1}`; // Fallback if all aliases are used
  }
  return availableAliases[Math.floor(Math.random() * availableAliases.length)];
}

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
bot.on(message("text"), async (ctx) => {
  if (ctx.message.chat.type !== "private") return;
  const alias = getUserAlias(ctx.from.id);
  const messageWithAlias = `[${alias}] ${ctx.message.text}`;
  ctx.reply(
    "Your message has been sent anonymously to the group. Keep the ideas flowing! 🙃"
  );
  return ctx.telegram.sendMessage(process.env.GROUP_ID, messageWithAlias);
});

// Handle photo messages
bot.on(message("photo"), async (ctx) => {
  if (ctx.message.chat.type !== "private") return;
  const alias = getUserAlias(ctx.from.id);
  ctx.reply(
    "Your photo has been sent anonymously to the group. Keep sharing your insights! 🙃"
  );
  return ctx.telegram.sendPhoto(
    process.env.GROUP_ID,
    ctx.message.photo[0].file_id,
    { caption: `[${alias}]` }
  );
});

// Handle video messages
bot.on(message("video"), async (ctx) => {
  if (ctx.message.chat.type !== "private") return;
  const alias = getUserAlias(ctx.from.id);
  ctx.reply(
    "Your video has been sent anonymously to the group. Thanks for contributing! 🙃"
  );
  return ctx.telegram.sendVideo(
    process.env.GROUP_ID,
    ctx.message.video.file_id,
    { caption: `[${alias}]` }
  );
});

// Handle voice messages
bot.on(message("voice"), async (ctx) => {
  if (ctx.message.chat.type !== "private") return;
  const alias = getUserAlias(ctx.from.id);
  ctx.reply(
    "Your voice message has been sent anonymously to the group. Keep the conversation going! 🙃"
  );
  return ctx.telegram.sendVoice(
    process.env.GROUP_ID,
    ctx.message.voice.file_id,
    { caption: `[${alias}]` }
  );
});

// Handle other types of messages (audio, document, animation, contact, location)
bot.on(
  message(["audio", "document", "animation", "contact", "location"]),
  async (ctx) => {
    if (ctx.message.chat.type !== "private") return;
    const alias = getUserAlias(ctx.from.id);
    ctx.reply(
      "Your message has been sent anonymously to the group. Keep contributing! 🙃"
    );
    if (ctx.message.audio)
      return ctx.telegram.sendAudio(
        process.env.GROUP_ID,
        ctx.message.audio.file_id,
        { caption: `[${alias}]` }
      );
    if (ctx.message.document)
      return ctx.telegram.sendDocument(
        process.env.GROUP_ID,
        ctx.message.document.file_id,
        { caption: `[${alias}]` }
      );
    if (ctx.message.animation)
      return ctx.telegram.sendAnimation(
        process.env.GROUP_ID,
        ctx.message.animation.file_id,
        { caption: `[${alias}]` }
      );
    if (ctx.message.contact)
      return ctx.telegram.sendContact(
        process.env.GROUP_ID,
        ctx.message.contact.phone_number,
        ctx.message.contact.first_name
      );
    if (ctx.message.location)
      return ctx.telegram.sendLocation(
        process.env.GROUP_ID,
        ctx.message.location.latitude,
        ctx.message.location.longitude
      );
  }
);

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

console.log("Bot is running");

exports.bot = bot;

// AWS event handler syntax (https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html)
exports.handler = async (event) => {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: "" };
  } catch (e) {
    console.error("error in handler:", e);
    return {
      statusCode: 400,
      body: "This endpoint is meant for bot and telegram communication",
    };
  }
};
