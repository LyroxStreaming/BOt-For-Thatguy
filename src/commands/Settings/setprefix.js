const { EmbedBuilder } = require('discord.js');
const db = require('../../schema/prefix.js');
module.exports = {
    name: 'setprefix',
    category: 'Settings',
    description: 'Set Custom Prefix',
    args: false,
    usage: '',
    aliases: ['prefix'],
    userPrams: ['ManageGuild'],
    botPrams: ['ManageGuild'],
    owner: false,
    vote: true,
    execute: async (message, args, client, prefix) => {
        const data = await db.findOne({ Guild: message.guildId });
        const pre = await args.join(' ');

        if (!pre[0]) {
            const embed = new EmbedBuilder()
                .setTitle('❎ Please give the prefix that you want to set!')
                .setColor(client.embedColor)
                .setFooter({text: 'By Leco Music™'});
            return message.reply({ embeds: [embed] });
        }
        if (pre[0].length > 3) {
            const embed = new EmbedBuilder()
                .setTitle('❎ You can not send prefix more than 3 characters')
                .setColor(client.embedColor)
                .setFooter({text: 'By Leco Music™'});
            return message.reply({ embeds: [embed] });
        }
        if (data) {
            data.oldPrefix = prefix;
            data.Prefix = pre;
            await data.save();
            const update = new EmbedBuilder()
                .setTitle(`✅ Your prefix has been updated to \`${pre}\``)
                .setColor(client.embedColor)
                .setFooter({text: 'By Leco Music™'});
            return message.reply({ embeds: [update] });
        } else {
            const newData = new db({
                Guild: message.guildId,
                Prefix: pre,
                oldPrefix: prefix,
            });
            await newData.save();
            const embed = new EmbedBuilder()
                .setTitle(`✅ Custom prefix in this server is now set to \`${pre}\``)
                .setColor(client.embedColor)
                .setFooter({text: 'By Leco Music™'});
            return message.reply({ embeds: [embed] });
        };
    },
};