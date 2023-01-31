const { EmbedBuilder, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: '8d',
  description: 'Sets 8d Filter.',
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
    player.filters.setRotation({rotationHz:0.2})
    
    return interaction.reply({
      embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`✅ Applying the \`8D\` Filter`)
        .setFooter({text: 'By Leco Music™'})
      ]
    });
  },
};
