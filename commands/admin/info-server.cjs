const { SlashCommandBuilder, EmbedBuilder, ChannelType, GuildVerificationLevel, GuildExplicitContentFilter, GuildNSFWLevel } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info-server')
        .setDescription('Donne des informations sur le serveur.'),
    async execute(interaction) {
        try {
            // 1. On informe Discord qu'on a bien reçu la commande et qu'on prépare la réponse.
            // Cela nous donne 15 minutes pour terminer, au lieu de 3 secondes.
            await interaction.deferReply();

            const { guild } = interaction;
            const { members, channels, emojis, roles, stickers } = guild;

            // Le chargement des membres peut être long, c'est souvent la cause du timeout.
            await members.fetch();

            const sortedRoles = roles.cache.map(role => role).slice(1, roles.cache.size).sort((a, b) => b.position - a.position);
            const userRoles = sortedRoles.filter(role => !role.managed).map(role => role.toString());
            const managedRoles = sortedRoles.filter(role => role.managed).map(role => role.toString());
            const botCount = members.cache.filter(member => member.user.bot).size;

            const embed = new EmbedBuilder()
                .setColor("White")
                .setTitle(`Informations sur le serveur ${guild.name}`)
                .setThumbnail(guild.iconURL({ size: 1024 }))
                .setImage(guild.bannerURL({ size: 1024 }))
                .addFields(
                    { name: "Général", value: [
                        `**Nom** : ${guild.name}`,
                        `**ID** : ${guild.id}`,
                        `**Créateur** : <@${guild.ownerId}>`,
                        `**Date de création** : <t:${parseInt(guild.createdTimestamp / 1000)}:R>`,
                    ].join("\n"), inline: true },
                    { name: "Utilisateurs", value: [
                        `**Membres** : ${guild.memberCount}`,
                        `**Humains** : ${guild.memberCount - botCount}`,
                        `**Bots** : ${botCount}`,
                    ].join("\n"), inline: true },
                    { name: "Salons", value: [
                        `**Salons textuels** : ${channels.cache.filter(c => c.type === ChannelType.GuildText).size}`,
                        `**Salons vocaux** : ${channels.cache.filter(c => c.type === ChannelType.GuildVoice).size}`,
                        `**Threads** : ${channels.cache.filter(c => c.type === ChannelType.PublicThread || c.type === ChannelType.PrivateThread).size}`,
                        `**Catégories** : ${channels.cache.filter(c => c.type === ChannelType.GuildCategory).size}`,
                        `**Stages** : ${channels.cache.filter(c => c.type === ChannelType.GuildStageVoice).size}`,
                        `**Forums** : ${channels.cache.filter(c => c.type === ChannelType.GuildForum).size}`,
                    ].join("\n"), inline: true },
                    { name: "Emojis & Stickers", value: [
                        `**Emojis animés** : ${emojis.cache.filter(e => e.animated).size}`,
                        `**Emojis statiques** : ${emojis.cache.filter(e => !e.animated).size}`,
                        `**Stickers** : ${stickers.cache.size}`,
                    ].join("\n"), inline: true },
                    { name: "Niveau de sécurité", value: [
                        `**Niveau de vérification** : ${GuildVerificationLevel[guild.verificationLevel]}`,
                        `**Filtre de contenu explicite** : ${GuildExplicitContentFilter[guild.explicitContentFilter]}`,
                        `**Niveau NSFW** : ${GuildNSFWLevel[guild.nsfwLevel]}`,
                    ].join("\n"), inline: true },
                    { name: "Boosts", value: [
                        `**Niveau** : ${guild.premiumTier || "Aucun"}`,
                        `**Nombre de boosts** : ${guild.premiumSubscriptionCount}`,
                        `**Boosters** : ${guild.members.cache.filter(m => m.premiumSince).size}`,
                    ].join("\n"), inline: true },
                    { name: `Rôles (${roles.cache.size})`, value: userRoles.slice(0, 10).join(", ") || "Aucun" },
                    { name: `Rôles de bots (${managedRoles.length})`, value: managedRoles.slice(0, 10).join(", ") || "Aucun" }
                );

            await interaction.editReply({ embeds: [embed] });

        } catch (err) {
            console.error(err);
            if (interaction.deferred || interaction.replied) {
                await interaction.editReply({ content: 'Une erreur est survenue lors de la récupération des informations du serveur.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'Une erreur est survenue lors de la récupération des informations du serveur.', ephemeral: true });
            }
        }
    }
};