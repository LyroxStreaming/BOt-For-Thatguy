const { EmbedBuilder, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'nightcore',
  description: 'Sets NightCore Filter.',
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
      equalizer: [
        { band: 1, gain: 0.3 },
        { band: 0, gain: 0.3 },
      ],
      timescale: { pitch: 1.2 },
      tremolo: { depth: 0.3, frequency: 14 },
    });
    return interaction.reply({
      embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`✅ Applying the \`NIGHTCORE\` Filter`)
        .setFooter({text: 'By Leco Music™'})
      ]
    }); 
  },
};
