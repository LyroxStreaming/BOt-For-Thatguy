const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "reloadcmd",
    category: "Owner",
    aliases: ["rd"],
    description: "Reload Command",
    args: false,
    usage: "<string>",
    permission: [],
    owner: true,
    execute: async (message, args, client, prefix) => {
        if (!args[0]) {
        return message.channel.send({
            embeds: [
            new EmbedBuilder()
                .setColor(client.embedColor)
                .setDescription(`Please try again with a valid add command method!\nAvailable methods: \`m\`, \`s\``),
            ],
            });
        }
        if (!args[1]) {
        return message.channel.send({
            embeds: [
            new EmbedBuilder()
                .setColor(client.embedColor)
                .setDescription(`Please provide the commands's category!\nex.... \`Filters, Information, Music, Owner, Playlist, Settings\``),
            ],
            });
        }
        if (!args[2]) {
        return message.channel.send({
            embeds: [
            new EmbedBuilder()
                .setColor(client.embedColor)
                .setDescription(`Please provide the commands's name!`),
            ],
            });
        }
        client.commands.get(args[2].toLowerCase()) || client.commands.find((c) => c.aliases[0] && c.aliases.includes(args[2].toLowerCase()));
        if (args[0].toLowerCase() === "m") {
        try {
            await client.cluster.broadcastEval(
            async (c, command) => {
                delete require.cache[require.resolve(`${process.cwd()}/src/commands/${command.category}/${command.name}.js`)];
                const pull = require(`${process.cwd()}/src/commands/${command.category}/${command.name}.js`);
                c.commands.set(command.name, pull);
                },
                { context: { name: args[2], category: args[1] } }
            );
            return message.channel.send({
            embeds: [
                new EmbedBuilder()
                    .setColor(client.embedColor)
                    .setDescription(`Successfully added the message commmand \`${args[2]}\``),
                ],
            });
            } catch (e) {
            console.log(e)
            return message.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setColor(client.embedColor)
                    .setDescription(`Unable to add the message commmand \`${args[2]}\`\n${e}`),
                ],
            });
            }
        } else if (args[0].toLowerCase() === "s") {
            try {
            await client.cluster.broadcastEval(
            async (c, command) => {
                delete require.cache[require.resolve(`${process.cwd()}/src/slashCommands/${command.category}/${command.name}.js`)];
                const pull = require(`${process.cwd()}/src/slashCommands/${command.category}/${command.name}.js`);
                c.slashCommands.set(command.name, pull);
                },
                { context: { name: args[2], category: args[1] } }
            );
            return message.channel.send({
                embeds: [
                new EmbedBuilder()
                    .setColor(client.embedColor)
                    .setDescription(`Successfully added the slash commmand \`${args[2]}\``),
                ],
            });
            } catch (e) {
            return message.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setColor(client.embedColor)
                    .setDescription(`Unable to added the slash commmand \`${args[2]}\`\n${e}`),
                ],
            });
            }
        } else {
            return message.channel.send({
            embeds: [
                new EmbedBuilder()
                .setColor(client.embedColor)
                .setDescription(`Please try again with a valid add command method!\nAvailable methods: \`m\`, \`s\``),
            ],
            });
        };
    },
};