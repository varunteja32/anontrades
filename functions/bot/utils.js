function handleBotError(error) {
  if (error.response && error.response.error_code === 403) {
    console.error("Bot was blocked by the user or group:", error);
  } else if (
    error.response &&
    error.response.error_code === 400 &&
    error.response.description.includes(
      "group chat was upgraded to a supergroup chat"
    )
  ) {
    console.error("Group chat upgraded, updating GROUP_ID:", error);
    const newGroupId = error.response.parameters.migrate_to_chat_id;
    process.env.GROUP_ID = newGroupId;
    console.log("Updated GROUP_ID to:", newGroupId);
  } else {
    console.error("An unexpected error occurred:", error);
  }
}

module.exports = { handleBotError };
