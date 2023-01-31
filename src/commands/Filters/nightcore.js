const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'nightcore',
  category: 'Filters',
  aliases: ['nc'],
  description: 'Set NightCore Filter',
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
      equalizer: [
        { band: 1, gain: 0.3 },
        { band: 0, gain: 0.3 },
      ],
      timescale: { pitch: 1.2 },
      tremolo: { depth: 0.3, frequency: 14 },
    });
    return message.channel.send({
      embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`✅ Applying the \`NIGHTCORE\` Filter`)
        .setFooter({text: 'By Leco Music™'})
      ]
    });
  },
};
