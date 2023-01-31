const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "leave",
    aliases: ["dc", "dis"],
    category: "Music",
    description: "Leave voice channel",
    args: false,
    usage: "",
    userPrams: [],
    botPrams: ["EmbedLinks"],
    dj: true,
    owner: false,
    player: false,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    activeplayer: false,
    execute: async (message, args, client, prefix, player) => {
        await player.destroy();
        message.reply({
            embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle(`✅ **Left the channel**`)
            .setFooter({text: 'By Leco Music™'})
        ]});
    },
};