const { Client, GatewayIntentBits, Collection, ActivityType } = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

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

client.once("ready", async () => {
    console.log(`✅ Le bot est connecté en tant que ${client.user.tag}`);

    // Définit le statut du bot
    client.user.setPresence({
        activities: [
            {
                name: "Sky Genesis Enterprise",
                type: ActivityType.Streaming,
                url: "https://www.youtube.com/watch?v=jfKfPfyJRdk"
            }
        ],
        status: "online", // dnd, invisible, online, idle
    });
});

// Connexion du bot
client.login(process.env.BOT_TOKEN);