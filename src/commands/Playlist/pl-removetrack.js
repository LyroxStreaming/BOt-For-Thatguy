const { EmbedBuilder } = require('discord.js');
const db = require('../../schema/playlist');

module.exports = {
    name: 'pl-removetrack',
    aliases: ['plremovet'],
    category: 'Playlist',
    description: 'Removetrack from your saved Playlists.',
    args: false,
    usage: '<playlist name> <track number>',
    userPrams: [],
    botPrams: ['EmbedLinks'],
    owner: false,
    player: false,
    inVoiceChannel: false,
    sameVoiceChannel: false,
    vote: true,
    execute: async (message, args, client, prefix, player) => {
    const Name = args[0];
    const data = await db.findOne({ UserId: message.author.id, PlaylistName: Name });
    if (!Name) {
        return message.reply({ embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setDescription(`❎ You didn't entered a playlist name\nUsage: \`${prefix}pl-removetrack <playlist name>\``)
            .setFooter({text: 'By Leco Music™'})]});
    };
    if (!data) {
        return message.reply({ embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle(`❎ You don't have a playlist with \`${Name}\` name`)
            .setFooter({text: 'By Leco Music™'})]});
    };
    const Options = args[1];
    if (!Options || isNaN(Options)) {
        return message.reply({ embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle(`❎ You didn't entered track number (you want remove track put track number and try it)\nSee all your Tracks: ${prefix}pl-info \`${Name}\``)] });
    };
    let tracks = data.Playlist;
    if (Number(Options) >= tracks.length || Number(Options) < 0) {
        return message.reply({ embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setDescription(`❎ Your provided track number is out of Range (0 - ${tracks.length - 1})\nSee all your Tracks: ${prefix}pl-info to get alldetails \`${Name}\``)] });
    };
    await db.updateOne({
        UserId: message.author.id,
        PlaylistName: Name
    },
        {
            $pull: {
                Playlist: data.Playlist[Options]
            }
        });
        const embed = new EmbedBuilder()
        .setColor(client.embedColor)
        .setDescription(`✅ Removed **${tracks[Options].title}** from \`${Name}\``)
        .setFooter({text: 'By Leco Music™'});
        return message.channel.send({embeds: [embed]});
    },
};
