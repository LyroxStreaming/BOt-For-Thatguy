const { EmbedBuilder, CommandInteraction, Client, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'vote',
    description: 'Leco Music™ vote links',
    userPrams: [],
    botPrams: ['EmbedLinks'],

/**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

run: async (client, interaction) => {
    let button_support_dc = new ButtonBuilder()
        .setEmoji("🎭")
        .setStyle(ButtonStyle.Link)
        .setLabel('Support Server')
        .setURL("https://discord.gg/bHDq4PqjAe")

        let button_invite = new ButtonBuilder()
        .setEmoji("✅")
        .setStyle(ButtonStyle.Link)
        .setLabel("Vote Site 1")
        .setURL(`https://discordbotlist.com/bots/Leco Music™/upvote`)
        
        let butweb = new ButtonBuilder()
        .setEmoji(`✅`)
        .setStyle(ButtonStyle.Link)
        .setLabel(`Vote Site 2`)
        .setURL(`https://top.gg/bot/944016826751389717/vote`)

        const allbuttons = [new ActionRowBuilder().addComponents([button_support_dc, button_invite, butweb])];

        let ping = new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`Leco Music™`)
        .setDescription(`
        <:fast:927525488203816960> **Site 1 - Discordbotlist.com**
        <:fast:927525488203816960> **Site 2 - Top.gg**`)
        .setImage(`https://media.discordapp.net/attachments/1060452547212611645/1067278085646471279/standard_3.gif`)
        .setFooter({text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL({dynamic: true})})
        interaction.reply({embeds: [ping], components: allbuttons});
    },
};
