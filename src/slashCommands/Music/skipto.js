const { ApplicationCommandOptionType, CommandInteraction, Client, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'skipto',
  description: 'Forward song',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  player: true,
  dj: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  activeplayer: true,
  vote: true,
  options: [
    {
      name: 'number',
      description: 'select a song number',
      required: true,
      type: ApplicationCommandOptionType.Number,
    },
  ],

  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction, player) => {
    const args = interaction.options.getNumber('number');
    const position = Number(args);

    if (!position || position < 0 || position > player.queue.size) {
      let thing = new EmbedBuilder()
      .setColor(client.embedColor)
      .setTitle(`There no Songs to skip use \`/queue\` show all loaded songs`)
      .setFooter({text: 'By Leco Music™'});
      return await interaction.reply({ embeds: [thing] });
    }
    if (args[0] == 1) player.stop();
    player.queue.remove(0, position - 1);
    await player.stop();

    let thing = new EmbedBuilder()
    .setTitle(`<:forward10:927525488560316456> Forward **${position}** Songs`)
    .setColor(client.embedColor)
    .setFooter({text: 'By Leco Music™'});
    return await interaction.reply({ embeds: [thing] });
  },
};
