const { EmbedBuilder } = require("discord.js");
const db = require("../../schema/dj");

module.exports = {
    name: "removedj",
    category: 'Settings',
    description: "Remove Dj Role",
    args: false,
    usage: "",
    aliases: ["romdj"],
    userPrams: ['ManageGuild'],
    botPrams: ['ManageGuild'],
    owner: false,
    vote: true,
    execute: async (message, args, client, prefix, player) => {
        let data = await db.findOne({ Guild: message.guild.id });
        if (data) {
            await data.delete()
            return message.reply({ embeds: [new EmbedBuilder()
                .setTitle(`✅ Successfully Removed All DJ Roles.`)
                .setColor(client.embedColor)
                .setFooter({text: 'By Leco Music™'})] });

        } else return message.reply({ embeds: [new EmbedBuilder()
            .setTitle(`❎ Don't Have Dj Setup In This Guild`)
            .setColor(client.embedColor)
            .setFooter({text: 'By Leco Music™'})] });
    },
};
