const { EmbedBuilder, CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: "autoplay",
    description: "Toggle music autoplay",
    userPrams: [],
    botPrams: ['EmbedLinks'],
    player: true,
    dj: true,
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
        player.auto = !player.auto;
        return interaction.reply({
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