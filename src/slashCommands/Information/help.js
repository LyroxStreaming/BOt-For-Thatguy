const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
module.exports = {
  name: 'help',
  description: 'Return all Leco Music™ commands',
  userPrams: [],
  botPrams: ['EmbedLinks'],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setColor(client.embedColor)
      .setFooter({text: `Thanks For Choosing Leco Music™!`, iconURL: client.user.displayAvatarURL()})
      .setAuthor({name: `Leco Music™ Help Panel`, iconURL: client.user.displayAvatarURL({dynamic: true})})
      .addFields([
        {name: '▶️ **__How to play music__**', value: `\`/play <track_name/url>\``},
        {name: 'ℹ️ __What Is Leco Music™__', value: `A Next Gen Discord Music Bot With Many Awesome Features, Buttons, Menus, Context Menu, Support Many Sources, Customizable Settings.`},
        {name: '📃 **__Command Categories:__**', value: `ℹ️ \`:\` **Info Commands**
        🎶 \`:\` **Music Commands**
        🎛️ \`:\` **Filter Commands**
        🦾 \`:\` **Settings Commands**
        📃 \`:\` **CustomPlaylist Commands**
        🧿 \`:\` **Owner Commands**
        🧽 \`:\` **No sponsor**`},
      ])
      .setImage(`https://cdn.discordapp.com/attachments/1037406378517606530/1048917092763709500/standard_3.gif`)
      
    const row = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId('larahelp')
        .setMinValues(1)
        .setMaxValues(1)
        .setPlaceholder('🎧 | Select to view the commands')
        .addOptions([
          {
            label: "Information",
            value: "Information",
            emoji: "ℹ️",
          },
          {
            label: "Music",
            value: "Music",
            emoji: "🎶",
          },
          {
            label: "Filter",
            value: "Filter",
            emoji: "🎛️",
          },
          {
            label: "Customplaylist",
            value: "Customplaylist",
            emoji: "📃",
          },
          {
            label: "Settings",
            value: "Settings",
            emoji: "🦾",
          },
          {
            label: "Owner",
            value: "Owner",
            emoji: "🧿",
          },
          {
            label: "Free Discord Graphics",
            value: "Sponsor",
            emoji: "🧽",
          },
        ]),
    );

    await interaction.reply({ embeds: [embed], components: [row] });

  },
};
