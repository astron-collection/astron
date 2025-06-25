// commandes pour expulser un utilisateur du serveur

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('👢 Expulser un utilisateur du serveur')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('L\'utilisateur à expulser')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('La raison de l\'expulsion')
                .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'Aucune raison fournie';

        if (!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            return interaction.reply({ content: 'Vous n\'avez pas la permission d\'expulser des membres.', ephemeral: true });
        }

        try {
            await interaction.guild.members.kick(user, { reason });
            return interaction.reply({ content: `L'utilisateur ${user.tag} a été expulsé avec succès.`, ephemeral: true });
        } catch (error) {
            console.error('Erreur lors de l\'expulsion de l\'utilisateur :', error);
            return interaction.reply({ content: 'Une erreur est survenue lors de l\'expulsion de l\'utilisateur.', ephemeral: true });
        }
    },
};