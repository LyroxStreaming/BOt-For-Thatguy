const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'speed',
  category: 'Filters',
  aliases: ['sped'],
  description: 'Set Speed Filter',
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
    player.filters.setFilters({
      op: 'filters',
      guildId: message.guild.id,
      timescale: {
        speed: 1.501,
        pitch: 1.245,
        rate: 1.921,
      },
    });
    return message.channel.send({
      embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`✅ Applying the \`SPEED\` Filter`)
        .setFooter({text: 'By Leco Music™'})
      ]
    });
  },
};
