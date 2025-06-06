// commandes pour configurer le bot et accéder à l'interface d'adminstration https://dashboard.astron-collection.com/

const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { getConfig } = require('../../utils/config'); // Assurez-vous que cette fonction est définie
const fetch = require('node-fetch'); // Ou utilisez axios si vous préférez

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('Configure le bot et accède à l\'interface d\'administration')
        .addStringOption(option =>
            option.setName('action')
                .setDescription('L\'action à effectuer (ex: set, get, dashboard)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('key')
                .setDescription('La clé de configuration à modifier ou récupérer')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('value')
                .setDescription('La valeur à définir pour la clé de configuration')
                .setRequired(false)),

    async execute(interaction) {
        const action = interaction.options.getString('action');
        const key = interaction.options.getString('key');
        const value = interaction.options.getString('value');
        const guildId = interaction.guild.id;

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({ content: '🚫 Vous n\'avez pas la permission d\'effectuer cette action.', ephemeral: true });
        }

        try {
            if (action === 'get') {
                const configValue = await getConfig(key);
                return interaction.reply({ content: `🧩 **${key}** → \`${configValue ?? 'Non défini'}\``, ephemeral: true });
            } else if (action === 'set' && key && value) {
                // Implémentez votre logique ici
                // await setConfig(key, value);
                return interaction.reply({ content: `✅ La clé **${key}** a été définie sur : \`${value}\``, ephemeral: true });
            } else if (action === 'dashboard') {
                const dashboardUrl = `https://dashboard.astron-collection.com/${guildId}`;

                // Appel API pour logger la visite (facultatif)
                await fetch(`https://api.astron-collection.com/track-dashboard`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        guild_id: guildId,
                        user_id: interaction.user.id,
                        action: 'open_dashboard_from_config',
                    }),
                }).catch(() => { /* Ignore en cas d’échec */ });

                const embed = new EmbedBuilder()
                    .setTitle('🔧 Astron Dashboard')
                    .setDescription(`Configurez **${interaction.guild.name}** directement via l’interface web.`)
                    .setColor(0x2B2D31)
                    .setURL(dashboardUrl)
                    .setFooter({ text: 'Astron • Guild Configuration' })
                    .setTimestamp();

                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setLabel('Ouvrir le dashboard')
                        .setStyle(ButtonStyle.Link)
                        .setURL(dashboardUrl)
                );

                return interaction.reply({
                    embeds: [embed],
                    components: [row],
                    ephemeral: true,
                });
            } else {
                return interaction.reply({ content: '❓ Action non reconnue ou paramètres manquants.', ephemeral: true });
            }
        } catch (error) {
            console.error('[ERREUR] Commande /config :', error);
            return interaction.reply({ content: '❌ Une erreur est survenue lors de la configuration.', ephemeral: true });
        }
    },
};