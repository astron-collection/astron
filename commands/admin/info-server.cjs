const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const path = require('path');

const storageFile = path.join(__dirname, '..', 'info-server-channels.json');

// Chargement et sauvegarde du JSON
function loadStorage() {
  if (!fs.existsSync(storageFile)) return {};
  return JSON.parse(fs.readFileSync(storageFile, 'utf8'));
}

function saveStorage(data) {
  fs.writeFileSync(storageFile, JSON.stringify(data, null, 2));
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info-server')
    .setDescription('Initialize info channels in a chosen category')
    .addChannelOption(option =>
      option.setName('category')
        .setDescription('Choose the category where to create info channels')
        .setRequired(true)
        .addChannelTypes(4) // 4 = GUILD_CATEGORY
    ),

  async execute(interaction) {
    const category = interaction.options.getChannel('category');

    if (!category || category.type !== 'GUILD_CATEGORY') {
      return interaction.reply({ content: 'Please select a valid category.', ephemeral: true });
    }

    const guildId = interaction.guild.id;

    // Créer les salons
    try {
      const channelsToCreate = [
        { name: 'global-guilds', topic: 'Global number of guilds across all bots' },
        { name: 'global-users', topic: 'Global number of users across all bots' },
        { name: 'local-members', topic: 'Number of members on this server' },
        { name: 'latest-release', topic: 'Latest release info' },
      ];

      const createdChannels = {};

      for (const ch of channelsToCreate) {
        const channel = await interaction.guild.channels.create({
          name: ch.name,
          type: 0, // GUILD_TEXT
          topic: ch.topic,
          parent: category.id,
          permissionOverwrites: [
            {
              id: interaction.guild.roles.everyone.id,
              deny: ['SEND_MESSAGES'], // Lecture seule
            },
          ],
        });
        createdChannels[ch.name.replace(/-/g, '')] = channel.id;
      }

      // Stocker dans le JSON
      const storage = loadStorage();
      storage[guildId] = createdChannels;
      saveStorage(storage);

      await interaction.reply({ content: `Info channels created successfully in category **${category.name}**.`, ephemeral: true });
    } catch (error) {
      console.error('Error creating info channels:', error);
      return interaction.reply({ content: 'There was an error creating the info channels.', ephemeral: true });
    }
  },
};