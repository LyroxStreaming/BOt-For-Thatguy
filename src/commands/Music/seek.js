const { EmbedBuilder } = require('discord.js');
const { convertTime } = require('../../utils/convert.js');
const { progressbar } = require('../../utils/progressbar.js');

module.exports = {
  name: 'seek',
  aliases: [],
  category: 'Music',
  description: 'Seek the currently playing song',
  args: false,
  usage: '10 || 20 || 30 in seaconds',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  dj: true,
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  activeplayer: true,
  execute: async (message, args, client, prefix, player) => {
    if(!Number(args[0])) {
      return message.reply({
        embeds: [new EmbedBuilder()
          .setColor(client.embedColor)
          .setTitle(`❎ Position must be a number.`)
          .setFooter({text: 'By Leco Music™'})
        ]
    });
  };
    if (Number(args[0]) < 0 || Number(args[0]) >= player.currentTrack.length / 1000)
      return message.reply({
        embeds: [new EmbedBuilder()
          .setColor(client.embedColor)
          .setTitle(`❎ You may seek from \`0\` - \`${player.currentTrack.length/1000}\``)
        ]
      });

      player.seekTo(Number(args[0]) * 1000);

    return message.reply({
      embeds: [new EmbedBuilder()
        .setTitle(`✅ Seeked song to: ${convertTime(Number(args[0]) * 1000)}`)
        .addFields([
          {name: "<:clocks:938721093617856512> Progress: ", value: progressbar(player)}
        ])
        .setColor(client.embedColor)
        .setFooter({text: 'By Leco Music™'})
      ]
    });
  },
};
