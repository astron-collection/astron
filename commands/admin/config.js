// commandes pour configurer le bot et accéder à l'interface d'adminstration https://dashboard.astron-collection.com/
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const { getChannelByName } = require('../../utils/channel'); // Assurez-vous que cette fonction est définie dans utils/channel.js
const { getConfig } = require('../../utils/config'); // Assurez-vous que cette fonction est définie dans utils/config.js

module.exports = {  
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('Configure le bot et accède à l\'interface d\'administration')
        .addStringOption(option =>
            option.setName('action')
                .setDescription('L\'action à effectuer (ex: set, get)')
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

        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return interaction.reply({ content: 'Vous n\'avez pas la permission d\'effectuer cette action.', ephemeral: true });
        }

        try {
            if (action === 'get') {
                const configValue = await getConfig(key);
                return interaction.reply({ content: `La valeur de la clé "${key}" est : ${configValue}`, ephemeral: true });
            } else if (action === 'set' && key && value) {
                // Ici, vous devez implémenter la logique pour mettre à jour la configuration
                // await setConfig(key, value); // Assurez-vous que cette fonction est définie dans utils/config.js
                return interaction.reply({ content: `La clé "${key}" a été mise à jour avec la valeur : ${value}`, ephemeral: true });
            } else {
                return interaction.reply({ content: 'Action non reconnue ou paramètres manquants.', ephemeral: true });
            }
        } catch (error) {
            console.error('Erreur lors de l\'exécution de la commande /config:', error);
            return interaction.reply({ content: 'Une erreur est survenue lors de la configuration.', ephemeral: true });
        }
    },
};