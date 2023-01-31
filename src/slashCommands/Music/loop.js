const { CommandInteraction, Client, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'loop',
  description: 'Toggle music loop',
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
      name: 'mode',
      description: 'Select a loop mode!',
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: 'track',
          value: 'track',
        },
        {
          name: 'queue',
          value: 'queue',
        },
        {
          name: 'off',
          value: 'off',
        },
      ],
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction, player) => {
    const input = interaction.options.getString('mode');

    if (input === 'track') {
      await player.setLoop('TRACK');
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor(client.embedColor)
          .setTitle(`✅ Loop \`track\` is now enable`)
          .setFooter({text: 'By Leco Music™'}),
        ],
      });
    } else if (input === 'queue') {
      await player.setLoop('QUEUE');
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor(client.embedColor)
          .setTitle(`✅ Loop \`queue\` is now enable`)
          .setFooter({text: 'By Leco Music™'}),
        ],
      });
    } else if (input === 'off') {
      await player.setLoop('NONE');
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor(client.embedColor)
          .setTitle(`✅ Loop is now \`disabled\``)
          .setFooter({text: 'By Leco Music™'}),
        ],
      });
    }
  },
};
