const { EmbedBuilder, CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: 'clearfilters',
    description: 'Clear all active filters',
    userPrams: [],
    botPrams: ['EmbedLinks'],
    player: true,
    dj: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    activeplayer: true,
/**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

run: async (client, interaction, player) => {
    player.filters.clearFilters();
    return interaction.reply({
        embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`✅ Clear All Filters`)
        .setFooter({text: 'By Leco Music™'})
        ]
        });
    },
};
