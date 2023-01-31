const { EmbedBuilder, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'treblebass',
  description: 'Sets TrebleBass Filter.',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  dj: true,
  player: true,
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
        { band: 0, gain: 0.6 },
        { band: 1, gain: 0.67 },
        { band: 2, gain: 0.67 },
        { band: 3, gain: 0 },
        { band: 4, gain: -0.5 },
        { band: 5, gain: 0.15 },
        { band: 6, gain: -0.45 },
        { band: 7, gain: 0.23 },
        { band: 8, gain: 0.35 },
        { band: 9, gain: 0.45 },
        { band: 10, gain: 0.55 },
        { band: 11, gain: 0.6 },
        { band: 12, gain: 0.55 },
        { band: 13, gain: 0 },
        { band: 14, gain: 0 },
      ],
    });
    return interaction.reply({
      embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`✅ Applying the \`TREBLEBASS\` Filter`)
        .setFooter({text: 'By Leco Music™'})
      ]
    });
  },
};
