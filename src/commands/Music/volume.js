const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'volume',
  aliases: ['v', 'vol'],
  category: 'Music',
  description: 'Change volume of currently playing music',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  dj: true,
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  activeplayer: true,
  execute: async (message, args, client, prefix, player) => {
    if (!args.length) {
      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setDescription(`Player Current Volume: \`[ ${player.filters.volume * 100}% ]\``)
        .setFooter({text: 'By Leco Music™'});
      return message.reply({ embeds: [thing] });
    };
    const volume = Number(args[0]);
    const realv = volume/100;
    if (!volume || volume <= 0 || volume >= 100) {
      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setDescription(`Usage: ${prefix}volume <Number of volume between 0 - 100>`)
        .setFooter({text: 'By Leco Music™'});
      return message.reply({ embeds: [thing] });
    };

    await player.setVolume(realv);
    if (realv > player.filters.volume) {
      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`<:voliumup:927525490103832607> Volume set to: \`[ ${volume}% ]\``)
        .setFooter({text: 'By Leco Music™'});
      return message.reply({ embeds: [thing] });
    } else if (realv < player.filters.volume) {
      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`<:voliumdown:927525489940238367> Volume set to: \`[ ${volume}% ]\``)
        .setFooter({text: 'By Leco Music™'});
      return message.reply({ embeds: [thing] });
    } else {
      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`<:voliumup:927525490103832607> Volume set to: \`[ ${volume}% ]\``)
        .setFooter({text: 'By Leco Music™'});
      return message.reply({ embeds: [thing] });
    };
  },
};
