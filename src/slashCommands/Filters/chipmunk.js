const { EmbedBuilder, CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: 'chipmunk',
    description: 'Sets ChipMunk Filter.',
    userPrams: [],
    botPrams: ['EmbedLinks'],
    player: true,
    dj: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    activeplayer: true,
    vote: true,
/**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

run: async (client, interaction, player) => {
    player.filters.setTimescale({speed: 1.05, pitch: 1.35, rate: 1.25})
    return interaction.reply({
    embeds: [new EmbedBuilder()
    .setColor(client.embedColor)
    .setTitle(`✅ Applying the \`ChIPMUNK\` Filter`)
    .setFooter({text: 'By Leco Music™'})
    ]
        });
    },
};
