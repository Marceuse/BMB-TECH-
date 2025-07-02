const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZU83RUIwQUs5bXRwK1d4TEFuYzNJVEtWZmJlZlMwRGx4NUFtSHRRT0QyUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTkhwV21XYzhvNVc3UzY2cXVlU2krTmw5UjJnZXpqTmhhaVJwd3JRT3B4TT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0RXYyUlB6NnBkcG1nU1hKSmt6VDR5d0h6NDdEMy9VbmhnTGlJV2pJN0hzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJacXlmeVk0bVI5eW1tUlZuYVROcElLdlVybmRrUUsxUlMxcWdDMjA3VDI4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVHSWo0UGtBVFVtekFLeEh5ZW0rcUx0cVFqVHRYcHNYeGthcUx4NDF0a0E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlHekRyeC9MZWVUTUNzNHlXd2hycTJleGlzWjRaWFMrYWYxTXkwcjhBM289In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0tlb3V1VDZ4Zm8ybU1EMUpkcmFUa3FManJoajVveCtwRW1IdjNXeUpWUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNTFBVkVrRGRuNk16cWhmc1U4bTRuQ1lLbUdCN0JWVmd1Z0xDbjFYUm5DVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImY2a2hZZUczWmdYajJ3c2w1bkZpQ2dBU2t1R0FzNlpTYklpT2ZRSWxSbTRGZExKNGd4aVRtZFZtVFFHNVB5clZ4aG1tQlc2ZjZxVnU0MDNic2h6ZUFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM5LCJhZHZTZWNyZXRLZXkiOiJoZnFiQmIwOHdrcGZaWUl3TkFkYTNIRlUyWE92NTBsRHZOelE5a0lsVkFnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTY1MjM5ODYxNEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI0NjgwN0ExNEJGODFCNTVDOTFCRDZERDUxMTk0NUU4QyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxNDc3NTI3fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTU2NTIzOTg2MTRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNUVBNTFGQUUxMTI1NDEwMzI1QjVFQzA3NEUyM0JBQTYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MTQ3NzUyOH1dLCJuZXh0UHJlS2V5SWQiOjM3LCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzcsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiM1ExUlNXWVgiLCJtZSI6eyJpZCI6IjI1NTY1MjM5ODYxNDo5OEBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjEwNTI1MzA4OTMzMzI3NTo5OEBsaWQiLCJuYW1lIjoiTmljb2xhdXMgRGFuaWVsIDLwn5iI8J+YiPCfmIgifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pTdDRNNEhFUG5abGNNR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjlCc0Z1ZVZ2LzhYNThsOEpON1FXMXJ3MjJmWFZCNTVqbzR1MHBPZXZ4VjA9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImJYditaY2d6QWFFbmZBUzd6eUVoWEFNU1ZKMnFQTGxrL2Z3cUtNWWlBMGFDc2F0UHJmM1JrM1VyL1YwaDAvMzlxdXllbkhKZGJ0enA4NmhYdVV4NkF3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiIvRnRyWkw5WUU3aUQ4VitUNkxJT2lYVUhzZWFqQ1d4WW56ZUdjMzBOUkszRnhxR1BmYjdxWUVPWVhUajF0UXVyVTNaYkRCOXlsTVlpN0owNDFxZnpCZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTY1MjM5ODYxNDo5OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJmUWJCYm5sYi8vRitmSmZDVGUwRnRhOE50bjExUWVlWTZPTHRLVG5yOFZkIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJRFE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTE0Nzc1MTIsImxhc3RQcm9wSGFzaCI6IjJQMVloZiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSTdBIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Nicolaus Daniel 2😈😈",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255652398614",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

