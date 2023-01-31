const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  category: "Information",
  description: "Show Leco Music™ latancy!",
  args: false,
  usage: "",
  userPrams: [],
  botPrams: ['EmbedLinks'],
  owner: false,
  execute: async (message, args, client, prefix) => {
    let ping = new EmbedBuilder()
    .setColor(client.embedColor)
    .setTitle(`Leco Music™`)
    .setDescription(`\`\`\`nim\nMessage Latency       :${Date.now() - message.createdTimestamp}ms\nApi Ping (Websocket)  :${Math.round(client.ws.ping)}ms\`\`\``)
    .setFooter({text: `${message.guild.name}`, iconURL: message.guild.iconURL({dynamic: true})})
    message.channel.send({embeds: [ping]})
  },
};