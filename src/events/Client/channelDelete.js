const db = require('../../schema/autoReconnect');
const { ChannelType } = require('discord.js');

module.exports = {
    name: "channelDelete",
    run: async (client, channel, guild) => {
    let player = client.poru.players.get(channel.guild.id);
    if (!player) return;
    const autoconnect = await db.findOne({Guild: channel.guild.id});

    if (channel.type === ChannelType.GuildVoice) {
    if (channel.members.has(client.user.id)) {
        if(channel.id === autoconnect.VoiceId){
            console.log(`deleting data ${autoconnect.VoiceId}`);
            player.destroy();
            return autoconnect.delete();
        } 
        if (channel.id === player.voiceId) { 
                player.destroy();
                };
            };
        };
    },
};