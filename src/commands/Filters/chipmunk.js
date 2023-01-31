const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'chipmunk',
    category: 'Filters',
    aliases: ['cm'],
    description: 'Set Chipmunk Filter',
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
    vote: true,
    execute: async (message, args, client, prefix, player) => {
    player.filters.setTimescale({speed: 1.05, pitch: 1.35, rate: 1.25})

    return message.channel.send({
    embeds: [new EmbedBuilder()
    .setColor(client.embedColor)
    .setTitle(`✅ Applying the \`ChIPMUNK\` Filter`)
    .setFooter({text: 'By Leco Music™'})
    ]
    });
},
};
