// commande pour mute un utilisateur 

const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute a user')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to mute')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('duration')
                .setDescription('Duration to mute the user (in minutes)')
                .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const duration = interaction.options.getInteger('duration');

        // Vérifiez si l'utilisateur a les permissions nécessaires
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
            return interaction.reply({ content: 'Vous n\'avez pas la permission de muter des membres.', ephemeral: true });
        }

        // Mute l'utilisateur
        await muteUser(target, duration);

        // Créez un embed pour confirmer le mute
        const embed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('Utilisateur muté')
            .setDescription(`L'utilisateur ${target.username} a été muté pendant ${duration} minutes.`);

        await interaction.reply({ embeds: [embed] });
    }
};