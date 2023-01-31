const { EmbedBuilder } = require('discord.js');
const { makeUri } = require('../../utils/makeurl');

module.exports = {
  name: 'remove',
  category: 'Music',
  description: 'Remove song from the queue',
  args: true,
  usage: '<Number of song in queue>',
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
    const position = Number(args[0]) - 1;
    if(!position) {
      return message.reply({embeds: [new EmbedBuilder()
      .setColor(client.embedColor)
      .setDescription('Add song number to remove / you can find song number by using /queue')]})
      .setFooter({text: 'By Leco Music™'})
    };
    if(player.queue.size > 1) {
      let big = new EmbedBuilder()
        .setColor(client.embedColor)
        .setDescription(`Queue size must be more then 1 track`);
      return message.reply({ embeds: [big] });
    };
    if (position > player.queue.length) {
      const number = position + 1;
      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setDescription(`No songs at number ${number}.\nTotal Songs: ${player.queue.length}`);
      return message.reply({ embeds: [thing] });
    };
    const song = player.queue[position];
    let link = makeUri(`${song.info.title} By ${song.info.author}`)
    await player.queue.remove(position);

    let thing = new EmbedBuilder()
      .setColor(client.embedColor)
      .setDescription(`✅ Removed\n[${song.info.title}](${link})`);
    return message.reply({ embeds: [thing] });
  },
};
