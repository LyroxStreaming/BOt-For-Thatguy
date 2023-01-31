const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const db = require("../../schema/autoReconnect");
const { delay } = require("../../utils/functions.js");

module.exports = {
  name: 'playerDestroy',
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
          currentplay.edit({ components: [row, row2] }).catch(() => null);
        };
      });
    };
    if (player.auto) {
      player.auto.delete;
    };
    if (player.currentmsg) {
      player.currentmsg.delete;
    };
    if (player.beforetrack) {
      player.beforetrack.delete;
    };
    client.logger.log(`Player Destroy in ${player.guildId}`, "log");
    const autoconnect = await db.findOne({ Guild: player.guildId });

    if (autoconnect) {
      const channel = await client.getChannel(autoconnect.TextId);
      const voice = await client.getChannel(autoconnect.VoiceId);
      const guild = await client.getGuild(autoconnect.Guild);
      if (!channel || !voice || !guild || channel === undefined || voice === undefined || guild === undefined) {
        return autoconnect.delete();
      };
      await delay(5000);
      player = client.poru.createConnection({
        guildId: autoconnect.Guild,
        voiceChannel: autoconnect.VoiceId,
        textChannel: autoconnect.TextId,
        selfDeaf: true,
      });
    };
  },
};
