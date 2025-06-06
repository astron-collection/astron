// server.js
const { Client, GatewayIntentBits } = require("discord.js");
const dotenv = require("dotenv");
const { startPresenceCycle } = require("./utils/statusManager");

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
    ],
});

client.once("ready", () => {
    console.log(`✅ Le bot est connecté en tant que ${client.user.tag}`);
    startPresenceCycle(client);
});

client.login(process.env.BOT_TOKEN);