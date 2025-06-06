// commande pour unmute un utilisateur 

const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const { getConfig } = require('../../utils/config'); // Assurez-vous que cette fonction est définie
const { unmuteUser } = require('../../utils/moderation'); // Assurez-vous que cette fonction est définie

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Unmute un utilisateur')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('L\'utilisateur à unmute')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return interaction.reply({ content: '🚫 Vous n\'avez pas la permission de unmute des utilisateurs.', ephemeral: true });
        }

        try {
            await unmuteUser(user.id, interaction.guild.id);
            const embed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('🔊 Utilisateur unmuté avec succès')
                .setDescription(`L'utilisateur <@${user.id}> a été unmuté.`);

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Erreur lors du unmute de l\'utilisateur :', error);
            return interaction.reply({ content: 'Une erreur est survenue lors du unmute de l\'utilisateur.', ephemeral: true });
        }
    },
};