const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'sponsor',
    category: 'Information',
    aliases: [],
    description: 'Gives you information Leco Music™ Sponsor',
    args: false,
    usage: '',
    userPrams: [],
    botPrams: ['EmbedLinks'],
    owner: false,
    execute: async (message, args, client, prefix) => {
        let bu1 = new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setURL(``)
        .setLabel('Sponsor')
        .setEmoji(`❤️`)
        
        let bu2 = new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setURL(``)
        .setLabel('Sponsor Discord')
        .setEmoji(`💜`)

        let row = new ActionRowBuilder().addComponents([bu1], [bu2]);
        let ping = new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle('No sponsor')
        .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})})
        .setDescription(`you can sposor this bot`)
        .setFooter({text: `${message.guild.name}`, iconURL: message.guild.iconURL({dynamic: true})})
        .setImage(`https://cdn.discordapp.com/attachments/1037406378517606530/1048917092763709500/standard_3.gif`)
        
        message.reply({embeds: [ping], components: [row]});
    },
};
