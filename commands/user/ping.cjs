const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('📡 Vérifie si le bot répond'),

  async execute(interaction) {
    try {
      await interaction.reply('🏓 Pong ! Le bot est bien vivant.');
    } catch (error) {
      console.error('Erreur dans la commande /ping :', error);
      if (!interaction.replied) {
        await interaction.reply({ content: '❌ Une erreur est survenue.', ephemeral: true });
      }
    }
  },
};