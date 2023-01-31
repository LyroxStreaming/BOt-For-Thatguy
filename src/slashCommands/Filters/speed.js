const { EmbedBuilder, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'speed',
  description: 'Sets Speed Filter.',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  player: true,
  dj: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  activeplayer: true,
  vote: true,
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction, player) => {
    player.filters.setFilters({
      op: 'filters',
      guildId: interaction.guild.id,
      timescale: {
        speed: 1.501,
        pitch: 1.245,
        rate: 1.921,
      },
    });
    return interaction.reply({
      embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`✅ Applying the \`SPEED\` Filter`)
        .setFooter({text: 'By Leco Music™'})
      ]
    });
  },
};
