const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "pause",
    category: "Music",
    description: "Pause the currently playing music",
    args: false,
    usage: "",
    userPrams: [],
    botPrams: ["EmbedLinks"],
    dj: true,
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    activeplayer: true,
    execute: async (message, args, client, prefix, player) => {
      if (!player.isPlaying)
      return message.reply({
        embeds: [new EmbedBuilder()
          .setColor(client.embedColor)
          .setTitle(`❎ The song is already \`paused!\``)
          .setDescription(`You can resume it with: \`${prefix}resume\``)
          .setFooter({text: 'By Leco Music™'})
        ]
      });
    player.pause(true);
    return message.reply({
      embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`✅ The song is \`paused!\``)
        .setDescription(`You can resume it with: \`${prefix}resume\``)
        .setFooter({text: 'By Leco Music™'})
      ]
      });
    },
};
