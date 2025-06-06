// commands pour bannir un utilisateur du serveur 

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const { getUserById } = require('../../utils/user'); // Assurez-vous que cette fonction est définie dans utils/user.js

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('🧑‍⚖️ Bannir un utilisateur du serveur')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('L\'utilisateur à bannir')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('La raison du bannissement')
                .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'Aucune raison fournie';

        if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            return interaction.reply({ content: 'Vous n\'avez pas la permission de bannir des membres.', ephemeral: true });
        }

        try {
            await interaction.guild.members.ban(user, { reason });
            return interaction.reply({ content: `L'utilisateur ${user.tag} a été banni avec succès.`, ephemeral: true });
        } catch (error) {
            console.error('Erreur lors du bannissement de l\'utilisateur :', error);
            return interaction.reply({ content: 'Une erreur est survenue lors du bannissement de l\'utilisateur.', ephemeral: true });
        }
    },
};