const bot = require("./functions/bot/bot");

bot
  .launch()
  .then(() => {
    console.log("Bot launched successfully");
  })
  .catch((error) => {
    console.error("Error launching bot:", error);
  });
