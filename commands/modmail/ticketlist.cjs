// commande pour lister tout les tickets modmail ouverts dans le serveur

const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder } = require('discord.js');
const { getOpenTickets } = require('../../utils/ticket'); // Assurez-vous que cette fonction est définie
const { getConfig } = require('../../utils/config'); // Assurez-vous que cette fonction est définie

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticketlist')
        .setDescription('Liste tous les tickets modmail ouverts dans le serveur'),

    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return interaction.reply({ content: '🚫 Vous n\'avez pas la permission de lister les tickets.', ephemeral: true });
        }

        try {
            const tickets = await getOpenTickets(interaction.guild.id);
            if (tickets.length === 0) {
                return interaction.reply({ content: 'Aucun ticket modmail ouvert dans ce serveur.', ephemeral: true });
            }

            const embed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('🎟️ Liste des tickets modmail ouverts')
                .setDescription(tickets.map(ticket => `**ID:** ${ticket.id} | **Utilisateur:** <@${ticket.userId}> | **Salon:** <#${ticket.channelId}>`).join('\n'));

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Erreur lors de la récupération des tickets :', error);
            return interaction.reply({ content: 'Une erreur est survenue lors de la récupération des tickets.', ephemeral: true });
        }
    },
};