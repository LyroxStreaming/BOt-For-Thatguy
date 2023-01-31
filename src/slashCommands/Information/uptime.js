const { EmbedBuilder, CommandInteraction, Client } = require("discord.js");
const { duration } = require('../../utils/functions');

module.exports = {
    name: "uptime",
    description: "Update on Leco Music™",
    userPrams: [],
    botPrams: ['EmbedLinks'],

    /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   */

run: async (client, interaction) => {
    interaction.reply({
        embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`Uptime`)
        .setDescription(`\`\`\`css\n${duration(client.uptime).map(i=> `${i}`).join(`︲`)}\`\`\``)
        .setImage(`https://media.discordapp.net/attachments/971363118695481374/1049269731875631105/standard_8.gif`)
        .setFooter({text: 'By Leco Music™'})
    ]
        });
    },
};