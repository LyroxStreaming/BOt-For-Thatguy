const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'slowmo',
    category: 'Filters',
    aliases: ['sm'],
    description: 'Set Slowmo Filter',
    args: false,
    usage: '',
    userPrams: [],
    botPrams: ['EmbedLinks'],
    owner: false,
    player: true,
    dj: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    activeplayer: true,
    execute: async (message, args, client, prefix, player) => {
    player.filters.setTimescale({speed: 0.5, pitch: 1.0, rate: 0.8})
    
    return message.channel.send({
    embeds: [new EmbedBuilder()
    .setColor(client.embedColor)
    .setTitle(`✅ Applying the \`SLOWMO\` Filter`)
    .setFooter({text: 'By Leco Music™'})
    ]
    });
},
};
