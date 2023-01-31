module.exports = {
    name: 'playerCreate',
    run: async (client, player) => {
        client.logger.log(`Player Create in ${player.guildId}`, "log");
    },
};
