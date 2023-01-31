const { ApplicationCommandOptionType, EmbedBuilder, CommandInteraction, Client} = require("discord.js");
const db = require("../../schema/playlist");
const db1 = require('../../schema/user');
const db2 = require('../../schema/server');

module.exports = {
  name: 'pl-create',
  description: "Gets the user's playlist.",
  userPrams: [],
  botPrams: ['EmbedLinks'],
  player: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  vote: true,
  options: [
    {
      name: 'name',
      description: 'Playlist name',
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
    if(!Name) {
      return interaction.reply({ embeds: [new EmbedBuilder()
          .setColor(client.embedColor)
          .setDescription(`❎ You didn't entered a playlist name\nUsage: \`/pl-create <playlist name>\`\nName Information:\n\`Can be anything with maximum of 10 Letters\``)
          .setFooter({text: 'By Leco Music™'})]});
  };
  if (Name.length > 10) {
      return interaction.reply({ embeds: [new EmbedBuilder()
          .setColor(client.embedColor)
          .setTitle(`❎ Playlist Name Cant Be Greater Than 10 Charecters`)] });
  };
  let data = await db.find({
      UserId: interaction.member.user.id,
      PlaylistName: Name,
  });

  if (data.length > 0) {
      return interaction.reply({ embeds: [new EmbedBuilder()
          .setColor(client.embedColor)
          .setTitle(`❎ This playlist already Exists! delete it using: /pl-delete \`${Name}\``)] })
  };
  let userData = await db.find({
      UserId: interaction.member.user.id
  });
  let userid = await db1.findOne({ Id: interaction.member.id });
  let serverid = await db2.findOne({ Id: interaction.guild.id });
  let premium = userid || serverid;

  if(premium) {
    if(userData.length >= 25) {
        return interaction.reply({ embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle(`❎ You Can Only Create 25 Playlist`)], ephemeral: true })
            .setImage('https://media.discordapp.net/attachments/971363118695481374/1067272548083060776/standard.gif')
    };
  } else {
    if(userData.length >= 10) {
        return interaction.reply({ embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle(`❎ You Can Only Create 10 Playlist. you want create more playlist you can unlock it with premium`)], ephemeral: true })
            .setImage('https://media.discordapp.net/attachments/971363118695481374/1067275455738167358/standard_2.gif')
    };
  };

  const newData = new db({
      UserName: interaction.member.user.tag,
      UserId: interaction.member.user.id,
      PlaylistName: Name,
      CreatedOn: Math.round(Date.now() / 1000)
  });
  await newData.save();
  const embed = new EmbedBuilder()
      .setTitle(`✅ Successfully created a playlist for you \`${Name}\``)
      .setColor(client.embedColor)
      .setFooter({text: 'By Leco Music™'});
  return interaction.reply({ embeds: [embed] })
  },
};
