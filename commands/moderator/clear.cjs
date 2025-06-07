// commands pour nétoyer un salon spécifique 

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const { getChannelByName } = require('../../utils/channel'); // Assurez-vous que cette fonction est définie dans utils/channel.js

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Nettoie un salon spécifique')
        .addStringOption(option =>
            option.setName('channel')
                .setDescription('Le nom du salon à nettoyer')
                .setRequired(true)),
    async execute(interaction) {
        const channelName = interaction.options.getString('channel');
        const channel = getChannelByName(interaction.guild, channelName);

        if (!channel) {
            return interaction.reply({ content: `Le salon "${channelName}" n'existe pas.`, ephemeral: true });
        }

        if (!interaction.member.permissionsIn(channel).has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            return interaction.reply({ content: 'Vous n\'avez pas la permission de gérer les messages dans ce salon.', ephemeral: true });
        }

        try {
            const messages = await channel.messages.fetch({ limit: 100 });
            await channel.bulkDelete(messages);
            return interaction.reply({ content: `Le salon "${channelName}" a été nettoyé avec succès.`, ephemeral: true });
        } catch (error) {
            console.error('Erreur lors de la suppression des messages :', error);
            return interaction.reply({ content: 'Une erreur est survenue lors du nettoyage du salon.', ephemeral: true });
        }
    },
};