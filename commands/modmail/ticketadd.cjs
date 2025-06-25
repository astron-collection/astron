// commande pour créer un ticket modmail manuellement pour un utilisateur spécifique

const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticketadd')
        .setDescription('Crée un ticket modmail pour un utilisateur spécifique')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('L\'utilisateur pour lequel créer le ticket')
                .setRequired(true)),

    async execute(interaction) {
        const user = interaction.options.getUser('user');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return interaction.reply({ content: '🚫 Vous n\'avez pas la permission de créer des tickets.', ephemeral: true });
        }

        try {
            const ticket = await createTicket(user.id, interaction.guild.id);
            const embed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('🎟️ Ticket créé avec succès')
                .setDescription(`Un ticket a été créé pour ${user.tag}. ID du ticket : ${ticket.id}`);

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Erreur lors de la création du ticket :', error);
            return interaction.reply({ content: 'Une erreur est survenue lors de la création du ticket.', ephemeral: true });
        }
    },
};