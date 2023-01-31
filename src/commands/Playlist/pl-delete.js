const { EmbedBuilder } = require('discord.js');
const db = require('../../schema/playlist');

module.exports = {
    name: 'pl-delete',
    aliases: ['pldelete'],
    category: 'Playlist',
    description: 'Delete your saved playlist.',
    args: false,
    usage: '<playlist name>',
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
                .setDescription(`❎ You didn't entered a playlist name\nUsage: \`${prefix}pl-delete <playlist name>\`\nName Information:\n\`Can be anything with maximum of 10 Letters\``)
                .setFooter({text: 'By Leco Music™'})]});
        };
        if (!data) {
            return message.reply({ embeds: [new EmbedBuilder()
                .setColor(client.embedColor)
                .setTitle(`❎ You don't have a playlist with \`${Name}\` name`)
                .setFooter({text: 'By Leco Music™'})]});
        };
        await data.delete();
        const embed = new EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle(`✅ Successfully deleted \`${Name}\` playlist`)
            .setFooter({text: 'By Leco Music™'});
        return message.channel.send({ embeds: [embed] });
    },
};
