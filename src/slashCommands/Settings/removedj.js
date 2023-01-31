const { CommandInteraction, Client, EmbedBuilder } = require("discord.js");
const db = require("../../schema/dj");

module.exports = {
    name: "removedj",
    description: "Delete Dj role.",
    userPrams: ['ManageGuild'],
    botPrams: ['ManageGuild'],
    vote: true,
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    */

    run: async (client, interaction) => {
        let data = await db.findOne({ Guild: interaction.guildId });
        if (data) {
            await data.delete();
            return interaction.reply({ embeds: [new EmbedBuilder()
                .setTitle(`✅ Successfully Removed All DJ Roles.`)
                .setColor(client.embedColor)
                .setFooter({text: 'By Leco Music™'})]});

        } else return interaction.reply({ embeds: [new EmbedBuilder()
            .setTitle(`❎ Don't Have Dj Setup In This Guild`)
            .setColor(client.embedColor)
            .setFooter({text: 'By Leco Music™'})]});
    },
};