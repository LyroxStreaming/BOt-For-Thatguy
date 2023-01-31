module.exports = {
    name: "guildRemove",
    run: async (client, guild) => {
    let player = client.poru.players.get(guild.id);
    if (!player) return;
    if (guild.id == player.guildId) {
            player.destroy();
        };
    },
};