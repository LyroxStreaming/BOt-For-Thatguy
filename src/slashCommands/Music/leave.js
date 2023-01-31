const { EmbedBuilder, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'leave',
  description: 'Leave voice channel',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  dj: true,
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  activeplayer: false,

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction, player) => {
    await player.destroy();
        interaction.reply({
            embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle(`✅ **Left the channel**`)
            .setFooter({text: 'By Leco Music™'})
      ]});
  },
};
