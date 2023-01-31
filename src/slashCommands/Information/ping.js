const { EmbedBuilder, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Show Leco Music™ latancy!',
  userPrams: [],
  botPrams: ['EmbedLinks'],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    let ping = new EmbedBuilder()
    .setColor(client.embedColor)
    .setTitle(`Leco Music™`)
    .setDescription(`\`\`\`nim\nMessage Latency       :${Date.now() - interaction.createdTimestamp}ms\nApi Ping (Websocket)  :${Math.round(client.ws.ping)}ms\`\`\``)
    .setFooter({text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL({dynamic: true})})
    interaction.reply({embeds: [ping]})
  },
};
