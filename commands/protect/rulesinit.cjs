// commandes pour initialiser le salon des règles du serveur avec une description personnalisée 

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const { getChannelByName } = require('../../utils/channel'); // Assurez-vous que cette fonction est définie dans utils/channel.js
const { getConfig, setConfig } = require('../../utils/config'); // Assurez-vous que ces fonctions sont définies dans utils/config.js

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rules-init')
        .setDescription('Initialiser le salon des règles du serveur avec une description personnalisée')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Le salon où envoyer les règles')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('description')
                .setDescription('La description des règles à envoyer')
                .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const description = interaction.options.getString('description');

        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return interaction.reply({ content: 'Vous n\'avez pas la permission de configurer les règles.', ephemeral: true });
        }

        try {
            await setConfig('rulesChannel', channel.id);
            await setConfig('rulesDescription', description);
            return interaction.reply({ content: `Les règles ont été configurées pour le salon ${channel.name} avec la description : "${description}"`, ephemeral: true });
        } catch (error) {
            console.error('Erreur lors de la configuration des règles :', error);
            return interaction.reply({ content: 'Une erreur est survenue lors de la configuration des règles.', ephemeral: true });
        }
    },
};