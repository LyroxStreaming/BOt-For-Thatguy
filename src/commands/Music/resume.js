const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'resume',
  aliases: ['r'],
  category: 'Music',
  description: 'Resume currently playing music',
  args: false,
  usage: '<Number of song in queue>',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  dj: true,
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  activeplayer: true,
  execute: async (message, args, client, prefix, player) => {
    if (player.IsPlaying)
    return message.reply({
      embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`❎ The song is already \`resumed!\``)
        .setDescription(`You can pause it with: \`${prefix}pause\``)
        .setFooter({text: 'By Leco Music™'})
      ]
    });
  player.pause(false);
  return message.reply({
    embeds: [new EmbedBuilder()
      .setColor(client.embedColor)
      .setTitle(`✅ The song is \`resumed!\``)
      .setDescription(`You can pause it with: \`${prefix}pause\``)
      .setFooter({text: 'By Leco Music™'})
    ]
    });
  },
};
