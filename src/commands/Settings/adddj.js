const { EmbedBuilder } = require("discord.js");
const db = require("../../schema/dj");

module.exports = {
    name: "adddj",
    category: 'Settings',
    description: "Set Dj Role",
    args: false,
    usage: "",
    aliases: ["adj"],
    userPrams: ['ManageGuild'],
    botPrams: ['ManageGuild'],
    owner: false,
    vote: true,
    execute: async (message, args, client, prefix, player) => {
        let data = await db.findOne({ Guild: message.guild.id });
        let role = message.mentions.roles.filter(role => role.guild.id == message.guild.id).first();
    if (!role)
    return message.reply({
        embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`❎ Please mention a role via ping, \`@role!\``)
        .setFooter({text: 'By Leco Music™'})
        ]
        });
    try {
        message.guild.roles.cache.get(role.id);
    } catch {
    return message.reply({
        embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`❎ It seems that the Role does not exist in this Server!`)
        ]
    });
    }
        if (!data) {
            data = new db({
                Guild: message.guild.id,
                Roles: [role.id],
                Mode: true
            });
            await data.save();
            return await message.channel.send({ embeds: [
                new EmbedBuilder()
                .setDescription(`✅ **Successfully Added DJ Role** ${role}.`)
                .setFooter({text: 'By Leco Music™'})
                .setColor(client.embedColor)] });
        } else {
            let rolecheck = data.Roles.find((x) => x === role.id);
            if (rolecheck) return message.reply({ embeds: [
                new EmbedBuilder()
                .setTitle(`❎ Role Already Exists in List.`)
                .setColor(client.embedColor)] });
            data.Roles.push(role.id);
            await data.save();
            return await message.channel.send({ embeds: [
                new EmbedBuilder()
                .setDescription(`✅ **Successfully Added New DJ Role** ${role}.`)
                .setFooter({text: 'By Leco Music™'})
                .setColor(client.embedColor)] });
        };
    },
};