const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
name: 'premium',
description: 'Show all info about Leco Music™ premium!',
userPrams: [],
botPrams: ['EmbedLinks'],

    run: async (client, interaction) => {
        let user = client.user
        let button_support_dc = new ButtonBuilder()
        .setEmoji("🎭")
        .setStyle(ButtonStyle.Link)
        .setLabel('Support Server')
        .setURL("https://discord.gg/bHDq4PqjAe")
    
        let button_invite = new ButtonBuilder()
        .setEmoji("📬")
        .setStyle(ButtonStyle.Link)
        .setLabel("Invite " + user.username)
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${user.id}&permissions=8&scope=bot%20applications.commands`)
        
        let butweb = new ButtonBuilder()
        .setEmoji(`📰`)
        .setStyle(ButtonStyle.Link)
        .setLabel(`Website`)
        .setURL(`https://larabot.tk`)
    
        const allbuttons = [new ActionRowBuilder().addComponents([button_support_dc, button_invite, butweb])];

        interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor(client.embedColor)
                .setTitle('Leco Music™ Premium')
                .setDescription(`**You want to get Leco Music™ premium join support server and read [this](https://discord.com/channels/924888533137764403/1033363849581174794)**`)
                .setImage('https://media.discordapp.net/attachments/971363118695481374/1067272548083060776/standard.gif')
                .setFooter({text: 'By Leco Music™'})
            ],
            components: allbuttons,
            ephemeral: true});
    },
};
