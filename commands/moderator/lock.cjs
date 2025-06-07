// commande pour vérouiller un salon spécifique pour empêcher les utilisateurs d'envoyer des messages

const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const { getChannelByName } = require('../../utils/channel'); // Assurez-vous que cette fonction est définie dans utils/channel.js
const { getConfig, setConfig } = require('../../utils/config'); // Assurez-vous que ces fonctions sont définies dans utils/config.js    

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('Verrouille un salon pour empêcher les utilisateurs d\'envoyer des messages')
        .addStringOption(option =>
            option.setName('channel')
                .setDescription('Le nom du salon à verrouiller')
                .setRequired(true)),
    async execute(interaction) {
        const channelName = interaction.options.getString('channel');
        const channel = getChannelByName(interaction.guild, channelName);

        if (!channel) {
            return interaction.reply({ content: `Le salon "${channelName}" n'existe pas.`, ephemeral: true });
        }

        if (!interaction.member.permissionsIn(channel).has(PermissionsBitField.Flags.ManageChannels)) {
            return interaction.reply({ content: 'Vous n\'avez pas la permission de gérer ce salon.', ephemeral: true });
        }

        try {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: false });
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Salon verrouillé')
                .setDescription(`Le salon ${channel.name} a été verrouillé avec succès.`);
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Erreur lors du verrouillage du salon :', error);
            return interaction.reply({ content: 'Une erreur est survenue lors du verrouillage du salon.', ephemeral: true });
        }
    },
};