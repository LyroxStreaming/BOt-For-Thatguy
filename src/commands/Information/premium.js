const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "premium",
    category: "Information",
    description: "Show all info about Leco Music™ premium!",
    args: false,
    usage: "",
    userPrams: [],
    botPrams: ['EmbedLinks'],
    owner: false,
    execute: async (message, args, client, prefix) => {
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
        .setEmoji(`📃`)
        .setStyle(ButtonStyle.Link)
        .setLabel(`Website`)
        .setURL(`https://larabot.tk`)
    
        const allbuttons = [new ActionRowBuilder().addComponents([button_support_dc, button_invite, butweb])];

        message.reply({
            embeds: [new EmbedBuilder()
                .setColor(client.embedColor)
                .setTitle('Leco Music™ Premium')
                .setDescription(`**You want to get Leco Music™ premium join support server and read [this](https://discord.com/channels/924888533137764403/1033363849581174794)**`)
                .setImage('https://media.discordapp.net/attachments/971363118695481374/1067272548083060776/standard.gif')
                .setFooter({text: 'By Leco Music™'})
            ],
            components: allbuttons,
            });
    },
};