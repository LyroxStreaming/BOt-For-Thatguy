const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const db = require("../../schema/playlist");
const lodash = require("lodash");

module.exports = {
    name: 'pl-list',
    aliases: ['pllist'],
    category: 'Playlist',
    description: 'To List The Playlist.',
    args: false,
    usage: 'list',
    userPrams: [],
    botPrams: ['EmbedLinks'],
    owner: false,
    player: false,
    inVoiceChannel: false,
    sameVoiceChannel: false,
    execute: async (message, args, client, prefix, player) => {
    let data = await db.find({ UserId: message.author.id});
        if (!data.length) {
            return message.reply({ embeds: [new EmbedBuilder()
                .setColor(client.embedColor)
                .setTitle(`❎ You Do Not Have Any Playlist`)
                .setFooter({text: 'By Leco Music™'})]})
        };
        if(!args[0]) {
            let list = data.map((x, i) => `\`${++i}\` - **${x.PlaylistName}** [Songs- \`${x.Playlist.length}\`]   [**Created-date** - <t:${x.CreatedOn}>]`);
            const pages = lodash.chunk(list, 10).map((x) => x.join("\n"));
            let page = 0;

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${message.author.username}s Playlists`, iconURI: message.author.displayAvatarURL() })
            .setDescription(pages[page])
            .setFooter({ text: `Playlist (${list.length})`})
            .setColor(client.embedColor);
        if (pages.length <= 1) {
            return await message.reply({ embeds: [embed] });
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
            const m = await message.reply({ embeds: [embed], components: [row] });
            const collector = m.createMessageComponentCollector({
                filter: (b) => b.user.id === message.author.id ? true : false && b.deferUpdate().catch(() => { }),
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
        };
    },
};