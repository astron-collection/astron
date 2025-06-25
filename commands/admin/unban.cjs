// commandes admin pour débannir un utilisateur

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Débannir un utilisateur')
        .addStringOption(option =>
            option.setName('user_id')
                .setDescription('L\'ID de l\'utilisateur à débannir')
                .setRequired(true)),
    async execute(interaction) {
        const userId = interaction.options.getString('user_id');

        if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            return interaction.reply({ content: 'Vous n\'avez pas la permission de débannir des membres.', ephemeral: true });
        }

        try {
            const user = await getUserById(userId);
            const ban = await getBanByUserId(userId);

            if (!user || !ban) {
                return interaction.reply({ content: 'Utilisateur non trouvé ou non banni.', ephemeral: true });
            }

            await interaction.guild.members.unban(userId);
            return interaction.reply({ content: `L'utilisateur ${user.tag} a été débanni avec succès.`, ephemeral: true });
        } catch (error) {
            console.error('Erreur lors du débannissement de l\'utilisateur :', error);
            return interaction.reply({ content: 'Une erreur est survenue lors du débannissement de l\'utilisateur.', ephemeral: true });
        }
    },
};