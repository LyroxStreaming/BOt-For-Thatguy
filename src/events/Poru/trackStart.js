const { EmbedBuilder, Client, ButtonBuilder, ActionRowBuilder, PermissionsBitField, ButtonStyle } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
const { editlastmsg } = require("../../utils/functions.js");
const { makeUri } = require("../../utils/makeurl.js");

module.exports = {
  name: "trackStart",
  /**
   * 
   * @param {Client} client 
   * @param {*} player 
   * @param {*} track 
   */
  run: async (client, player, track) => {
    let guild = client.guilds.cache.get(player.guildId);
    if (!guild) return;
    let channel = guild.channels.cache.get(player.textChannel);
    if (!channel) return;
    player.auto = player.auto || false;
    if (player.beforetrack) {
      editlastmsg(client, player);
    }
    player.beforetrack = track;
    let playdata = musicpanel(client, player, track)
    if (channel.permissionsFor(guild.members.me).has(PermissionsBitField.resolve('SendMessages'))) {
      channel.send(playdata).then(msg => {
        player.currentmsg = msg.id;
        return msg;
      });
    };
  },
};
function musicpanel(client, player, track) {
  let link = makeUri(`${track.info.title} By ${track.info.author}`)
  let embed = new EmbedBuilder()
    .setColor(client.embedColor)
    .setAuthor({ name: `MUSIC PANEL`, iconURL: `${track.info.requester ? `${track.info.requester.displayAvatarURL({ dynamic: true })}` : `${client.user.displayAvatarURL({ dynamic: true })}`}`, url: `${track.info.uri ? `${link}` : `https://discord.gg/xcjZqS9nJY`}}` })
    .setDescription(`<:Playing:1066636299747995648>  ${track.info.title && track.info.uri ? `[\`${track.info.title}\`](${link})` : `\`${track.info.title}\``}`)
    .addFields([
      { name: "👤Requested By", value: `${track.info.requester ? `<@${track.info.requester.id}>` : `<@${client.user.id}>`}`, inline: true },
      { name: "⏱️Music Duration ", value: `\`${track.info.isStream ? "LIVE STREAM" : convertTime(track.info.length)}\``, inline: true },
      { name: "🤟Music Author", value: `\`${track.info.author}\``, inline: true },
    ])

  let vdown = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('vdown1').setEmoji(`🔉`).setLabel(`Down`);
  let back10 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('back9').setEmoji('⏮️').setLabel(`Back`);
  let pause = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('pause2').setEmoji(`⏯️`).setLabel(`Pause`);
  let skip = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('skip3').setEmoji('⏭️').setLabel(`Skip`);
  let vup = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('vup5').setEmoji('🔊').setLabel(`Up`);
  let shuffle = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('shuffle6').setEmoji(`🔀`).setLabel(`Shuffle`);
  let songloop = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('songloop4').setEmoji('🔁').setLabel(`Loop`);
  let stop = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('stop7').setEmoji(`⏹️`).setLabel(`Stop`);
  let autoplay = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('autoplay8').setEmoji('🔃').setLabel(`AutoPlay`);
  let forw10 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('forwd10').setEmoji('⏩').setLabel(`+10 Sec`);

  const row = new ActionRowBuilder().addComponents([vdown, back10, pause, skip, vup]);
  const row2 = new ActionRowBuilder().addComponents([shuffle, songloop, stop, autoplay, forw10]);
  return {
    embeds: [embed],
    components: [row, row2]
  };
};