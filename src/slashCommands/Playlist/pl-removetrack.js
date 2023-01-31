const { EmbedBuilder, CommandInteraction, Client, ApplicationCommandOptionType } = require("discord.js");
const db = require("../../schema/playlist");

module.exports = {
  name: 'pl-removetrack',
  description: 'Removetrack from your saved Playlists.',
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
    {
      name: 'number',
      description: 'Song Number',
      required: true,
      type: ApplicationCommandOptionType.Number
    }
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
          .setDescription(`❎ You didn't entered a playlist name\nUsage: \`/pl-removetrack <playlist name>\``)
          .setFooter({text: 'By Leco Music™'})]});
  };
  if (!data) {
      return interaction.reply({ embeds: [new EmbedBuilder()
          .setColor(client.embedColor)
          .setTitle(`❎ You don't have a playlist with \`${Name}\` name`)] });
  };
    const Options = interaction.options.getNumber('number');
    if (!Options || isNaN(Options)) {
      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle(`❎ You didn't entered track number (you want remove track put track number and try it)\nSee all your Tracks: /pl-info \`${Name}\``),
        ],
      });
    };
    let tracks = data.Playlist;
    if (Number(Options) >= tracks.length || Number(Options) < 0) {
      return interaction.reply({ embeds: [new EmbedBuilder()
          .setColor(client.embedColor)
          .setDescription(`❎ Your provided track number is out of Range (0 - ${tracks.length - 1})\nSee all your Tracks: /pl-info to get alldetails \`${Name}\``)] });
  };
  await db.updateOne({
      UserId: interaction.member.user.id,
      PlaylistName: Name
  },
      {
          $pull: {
              Playlist: data.Playlist[Options]
          }
      });
      const embed = new EmbedBuilder()
      .setColor(client.embedColor)
      .setDescription(`✅ Removed **${tracks[Options].title}** from \`${Name}\``)
      .setFooter({text: 'By Leco Music™'});
      return interaction.reply({embeds: [embed]});
  },
};