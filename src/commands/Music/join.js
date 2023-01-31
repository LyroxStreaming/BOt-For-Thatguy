const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'join',
  aliases: ['j'],
  category: 'Music',
  description: 'Join voice channel',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  owner: false,
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: false,
  execute: async (message, args, client, prefix, player) => {
    if (player) {
      return await message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(client.embedColor)
            .setDescription(`❎ **I'm already connected to <#${player.voiceChannel}> voice channel!**`),
        ],
      });
    } else {
      await client.poru.createConnection({
        guildId: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
        selfDeaf: true,
      });
      player.setVolume(0.7);

      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`✅ **Joined and connected to your Talk!**`)
        .setFooter({text: 'By Leco Music™'})
      return message.reply({ embeds: [thing] });
    };
  },
};
