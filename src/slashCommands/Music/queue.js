const { Client, CommandInteraction, EmbedBuilder } = require('discord.js');
const { convertTime } = require('../../utils/convert.js');
const { collectormsg2 } = require('../../utils/functions.js');
const { makeUri } = require('../../utils/makeurl.js');

module.exports = {
  name: 'queue',
  description: 'To see the whole server queue.',
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
    const tracks = player.queue;
    let link = makeUri(`${player.currentTrack.info.title} By ${player.currentTrack.info.author}`);
    if (!tracks.length)
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setAuthor({name: `Queue for ${interaction.guild.name}  -  [ ${player.queue.length} Tracks ]`, iconURL: interaction.guild.iconURL({dynamic: true})})
          .setColor(client.embedColor)
          .addFields([
            {name: '**0) Current Track**', value: `**${player.currentTrack.info.title.substr(0, 60)}** - \`${player.currentTrack.info.isStream ? `LIVE STREAM` : convertTime(player.currentTrack.info.length).split(` | `)[0]}\`
            <:Reply:938408623250485288>Request by: ${player.currentTrack.info.requester ? `<@${player.currentTrack.info.requester.id}>`:`<@${client.user.id}>`}`}
          ])
          .setDescription(`❎ No tracks in the queue`)
          .setFooter({text: 'By Leco Music™'})
        ]
      });

    if (tracks.length < 15)
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setAuthor({name: `Queue for ${interaction.guild.name}  -  [ ${player.queue.length} Tracks ]`, iconURL: interaction.guild.iconURL({dynamic: true})})
          .addFields([
            {name: `**\` 0. \` Current Track**`, value: `**[${player.currentTrack.info.title.substr(0, 60).replace(/\[/igu, "\[").replace(/\]/igu, "\]")}](${link})** - \`${player.currentTrack.info.isStream ? `LIVE STREAM` : convertTime(player.currentTrack.info.length).split(` | `)[0]}\`
            <:Reply:938408623250485288> Requested by: ${player.currentTrack.info.requester ? `<@${player.currentTrack.info.requester.id}>`:`<@${client.user.id}>`}`}
          ])
          .setColor(client.embedColor)
          .setFooter({text: 'By Leco Music™'})
          .setDescription(tracks.map((track, index) => `**\`${++index}.\` [${track.info.title.substr(0, 60).replace(/\[/igu, "\[").replace(/\]/igu, "\]")}](https://discord.gg/xcjZqS9nJY)** - \`${track.info.isStream ? `LIVE STREAM` : convertTime(track.info.length).split(` | `)[0]}\`
<:Reply:938408623250485288> Requested by: ${track.info.requester ? `<@${track.info.requester.id}>`:`<@${client.user.id}>`}`).join(`\n`))
        ]
      });

    let quelist = [];
    var maxTracks = 10; 
    for (let i = 0; i < tracks.length; i += maxTracks) {
      let songs = tracks.slice(i, i + maxTracks);
      quelist.push(songs.map((track, index) => `**\`${i + ++index}.\` [${track.info.title.substr(0, 60).replace(/\[/igu, "\[").replace(/\]/igu, "\]")}](https://discord.gg/xcjZqS9nJY)** - \`${track.info.isStream ? `LIVE STREAM` : convertTime(track.info.length).split(` | `)[0]}\`
<:Reply:938408623250485288> Requested by: ${track.info.requester ? `<@${track.info.requester.id}>`:`<@${client.user.id}>`}`).join(`\n`))
    }
    let limit = quelist.length;
    let embeds = [];
    for (let i = 0; i < limit; i++) {
      let desc = String(quelist[i]).substr(0, 2048)
      await embeds.push(new EmbedBuilder()
      .setAuthor({name: `Queue for ${interaction.guild.name}  -  [ ${player.queue.length} Tracks ]`, iconURL: interaction.guild.iconURL({dynamic: true})})
      .addFields([
        {name: `**\` N. \` *${player.queue.length > maxTracks ? player.queue.length - maxTracks : player.queue.length} other Tracks ...***`, value: `\u200b`},
        {name: `**\` 0. \` Current Track**`, value: `**[${player.currentTrack.info.title.substr(0, 60).replace(/\[/igu, "\[").replace(/\]/igu, "\]")}](${link})** - \`${player.currentTrack.info.isStream ? `LIVE STREAM` : convertTime(player.currentTrack.info.length).split(` | `)[0]}\`
        <:Reply:938408623250485288> Requested by: ${player.currentTrack.info.requester ? `<@${player.currentTrack.info.requester.id}>`:`<@${client.user.id}>`}`}
      ])
        .setColor(client.embedColor)
        .setDescription(desc));
    }
    return collectormsg2(client, interaction, embeds, interaction.user);
  },
};
