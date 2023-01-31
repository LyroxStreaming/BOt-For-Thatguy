const { EmbedBuilder } = require('discord.js');
const { duration } = require('../../utils/functions');

module.exports = {
    name: 'uptime',
    category: 'Information',
    description: 'Leco Music™ uptime',
    args: false,
    usage: '',
    userPrams: [],
    botPrams: ['EmbedLinks'],
    owner: false,
    execute: async (message, args, client, prefix) => {
        message.reply({
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
