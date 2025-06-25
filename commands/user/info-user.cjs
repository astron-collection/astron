// commande d'information sur les statistiques des utilisateurs et des guildes pour les applications Astron

const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const fetchP = import("node-fetch");

const apps = [
  { name: "Astron Protect", apiEndpoint: "https://api.astron-collection.com/protect/stats" },
  { name: "Astron Logger", apiEndpoint: "https://api.astron-collection.com/logger/stats" },
  { name: "Astron Player", apiEndpoint: "https://api.astron-collection.com/player/stats" },
  { name: "Astron Modmail", apiEndpoint: "https://api.astron-collection.com/modmail/stats" },
  { name: "Guild Center", apiEndpoint: "https://api.astron-collection.com/guildcenter/stats" },
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info-user')
    .setDescription('Displays user and guild stats for Astron apps'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("📊 Astron Suite - User & Guild Stats")
      .setDescription("Current statistics of Astron applications.")
      .setColor("#57F287")
      .setTimestamp()
      .setFooter({ text: "Astron by Sky Genesis Enterprise", iconURL: interaction.client.user.displayAvatarURL() });

    // On récupère les stats de chaque app
    for (const app of apps) {
      try {
        const res = await fetch(app.apiEndpoint);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const stats = await res.json();
        // stats doit contenir { guildCount: number, userCount: number }

        embed.addFields({
          name: `🛠️ ${app.name}`,
          value: `Guilds: **${stats.guildCount}**\nUsers: **${stats.userCount.toLocaleString()}**`,
          inline: true,
        });
      } catch (error) {
        console.error(`Failed to fetch stats for ${app.name}:`, error);
        embed.addFields({
          name: `🛠️ ${app.name}`,
          value: `Unable to fetch stats.`,
          inline: true,
        });
      }
    }

    await interaction.reply({ embeds: [embed], ephemeral: false });
  },
};