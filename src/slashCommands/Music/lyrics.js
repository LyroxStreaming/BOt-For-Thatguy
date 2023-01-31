const { EmbedBuilder } = require('discord.js');
const { collectormsg } = require('../../utils/functions');
const lyricsFinder = require("lyrics-finder");
const _ = require("lodash");

module.exports = {
    name: 'lyrics',
    description: 'Show current playing track lyrics',
    userPrams: [],
    botPrams: ['EmbedLinks'],
    dj: true,
    player: true,
    cooldown: 15,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    activeplayer: true,
    vote: true,

    run: async (client, interaction, player) => {
        let SongTitle = player.currentTrack.info.title;
        let track = player.currentTrack.info;
        SongTitle = SongTitle.replace(
            /lyrics|lyric|lyrical|official music video|\(official music video\)|audio|official|official video|official video hd|official hd video|offical video music|\(offical video music\)|extended|hd|(\[.+\])/gi,
            ""
        );
        let embeds = []
        let lyrics = await lyricsFinder(SongTitle);
        if (!lyrics)
            return interaction.reply({ embeds : new EmbedBuilder()
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
        
        })
        return collectormsg(client, interaction, embeds, interaction.member);
    }
};
