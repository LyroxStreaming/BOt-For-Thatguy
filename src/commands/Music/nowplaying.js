const { EmbedBuilder } = require('discord.js');
const { convertTime } = require('../../utils/convert.js');
const { progressbar } = require('../../utils/progressbar.js');
const { makeUri } = require('../../utils/makeurl');

module.exports = {
  name: 'nowplaying',
  aliases: ['np'],
  category: 'Music',
  description: 'Show now playing song',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  owner: false,
  player: true,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  activeplayer: true,
  execute: async (message, args, client, prefix, player) => {
    const song = player.currentTrack.info;
    let total = song.length;
    let current = player.position;
    let link = makeUri(`${player.currentTrack.info.title} By ${player.currentTrack.info.author}`)
    const embed = new EmbedBuilder()
    .setAuthor({name: 'Current song playing:', iconURL: message.guild.iconURL({dynamic: true})})
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
    return message.reply({
    embeds: [embed]
    });
  },
};
