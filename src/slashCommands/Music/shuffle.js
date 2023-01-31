const { EmbedBuilder, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'shuffle',
  description: 'Shuffle queue',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  dj: true,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  activeplayer: true,
  vote: true,
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction, player) => {
    if (player.queue.length === 0) {
      return interaction.reply({embeds: [new EmbedBuilder()
      .setColor(client.embedColor)
      .setTitle('❎ There no enough songs in queue to shuffle it')
      .setFooter({text: 'By Leco Music™'})]});
    };
    player.queue.shuffle();
    let thing = new EmbedBuilder()
      .setTitle(`<:shuffles:988865004696645652> Shuffled the queue`)
      .setColor(client.embedColor)
      .setFooter({text: 'By Leco Music™'});
    return interaction.reply({ embeds: [thing] }).catch((error) => client.logger.log(error, 'error'));
  },
};
