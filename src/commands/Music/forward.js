const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'forward',
    aliases: ['fw'],
    category: 'Music',
    description: 'Forward the current track by 10 seaconds',
    args: false,
    usage: '',
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
    let seektime = Number(player.position) + 10 * 1000;
    if (10 <= 0) seektime = Number(player.position);
    player.seekTo(Number(seektime));
    
    return message.reply({embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`<:forward10:927525488560316456> Forwarded the song for \`10 Seconds\`!`)
        .setFooter({text: 'By Leco Music™'})
        ]});
    },
};
