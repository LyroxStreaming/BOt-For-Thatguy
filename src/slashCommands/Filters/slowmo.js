const { EmbedBuilder, CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: 'slowmo',
    description: 'Sets SlowMo Filter.',
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
    player.filters.setTimescale({speed: 0.5, pitch: 1.0, rate: 0.8})
    return interaction.reply({
    embeds: [new EmbedBuilder()
    .setColor(client.embedColor)
    .setTitle(`✅ Applying the \`SLOWMO\` Filter`)
    .setFooter({text: 'By Leco Music™'})
    ]
        });
    },
};
