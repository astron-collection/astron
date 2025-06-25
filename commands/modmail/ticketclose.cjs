// commande pour fermer manuellement un ticket modmail

const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticketclose')
        .setDescription('Ferme manuellement un ticket modmail')
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('La raison de la fermeture du ticket')
                .setRequired(false)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return interaction.reply({ content: '🚫 Vous n\'avez pas la permission de fermer des tickets.', ephemeral: true });
        }

        const ticket = await getTicketByChannel(interaction.channel);
        if (!ticket) {
            return interaction.reply({ content: 'Ce salon n\'est pas un ticket modmail.', ephemeral: true });
        }

        const reason = interaction.options.getString('reason') || 'Aucune raison fournie';

        try {
            await closeTicket(ticket.id, reason);
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('🎟️ Ticket fermé avec succès')
                .setDescription(`Le ticket a été fermé. Raison : ${reason}`);

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Erreur lors de la fermeture du ticket :', error);
            return interaction.reply({ content: 'Une erreur est survenue lors de la fermeture du ticket.', ephemeral: true });
        }
    },
};