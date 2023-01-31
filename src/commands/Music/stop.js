const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'stop',
  category: 'Music',
  description: 'Stops the music',
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
    player.destroy();

    let stop = new EmbedBuilder()
      .setColor(client.embedColor)
      .setTitle(`✅ **Stopped playing**`)
      .setFooter({text: 'By Leco Music™'});
    message.reply({ embeds: [stop] });
  },
};
