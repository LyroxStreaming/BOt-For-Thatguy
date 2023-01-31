const { ApplicationCommandOptionType, CommandInteraction, Client, EmbedBuilder } = require('discord.js');
const { convertTime } = require('../../utils/convert.js');
const { progressbar } = require('../../utils/progressbar.js');

module.exports = {
  name: 'seek',
  description: 'Seek the currently playing song',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  dj: true,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  activeplayer: true,
  options: [
    {
      name: 'time',
      description: 'Enther the seek time',
      required: true,
      type: ApplicationCommandOptionType.Number,
    },
  ],

  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction, player) => {
    const numb = interaction.options.getNumber('time');
    if (Number(numb) < 0 || Number(numb) >= player.currentTrack.length / 1000)
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setColor(client.embedColor)
          .setTitle(`❎ You may seek from \`0\` - \`${player.currentTrack.length/1000}\``)
          .setFooter({text: 'By Leco Music™'})
        ]
      });

    player.seekTo(Number(numb) * 1000);

    return interaction.reply({
      embeds: [new EmbedBuilder()
        .setTitle(`✅ Seeked song to: ${convertTime(Number(numb) * 1000)}`)
        .addFields([
          {name: "<:clocks:938721093617856512> Progress: ", value: progressbar(player)}
        ])
        .setColor(client.embedColor)
        .setFooter({text: 'By Leco Music™'})
      ]
    });
  },
};

