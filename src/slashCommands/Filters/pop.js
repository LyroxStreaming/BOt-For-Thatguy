const { EmbedBuilder, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'pop',
  description: 'Sets Pop Filter.',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  player: true,
  dj: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  activeplayer: true,

  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction, player) => {
    player.filters.setFilters({
      op: 'filters',
      guildId: interaction.guild.id,
      equalizer: [
        { band: 0, gain: -0.25 },
        { band: 1, gain: 0.48 },
        { band: 2, gain: 0.59 },
        { band: 3, gain: 0.72 },
        { band: 4, gain: 0.56 },
        { band: 5, gain: 0.15 },
        { band: 6, gain: -0.24 },
        { band: 7, gain: -0.24 },
        { band: 8, gain: -0.16 },
        { band: 9, gain: -0.16 },
        { band: 10, gain: 0 },
        { band: 11, gain: 0 },
        { band: 12, gain: 0 },
        { band: 13, gain: 0 },
        { band: 14, gain: 0 },
      ],
    });
    return interaction.reply({
      embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`✅ Applying the \`POP\` Filter`)
        .setFooter({text: 'By Leco Music™'})
      ]
    });
  },
};
