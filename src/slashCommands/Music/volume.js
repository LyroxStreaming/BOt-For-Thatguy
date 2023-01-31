const { ApplicationCommandOptionType, CommandInteraction, Client, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'volume',
  description: 'Changes volume of currently playing music.',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  player: true,
  dj: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  activeplayer: true,
  options: [
    {
      name: 'number',
      description: 'give your volume number ',
      required: true,
      type: ApplicationCommandOptionType.Number,
    },
  ],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String} color
   */

  run: async (client, interaction, player) => {
    const vol = interaction.options.getNumber('number');
    const volume = Number(vol);
    const realvol = volume/100;
    if (!volume || volume <= 0 || volume >= 100) {
      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setDescription(`Usage: /volume <Number of volume between 0 - 100>`)
        .setFooter({text: 'By Leco Music™'});
      return interaction.reply({ embeds: [thing] });
    };

    await player.setVolume(realvol);
    if (realvol > player.filters.volume) {
      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`<:voliumup:927525490103832607> Volume set to: \`[ ${volume}% ]\``)
        .setFooter({text: 'By Leco Music™'});
      return interaction.reply({ embeds: [thing] });
    } else if (realvol < player.filters.volume) {
      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`<:voliumdown:927525489940238367> Volume set to: \`[ ${volume}% ]\``)
        .setFooter({text: 'By Leco Music™'});
      return interaction.reply({ embeds: [thing] });
    } else {
      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`<:voliumup:927525490103832607> Volume set to: \`[ ${volume}% ]\``)
        .setFooter({text: 'By Leco Music™'});
      return interaction.reply({ embeds: [thing] });
    };
  },
};
