const { EmbedBuilder } = require('discord.js');
const { editlastmsg } = require('../../utils/functions');

module.exports = {
  name: 'skip',
  aliases: ['s'],
  category: 'Music',
  description: 'To skip the current playing song.',
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
  execute: async (message, args, client, prefix, player) => {
    if(player.queue.size === 0) {
    player.stop()
    message.reply({
      embeds: [new EmbedBuilder()
        .setTitle("✅ **Skipped the current Track!**")
        .setFooter({text: 'By Leco Music™'})
        .setColor(client.embedColor)
      ]
    });
  } else {
    player.stop();
    editlastmsg(client, player);
    message.reply({
      embeds: [new EmbedBuilder()
        .setTitle("✅ **Skipped the current Track!**")
        .setFooter({text: 'By Leco Music™'})
        .setColor(client.embedColor)
      ]
      });
    };
  },
};
