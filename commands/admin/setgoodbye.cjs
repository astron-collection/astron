// commandes pour initialiser le système de message d'au revoir

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setgoodbye')
        .setDescription('Configurer le message d\'au revoir pour les membres qui quittent le serveur')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Le salon où envoyer le message d\'au revoir')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Le message d\'au revoir à envoyer')
                .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const message = interaction.options.getString('message');

        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return interaction.reply({ content: 'Vous n\'avez pas la permission de configurer le message d\'au revoir.', ephemeral: true });
        }

        try {
            await setConfig('goodbyeChannel', channel.id);
            await setConfig('goodbyeMessage', message);
            return interaction.reply({ content: `Le message d'au revoir a été configuré pour le salon ${channel.name} avec le message : "${message}"`, ephemeral: true });
        } catch (error) {
            console.error('Erreur lors de la configuration du message d\'au revoir :', error);
            return interaction.reply({ content: 'Une erreur est survenue lors de la configuration du message d\'au revoir.', ephemeral: true });
        }
    },
};