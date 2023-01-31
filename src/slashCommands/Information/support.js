const { EmbedBuilder, CommandInteraction, Client, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: 'support',
  description: 'Leco Music™ support',
  userPrams: [],
  botPrams: ['EmbedLinks'],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

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
    .setDescription(`
    __**What we provide**__
    Join support server to get help`)
    .setImage(`https://media.discordapp.net/attachments/1060452547212611645/1067279385926828102/standard_4.gif`)
    .setFooter({text: 'By Leco Music™'})
    ],
  components: allbuttons 
    });
  },
};
