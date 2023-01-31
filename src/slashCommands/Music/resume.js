const { EmbedBuilder, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'resume',
  description: 'Resume currently playing music',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  dj: true,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  activeplayer: true,

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction, player) => {
    if (player.isPlaying)
    return interaction.reply({
      embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`❎ The song is already \`resumed!\``)
        .setDescription(`You can pause it with: \`/pause\``)
        .setFooter({text: 'By Leco Music™'})
      ]
    });
  player.pause(false);
  return interaction.reply({
    embeds: [new EmbedBuilder()
      .setColor(client.embedColor)
      .setTitle(`✅ The song is \`resumed!\``)
      .setDescription(`You can pause it with: \`/pause\``)
      .setFooter({text: 'By Leco Music™'})
    ]
    });
  },
};
