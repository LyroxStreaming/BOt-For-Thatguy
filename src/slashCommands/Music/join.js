const { EmbedBuilder, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'join',
  description: 'Join voice channel',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
      let player =await client.poru.createConnection({
        guildId: interaction.guild.id,
        voiceChannel: interaction.member.voice.channel.id,
        textChannel: interaction.channel.id,
        selfDeaf: true,
      });
      player.setVolume(0.7);
    
    if (player) {
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(client.embedColor)
            .setDescription(`❎ **I'm already connected to <#${player.voiceChannel}> voice channel!**`)
            .setFooter({text: 'By Leco Music™'}),
        ],
      });
    } else {
      let thing = new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`✅ **Joined and connected to your Talk!**`)
        .setFooter({text: 'By Leco Music™'});
      return interaction.reply({ embeds: [thing] });
    };
  },
};
