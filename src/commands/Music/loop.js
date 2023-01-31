const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'loop',
  aliases: ['l'],
  category: 'Music',
  description: 'Toggle music loop',
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
  vote: true,
  execute: async (message, args, client, prefix, player) => {
    if (!args[0])
    return message.reply({
      embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`❎ **Please add your Looping Method!**`)
        .setDescription(`\`loop track\` / \`loop queue\` / \`loop off\``)
        .setFooter({text: 'By Leco Music™'})
      ]
    });
    if (['q', 'queue'].includes(args[0])) {
      await player.setLoop('QUEUE');
      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`✅ Loop \`queue\` is now enable`);
      return message.reply({ embeds: [thing] });
    } else if (['track', 't'].includes(args[0])) {
      await player.setLoop('TRACK');

      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`✅ Loop \`track\` is now enable`);
      return message.reply({ embeds: [thing] });
    } else if (['off', 'c', 'clear'].includes(args[0])) {
      await player.setLoop('NONE');

      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`✅ Loop is now \`disabled\``);
      return message.reply({ embeds: [thing] });
    };
  },
};
