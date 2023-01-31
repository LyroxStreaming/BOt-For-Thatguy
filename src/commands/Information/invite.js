const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
  name: 'invite',
  category: 'Information',
  aliases: ['addme'],
  description: 'invite of Leco Music™',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  owner: false,
  execute: async (message, args, client, prefix) => {
    let button_support_dc = new ButtonBuilder()
    .setEmoji('🎭')
    .setStyle(ButtonStyle.Link)
    .setLabel(`Support Server`)
    .setURL("https://discord.gg/bHDq4PqjAe")

    let button_invite = new ButtonBuilder()
    .setEmoji("📬")
    .setStyle(ButtonStyle.Link)
    .setLabel("Invite  Leco Music™")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=971355817280430110&permissions=556742831953&scope=bot%20applications.commands`)
    
    let butweb = new ButtonBuilder()
    .setEmoji(`📰`)
    .setStyle(ButtonStyle.Link)
    .setLabel(`Website`)
    .setURL(`https://larabot.tk`)

  const allbuttons = [new ActionRowBuilder().addComponents([button_support_dc, button_invite, butweb])];
  message.reply({
    embeds: [new EmbedBuilder()
      .setColor(client.embedColor)
        .setTitle(`Invite: __**Leco Music™#9577**__`)
        .setDescription(`
        __**What we provide**__`)
        .setImage(`https://media.discordapp.net/attachments/971363118695481374/1048923412589985822/standard_5.gif`)
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=971355817280430110&permissions=556742831953&scope=bot%20applications.commands`)
        .setFooter({text: "Leco Music™#9577"})
    ],
    components: allbuttons
  });
  },
};
