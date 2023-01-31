const { EmbedBuilder, CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: 'forward',
    description: 'Forward the current track by 10 seacondss',
    userPrams: [],
    botPrams: ['EmbedLinks'],
    dj: true,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    activeplayer: true,
    vote: true,

/**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

run: async (client, interaction, player) => {
    let seektime = Number(player.position) + 10 * 1000;
    if (10 <= 0) seektime = Number(player.position);
    player.seekTo(Number(seektime));

    return interaction.reply({embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`<:forward10:927525488560316456> Forwarded the song for \`10 Seconds\`!`)
        .setFooter({text: 'By Leco Music™'})
    ]});
    },
};
