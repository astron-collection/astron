// commandes pour ajouter un rôle spécifique à un utilisateur 

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roleadd')
        .setDescription('Ajouter un rôle à un utilisateur')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('L\'utilisateur auquel ajouter le rôle')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('role')
                .setDescription('Le nom du rôle à ajouter')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const roleName = interaction.options.getString('role');
        const member = await interaction.guild.members.fetch(user.id);
        const role = getRoleByName(interaction.guild, roleName);

        if (!role) {
            return interaction.reply({ content: `Le rôle "${roleName}" n'existe pas.`, ephemeral: true });
        }

        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
            return interaction.reply({ content: 'Vous n\'avez pas la permission de gérer les rôles.', ephemeral: true });
        }

        try {
            await member.roles.add(role);
            return interaction.reply({ content: `Le rôle "${role.name}" a été ajouté à ${user.tag} avec succès.`, ephemeral: true });
        } catch (error) {
            console.error('Erreur lors de l\'ajout du rôle :', error);
            return interaction.reply({ content: 'Une erreur est survenue lors de l\'ajout du rôle.', ephemeral: true });
        }
    },
};