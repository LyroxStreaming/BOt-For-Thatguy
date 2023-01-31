const { ApplicationCommandOptionType, EmbedBuilder, CommandInteraction, Client } = require("discord.js");
const db = require("../../schema/playlist");

module.exports = {
  name: 'pl-delete',
  description: 'Delete your saved playlist.',
  usage: '<playlist name>',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  player: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  vote: true,
  options: [
    {
      name: 'name',
      description: 'Playlist Name',
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction, player) => {
    const Name = interaction.options.getString('name');
    const data = await db.findOne({ UserId: interaction.member.user.id, PlaylistName: Name });
    if (!Name) {
      return interaction.reply({ embeds: [new EmbedBuilder()
          .setColor(client.embedColor)
          .setDescription(`❎ You didn't entered a playlist name\nUsage: \`/pl-delete <playlist name>\`\nName Information:\n\`Can be anything with maximum of 10 Letters\``)
          .setFooter({text: 'By Leco Music™'})]});
  };
  if (!data) {
      return interaction.reply({ embeds: [new EmbedBuilder()
          .setColor(client.embedColor)
          .setTitle(`❎ You don't have a playlist with \`${Name}\` name`)] });
  };
  await data.delete();
  const embed = new EmbedBuilder()
      .setColor(client.embedColor)
      .setTitle(`✅ Successfully deleted \`${Name}\` playlist`)
      .setFooter({text: 'By Leco Music™'});
  return interaction.reply({ embeds: [embed] })
  },
};
