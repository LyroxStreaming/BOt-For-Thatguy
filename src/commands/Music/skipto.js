const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'skipto',
  aliases: ['jump'],
  category: 'Music',
  description: 'Forward song',
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
  vote: true,
  execute: async (message, args, client, prefix, player) => {
    if (Number(args[0]) <= 1 )
    return message.reply({embeds:  [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`❎ Start can not be bigger than end.`)
        .setDescription(`**Add Higher Number**`)
    ]});
    const position = Number(args)
        if (!position || position < 0) {
        let thing = new EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle(`Usage: /skipto <Number of song in queue`)
            .setFooter({text: 'By Leco Music™'});
        return await message.reply({ embeds: [thing] });
        }
        if (position > player.queue.size) {
            let thing = new EmbedBuilder()
                .setColor(client.embedColor)
                .setTitle(`There no Songs to skip use \`/queue\` show all loaded songs`)
                .setFooter({text: 'By Leco Music™'});
            return await message.reply({ embeds: [thing] });
            }
    if (args[0] == 1) player.stop();
    player.queue.remove(0, position - 1);
    await player.stop();

    let thing = new EmbedBuilder()
      .setTitle(`<:forward10:927525488560316456> Forward **${position}** Songs`)
      .setColor(client.embedColor);
    return message.reply({ embeds: [thing] });
  },
};
