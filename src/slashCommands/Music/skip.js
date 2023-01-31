const { CommandInteraction, Client, EmbedBuilder } = require('discord.js');
const { editlastmsg } = require('../../utils/functions');

module.exports = {
  name: 'skip',
  description: 'To skip a song/track from the queue.',
  player: true,
  dj: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  activeplayer: true,
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String} color
   */

  run: async (client, interaction, player) => {
    if(player.queue.size === 0) {
    player.stop();
    interaction.reply({
      embeds: [new EmbedBuilder()
        .setTitle("✅ **Skipped the current Track!**")
        .setColor(client.embedColor)
        .setFooter({text: 'By Leco Music™'})
      ]
    });
  } else {
    player.stop();
    editlastmsg(client, player);
    interaction.reply({
      embeds: [new EmbedBuilder()
        .setTitle("✅ **Skipped the current Track!**")
        .setColor(client.embedColor)
        .setFooter({text: 'By Leco Music™'})
      ]
      });
    };
  },
};
