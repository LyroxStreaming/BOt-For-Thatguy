const { ApplicationCommandOptionType, CommandInteraction, Client, EmbedBuilder } = require("discord.js");
const db = require("../../schema/dj");

module.exports = {
    name: "adddj",
    description: "Setup Dj role.",
    userPrams: ['ManageGuild'],
    botPrams: ['ManageGuild'],
    vote: true,
    options: [
        {
            name: "role",
            description: "Mention a Role.",
            required: true,
            type: ApplicationCommandOptionType.Role
        }
    ],
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    */

    run: async (client, interaction) => {
        let data = await db.findOne({ Guild: interaction.guildId });
        let role = interaction.options.getRole("role");
        if (!role)
        return interaction.reply({
            embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle(`❎ Please mention a role via ping, \`@role!\``)
            ]
        });
        try {
        interaction.guild.roles.cache.get(role.id);
        } catch {
        return interaction.reply({
            embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle(`❎ It seems that the Role does not exist in this Server!`)
            ]
        });
        };
        if (!data) {
            data = new db({
                Guild: interaction.guild.id,
                Roles: [role.id],
                Mode: true
            })
            await data.save();
            return await interaction.reply({ embeds: [
                new EmbedBuilder()
                .setDescription(`✅ **Successfully Added DJ Role** ${role}.`)
                .setFooter({text: 'By Leco Music™'})
                .setColor(client.embedColor)]});
        } else {
            let rolecheck = data.Roles.find((x) => x === role.id);
            if (rolecheck) return interaction.reply({ embeds: [
                new EmbedBuilder()
                .setTitle(`❎ Role Already Exists in List.`)
                .setColor(client.embedColor)
                .setFooter({text: 'By Leco Music™'})]});
            data.Roles.push(role.id);
            await data.save();
            return await interaction.reply({ embeds: [
                new EmbedBuilder()
                .setDescription(`✅ **Successfully Added New DJ Role** ${role}.`)
                .setColor(client.embedColor)
                .setFooter({text: 'By Leco Music™'})]});
        };
    },
};