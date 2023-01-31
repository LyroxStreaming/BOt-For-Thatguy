const { EmbedBuilder } = require('discord.js');
const db = require('../../schema/playlist');
const db1 = require('../../schema/user');
const db2 = require('../../schema/server');

module.exports = {
    name: 'pl-savequeue',
    aliases: ['plsaveq'],
    category: 'Playlist',
    description: 'Save current playing queue in your playlist.',
    args: false,
    usage: '<playlist name>',
    userPrams: [],
    botPrams: ['EmbedLinks'],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    activeplayer: true,
    vote: true,
    execute: async (message, args, client, prefix, player) => {
    const Name = args[0];
        if (!Name) {
            return message.reply({ embeds: [new EmbedBuilder()
                .setColor(client.embedColor)
                .setDescription(`❎ You didn't entered a playlist name\nUsage: \`${prefix}pl-savequeue <playlist name>\`\nSavecurrent Information:\n\`Save all songs in queue\``)
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
        }
        const tracks = player.queue;

        let userid = await db1.findOne({ Id: message.author.id });
        let serverid = await db2.findOne({ Id: message.guild.id });
        let premium = userid || serverid;

        if(premium) {
            if(player.queue.size >= 500) {
                let queuemax = new EmbedBuilder()
                .setColor(client.embedColor)
                .setTitle(`Max Queue size is 500 songs you can't add more songs to playlist`)
                .setImage('https://media.discordapp.net/attachments/971363118695481374/1067272548083060776/standard.gif')
                return message.channel.send({embeds: [queuemax]})}
        } else {
            if(player.queue.size >= 100) {
                let queuemax = new EmbedBuilder()
                .setColor(client.embedColor)
                .setTitle(`Max Queue size is 100 songs you can't add more songs to playlist. you want save more songs you can unlock it with premium`)
                .setImage('https://media.discordapp.net/attachments/971363118695481374/1067275455738167358/standard_2.gif')
                return message.channel.send({embeds: [queuemax]})}
        };

            let oldtracks = fetchList.Playlist;
            if (!Array.isArray(oldtracks)) oldtracks = [];
            const newtracks = [];
    
            for (const track of tracks) {
            newtracks.push({
            "title": track.info.title,
            "url": track.info.uri,
            "author": track.info.author,
            "duration": track.info.length
            });
            };
    
        if (player.currentTrack) newtracks.push({
            "title": player.currentTrack.info.title,
            "url": player.currentTrack.info.uri,
            "author": player.currentTrack.info.author,
            "duration": player.currentTrack.info.length
            });
            
            let newqueue = oldtracks.concat(newtracks);
    
            await db.updateOne(
            {
                UserId: message.author.id,
                PlaylistName: Name
            },
            {
                $set: {
                    Playlist: newqueue
                },
            },
            );
        const embed = new EmbedBuilder()
        .setTitle(`Added to savecurrent`)
            .setColor(client.embedColor)
            .setDescription(`✅ **Added** \`${newqueue.length - oldtracks.length} song\` in \`${Name}\` Total songs in playlist \`${newqueue.length}\``)
            .setFooter({text: 'By Leco Music™'});
        return message.channel.send({ embeds: [embed] });
    },
};
