const { ApplicationCommandOptionType, CommandInteraction, Client, EmbedBuilder } = require('discord.js');
const { makeUri } = require('../../utils/makeurl');

module.exports = {
  name: 'remove',
  description: 'Remove song from the queue',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  dj: true,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  activeplayer: true,
  vote: true,
  options: [
    {
      name: 'number',
      description: 'Number of song in queue',
      required: true,
      type: ApplicationCommandOptionType.Number,
    },
  ],

  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction, player) => {
    const pos = interaction.options.getNumber('number');
    if(player.queue.size > 1) {
      let big = new EmbedBuilder()
        .setColor(client.embedColor)
        .setDescription(`Queue size must be more then 1 track`)
        .setFooter({text: 'By Leco Music™'});
      return interaction.reply({ embeds: [big] });
    };
    const position = pos - 1;
    if (position > player.queue.length) {
      const number = position + 1;
      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setDescription(`No songs at number ${number}.\nTotal Songs: ${player.queue.length}`);
      return interaction.reply({ embeds: [thing] });
    };

    const song = player.queue[position];
    let link = makeUri(`${song.info.title} By ${song.info.author}`);
    await player.queue.remove(position);

    let thing = new EmbedBuilder()
      .setColor(client.embedColor)
      .setDescription(`✅ Removed\n[${song.info.title}](${link})`)
      .setFooter({text: 'By Leco Music™'});
    return interaction.reply({ embeds: [thing] });
  },
};
