const { EmbedBuilder, CommandInteraction, Client } = require('discord.js');
const db = require("../../schema/autoReconnect");

module.exports = {
    name: '247',
    description: 'setup 24/7 system',
    userPrams: [],
    botPrams: ['EmbedLinks'],
    player: false,
    dj: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    vote: true,

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {
        const player = await client.poru.createConnection({
            guildId: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id,
            selfDeaf: true,
        });
        player.setVolume(0.7);

        let data = await db.findOne({Guild: interaction.guild.id});
        if (data) {
            await data.delete();
            let thing = new EmbedBuilder()
            .setTitle(`Leco Music™ 24/7 System`)
            .setColor(client.embedColor)
            .setDescription(`✅ 24/7 System Has Been Removed If You Like Leco Music™ Vote Me`)
            .setImage("https://media.discordapp.net/attachments/971363118695481374/1049269732945186846/standard_6.gif")
            .setFooter({text: 'By Leco Music™'});
            interaction.reply({ embeds: [thing] });
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
            interaction.reply({ embeds: [thing] });
        };
    },
};
