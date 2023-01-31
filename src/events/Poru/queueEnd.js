const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { autoplay } = require('../../utils/functions');

module.exports = {
  name: 'queueEnd',
  run: async (client, player) => {
    if (player.currentmsg) {
      let channel = client.channels.cache.get(player.textChannel);
      channel.messages.fetch(player.currentmsg).then(currentplay => {
        if (currentplay) {

          let vdown = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('vdown1').setEmoji(`🔉`).setLabel(`Down`).setDisabled(true);
          let back10 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('back9').setEmoji('⏮️').setLabel(`Back`).setDisabled(true);
          let pause = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('pause2').setEmoji(`⏯️`).setLabel(`Pause`).setDisabled(true);
          let skip = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('skip3').setEmoji('⏭️').setLabel(`Skip`).setDisabled(true);
          let vup = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('vup5').setEmoji('🔊').setLabel(`Up`).setDisabled(true);
          let shuffle = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('shuffle6').setEmoji(`🔀`).setLabel(`Shuffle`).setDisabled(true);
          let songloop = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('songloop4').setEmoji('🔁').setLabel(`Loop`).setDisabled(true);
          let stop = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('stop7').setEmoji(`⏹️`).setLabel(`Stop`).setDisabled(true);
          let autoplay = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('autoplay8').setEmoji('🔃').setLabel(`AutoPlay`).setDisabled(true);
          let forw10 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('forwd10').setEmoji('⏩').setLabel(`+10 Sec`).setDisabled(true);

          const row = new ActionRowBuilder().addComponents([vdown, back10, pause, skip, vup]);
          const row2 = new ActionRowBuilder().addComponents([shuffle, songloop, stop, autoplay, forw10]);
          currentplay.edit({ components: [row, row2] }).catch(() => null)
        };
      });
    };
    if (player.auto) return autoplay(client, player);
    if (player.currentmsg) {
      player.currentmsg.delete;
    };
  },
};
