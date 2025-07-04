const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const logger = require('../../utils/logger.cjs');

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
        logger.info(`↪️ /ban exécuté par ${interaction.user.tag} (${interaction.user.id}) dans ${interaction.guild.name}`);

        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'Aucune raison fournie';

        logger.info(`👤 Cible : ${user.tag} (${user.id}) | Raison : ${reason}`);

        if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            logger.warn(`⛔ ${interaction.user.tag} n'a pas la permission BAN_MEMBERS`);
            return interaction.reply({ content: 'Vous n\'avez pas la permission de bannir des membres.', ephemeral: true });
        }

        const member = interaction.guild.members.cache.get(user.id);
        if (!member) {
            logger.warn(`❌ ${user.tag} introuvable dans ${interaction.guild.name}`);
            return interaction.reply({ content: 'Utilisateur non trouvé dans le serveur.', ephemeral: true });
        }

        if (!member.bannable) {
            logger.warn(`🚫 Bannissement impossible de ${user.tag} par le bot`);
            return interaction.reply({ content: 'Je ne peux pas bannir cet utilisateur (rôle supérieur ?).', ephemeral: true });
        }

        try {
            logger.info(`🚀 Tentative de bannissement de ${user.tag}...`);
            await member.ban({ reason });
            logger.info(`✅ ${user.tag} banni avec succès`);
            return interaction.reply({ content: `L'utilisateur ${user.tag} a été banni avec succès.`, ephemeral: true });
        } catch (error) {
            logger.error(`❌ Erreur lors du bannissement de ${user.tag} : ${error.message}`);
            return interaction.reply({ content: 'Erreur lors du bannissement.', ephemeral: true });
        }
    },
};