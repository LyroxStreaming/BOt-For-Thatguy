const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "autoplay",
    aliases: ["ap"],
    category: "Music",
    description: "Toggle music autoplay",
    args: false,
    usage: "",
    userPrams: [],
    botPrams: ['EmbedLinks'],
    dj: true,
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    activeplayer: true,
    vote: true,
    execute: async (message, args, client, prefix, player) => {
        player.auto = !player.auto;

        return message.reply({
            embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle(`${player.auto ? "Successfully \`Enabled\` Autoplay mode" : "Successfully \`Disabled\` Autoplay mode"}`)
            .setDescription(`${player.auto ? "Add songs automaticlly after queue is empty \`enabled\`" : "Add songs automaticlly after queue is empty \`disabled\`"}`)
            .setImage(`https://media.discordapp.net/attachments/971363118695481374/1049269732630605834/standard_10.gif`)
            .setFooter({text: 'By Leco Music™'})
            ]
        });
    },
};
