// commands discord pour lister les logs du serveur 
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { getLogs } = require('../../utils/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('logs')
        .setDescription('Affiche les logs du serveur'),
    async execute(interaction) {
        try {
            const logs = await getLogs(); // Récupérer les logs via la fonction définie dans utils/logger.js
            if (!logs || logs.length === 0) {
                return interaction.reply({ content: 'Aucun log trouvé.', ephemeral: true });
            }

            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Logs du serveur')
                .setDescription(logs.join('\n')) // Joindre les logs avec des sauts de ligne
                .setTimestamp();

            return interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Erreur lors de l\'exécution de la commande /logs:', error);
            return interaction.reply({ content: 'Une erreur est survenue lors de la récupération des logs.', ephemeral: true });
        }
    },
};