const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'clearqueue',
  aliases: ['clear','cq'],
  category: 'Music',
  description: 'Clear Music Queue',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  dj: true,
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  activeplayer: true,
  vote: true,
  execute: async (message, args, client, prefix, player) => {
    if (player.queue.size === 0) {
      return message.reply({embeds: [new EmbedBuilder()
      .setColor(client.embedColor)
      .setTitle('❎ There no enough songs in queue to clear it')]})
    };
    player.queue.clear();
    return message.reply({
      embeds: [new EmbedBuilder()
        .setTitle(`✅ **Cleared the Queue!**`)
        .setColor(client.embedColor)
        .setFooter({text: 'By Leco Music™'})
      ]
    });
  },
};
