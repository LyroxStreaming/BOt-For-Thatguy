const { ApplicationCommandOptionType, EmbedBuilder, CommandInteraction, Client } = require('discord.js');
const db = require('../../schema/playlist');

module.exports = {
    name: 'pl-load',
    description: 'Play the saved Playlist.',
    userPrams: [],
    botPrams: ['EmbedLinks'],
    player: false,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    options: [
    {
        name: 'name',
        description: 'play the saved playlist',
        required: true,
        type: ApplicationCommandOptionType.String,
    },
    ],
    /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

    run: async (client, interaction) => {
    const Name = interaction.options.getString('name');
    const data = await db.findOne({ UserId: interaction.member.user.id, PlaylistName: Name });
    if (!Name) {
        return interaction.reply({ embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setDescription(`❎ You didn't entered a playlist name\nUsage: \`/pl-load <playlist name>\`\nPlaylist Information:\n\`If you didn't create playlist user ${prefix}pl-create and save queue to use ${prefix}pl-savequeue \``)
            .setFooter({text: 'By Leco Music™'})]});
    };
    if (!data) {
        return interaction.reply({ embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle(`❎ You don't have a playlist with \`${Name}\` name`)
            .setFooter({text: 'By Leco Music™'})]});
    };
    const player = await client.poru.createConnection({
        guildId: interaction.guild.id,
        voiceChannel: interaction.member.voice.channel.id,
        textChannel: interaction.channel.id,
        selfDeaf: true,
    });
    player.setVolume(0.7);
    if (!player) return;
    if(player.queue.size >= 150) {
        let queuemax = new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`Max Queue size is 150 songs you can't add more songs to playlist`)
        return interaction.reply({embeds: [queuemax]})} 

    let count = 0;
    const m = await interaction.reply({ embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`Adding ${data.Playlist.length} track(s) from your playlist \`${Name}\` to the queue.`)], fetchReply: true})
        for (const track of data.Playlist) {
            const result = await client.poru.resolve(track.url ? track.url : track.title, "ytsearch");

            const { loadType, tracks } = result;
            if (loadType === 'PLAYLIST_LOADED') {
                tracks.info.requester = interaction.member.user; 
                await player.queue.add(tracks);
                if (player && !player.isPlaying && !player.isPaused) await player.play();
                ++count;
            } else if (loadType === 'SEARCH_RESULT' || loadType === 'TRACK_LOADED') {
                const track = tracks.shift();
                track.info.requester = interaction.member.user;
                await player.queue.add(track);
                if (player && !player.isPlaying && !player.isPaused) await player.play();
                ++count;
            }
            }
    if (player && !player.currentTrack);
    if (count <= 0 && m) return await m.edit({ embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`❎ Couldn't add any tracks from your playlist \`${Name}\` to the queue.`)
        .setFooter({text: 'By Leco Music™'})]});
    if (m) return await m.edit({ embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`✅ Added ${count} track(s) from your playlist \`${Name}\` to the queue.`)
        .setFooter({text: 'By Leco Music™'})]});
    },
};
