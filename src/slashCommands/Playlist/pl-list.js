const { EmbedBuilder, CommandInteraction, Client, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const db = require("../../schema/playlist");
const lodash = require("lodash");

module.exports = {
  name: 'pl-list',
  description: 'To List The Playlist.',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  player: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction, player) => {
    const data = await db.find({ UserId: interaction.member.user.id });
    if (!data.length) {
      return interaction.reply({ embeds: [new EmbedBuilder()
          .setColor(client.embedColor)
          .setTitle(`❎ You Do Not Have Any Playlist`)
          .setFooter({text: 'By Leco Music™'})]});
  };

      let list = data.map((x, i) => `\`${++i}\` - **${x.PlaylistName}** [Songs- \`${x.Playlist.length}\`]   [**Created-date** - <t:${x.CreatedOn}>]`);
      const pages = lodash.chunk(list, 10).map((x) => x.join("\n"));
      let page = 0;

    const embed = new EmbedBuilder()
      .setAuthor({ name: `${interaction.member.user.username}s Playlists`, iconURI: interaction.member.user.displayAvatarURL() })
      .setDescription(pages[page])
      .setFooter({ text: `Playlist (${list.length})`})
      .setColor(client.embedColor);
    if (pages.length <= 1) {
        return await interaction.reply({ embeds: [embed] })
    } else {
        let previousbut = new ButtonBuilder()
        .setCustomId("Back")
        .setEmoji("⏪")
        .setLabel("Back")
        .setStyle(ButtonStyle.Secondary);

        let nextbut = new ButtonBuilder()
        .setCustomId("Forward")
        .setLabel("Forward")
        .setEmoji("⏩")
        .setStyle(ButtonStyle.Secondary);

        let stopbut = new ButtonBuilder()
        .setCustomId("Stop")
        .setLabel("Stop")
        .setEmoji("⏹️")
        .setStyle(ButtonStyle.Secondary);

        let homebut = new ButtonBuilder()
        .setCustomId("Home")
        .setLabel("Home")
        .setEmoji("🏠")
        .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder().addComponents(previousbut, homebut, nextbut ,stopbut);
        const m = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true });
        const collector = m.createMessageComponentCollector({
            filter: (b) => b.user.id ===  interaction.member.user.id ? true : false && b.deferUpdate().catch(() => { }),
          time: 60000 * 5,
          idle: 60000 * 5 / 2
        });

        collector.on("end", async () => {
            if (!m) return;
            await m.edit({ components: [new ActionRowBuilder().addComponents(previousbut.setDisabled(true), homebut.setDisabled(true), nextbut.setDisabled(true), stopbut.setDisabled(true))] });
        });

        collector.on("collect", async (b) => {
            if (!b.deferred) await b.deferUpdate().catch(() => { });
            if (b.customId === "Back") {
                page = page - 1 < 0 ? pages.length - 1 : --page;
                if (!m) return;
              embed.setDescription(`${pages[page]}`);
                return await m.edit({ embeds: [embed] });

            } else if (b.customId === "Stop") {
                return collector.stop();
            }
            else if (b.customId === "Home") {
                page = 0
                if (!m) return;
                embed.setDescription(`${pages[page]}`);
            return await m.edit({ embeds: [embed] });

            } else if (b.customId === "Forward")
                page = page + 1 >= pages.length ? 0 : ++page;
            if (!m) return;
            embed.setDescription(`${pages[page]}`);
            return await m.edit({ embeds: [embed] });
      });
    };
  },
};
