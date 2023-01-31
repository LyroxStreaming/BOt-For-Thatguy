const { ApplicationCommandOptionType, CommandInteraction, Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { convertTime } = require('../../utils/convert.js');
const { makeUri } = require('../../utils/makeurl.js');

module.exports = {
  name: 'play',
  description: 'Play songs/tracks in spotify/soundcloud',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  options: [
    {
      name: 'query',
      description: 'Enter song name or playlist link!',
      required: true,
      type: ApplicationCommandOptionType.String,
      autocomplete: true,
    },
  ],

  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
    autocomplete: async(client, interaction) => {
    let query = await interaction.options.getString('query') || " ";
    if (query.includes("youtu") || query.includes("youtube") || query.includes("youtu.be")) return;
    let max = 7;
    const result = await client.poru.resolve(query, "ytsearch");
    const {tracks} = result;
    const trackd = tracks.slice(0, max);
    
    let results = trackd.map((track) => `${track.info.title}`);
	  await interaction.respond(
	  results.map(choice => ({ name: choice, value: choice })),
		);
},

  run: async (client, interaction, plyers) => {
    let query = interaction.options.getString('query');
    if (query.includes("youtu") || query.includes("youtube") || query.includes("youtu.be")) {
      let support = new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setEmoji("🎭")
            .setLabel(`Support Server`)
            .setURL("https://discord.gg/bHDq4PqjAe")
      const row = [new ActionRowBuilder().addComponents([support])];
      const embed = new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle('Error')
        .setDescription(`❎ Leco Music™ is removed **__YouTube__** as a supported platform for more information join support server`)
      return interaction.reply({embeds: [embed], components: row, ephemeral: true});
    }
    const player = await client.poru.createConnection({
      guildId: interaction.guild.id,
      voiceChannel: interaction.member.voice.channel.id,
      textChannel: interaction.channel.id,
      selfDeaf: true,
    });
    player.setVolume(0.7);
    const result = await client.poru.resolve(query, "ytsearch");

    const { loadType, tracks, playlistInfo } = result;
    if (loadType === "NO_MATCHES" || !tracks.length) return interaction.reply({ embeds: [new EmbedBuilder()
      .setColor(client.embedColor)
      .setTitle('❎ No result was found')]});

    if (loadType === 'PLAYLIST_LOADED') {
      for (const track of tracks) {
      track.info.requester = interaction.member.user;  
      player.queue.add(track);
    };
    if (!player.isPlaying && !player.isPaused) await player.play();
      const embed1 = new EmbedBuilder()
      .setColor(client.embedColor)
      .setDescription(`✅ **Added Playlist ${`[\`${playlistInfo.name}\`](https://discord.gg/xcjZqS9nJY)`}**`)
      .addFields([
        {name: '<:user:948907339778514984> Requested by: ', value: `${player.currentTrack.info.requester ? `<@${player.currentTrack.info.requester.id}>` : `<${client.user.id}>`}`, inline: true},
        {name: "<:retry:927525489327882240> Queue length: ", value: `\`${player.queue.length} Songs\``, inline: true},
      ]);
      return interaction.reply({embeds: [embed1]});

  } else if (loadType === 'SEARCH_RESULT' || loadType === 'TRACK_LOADED') {
    const track = tracks.shift();
    track.info.requester = interaction.member.user; 
    player.queue.add(track);                             
    if (!player.isPlaying && !player.isPaused) await player.play();
    let link = makeUri(`${track.info.title} By ${track.info.author}`);
      const embed2 = new EmbedBuilder()
      .setColor(client.embedColor)
      .setAuthor({name: `ADDED TO QUEUE`, iconURL: track.info.requester.displayAvatarURL({dynamic: true}), url: `${track.info.uri ? `${link}` : `https://discord.gg/xcjZqS9nJY`}`})
      .setDescription(`✅ ${track.info.title && track.info.uri ? `[\`${track.info.title}\`](${link})` : `\`${track.info.title}\``}
      
      Added By: ${track.info.requester} | Duration \`${track.info.isStream ? "LIVE STREAM" : convertTime(track.info.length)}\` | Position In Queue: \`${player.queue.length}\``)
      return interaction.reply({embeds: [embed2]});
    };
  },
};
