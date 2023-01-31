const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: '8d',
  category: 'Filters',
  aliases: ['8D', '3d'],
  description: 'Set 8D Filter',
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
    player.filters.setRotation({rotationHz:0.2})
    
    return message.channel.send({
      embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`✅ Applying the \`8D\` Filter`)
        .setFooter({text: 'By Leco Music™'})
      ]
    });
  }
};
