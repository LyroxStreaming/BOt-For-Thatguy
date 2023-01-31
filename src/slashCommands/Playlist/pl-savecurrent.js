const { ApplicationCommandOptionType, EmbedBuilder, CommandInteraction, Client } = require("discord.js");
const db = require("../../schema/playlist");
const { makeUri } = require("../../utils/makeurl");

module.exports = {
  name: 'pl-savecurrent',
  description: 'Add current playing song in your saved playlist.',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  activeplayer: true,
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
    if (!Name) {
      return interaction.reply({ embeds: [new EmbedBuilder()
          .setColor(client.embedColor)
          .setDescription(`❎ You didn't entered a playlist name\nUsage: \`/pl-savecurrent <playlist name>\`\nSavecurrent Information:\n\`Save current playing song\``)
          .setFooter({text: 'By Leco Music™'})]});
  };
  let fetchList;
  fetchList = await db.findOne({
      UserId: interaction.member.user.id,
      PlaylistName: Name
  });
  if (!fetchList) {
      return interaction.reply({ embeds: [new EmbedBuilder()
          .setColor(client.embedColor)
          .setTitle(`❎ You don't have a playlist with \`${Name}\` name`)] });
  };
  const track = player.currentTrack;

  if(player.queue.size >= 150) {
      let queuemax = new EmbedBuilder()
      .setColor(client.embedColor)
      .setTitle(`Max Queue size is 150 songs you can't add more songs to playlist`)
      return interaction.reply({embeds: [queuemax]})}; 

      let oldtracks = fetchList.Playlist;
      if (!Array.isArray(oldtracks)) oldtracks = [];

      oldtracks.push({
          "title": track.info.title,
          "url": track.info.uri
      })

      await db.updateOne(
          {
          UserId: interaction.member.user.id,
          PlaylistName: Name
          },
          {
          $push: {
              Playlist: {
              title: track.info.title,
              url: track.info.uri,
              author: track.info.author,
              duration: track.info.length
              }
          },
          },
      );
  let link = makeUri(`${track.info.title} By ${track.info.author}`);
  const embed = new EmbedBuilder()
  .setTitle(`Added to savecurrent`)
  .setColor(client.embedColor)
  .setDescription(`✅ Added [${track.info.title.substr(0, 256)}](${link}) in \`${Name}\`Total songs are \`${oldtracks.length}\``)
  .setFooter({text: 'By Leco Music™'})
  return interaction.reply({ embeds: [embed] })
  },
};
