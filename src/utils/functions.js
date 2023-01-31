const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const request = require('request-promise');
const Promise = require('bluebird');
const axios = require("axios");

async function IsVoted(client, message, user, type) {
  let vote = new ButtonBuilder()
    .setEmoji('👍')
    .setStyle(ButtonStyle.Link)
    .setLabel(`Vote Me`)
    .setURL("https://top.gg/bot/944016826751389717/vote")

  let support = new ButtonBuilder()
    .setStyle(ButtonStyle.Link)
    .setEmoji("🎭")
    .setLabel(`Support Server`)
    .setURL("https://discord.gg/bHDq4PqjAe")

  let premium = new ButtonBuilder()
    .setEmoji("🎁")
    .setStyle(ButtonStyle.Secondary)
    .setCustomId('premium')
    .setLabel('Premium')

  const row = [new ActionRowBuilder().addComponents([vote, support, premium])];
  const embed = new EmbedBuilder()
    .setColor(client.embedColor)
    .setAuthor({ name: `Vote Required/Premium `, iconURL: user.displayAvatarURL({ dynamic: true }), url: `https://larabot.tk` })
    .setDescription(`You Must [Vote Me](https://top.gg/bot/944016826751389717/vote) To Use This Commands, You Can Bypass Voting By Becoming [Premium](https://discord.com/channels/924888533137764403/1033363849581174794) Member!`)
    .setImage("https://media.discordapp.net/attachments/971363118695481374/1067273711817867378/standard_1.gif")
  return message.reply({ embeds: [embed], components: row, ephemeral: type });
};
/**
 * 
 * @param {*} player 
 * @param {Client} client
 * @returns 
 * 
 */
async function autoplay(client, player) {
  try {
    let rq = player.beforetrack;
    if (rq.info.sourceName == "youtube") {
      const searched = `https://www.youtube.com/watch?v=${rq.info.identifier}&list=RD${rq.info.identifier}`;
      const res = await client.poru.resolve(searched, "ytsearch");
      if (!res) {
        let channel = client.channels.cache.get(player.textChannel);
        return channel.send({
          embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle(`❎ Found nothing related for the latest Song!`)]
        });
      }
      player.queue.add(res.tracks[Math.floor(Math.random() * Math.floor(res.tracks.length))]);
      return player.play();
    }

    if (rq.info.sourceName == "spotify") {
      const identifier = rq.info.uri.split("https://open.spotify.com/track/")[1];
      let searched = await getToken()
        .then(async (token) => {
          let res = await axios.get(`https://api.spotify.com/v1/recommendations?seed_tracks=${identifier}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          return res.data;
        }).catch((err) => err);

      const res = await client.poru.resolve(`${searched.tracks[Math.floor(Math.random() * Math.floor(searched.tracks.length))].external_urls.spotify}`, "spotify");
      if (!res) {
        let channel = client.channels.cache.get(player.textChannel);
        return channel.send({
          embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle(`❎ Found nothing related for the latest Song!`)]
        });
      };
      player.queue.add(res.tracks[0]);
      return player.play();
    };

    if (rq.info.sourceName == "soundcloud") {
      const res = await client.poru.resolve(`${rq.info.title}`, "scsearch");
      if (!res) {
        let channel = client.channels.cache.get(player.textChannel);
        return channel.send({
          embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle(`❎ Found nothing related for the latest Song!`)]
        });
      };
      player.queue.add(res.tracks[Math.floor(Math.random() * Math.floor(res.tracks.length))]);
      return player.play();
    } else {
      let channel = client.channels.cache.get(player.textChannel);
      return channel.send({
        embeds: [new EmbedBuilder()
          .setColor(client.embedColor)
          .setTitle(`❎ Found nothing related for the latest Song!`)]
      });
    };
  } catch (e) {
    console.log(e)
  };
};
async function editlastmsg(client, player) {
  let guild = client.guilds.cache.get(player.guildId);
  if (!guild) return;

  if (player.currentmsg) {
    let channel = await client.channels.cache.get(player.textChannel);
    channel.messages.fetch(player.currentmsg).then(currentplay => {
      if (currentplay) {

        let vdown = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('vdown1').setEmoji(`🔉`).setLabel(`Down`).setDisabled(true);
        let back10 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('back9').setEmoji('⏮️').setLabel(`Back`).setDisabled(true);
        let pause = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('pause2').setEmoji(`⏯️`).setLabel(`Pause`).setDisabled(true);
        let skip = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('skip3').setEmoji('⏭️').setLabel(`Skip`).setDisabled(true);
        let vup = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('vup5').setEmoji('🔊').setLabel(`Up`).setDisabled(true);
        let shuffle = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('shuffle6').setEmoji(`🔀`).setLabel(`Shuffle`).setDisabled(true);
        let songloop = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('songloop4').setEmoji('🔁').setLabel(`Loop`).setDisabled(true);
        let stop = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('stop7').setEmoji(`⏹️`).setLabel(`Stop`).setDisabled(true);
        let autoplay = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('autoplay8').setEmoji('🔃').setLabel(`AutoPlay`).setDisabled(true);
        let forw10 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('forwd10').setEmoji('⏩').setLabel(`+10 Sec`).setDisabled(true);

        const row = new ActionRowBuilder().addComponents([vdown, back10, pause, skip, vup]);
        const row2 = new ActionRowBuilder().addComponents([shuffle, songloop, stop, autoplay, forw10]);
        currentplay.edit({ components: [row, row2] }).catch(() => null)

      }
    })
  }
  if (player.currentmsg) {
    player.currentmsg.delete;
  };
};

async function editbutton(client, player) {
  let guild = client.guilds.cache.get(player.guildId);
  if (!guild) return;
  if (player.currentmsg) {
    let channel = await client.channels.cache.get(player.textChannel);
    channel.messages.fetch(player.currentmsg).then(currentplay => {
      if (currentplay) {

        let vdown = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('vdown1').setEmoji(`🔉`).setLabel(`Down`);
        let back10 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('back9').setEmoji('⏮️').setLabel(`Back`);
        let pause = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('pause2').setEmoji(`⏸️`).setLabel(`Pause`);
        let skip = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('skip3').setEmoji('⏭️').setLabel(`Skip`);
        let vup = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('vup5').setEmoji('🔊').setLabel(`Up`);
        let shuffle = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('shuffle6').setEmoji(`🔀`).setLabel(`Shuffle`);
        let songloop = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('songloop4').setEmoji('🔁').setLabel(`Loop`);
        let stop = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('stop7').setEmoji(`⏹️`).setLabel(`Stop`);
        let autoplay = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('autoplay8').setEmoji('🔃').setLabel(`AutoPlay`);
        let forw10 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('forwd10').setEmoji('⏩').setLabel(`+10 Sec`);

        if (!player.isPlaying) {
          pause = pause.setLabel('Resume').setEmoji('▶️');
        };

        let row = new ActionRowBuilder().addComponents([vdown, back10, pause, skip, vup]);
        let row2 = new ActionRowBuilder().addComponents([shuffle, songloop, stop, autoplay, forw10]);
        currentplay.edit({ components: [row, row2] }).catch(() => null);
      };
    });
  };
};

async function collectormsg(client, message, embeds, author) {
  let currentPage = 0;
  let cmduser = author;
  if (embeds.length === 1) return message.reply({
    embeds: [embeds[0]]
  }).catch(e => console.log("THIS IS TO PREVENT A CRASH"))
  let button_back = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('1a').setEmoji("⏪");
  let button_home = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('2b').setEmoji("🏠");
  let button_forward = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('3c').setEmoji('⏩');
  let stops = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('4d').setEmoji('⏹️');
  const allbuttons = [new ActionRowBuilder().addComponents([button_back, button_home, button_forward, stops])];

  let swapmsg = await message.reply({
    embeds: [embeds[0]],
    components: allbuttons,
    fetchReply: true
  });
  const collector = swapmsg.createMessageComponentCollector({
    filter: (i) => i.isButton() && i.user && i.user.id == cmduser.id,
    time: 180e3
  });
  collector.on('end', async b => {
    if (!swapmsg) return;
    await swapmsg.edit({ components: [new ActionRowBuilder().addComponents(button_back.setDisabled(true), button_home.setDisabled(true), button_forward.setDisabled(true), stops.setDisabled(true))] }).catch(() => { });
  })
  collector.on('collect', async b => {
    if (b.user.id !== cmduser.id)
      return b.reply({
        content: ` **Only the one who typed command is allowed to react!**`,
        ephemeral: true
      })
    if (b.customId == "1a") {
      if (currentPage !== 0) {
        currentPage -= 1
        await swapmsg.edit({
          embeds: [embeds[currentPage]],
          components: allbuttons
        });
        await b.deferUpdate();
      } else {
        currentPage = embeds.length - 1
        await swapmsg.edit({
          embeds: [embeds[currentPage]],
          components: allbuttons
        });
        await b.deferUpdate();
      }
    }
    //go home
    else if (b.customId == "2b") {
      currentPage = 0;
      await swapmsg.edit({
        embeds: [embeds[currentPage]],
        components: allbuttons
      });
      await b.deferUpdate();
    }
    //go forward
    else if (b.customId == "3c") {
      if (currentPage < embeds.length - 1) {
        currentPage++;
        await swapmsg.edit({
          embeds: [embeds[currentPage]],
          components: allbuttons
        });
        await b.deferUpdate();
      } else {
        currentPage = 0
        await swapmsg.edit({
          embeds: [embeds[currentPage]],
          components: allbuttons
        });
        await b.deferUpdate();
      }

    }
    else if (b.customId == "4d") {
      currentPage = 0;
      await swapmsg.edit({
        components: [new ActionRowBuilder().addComponents(button_back.setDisabled(true), button_home.setDisabled(true), button_forward.setDisabled(true), stops.setDisabled(true))]
      });
      await b.deferUpdate();
    }
  });
};
async function collectormsg2(client, message, embeds, author) {
  let currentPage = 0;
  let cmduser = author;
  if (embeds.length === 1) return message.reply({
    embeds: [embeds[0]]
  }).catch(e => console.log("THIS IS TO PREVENT A CRASH"))
  let button_back = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('1a').setEmoji("⏪").setLabel("Back");
  let button_home = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('2b').setEmoji("🏠").setLabel("Home");
  let button_forward = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('3c').setEmoji('⏩').setLabel("Forward");
  let stops = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId('4e').setEmoji('⏹️').setLabel("Clear");
  const allbuttons = [new ActionRowBuilder().addComponents([button_back, button_home, button_forward, stops])];

  let swapmsg = await message.reply({
    embeds: [embeds[0]],
    components: allbuttons,
    fetchReply: true
  });
  const collector = swapmsg.createMessageComponentCollector({
    filter: (b) => {
      if (b.user.id === cmduser.id) return true;
      else {
        b.reply({
          ephemeral: true,
          content: `Only **${cmduser.tag}** can use this button`,
        });
        return false;
      }
    },
    time: 60000 * 5,
    idle: 30e3,
    time: 180e3
  });
  collector.on('end', async b => {
    if (!swapmsg) return;
    await swapmsg.edit({ components: [new ActionRowBuilder().addComponents(button_back.setDisabled(true), button_home.setDisabled(true), button_forward.setDisabled(true), stops.setDisabled(true))] }).catch(() => { });
  })
  collector.on('collect', async b => {
    if (b.customId == "1a") {
      if (currentPage !== 0) {
        currentPage -= 1
        await swapmsg.edit({
          embeds: [embeds[currentPage]],
          components: allbuttons
        });
        await b.deferUpdate();
      } else {
        currentPage = embeds.length - 1
        await swapmsg.edit({
          embeds: [embeds[currentPage]],
          components: allbuttons
        });
        await b.deferUpdate();
      }
    }
    //go home
    else if (b.customId == "2b") {
      currentPage = 0;
      await swapmsg.edit({
        embeds: [embeds[currentPage]],
        components: allbuttons
      });
      await b.deferUpdate();
    }
    //go forward
    else if (b.customId == "3c") {
      if (currentPage < embeds.length - 1) {
        currentPage++;
        await swapmsg.edit({
          embeds: [embeds[currentPage]],
          components: allbuttons
        });
        await b.deferUpdate();
      } else {
        currentPage = 0
        await swapmsg.edit({
          embeds: [embeds[currentPage]],
          components: allbuttons
        });
        await b.deferUpdate();
      }

    }
    else if (b.customId == "4d") {
      currentPage = 0;
      await swapmsg.edit({
        components: [new ActionRowBuilder().addComponents(button_back.setDisabled(true), button_home.setDisabled(true), button_forward.setDisabled(true), stops.setDisabled(true))]
      });
      await b.deferUpdate();
    }
  });
};
function duration(duration, useMilli = false) {
  let remain = duration;
  let days = Math.floor(remain / (1000 * 60 * 60 * 24));
  remain = remain % (1000 * 60 * 60 * 24);
  let hours = Math.floor(remain / (1000 * 60 * 60));
  remain = remain % (1000 * 60 * 60);
  let minutes = Math.floor(remain / (1000 * 60));
  remain = remain % (1000 * 60);
  let seconds = Math.floor(remain / (1000));
  remain = remain % (1000);
  let milliseconds = remain;
  let time = {
    days,
    hours,
    minutes,
    seconds,
    milliseconds
  };
  let parts = []
  if (time.days) {
    let ret = time.days + ' Day'
    if (time.days !== 1) {
      ret += 's'
    }
    parts.push(ret)
  }
  if (time.hours) {
    let ret = time.hours + ' Hr'
    if (time.hours !== 1) {
      ret += 's'
    }
    parts.push(ret)
  }
  if (time.minutes) {
    let ret = time.minutes + ' Min'
    if (time.minutes !== 1) {
      ret += 's'
    }
    parts.push(ret)

  }
  if (time.seconds) {
    let ret = time.seconds + ' Sec'
    if (time.seconds !== 1) {
      ret += 's'
    }
    parts.push(ret)
  }
  if (useMilli && time.milliseconds) {
    let ret = time.milliseconds + ' ms'
    parts.push(ret)
  }
  if (parts.length === 0) {
    return ['instantly']
  } else {
    return parts
  };
};

function nFormatter(num, digits = 2) {
  const lookup = [{
    value: 1,
    symbol: ""
  },
  {
    value: 1e3,
    symbol: "k"
  },
  {
    value: 1e6,
    symbol: "M"
  },
  {
    value: 1e9,
    symbol: "G"
  },
  {
    value: 1e12,
    symbol: "T"
  },
  {
    value: 1e15,
    symbol: "P"
  },
  {
    value: 1e18,
    symbol: "E"
  }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
};
function delay(delayInms) {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  } catch (e) {
    console.log(String(e.stack).grey.bgRed)
  };
};
function getToken() {
  const key = "bb398bbdb1ed4008bcb446cce3707a4c"
  const secret = "2e758a20426e493c9199e45007bb8958"
  const encode = new Buffer.from(`${key}:${secret}`).toString('base64')

  const opts = {
    method: 'POST',
    url: `https://accounts.spotify.com/api/token`,
    form: {
      grant_type: 'client_credentials'
    },
    headers: {
      'Authorization': `Basic ${encode}`
    },
    json: true
  };

  return Promise.resolve(
    request(opts).then((data) => {

      return data.access_token
    })
  )
};
module.exports = {
  IsVoted,
  editlastmsg,
  editbutton,
  autoplay,
  collectormsg,
  collectormsg2,
  duration,
  nFormatter,
  delay,
  getToken
};