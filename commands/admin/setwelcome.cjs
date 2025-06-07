// commandes pour initialiser le module de bienvenue via un écouteur d'évènement 

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const { getChannelByName } = require('../../utils/channel'); // Assurez-vous que cette fonction est définie dans utils/channel.js
const { getConfig, setConfig } = require('../../utils/config'); // Assurez-vous que ces fonctions sont définies dans utils/config.js

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setwelcome')
        .setDescription('Configurer le message de bienvenue pour les nouveaux membres')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Le salon où envoyer le message de bienvenue')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Le message de bienvenue à envoyer')
                .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const message = interaction.options.getString('message');

        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return interaction.reply({ content: 'Vous n\'avez pas la permission de configurer le message de bienvenue.', ephemeral: true });
        }

        try {
            await setConfig('welcomeChannel', channel.id);
            await setConfig('welcomeMessage', message);
            return interaction.reply({ content: `Le message de bienvenue a été configuré pour le salon ${channel.name} avec le message : "${message}"`, ephemeral: true });
        } catch (error) {
            console.error('Erreur lors de la configuration du message de bienvenue :', error);
            return interaction.reply({ content: 'Une erreur est survenue lors de la configuration du message de bienvenue.', ephemeral: true });
        }
    },
};