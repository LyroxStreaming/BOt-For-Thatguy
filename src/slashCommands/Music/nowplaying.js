const { EmbedBuilder, CommandInteraction, Client } = require('discord.js');
const { convertTime } = require('../../utils/convert.js');
const { makeUri } = require('../../utils/makeurl.js');
const { progressbar } = require('../../utils/progressbar.js');

module.exports = {
  name: 'nowplaying',
  description: 'Show now playing song',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  player: true,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  activeplayer: true,
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction, player) => {
    const song = player.currentTrack.info;
    let link = makeUri(`${song.title} By ${song.author}`);
    var total = song.length;
    var current = player.position;
    
    const embed = new EmbedBuilder()
    .setAuthor({name: 'Current song playing:', iconURL: interaction.guild.iconURL({dynamic: true})})
    .setURL(link)
    .setColor(client.embedColor)
    .setTitle(`${player.playing ? `<:forward1:927525488593866753>` : `<:pause:927525488824549397>`} **${player.currentTrack.info.title}**`)
    .addFields([
      {name: '<:clocks:938721093617856512> Progress: ', value: `${progressbar(player)}`, inline: false},
      {name: '<:clocks:938721093617856512> Duration: ', value: `\`${convertTime(current)} - ${convertTime(total)}\``, inline: true},
      {name: '<:roleinfo:927525489428561951> Song By: ', value: `\`${player.currentTrack.info.author}\``, inline: true},
      {name: '<:retry:927525489327882240> Queue length: ', value: `\`${player.queue.length} Songs\``, inline: true}
    ])
    .setFooter({text: `Requested by: ${player.currentTrack.info.requester ? `${player.currentTrack.info.requester.tag}` : `${client.user.tag}`}`})
    return interaction.reply({
    embeds: [embed]
  });
  },
};
