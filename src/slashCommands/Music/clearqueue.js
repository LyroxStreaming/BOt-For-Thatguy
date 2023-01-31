const { EmbedBuilder, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'clearqueue',
  description: 'Clear Queue',
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
    if (player.queue.size === 0) {
      return interaction.reply({embeds: [new EmbedBuilder()
      .setColor(client.embedColor)
      .setTitle('❎ There no enough songs in queue to clear it')
      .setFooter({text: 'By Leco Music™'})]});
    };
    player.queue.clear();
    return interaction.reply({
      embeds: [new EmbedBuilder()
        .setTitle(`✅ **Cleared the Queue!**`)
        .setColor(client.embedColor)
        .setFooter({text: 'By Leco Music™'})
      ]
    });
  },
};
