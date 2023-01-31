const { EmbedBuilder } = require("discord.js");
const db = require("../../schema/dj");

module.exports = {
    name: "toggledj",
    category: 'Settings',
    description: " Toggle Dj mode",
    args: false,
    usage: "",
    aliases: ["romdj"],
    userPrams: ['ManageGuild'],
    botPrams: ['ManageGuild'],
    owner: false,
    vote: true,
    execute: async (message, args, client, prefix, player) => {
        let data = await db.findOne({ Guild: message.guild.id });

        if(!data) return message.reply({embeds:[new EmbedBuilder()
            .setTitle(`❎ Don't Have Dj Setup In This Guild`)
            .setColor(client.embedColor)
            .setFooter({text: 'By Leco Music™'})]});

        let mode = false;
        if(!data.Mode)mode = true;
        data.Mode = mode;
        await data.save();
        if(mode) {
            await message.reply({embeds: [new EmbedBuilder()
                .setTitle(`✅ Enabled DJ Mode.`)
                .setColor(client.embedColor)
                .setFooter({text: 'By Leco Music™'})]});
        } else {
        return await message.reply({embeds: [new EmbedBuilder()
            .setTitle(`✅ Disabled DJ Mode.`)
            .setColor(client.embedColor)
            .setFooter({text: 'By Leco Music™'})]});
        };
    },
};