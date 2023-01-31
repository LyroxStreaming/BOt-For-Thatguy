const { EmbedBuilder, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'stop',
  description: 'Stops the music',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  player: true,
  dj: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  activeplayer: true,
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction, player) => {
    player.destroy();
    
    let stop = new EmbedBuilder()
      .setColor(client.embedColor)
      .setTitle(`✅ **Stopped playing**`)
      .setFooter({text: 'By Leco Music™'});
    interaction.reply({ embeds: [stop] });
  },
};
