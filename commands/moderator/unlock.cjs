// commande pour déverouiller un salon spécifique 

const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('Déverrouille un salon pour permettre aux utilisateurs d\'envoyer des messages')
        .addStringOption(option =>
            option.setName('channel')
                .setDescription('Le nom du salon à déverrouiller')
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
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: true });
            const embed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('Salon déverrouillé')
                .setDescription(`Le salon ${channel.name} a été déverrouillé avec succès.`);
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Erreur lors du déverrouillage du salon :', error);
            return interaction.reply({ content: 'Une erreur est survenue lors du déverrouillage du salon.', ephemeral: true });
        }
    },
};