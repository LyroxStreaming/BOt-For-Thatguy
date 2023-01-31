const { EmbedBuilder } = require('discord.js');
const db = require('../../schema/playlist');
const db1 = require('../../schema/user');
const db2 = require('../../schema/server');

module.exports = {
    name: 'pl-create',
    aliases: ['plcreate'],
    category: 'Playlist',
    description: "Creates the user's playlist.",
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
        if(!Name) {
            return message.reply({ embeds: [new EmbedBuilder()
                .setColor(client.embedColor)
                .setDescription(`❎ You didn't entered a playlist name\nUsage: \`${prefix}pl-create <playlist name>\`\nName Information:\n\`Can be anything with maximum of 10 Letters\``)
                .setFooter({text: 'By Leco Music™'})]});
        };
        if (Name.length > 10) {
            return message.reply({ embeds: [new EmbedBuilder()
                .setColor(client.embedColor)
                .setTitle(`❎ Playlist Name Cant Be Greater Than 10 Charecters`)
                .setFooter({text: 'By Leco Music™'})]});
        };
        let data = await db.find({
            UserId: message.author.id,
            PlaylistName: Name,
        });

        if (data.length > 0) {
            return message.reply({ embeds: [new EmbedBuilder()
                .setColor(client.embedColor)
                .setTitle(`❎ This playlist already Exists! delete it using: ${prefix}pl-delete \`${Name}\``)] })
        };
        let userData = await db.find({
            UserId: message.author.id
        });
        let userid = await db1.findOne({ Id: message.author.id });
        let serverid = await db2.findOne({ Id: message.guild.id });
        let premium = userid || serverid;

        if(premium) {
            if(userData.length >= 25) {
                return message.reply({ embeds: [new EmbedBuilder()
                    .setColor(client.embedColor)
                    .setTitle(`❎ You Can Only Create 25 Playlist`)
                    .setImage('https://media.discordapp.net/attachments/971363118695481374/1067272548083060776/standard.gif')
                    .setFooter({text: 'By Leco Music™'})] });
            };
        } else {
            if(userData.length >= 10) {
                return message.reply({ embeds: [new EmbedBuilder()
                    .setColor(client.embedColor)
                    .setTitle(`❎ You Can Only Create 10 Playlist. you want create more playlist you can unlock it with premium`)] })
                    .setImage('https://media.discordapp.net/attachments/971363118695481374/1067275455738167358/standard_2.gif')
                    .setFooter({text: 'By Leco Music™'})
            };
        };
        
        const newData = new db({
            UserName: message.author.tag,
            UserId: message.author.id,
            PlaylistName: Name,
            CreatedOn: Math.round(Date.now() / 1000)
        });
        await newData.save();
        const embed = new EmbedBuilder()
            .setTitle(`✅ Successfully created a playlist for you \`${Name}\``)
            .setColor(client.embedColor)
            .setFooter({text: 'By Leco Music™'})
        return message.channel.send({ embeds: [embed] });
    },
};
