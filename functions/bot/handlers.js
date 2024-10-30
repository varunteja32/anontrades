const { getUserAlias } = require("./aliasManager");
const { handleBotError } = require("./utils");

async function handleTextMessage(ctx) {
  try {
    if (ctx.chat.type === "private") {
      const userId = ctx.from.id; // Make sure this value is valid
      console.log("Handling text message from userId:", userId);

      const alias = await getUserAlias(userId);
      const messageWithAlias = `[${alias}] ${ctx.message.text}`;

      await ctx.reply(
        "Your message has been sent anonymously to the group. Keep the ideas flowing! 🙃"
      );
      await ctx.telegram.sendMessage(process.env.GROUP_ID, messageWithAlias);
    } else {
      console.log("Received a message in a non-private chat, ignoring.");
    }
  } catch (error) {
    handleBotError(error);
  }
}

module.exports = { handleTextMessage };
