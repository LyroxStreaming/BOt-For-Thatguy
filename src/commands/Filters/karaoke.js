const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: 'karaoke',
  category: 'Filters',
  aliases: ['distort'],
  description: 'Set Karaoke Filter',
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
      rotation: { rotationHz: 0.2 },
    });
    return message.channel.send({
      embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`✅ Applying the \`KARAOKE\` Filter`)
        .setFooter({text: 'By Leco Music™'})
      ]
    });
  },
};
