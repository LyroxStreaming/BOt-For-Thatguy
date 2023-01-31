const { EmbedBuilder, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'karaoke',
  description: 'Sets karaoke Filter.',
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
      rotation: { rotationHz: 0.2 },
    });
    return interaction.reply({
      embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`✅ Applying the \`KARAOKE\` Filter`)
        .setFooter({text: 'By Leco Music™'})
      ]
    });
  },
};
