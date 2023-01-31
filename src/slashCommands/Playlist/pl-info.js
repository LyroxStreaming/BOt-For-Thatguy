const { ApplicationCommandOptionType, EmbedBuilder, CommandInteraction, Client, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const db = require("../../schema/playlist");
const { convertTime } = require("../../utils/convert.js");
const lodash = require("lodash");

module.exports = {
    name: 'pl-info',
    description: 'Get information about your saved playlist.',
    userPrams: [],
    botPrams: ['EmbedLinks'],
    player: false,
    inVoiceChannel: false,
    sameVoiceChannel: false,
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
    const data = await db.findOne({ UserId: interaction.member.user.id, PlaylistName: Name });
    if (!Name) {
        return interaction.reply({ embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setDescription(`❎ You didn't entered a playlist name\nUsage: \`/pl-info <playlist name>\``)
            .setFooter({text: 'By Leco Music™'})]});
    }
    if (!data) {
        return interaction.reply({ embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle(`❎ You don't have a playlist with \`${Name}\` name`)] });
    }
    let tracks = data.Playlist.map((x, i) => `\`${+i}\` - ${x.title && x.uri ? `[${x.title}](https://discord.gg/xcjZqS9nJY)` : `${x.title}`} - \`${convertTime(x.duration)}\``);
    const pages = lodash.chunk(tracks, 10).map((x) => x.join("\n"));
    let page = 0;
    const embed = new EmbedBuilder()
        .setTitle(`${ interaction.member.user.username}s Playlists`)
        .setColor(client.embedColor)
      .setDescription(`**Playlist Name** ${data.PlaylistName} **Total Tracks** ${data.Playlist.length}\n\n${pages[page]}`)
    if (pages.length <= 1) {
        return await interaction.reply({ embeds: [embed] });
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
              embed.setDescription(`**Playlist Name** ${data.PlaylistName} **Total Tracks** ${data.Playlist.length}\n\n${pages[page]}`);
                return await m.edit({ embeds: [embed] });

            } else if (b.customId === "Stop") {
                return collector.stop();
            }
            else if (b.customId === "Home") {
                page = 0
                if (!m) return;
          embed.setDescription(`**Playlist Name** ${data.PlaylistName} **Total Tracks** ${data.Playlist.length}\n\n${pages[page]}`);
            return await m.edit({ embeds: [embed] });

            } else if (b.customId === "Forward")
                page = page + 1 >= pages.length ? 0 : ++page;
            if (!m) return;
          embed.setDescription(`**Playlist Name** ${data.PlaylistName} **Total Tracks** ${data.Playlist.length}\n\n${pages[page]}`);
            return await m.edit({ embeds: [embed] });
            });
        };
    },
};


