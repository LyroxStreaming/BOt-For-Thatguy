const { EmbedBuilder } = require('discord.js');
const db = require('../../schema/playlist');
const { makeUri } = require('../../utils/makeurl');

module.exports = {
    name: 'pl-savecurrent',
    aliases: ['plsavec'],
    category: 'Playlist',
    description: 'Add current playing song in your saved playlist.',
    args: false,
    usage: '<playlist name>',
    userPrams: [],
    botPrams: ['EmbedLinks'],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    activeplayer: true,
    execute: async (message, args, client, prefix, player) => {
    const Name = args[0];
    if (!Name) {
        return message.reply({ embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setDescription(`❎ You didn't entered a playlist name\nUsage: \`${prefix}pl-savecurrent <playlist name>\`\nSavecurrent Information:\n\`Save current playing song\``)
            .setFooter({text: 'By Leco Music™'})]});
    };
    let fetchList;
    fetchList = await db.findOne({
        UserId: message.author.id,
        PlaylistName: Name
    });
    if (!fetchList) {
        return message.reply({ embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle(`❎ You don't have a playlist with \`${Name}\` name`)] });
    };
    const track = player.currentTrack.info;

    if(player.queue.size >= 100) {
        let queuemax = new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`Max Queue size is 100 songs you can't add more songs to playlist`)
        return message.channel.send({embeds: [queuemax]})} 

        let oldtracks = fetchList.Playlist;
        if (!Array.isArray(oldtracks)) oldtracks = [];

        oldtracks.push({
            "title": track.title,
            "url": track.uri
        });

        await db.updateOne(
            {
            UserId: message.author.id,
            PlaylistName: Name
            },
            {
            $push: {
                Playlist: {
                title: track.title,
                url: track.uri,
                author: track.author,
                duration: track.length
                }
            },
            },
        );
    let link = makeUri(`${track.title} By ${track.author}`)
    const embed = new EmbedBuilder()
    .setTitle(`Added to savecurrent`)
        .setColor(client.embedColor)
        .setDescription(`✅ Added [${track.title.substr(0, 256)}](${link}) in \`${Name}\`Total songs are \`${oldtracks.length}\``)
        .setFooter({text: 'By Leco Music™'});
    return message.channel.send({ embeds: [embed] })
    },
};
