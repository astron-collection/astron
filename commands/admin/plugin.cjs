const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');
const fetch = require('node-fetch');

const ASTRON_API_URL = process.env.ASTRON_API_URL || 'https://api.astron-collection.com';
const API_KEY = process.env.ASTRON_API_KEY;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('plugins')
    .setDescription('Gérer les plugins sur ce serveur')
    .addSubcommand(sub =>
      sub
        .setName('install')
        .setDescription('Installer un plugin')
        .addStringOption(option =>
          option
            .setName('name')
            .setDescription('Nom du plugin à installer')
            .setRequired(true),
        ),
    )
    .addSubcommand(sub =>
      sub
        .setName('uninstall')
        .setDescription('Désinstaller un plugin')
        .addStringOption(option =>
          option
            .setName('name')
            .setDescription('Nom du plugin à désinstaller')
            .setRequired(true),
        ),
    )
    .addSubcommand(sub =>
      sub
        .setName('list')
        .setDescription('Lister les plugins installés'),
    ),

  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const guildId = interaction.guildId;
    const pluginName = interaction.options.getString('name');
    const member = interaction.member;

    if (!member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
      return interaction.reply({ content: "⛔ Tu n'as pas la permission de gérer les plugins.", ephemeral: true });
    }

    try {
      if (subcommand === 'install') {
        const res = await fetch(`${ASTRON_API_URL}/plugins/install`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            guildId,
            plugin: pluginName,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Une erreur est survenue');

        return interaction.reply(`✅ Plugin \`${pluginName}\` installé avec succès.`);
      }

      if (subcommand === 'uninstall') {
        const res = await fetch(`${ASTRON_API_URL}/plugins/uninstall`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            guildId,
            plugin: pluginName,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Une erreur est survenue');

        return interaction.reply(`🗑️ Plugin \`${pluginName}\` désinstallé.`);
      }

      if (subcommand === 'list') {
        const res = await fetch(`${ASTRON_API_URL}/plugins/list?guildId=${guildId}`, {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Impossible de récupérer les plugins.');

        if (!data.plugins || data.plugins.length === 0) {
          return interaction.reply(`📭 Aucun plugin installé sur ce serveur.`);
        }

        const pluginList = data.plugins.map(p => `• \`${p}\``).join('\n');
        return interaction.reply(`📦 Plugins installés :\n${pluginList}`);
      }

    } catch (err) {
      console.error(err);
      return interaction.reply({ content: `❌ Erreur lors du traitement : ${err.message}`, ephemeral: true });
    }
  },
};