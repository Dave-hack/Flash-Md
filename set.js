const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUU5PZXBmK1NsM01ObHh0MDAzWVRDa25Bdy9rMzRDOU12MlNhVVNaaldHaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZTRDOUE0RGw3N2RraUpZS205SDF0UzFEZlhMbmxmRG8zcGF4QmNiZTVSND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrSXNONHc2TXdPdUNuMHZZOUowS24rNnZyLzE5V0xEdmo5cENseS95d1VFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwVVo3aHVSck1EQWdSYzA1QVBNMWdWUmJXQ3oxUklPWmIxTkNNbkZRaFZRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1NOG9LdTVOKzV2cUkybUg5UmNLQkR4dFBBMFRpeE02cUc2ODlFRGFFMVk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRCU2dqMVQ4d09QSjQwVnU5ODM4WXAxQ0p1RXJTNnRpRlJFWmFQZ2xZbEU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0tUR08zaDg4dngxSGhYaVF5cTBCd001VWhxSHlHU21CNFJxQjZ6QVlHaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQVh5UzZqTWFGblZTbVZkWWFNZXlVTWlCQUI4eGxlTmlYc3lHTURlVjN5cz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikx1MDBNcHM3WnQ1QXo5RHFEOXZVMWlCeGphRlFDTWxYS3BVVUtxM1R3b0NqNmlOeUpMa0E5TEliemh4QjBvUmhKRnU4YjRRMUZQSktsV2tPRnk5SmpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODAsImFkdlNlY3JldEtleSI6InJDUlBkSTZzcitLeDdkSHVTVThaL3pqN0k1dGxaOTMzMGN3WC9aMFFkUzg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlRoaWVxZzJ2U3lXTHNoYU4zSE5PbHciLCJwaG9uZUlkIjoiZGMzNjU1NmYtZDU3ZS00YjE5LWEyMTktNmUyMTJjZDM2NTI2IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZ0d2NQdVYzbEZFdFU2ekZSTTRHM1hCdVdEST0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwMzVOTTA4NFBFUTB2dVdsVHByVS9SallLd1k9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiVk0yNVk5TFgiLCJtZSI6eyJpZCI6IjIyODc5Njk5Nzk5OjMwQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPaVppNGdHRUpyQ29yd0dHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJNYkxyY3Y3YUJpbkRHZ28rZStjT0x6b0VFMHBQZyt4eS9acUVUTHpablhNPSIsImFjY291bnRTaWduYXR1cmUiOiJjZCtqYXNYYUpYSEo0emhsaHpSRTg5QThsVGxZQzd4UFI4NFIxNTJJQk84Tm85eXpCc2RHaCtDRnpsOVZMUjUwYmxSK1JLZjJxNElpSUE2NTBqSHFCUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiQ3hQN1pScjQ4ajM1cFFZMExVZXl3NHpUS0NkRWZRZnZMaWMxMTBlYmtIeWdac2cxdWVTVHVuc3NrQjJCQVRidmo1TzduWmJ5RlI2OXdJdk1Oai9YaEE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMjg3OTY5OTc5OTozMEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUR3k2M0wrMmdZcHd4b0tQbnZuRGk4NkJCTktUNFBzY3YyYWhFeTgyWjF6In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM3MDA3Mzk5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUxQUyJ9',
    PREFIXES: (process.env.PREFIX || '💀').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "𝐊𝚰𝐘𝚯𝚻𝚫𝐊𝚫 𝚫𝐘𝚫𝚴𝚯𝐊𝚯𝐉𝚰 𝚻𝐃𝚫💀🩸",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "2",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'off',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
