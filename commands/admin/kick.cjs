const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType
} = require('discord.js');

// Cooldowns en mémoire
const cooldowns = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('👢 Expulser un utilisateur du serveur')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('L\'utilisateur à expulser')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('La raison de l\'expulsion')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'Aucune raison fournie';

        const now = Date.now();
        const cooldown = cooldowns.get(interaction.user.id);

        if (cooldown && now - cooldown < 30_000) {
            const timeLeft = Math.ceil((30_000 - (now - cooldown)) / 1000);
            return interaction.reply({ content: `⏳ Tu dois attendre encore ${timeLeft} seconde(s) avant de réutiliser cette commande.`, ephemeral: true });
        }

        // Vérifie si le membre ciblé est bien sur le serveur
        const member = await interaction.guild.members.fetch(user.id).catch(() => null);
        if (!member) {
            return interaction.reply({ content: '❌ L\'utilisateur n\'est pas sur ce serveur.', ephemeral: true });
        }

        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.KickMembers)) {
            return interaction.reply({ content: '❌ Je n\'ai pas la permission d\'expulser des membres.', ephemeral: true });
        }

        if (!member.kickable) {
            return interaction.reply({ content: '❌ Je ne peux pas expulser cet utilisateur (rôle trop élevé ?).', ephemeral: true });
        }

        // Créer les boutons de confirmation
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('confirm_kick')
                .setLabel('✅ Confirmer')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId('cancel_kick')
                .setLabel('❌ Annuler')
                .setStyle(ButtonStyle.Secondary)
        );

        await interaction.reply({
            content: `❗ Veux-tu vraiment expulser **${user.tag}** ?`,
            components: [row],
            ephemeral: true
        });

        const collector = interaction.channel.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: 15_000,
            max: 1
        });

        collector.on('collect', async i => {
            if (i.user.id !== interaction.user.id) {
                return i.reply({ content: '❌ Tu ne peux pas confirmer cette action.', ephemeral: true });
            }

            if (i.customId === 'cancel_kick') {
                await i.update({ content: '❌ Expulsion annulée.', components: [] });
                return;
            }

            try {
                await member.kick(reason);
                cooldowns.set(interaction.user.id, Date.now());

                await i.update({ content: `✅ **${user.tag}** a été expulsé.\n📄 Raison : ${reason}`, components: [] });

                // Envoi du log dans le salon #logs
                const logChannel = interaction.guild.channels.cache.find(c => c.name === 'logs' && c.isTextBased());
                if (logChannel) {
                    logChannel.send({
                        content: `👢 **${user.tag}** a été expulsé par **${interaction.user.tag}**\n📄 Raison : ${reason}`
                    });
                }
            } catch (error) {
                console.error('Erreur lors de l\'expulsion :', error);
                await i.update({ content: '❌ Une erreur est survenue pendant l\'expulsion.', components: [] });
            }
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                interaction.editReply({ content: '⏱️ Temps écoulé. Expulsion annulée.', components: [] });
            }
        });
    },
};