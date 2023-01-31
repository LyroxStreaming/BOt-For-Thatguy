const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { convertTime } = require('../../utils/convert.js');
const { makeUri } = require('../../utils/makeurl.js');

module.exports = {
  name: 'play',
  category: 'Music',
  aliases: ['p'],
  description: 'Plays audio from Soundcloud',
  args: true,
  usage: '<Video Name | Spotify URL>',
  userPrams: [],
  botPrams: ['EmbedLinks'],
  owner: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client) => {
    const query = args.join(' ');
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
      return message.reply({embeds: [embed], components: row})
  }
    const player = await client.poru.createConnection({
      guildId: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeaf: true,
    });
    player.setVolume(0.7);
    const result = await client.poru.resolve(query, 'ytsearch');

    const { loadType, tracks, playlistInfo } = result;
    if (loadType === "NO_MATCHES" || !tracks.length) return message.reply({ embeds: [new EmbedBuilder()
      .setColor(client.embedColor)
      .setTitle('❎ No result was found')]});

    if (loadType === 'PLAYLIST_LOADED') {
      for (const track of tracks) {
      track.info.requester = message.author;  
      player.queue.add(track);
    }
    if (!player.isPlaying && !player.isPaused) await player.play();
      const embed1 = new EmbedBuilder()
      .setColor(client.embedColor)
      .setDescription(`✅ **Added Playlist ${`[\`${playlistInfo.name}\`](https://discord.gg/xcjZqS9nJY)`}**`)
      .addFields([
        {name: '<:user:948907339778514984> Requested by: ', value: `${player.currentTrack.info.requester ? `<@${player.currentTrack.info.requester.id}>` : `<${client.user.id}>`}`, inline: true},
        {name: "<:retry:927525489327882240> Queue length: ", value: `\`${player.queue.length} Songs\``, inline: true},
      ])
      return message.channel.send({embeds: [embed1]});

  } else if (loadType === 'SEARCH_RESULT' || loadType === 'TRACK_LOADED') {
    const track = tracks.shift();
    track.info.requester = message.author; 
    player.queue.add(track);                            
    
    if (!player.isPlaying && !player.isPaused) await player.play();
    let link = makeUri(`${track.info.title} By ${track.info.author}`)
      const embed2 = new EmbedBuilder()
      .setColor(client.embedColor)
      .setAuthor({name: `ADDED TO QUEUE`, iconURL: track.info.requester.displayAvatarURL({dynamic: true}), url: `${track.info.uri ? `${link}` : `https://discord.gg/xcjZqS9nJY`}`})
      .setDescription(`✅ ${track.info.title && track.info.uri ? `[\`${track.info.title}\`](${link})` : `\`${track.info.title}\``}
      
      Added By: ${track.info.requester} | Duration \`${track.info.isStream ? "LIVE STREAM" : convertTime(track.info.length)}\` | Position In Queue: \`${player.queue.length}\``)
      return message.channel.send({embeds: [embed2]});
    };
  },
};
