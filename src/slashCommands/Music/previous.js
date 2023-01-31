const { EmbedBuilder, CommandInteraction, Client } = require('discord.js');
const { editlastmsg } = require('../../utils/functions');

module.exports = {
    name: 'previous',
    description: 'Play the previous song Leco Music™ played in your server',
    userPrams: [],
    botPrams: ['EmbedLinks'],
    player: true,
    inVoiceChannel: false,
    sameVoiceChannel: false,
    activeplayer: false,
    /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

    run: async (client, interaction, player) => {
        let song = player.previousTrack;
        if(!song) {
            interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor(client.embedColor)
                .setTitle("❎ No previous song found")
                .setFooter({text: 'By Leco Music™'})
            ],
            ephemeral: true
            });
        }
        if(song){
            player.queue.add(song);
            player.stop();
            player.play();
            editlastmsg(client, player);
            interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor(client.embedColor)
                .setTitle("✅ Skiped to previous song")
                .setFooter({text: 'By Leco Music™'})
            ],
            ephemeral: true
            });
        };
    },
};
