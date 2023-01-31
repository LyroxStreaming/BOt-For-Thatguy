const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'bass',
  category: 'Filters',
  aliases: ['bas'],
  description: 'Set Bass Filter',
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
    player.filters.setFilters({
      op: 'filters',
      guildId: message.guild.id,
      equalizer: [
        { band: 0, gain: 0.1 },
        { band: 1, gain: 0.1 },
        { band: 2, gain: 0.05 },
        { band: 3, gain: 0.05 },
        { band: 4, gain: -0.05 },
        { band: 5, gain: -0.05 },
        { band: 6, gain: 0 },
        { band: 7, gain: -0.05 },
        { band: 8, gain: -0.05 },
        { band: 9, gain: 0 },
        { band: 10, gain: 0.05 },
        { band: 11, gain: 0.05 },
        { band: 12, gain: 0.1 },
        { band: 13, gain: 0.1 },
      ],
    });
    return message.channel.send({
      embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`✅ Applying the \`BASS\` Filter`)
        .setFooter({text: 'By Leco Music™'})
      ]
    });
  },
};
