const { EmbedBuilder } = require('discord.js');
const db = require('../../schema/playlist');

module.exports = {
    name: 'pl-load',
    aliases: ['plload'],
    category: 'Playlist',
    description: 'Play the saved Playlist.',
    args: false,
    usage: '<playlist name>',
    userPrams: [],
    botPrams: ['EmbedLinks'],
    owner: false,
    player: false,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {
    const Name = args[0];
    const data = await db.findOne({ UserId: message.author.id, PlaylistName: Name });
    if (!Name) {
        return message.reply({ embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setDescription(`❎ You didn't entered a playlist name\nUsage: \`${prefix}pl-load <playlist name>\`\nPlaylist Information:\n\`If you didn't create playlist user ${prefix}pl-create and save queue to use ${prefix}pl-savequeue \``)
            .setFooter({text: 'By Leco Music™'})]});
    };
    if (!data) {
        return message.reply({ embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle(`❎ You don't have a playlist with \`${Name}\` name`)
            .setFooter({text: 'By Leco Music™'})]});
    };
    const player = await client.poru.createConnection({
        guildId: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
        selfDeaf: true,
        });
        player.setVolume(0.7);
    if (!player) return;
    if(player.queue.size >= 150) {
        let queuemax = new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`Max Queue size is 150 songs you can't add more songs to playlist`)
        .setFooter({text: 'By Leco Music™'});
        return message.channel.send({embeds: [queuemax]})} 

    let count = 0;
    const m = await message.reply({ embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`Adding ${data.Playlist.length} track(s) from your playlist \`${Name}\` to the queue.`)
        .setFooter({text: 'By Leco Music™'})]})
        for (const track of data.Playlist) {
            const result = await client.poru.resolve(track.url ? track.url : track.title, "ytsearch");

            const { loadType, tracks } = result;
            if (loadType === 'PLAYLIST_LOADED') {
                tracks.info.requester = message.author; 
                await player.queue.add(tracks);
                if (player && !player.isPlaying && !player.isPaused) await player.play();
                ++count;
            } else if (loadType === 'SEARCH_RESULT' || loadType === 'TRACK_LOADED') {
                const track = tracks.shift();
                track.info.requester = message.author;
                await player.queue.add(track);
                if (player && !player.isPlaying && !player.isPaused) await player.play();
                ++count;
            };
        };
    if (player && !player.currentTrack) 
    if (count <= 0 && m) return await m.edit({ embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`❎ Couldn't add any tracks from your playlist \`${Name}\` to the queue.`)] });
    if (m) return await m.edit({ embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`✅ Added ${count} track(s) from your playlist \`${Name}\` to the queue.`)] });
    },
};
