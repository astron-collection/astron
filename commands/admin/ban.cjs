const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

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
        console.log('↪️ Commande /ban exécutée');

        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'Aucune raison fournie';

        console.log(`👤 Utilisateur ciblé : ${user.tag} (${user.id})`);
        console.log(`📄 Raison : ${reason}`);

        // Vérification des permissions du membre appelant la commande
        if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            console.warn('⛔ Permission manquante : BAN_MEMBERS');
            return interaction.reply({ content: 'Vous n\'avez pas la permission de bannir des membres.', ephemeral: true });
        }

        // Récupération du membre dans le cache
        const member = interaction.guild.members.cache.get(user.id);
        if (!member) {
            console.warn('❌ Membre introuvable dans le cache du serveur');
            return interaction.reply({ content: 'Utilisateur non trouvé dans le serveur.', ephemeral: true });
        }

        // Vérification de bannissabilité
        if (!member.bannable) {
            console.warn('🚫 Le bot ne peut pas bannir ce membre (rôle supérieur ou non autorisé)');
            return interaction.reply({ content: 'Je ne peux pas bannir cet utilisateur (rôle supérieur ?).', ephemeral: true });
        }

        try {
            console.log(`🚀 Tentative de bannissement de ${member.user.tag}...`);
            await member.ban({ reason });
            console.log(`✅ Bannissement réussi pour ${member.user.tag}`);
            return interaction.reply({ content: `L'utilisateur ${user.tag} a été banni avec succès.`, ephemeral: true });
        } catch (error) {
            console.error('❌ Erreur lors du bannissement :', error);
            return interaction.reply({ content: 'Erreur lors du bannissement.', ephemeral: true });
        }
    },
};