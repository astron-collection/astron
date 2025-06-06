// commandes pour créer des annonces dans un salon spécifique
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const { getChannelByName } = require('../../utils/channel'); // Assurez-vous que cette fonction est définie dans utils/channel.js   

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('Crée une annonce dans un salon spécifique')
        .addStringOption(option =>
            option.setName('channel')
                .setDescription('Le nom du salon où publier l\'annonce')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Le message de l\'annonce')
                .setRequired(true)),
    async execute(interaction) {
        const channelName = interaction.options.getString('channel');
        const messageContent = interaction.options.getString('message');
        const channel = getChannelByName(interaction.guild, channelName);

        if (!channel) {
            return interaction.reply({ content: `Le salon "${channelName}" n'existe pas.`, ephemeral: true });
        }

        if (!interaction.member.permissionsIn(channel).has(Permissions.FLAGS.SEND_MESSAGES)) {
            return interaction.reply({ content: 'Vous n\'avez pas la permission d\'envoyer des messages dans ce salon.', ephemeral: true });
        }

        try {
            await channel.send(messageContent);
            return interaction.reply({ content: `Annonce envoyée dans le salon "${channelName}".`, ephemeral: true });
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'annonce :', error);
            return interaction.reply({ content: 'Une erreur est survenue lors de l\'envoi de l\'annonce.', ephemeral: true });
        }
    },
};