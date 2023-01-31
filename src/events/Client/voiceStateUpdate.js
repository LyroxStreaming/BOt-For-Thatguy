const { ChannelType } = require('discord.js');
module.exports = {
    name: "voiceStateUpdate",
    run: async (client, oldState, newState) => {
    if (newState.channelId && newState.channel.type == ChannelType.GuildStageVoice && newState.guild.members.me.voice.suppress) {
        newState.guild.members.me.voice.setSuppressed(false).catch(() => {});
    }   
    const guildId = newState.guild.id;
    const player = client.poru.players.get(guildId);
    if (!player) return;
    if(!newState.guild.members.me.voice.channel) {
        player.destroy();
    }
    
    const stateChange = {};
    if (oldState.channel === null && newState.channel !== null)
        stateChange.type = "JOIN";
    if (oldState.channel !== null && newState.channel === null)
        stateChange.type = "LEAVE";
    if (stateChange.type === "JOIN") stateChange.channel = newState.channel;
    if (stateChange.type === "LEAVE") stateChange.channel = oldState.channel;

    if (!stateChange.channel|| stateChange.channel.id !== player.voiceChannel) return;

    stateChange.members = stateChange.channel.members.filter(
        (member) => !member.user.bot
    );
    
    switch (stateChange.type) {
        case "JOIN":
        if (stateChange.members.size === 1 && player.isPaused) {
            player.pause(false);
        };
        break;
        case "LEAVE":
        if (stateChange.members.size === 0 && !player.isPaused && player.isPlaying) {
            player.pause(true);
        };
        break;
        };
    },
};
