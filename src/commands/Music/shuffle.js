const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'shuffle',
  category: 'Music',
  description: 'Shuffle queue',
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
    if (player.queue.length === 0) {
      return message.reply({embeds: [new EmbedBuilder()
      .setColor(client.embedColor)
      .setTitle('❎ There no enough songs in queue to shuffle it')
      .setFooter({text: 'By Leco Music™'})
    ]});
    };
    player.queue.shuffle();
    let thing = new EmbedBuilder()
      .setTitle(`<:shuffles:988865004696645652> Shuffled the queue`)
      .setColor(client.embedColor)
      .setFooter({text: 'By Leco Music™'});
    return message.reply({ embeds: [thing] }).catch((error) => client.logger.log(error, 'error'));
  },
};
