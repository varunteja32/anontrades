const db = require("./firebase");

const aliasList = [
  "Mongoose 🐾",
  "Falcon 🦅",
  "Panther 🐆",
  "Viper 🐍",
  "Wolf 🐺",
  "Eagle 🦅",
  "Tiger 🐅",
  "Pigeon 🐦",
  "Fox 🦊",
  "Jaguar 🐆",
  "Rhino 🦏",
  "Cobra 🐍",
  "Whale 🐋",
  "Shark 🦈",
  "Goat 🐐",
  "Gorilla 🦍",
  "Phoenix 🔥",
  "Griffin 🦅",
  "Dragon 🐉",
  "Kraken 🐙",
  "Knight 🗡",
  "Viking ⚔️",
  "Spartan 🛡",
  "Ranger 🔫",
  "Gladiator 🗡",
  "Archer 🏹",
  "Guardian 💍",
  "Sentinel 🛡️",
  "Ghost 👻",
  "Saint 😇",
];

async function getUserAlias(userId) {
  try {
    // Convert userId to string before using it as a document ID
    const userIdStr = String(userId);
    console.log("Retrieving alias for userId:", userIdStr);

    if (!userIdStr) {
      throw new Error("Invalid userId: UserId cannot be empty or undefined.");
    }

    // Run a Firestore transaction to prevent race conditions
    return await db.runTransaction(async (transaction) => {
      const userRef = db.collection("user_aliases").doc(userIdStr);
      const userDoc = await transaction.get(userRef);

      if (userDoc.exists) {
        // User already has an alias, return it
        return userDoc.data().alias;
      }

      // Generate a new alias if the user does not have one
      const usedAliasesSnapshot = await db.collection("user_aliases").get();
      const usedAliases = usedAliasesSnapshot.docs.map(
        (doc) => doc.data().alias
      );
      const availableAliases = aliasList.filter(
        (alias) => !usedAliases.includes(alias)
      );

      if (availableAliases.length === 0) {
        throw new Error("Failed to generate alias: No available aliases.");
      }

      const newAlias =
        availableAliases[Math.floor(Math.random() * availableAliases.length)];

      // Assign the new alias and save it
      transaction.set(userRef, { alias: newAlias });
      return newAlias;
    });
  } catch (error) {
    console.error("Error fetching or generating alias:", error);
    return "Unknown"; // Return "Unknown" if there was an error
  }
}

module.exports = { getUserAlias };
