const { Client, GatewayIntentBits, ActivityType } = require("discord.js");
const dotenv = require("dotenv");

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

function startPresenceCycle(client) {
    let toggle = true;

    setInterval(() => {
        const guildCount = client.guilds.cache.size;
        const userCount = client.guilds.cache.reduce((acc, guild) => acc + (guild.memberCount || 0), 0);

        const presenceText = toggle
            ? `${guildCount} guild`
            : `${userCount.toLocaleString()} users`; // formate avec virgules

        client.user.setPresence({
            activities: [
                {
                    name: presenceText,
                    type: ActivityType.Streaming,
                    url: "https://www.youtube.com/watch?v=jfKfPfyJRdk"
                }
            ],
            status: "online",
        });

        toggle = !toggle;
    }, 2000); // toutes les 2 secondes
}

client.once("ready", () => {
    console.log(`✅ Le bot est connecté en tant que ${client.user.tag}`);
    startPresenceCycle(client);
});

client.login(process.env.BOT_TOKEN);