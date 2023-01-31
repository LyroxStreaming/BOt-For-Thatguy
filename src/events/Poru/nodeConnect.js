const db = require("../../schema/autoReconnect");

module.exports = {
    name: "nodeConnect",
    run: async (client, node) => {
        client.logger.log(`${node.name} Is Connected`, "log");
        const maindata = await db.find();
        client.logger.log(`Auto Reconnect found ${maindata.length ? `${maindata.length} queue${maindata.length > 1 ? 's' : ''}. Resuming all auto reconnect queue` : '0 queue'}`, "ready");
        
        for (let data of maindata) {
            const index = maindata.indexOf(data);
            setTimeout(async () => {
            let player= client.poru.players.get(data.Guild);
            if(!player){
            player = client.poru.createConnection({
                guildId: data.Guild,
                voiceChannel: data.VoiceId,
                textChannel: data.TextId,
                selfDeaf: true,
            });
        };
        },
    ), index * 10000};
    },
};