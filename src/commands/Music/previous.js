const { EmbedBuilder } = require('discord.js');
const { editlastmsg } = require('../../utils/functions.js');

module.exports = {
  name: 'previous',
  aliases: ['pv'],
  category: 'Music',
  description: 'Play the previous song Leco Music™ played in your server',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  owner: false,
  player: true,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  activeplayer: false,
  execute: async (message, args, client, prefix, player) => {
    let song = player.previousTrack;
    if(!song) {
      message.reply({
        embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle("❎ No previous song found")
            .setFooter({text: 'By Leco Music™'})
        ],
        });
    };
    if(song){
      player.queue.add(song);
      player.stop();
      player.play();
      editlastmsg(client, player);
      message.reply({
        embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle("✅ Skiped to previous song")
            .setFooter({text: 'By Leco Music™'})
        ],
        });
    };
  },
};
