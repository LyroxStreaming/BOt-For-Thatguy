const { EmbedBuilder, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'earrape',
  description: 'Sets EarRape Filter.',
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
        { band: 0, gain: 0.25 },
        { band: 1, gain: 0.5 },
        { band: 2, gain: -0.5 },
        { band: 3, gain: -0.25 },
        { band: 4, gain: 0 },
        { band: 6, gain: -0.025 },
        { band: 7, gain: -0.0175 },
        { band: 8, gain: 0 },
        { band: 9, gain: 0 },
        { band: 10, gain: 0.0125 },
        { band: 11, gain: 0.025 },
        { band: 12, gain: 0.375 },
        { band: 13, gain: 0.125 },
        { band: 14, gain: 0.125 },
      ],
    });
    return interaction.reply({
      embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`✅ Applying the \`EARRAPE\` Filter`)
        .setFooter({text: 'By Leco Music™'})
      ]
    });
  },
};
