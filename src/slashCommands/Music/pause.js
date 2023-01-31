const { EmbedBuilder, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'pause',
  description: 'Pause the currently playing music',
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
    if (!player.isPlaying) {
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor(client.embedColor)
          .setTitle(`❎ The song is already \`paused!\``)
          .setDescription(`You can resume it with: \`/resume\``)
          .setFooter({text: 'By Leco Music™'})
        ]
      });
    };
    player.pause(true);
    return interaction.reply({
      embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`✅ The song is \`paused!\``)
        .setDescription(`You can resume it with: \`/resume\``)
        .setFooter({text: 'By Leco Music™'})
      ]
    });
  },
};
