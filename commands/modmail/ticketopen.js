// commande pour initiliaser le module de ticket modmail sur un salon spécifique

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const { getChannelByName } = require('../../utils/channel'); // Assurez-vous que cette fonction est définie dans utils/channel.js
const { getConfig, setConfig } = require('../../utils/config'); // Assurez-vous que ces fonctions sont définies dans utils/config.js

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticketopen')
        .setDescription('Configurer le salon pour les tickets modmail')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Le salon où les tickets modmail seront ouverts')
                .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');

        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return interaction.reply({ content: 'Vous n\'avez pas la permission de configurer les tickets modmail.', ephemeral: true });
        }

        try {
            await setConfig('modmailChannel', channel.id);
            return interaction.reply({ content: `Le salon pour les tickets modmail a été configuré avec succès : ${channel.name}`, ephemeral: true });
        } catch (error) {
            console.error('Erreur lors de la configuration du salon de tickets modmail :', error);
            return interaction.reply({ content: 'Une erreur est survenue lors de la configuration du salon de tickets modmail.', ephemeral: true });
        }
    },
};