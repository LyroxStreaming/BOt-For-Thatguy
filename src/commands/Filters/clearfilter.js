const { EmbedBuilder } = require('discord.js');

module.exports = {
name: 'clearfilter',
category: 'Filters',
aliases: ['cf','filterclear', 'fc'],
description: 'Clear The All Filters',
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
    player.filters.clearFilters();
    return message.channel.send({
        embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`✅ Clear All Filters`)
        .setFooter({text: 'By Leco Music™'})
        ]
    });
    },
};
