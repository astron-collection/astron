// utils/statusManager.js

const { ActivityType } = require("discord.js");

function startPresenceCycle(client) {
    let toggle = true;

    setInterval(() => {
        const guildCount = client.guilds.cache.size;
        const userCount = client.guilds.cache.reduce(
            (acc, guild) => acc + (guild.memberCount || 0),
            0
        );

        const presenceText = toggle
            ? `${guildCount} guild${guildCount > 1 ? 's' : ''}`
            : `${userCount.toLocaleString()} users`;

        client.user.setPresence({
            activities: [
                {
                    name: presenceText,
                    type: ActivityType.Streaming,
                    url: "https://www.youtube.com/watch?v=jfKfPfyJRdk"
                }
            ],
            status: "online",
        });

        toggle = !toggle;
    }, 5000);
}

module.exports = { startPresenceCycle };