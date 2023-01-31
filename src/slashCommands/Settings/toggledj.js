const { ApplicationCommandOptionType, CommandInteraction, Client, EmbedBuilder } = require("discord.js");
const db = require("../../schema/dj");

module.exports = {
    name: "toggledj",
    description: "Toggle Dj role.",
    userPrams: ['ManageGuild'],
    botPrams: ['ManageGuild'],
    vote: true,
    options: [
        {
            name: 'toggledj',
            description: 'Enable Disable Dj Roles.',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'enable',
                    value: `dj_on`,
                },
                {
                    name: 'disable',
                    value: `dj_off`,
                },
            ],
        },
    ],
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    */

    run: async (client, interaction) => {
        let data = await db.findOne({ Guild: interaction.guildId });
        const input = interaction.options.getString('toggledj');

        if(!data) return interaction.reply({embeds:[new EmbedBuilder()
            .setTitle(`❎ Don't Have Dj Setup In This Guild`)
            .setColor(client.embedColor)
            .setFooter({text: 'By Leco Music™'})]});

        if (input === `dj_on`) {
            let mode = false;
            if (!data.Mode) mode = true;
            data.Mode = mode;
            await data.save();
            const thing = new EmbedBuilder()
                .setTitle(`✅ Enabled DJ Mode.`)
                .setColor(client.embedColor)
                .setFooter({text: 'By Leco Music™'});
            await interaction.reply({ embeds: [thing] });
        }

        if (input === `dj_off`) {
            let mode = true;
            if (data.Mode) mode = false;
            data.Mode = mode;
            await data.save();
            const thing = new EmbedBuilder()
            .setTitle(`✅ Disabled DJ Mode.`)
            .setColor(client.embedColor)
            .setFooter({text: 'By Leco Music™'});
            return await interaction.reply({ embeds: [thing] });
        };
    },
};