const { EmbedBuilder } = require('discord.js');
const db = require("../../schema/autoReconnect");

module.exports = {
    name: '247',
    category: 'Settings',
    description: 'Set 24/7 system',
    args: false,
    userPrams: [],
    botPrams: ['EmbedLinks'],
    dj: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    vote: true,
    execute: async (message, args, client, prefix) => {

        const player = await client.poru.createConnection({
            guildId: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            selfDeaf: true,
        });

        let data = await db.findOne({Guild: message.guild.id});
        if (data) {
            await data.delete();
            let thing = new EmbedBuilder()
            .setTitle(`Leco Music™ 24/7 System`)
            .setColor(client.embedColor)
            .setDescription(`✅ 24/7 System Has Been Removed If You Like Leco Music™ Vote Me`)
            .setImage("https://media.discordapp.net/attachments/971363118695481374/1049269732945186846/standard_6.gif")
            .setFooter({text: 'By Leco Music™'});
            message.reply({ embeds: [thing] })
        } else {
            data = new db({
                Guild: player.guildId,
                TextId: player.textChannel,
                VoiceId: player.voiceChannel
            });
            await data.save();
            let thing = new EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle(`Leco Music™ 24/7 System`)
            .setDescription(`✅ 24/7 System Has Been Setup If You Like Leco Music™ Vote Me`)
            .setImage("https://media.discordapp.net/attachments/971363118695481374/1049269732945186846/standard_6.gif")
            .setFooter({text: 'By Leco Music™'});
            message.reply({ embeds: [thing] })
        };
    },
};
