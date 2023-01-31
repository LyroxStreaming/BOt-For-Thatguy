const { EmbedBuilder, CommandInteraction, Client, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'sponsor',
    description: 'Gives you information Leco Music™ Sponsor',
    userPrams: [],
    botPrams: ['EmbedLinks'],

    /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

    run: async (client, interaction) => {
        let bu1 = new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setURL(``)
        .setLabel('Sponsor Site')
        .setEmoji(`❤️`)
        
        let bu2 = new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setURL(``)
        .setLabel('Sponsor Discord')
        .setEmoji(`💜`)

        let row = new ActionRowBuilder().addComponents([bu1], [bu2]);
        let ping = new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle('no sponsor')
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({dynamic: true})})
        .setDescription(`no sponsor you can sponser this bot.`)
        .setFooter({text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL({dynamic: true})})
        .setImage(`https://cdn.discordapp.com/attachments/1037406378517606530/1048917092763709500/standard_3.gif`)
        
        interaction.reply({embeds: [ping], components: [row]});
    },
};
