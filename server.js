import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
import dotenv from "dotenv";
import { startPresenceCycle } from "./utils/statusManager.js";

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

client.on("guildCreate", async (guild) => {
  try {
    const modChannel = guild.channels.cache.find(
      (ch) =>
        ch.isTextBased() &&
        ch.name.toLowerCase().includes("moderator") &&
        ch.permissionsFor(guild.members.me).has("SendMessages")
    );

    const channelToSend =
      modChannel ||
      guild.channels.cache.find(
        (ch) =>
          ch.isTextBased() && ch.permissionsFor(guild.members.me).has("SendMessages")
      );

    if (!channelToSend) {
      console.log(`Pas de salon texte accessible pour envoyer un message dans ${guild.name}`);
      return;
    }

    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("👋 Nouveau serveur !")
      .setDescription(`Merci de m'avoir ajouté sur **${guild.name}** !`)
      .addFields(
        { name: "Que faire ?", value: "Utilise `/help` pour voir mes commandes disponibles." },
        { name: "Besoin d'aide ?", value: "Contacte le support ou consulte la documentation." }
      )
      .setFooter({ text: `Serveur ID: ${guild.id}` })
      .setTimestamp();

    await channelToSend.send({ embeds: [embed] });
  } catch (error) {
    console.error("Erreur lors de l'envoi du message embed de bienvenue :", error);
  }
});

client.login(process.env.BOT_TOKEN);