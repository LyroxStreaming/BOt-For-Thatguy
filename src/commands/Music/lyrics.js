const { EmbedBuilder } = require("discord.js");
const { collectormsg } = require("../../utils/functions");
const lyricsFinder = require("lyrics-finder");
const _ = require("lodash");

module.exports = {
    name: "lyrics",
    aliases: ['ly'],
    category: "Music",
    description: "Show the current playing track lyrics",
    args: false,
    usage: "",
    userPrams: [],
    botPrams: ["EmbedLinks"],
    dj: true,
    owner: false,
    cooldown: 15,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    activeplayer: true,
    vote: true,
    
    execute: async (message, args, client, prefix, player) => {
        let SongTitle = player.currentTrack.info.title;
        let track = player.currentTrack.info;
        SongTitle = SongTitle.replace(
            /lyrics|lyric|lyrical|official music video|\(official music video\)|audio|official|official video|official video hd|official hd video|offical video music|\(offical video music\)|extended|hd|(\[.+\])/gi,
            ""
        );
        let embeds = []
        let lyrics = await lyricsFinder(SongTitle);
        if (!lyrics)
            return message.reply({ embeds : new EmbedBuilder()
            .setDescription(`**No lyrics found for -** \`${SongTitle}\``)
            .setColor(client.embedColor)
            });
        lyrics = lyrics.split("\n"); 
        let SplitedLyrics = _.chunk(lyrics, 40);
        let Pages = SplitedLyrics.map((ly) => {
        embeds.push(new EmbedBuilder()
            .setTitle(`${track.title}`)
            .setColor(client.embedColor)
            .setDescription(ly.join("\n")));
        });
        return collectormsg(client, message, embeds, message.author);
    },
};
