const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, Collection, ButtonStyle, InteractionType, CommandInteraction } = require('discord.js');
const { IsVoted, editbutton } = require("../../utils/functions");
const db2 = require("../../schema/dj");
const db5 = require('../../schema/user');
const db6 = require('../../schema/server');
const db7 = require('../../schema/vote');
const { makeUri } = require('../../utils/makeurl');
  /**
   * @param {CommandInteraction} interaction
   */

module.exports = {
  name: 'interactionCreate',
  run: async (client, interaction) => {
    if (interaction.type === InteractionType.ApplicationCommand) {
      const { guild } = interaction;
        if (!guild) {
          return interaction.reply({
            embeds: [new EmbedBuilder()
              .setColor(client.embedColor)
              .setDescription(`❎ Interactions is only work inside a guild!`)],
            ephemeral: true
          }).catch(() => {});
        }
      const SlashCommands = client.slashCommands.get(interaction.commandName);
      if (!SlashCommands) return;

      if(!interaction.channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.resolve('ViewChannel'))) return;
      if (!interaction.channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.resolve('SendMessages')) || !interaction.channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.resolve('SendMessagesInThreads'))) return;
      if (!interaction.channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.resolve('ReadMessageHistory')))
        //return interaction.channel.send(`❎ I don't have \`ReadMessageHistory\` permission to execute this command!`);
      if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve('ReadMessageHistory')))
       // return interaction.channel.send(`❎ I don't have \`ReadMessageHistory\` permission to execute this command!`);

      if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve('UseExternalEmojis')))
        //return interaction.reply(`❎ I don't have \`UseExternalEmojis\` permission to execute this command!`);
      if (!interaction.channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.resolve('UseExternalEmojis')))
       // return interaction.reply(`❎ I don't have \`UseExternalEmojis\` permission to execute this command!`);
      if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve('EmbedLinks')))
        //return interaction.reply(`❎ I don't have \`EmbedLinks\` permission to execute this command!`);
      if (!interaction.channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.resolve('EmbedLinks')))
       //return interaction.reply(`❎ I don't have \`EmbedLinks\` permission to execute this command!`);
      
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve(SlashCommands.botPrams || []))) {
          return interaction.reply({ embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle("❎ You are not allowed to run this command!")
            .setDescription(`❎  I need this \`${SlashCommands.botPrams.join(', ')}\` permission use this command.`)
          ],
            ephemeral: true
          });
        };
        if (!interaction.member.permissions.has(PermissionsBitField.resolve(SlashCommands.userPrams || []))) {
          return await interaction.reply({ embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle("❎ You are not allowed to run this command!")
            .setDescription(`❎  You need to this \`${SlashCommands.userPrams.join(', ')}\` permission use this command.`)
          ],
            ephemeral: true
          });
        };
        
        if (SlashCommands.vote) {
          let userid = await db5.findOne({ Id: interaction.member.id });
          let serverid = await db6.findOne({ Id: interaction.guildId });
          let premium = userid || serverid;
          let votes = await db7.findOne({ Id: interaction.member.id });
          if(!votes && !premium) return IsVoted(client, interaction, interaction.member, true)
        };

        if (!client.cooldowns.has(SlashCommands)) { 
          client.cooldowns.set(SlashCommands, new Collection());
        };
        const now = Date.now(); 
        const timestamps = client.cooldowns.get(SlashCommands); 
        const cooldownAmount = (SlashCommands.cooldown || 2) * 1000;
        if (timestamps.has(interaction.member.id)) { 
          let expirationTime = timestamps.get(interaction.member.id) + cooldownAmount; 
          if (now < expirationTime) { 
            let timeLeft = (expirationTime - now) / 1000; 
            if (timeLeft < 1) timeLeft = Math.round(timeLeft)
            if (timeLeft && timeLeft != 0) {
              return interaction.reply({
                embeds: [new EmbedBuilder()
                  .setColor(client.embedColor)
                  .setTitle(`❎ Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the ${interaction.commandName} command.`)
                ]
              }).catch(() => {})
            };
          };
        };
        timestamps.set(interaction.member.id, now);
        setTimeout(() => timestamps.delete(interaction.member.id), cooldownAmount);

        const player = client.poru.players.get(interaction.guild.id);
      
      if (SlashCommands.player && !player) {
        return await interaction.reply({
          embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle("❎ Player was not created")
          ],
          ephemeral: true,
        }).catch(() => { });
      };
      if (SlashCommands.activeplayer && !player.currentTrack) {
        return await interaction.reply({
          embeds: [new EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle("❎ There is nothing playing")
          ],
          ephemeral: true,
        }).catch(() => { });
      };
      
      if (SlashCommands.inVoiceChannel && !interaction.member.voice.channel) {
        return await interaction
          .reply({
            embeds: [new EmbedBuilder()
              .setColor(client.embedColor)
              .setTitle("❎ You need to join a voice channel.")
            ],
            ephemeral: true,
          }).catch(() => { });
      };
      if (SlashCommands.sameVoiceChannel) {
        if (interaction.guild.members.me.voice.channel) {
          if (interaction.guild.members.me.voice.channelId !== interaction.member.voice.channelId) {
            return await interaction
              .reply({
                embeds: [new EmbedBuilder()
                  .setColor(client.embedColor)
                  .setTitle("❎ You need to be in my voice channel")
                ],
                ephemeral: true,
              }).catch(() => { });
          };
        };
      };
      if (SlashCommands.dj) {
        let data = await db2.findOne({ Guild: interaction.guildId });
        let perm = PermissionsBitField.resolve('ManageGuild');
        if (data) {
          if (data.Mode) {
            let pass = false;
            if (data.Roles.length > 0) {
              interaction.member.roles.cache.forEach((x) => {
                let role = data.Roles.find((r) => r === x.id);
                if (role) pass = true;
              });
            };
            if (!pass && !interaction.member.permissions.has(perm)) return await interaction.reply({ embeds: [new EmbedBuilder().setColor(client.embedColor).setTitle("❎ You don't have permission or dj role to use this command")], ephemeral: true })
          };
        };
      };
      try {
        await SlashCommands.run(client, interaction, player);
      } catch (error) {
        if (interaction.replied) {
          await interaction
            .editReply({
              content: "An unexcepted error occured.",
            }).catch(() => { });
        } else {
          await interaction
            .followUp({
              ephemeral: true,
              content: "An unexcepted error occured.",
            }).catch(() => { });
        };
        console.error(error);
      };
    };
    if (interaction.isSelectMenu()) {
      if(interaction.customId === 'larahelp') {
          if(interaction.values[0] === 'Information') {
              let info = new EmbedBuilder()
              .setColor(client.embedColor)
              .setThumbnail(client.user.displayAvatarURL())
              .addFields([
                  {name: 'Categories » Information', value: `\`\`\`yml\nHere are the Information commands:\n\`\`\``, inline: true},
                  {name: `ℹ️ Commands Total [\`${client.commands.filter((cmd) => cmd.category === "Information").size}\`]`, value: `${client.commands.filter((cmd) => cmd.category === "Information").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`},
              ])
              .setImage("https://media.discordapp.net/attachments/1060452547212611645/1067280899995095180/standard_6.gif")
              interaction.reply({embeds: [info], ephemeral: true});
          };
          if(interaction.values[0] === 'Music') {
              let info = new EmbedBuilder()
              .setColor(client.embedColor)
              .setThumbnail(client.user.displayAvatarURL())
              .addFields([
                  {name: 'Categories » Music', value: `\`\`\`yml\nHere are the Music commands:\n\`\`\``, inline: true},
                  {name: `🎶 Commands Total [\`${client.commands.filter((cmd) => cmd.category === "Music").size}\`]`, value: `${client.commands.filter((cmd) => cmd.category === "Music").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`},
              ])
              .setImage("https://media.discordapp.net/attachments/1060452547212611645/1067280381298081802/standard_5.gif")
              interaction.reply({embeds: [info], ephemeral: true});
          };
          if(interaction.values[0] === 'Filter') {
              let info = new EmbedBuilder()
              .setColor(client.embedColor)
              .setThumbnail(client.user.displayAvatarURL())
              .addFields([
                  {name: 'Categories » Filters', value: `\`\`\`yml\nHere are the Filter commands:\n\`\`\``, inline: true},
                  {name: `🎛️ Commands Total [\`${client.commands.filter((cmd) => cmd.category === "Filters").size}\`]`, value: `${client.commands.filter((cmd) => cmd.category === "Filters").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`},
              ])
              .setImage("https://media.discordapp.net/attachments/971363118695481374/1049269732206989313/standard_9.gif")
              interaction.reply({embeds: [info], ephemeral: true});
          };
          if(interaction.values[0] === 'Customplaylist') {
              let info = new EmbedBuilder()
              .setColor(client.embedColor)
              .setThumbnail(client.user.displayAvatarURL())
              .addFields([
                  {name: 'Categories » Custom_Playlist', value: `\`\`\`yml\nHere are the Custom_Playlist commands:\n\`\`\``, inline: true},
                  {name: `📃 Commands Total [\`${client.commands.filter((cmd) => cmd.category === "Playlist").size}\`]`, value: `${client.commands.filter((cmd) => cmd.category === "Playlist").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`},
              ])
              .setImage("https://media.discordapp.net/attachments/1060452547212611645/1067281488141373511/standard_7.gif")
              interaction.reply({embeds: [info], ephemeral: true});
          };
          if(interaction.values[0] === 'Settings') {
              let info = new EmbedBuilder()
              .setColor(client.embedColor)
              .setThumbnail(client.user.displayAvatarURL())
              .addFields([
                  {name: 'Categories » Settings', value: `\`\`\`yml\nHere are the Settings commands:\n\`\`\``, inline: true},
                  {name: `🦾 Commands Total [\`${client.commands.filter((cmd) => cmd.category === "Settings").size}\`]`, value: `${client.commands.filter((cmd) => cmd.category === "Settings").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`},
              ])
              .setImage("https://media.discordapp.net/attachments/1060452547212611645/1067281927310155866/standard_8.gif")
              interaction.reply({embeds: [info], ephemeral: true});
          };
          if(interaction.values[0] === 'Owner') {
              let info = new EmbedBuilder()
              .setColor(client.embedColor)
              .setThumbnail(client.user.displayAvatarURL())
              .addFields([
                  {name: 'Categories » Owner', value: `\`\`\`yml\nHere are the Owner commands:\n\`\`\``, inline: true},
                  {name: `🧿 Commands Total [\`${client.commands.filter((cmd) => cmd.category === "Owner").size}\`]`, value: `${client.commands.filter((cmd) => cmd.category === "Owner").sort((a,b) => a.name.localeCompare(b.name)).map((cmd) => `\`${cmd.name}\``).join("︲")}`},
              ])
              .setImage("https://media.discordapp.net/attachments/1060452547212611645/1067282190859239494/standard_9.gif")
              interaction.reply({embeds: [info], ephemeral: true});
          };

        if(interaction.values[0] === 'Sponsor') {
          let bu1 = new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setURL(``)
          .setLabel('No sponsor')
          .setEmoji(`❤️`)
        
          let bu2 = new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setURL(``)
          .setLabel('Sponsor Discord')
          .setEmoji(`💜`)

          let row = new ActionRowBuilder().addComponents([bu1], [bu2]);

            let info = new EmbedBuilder()
            .setColor(client.embedColor)
            .setAuthor({name: client.user.tag, iconURL: client.user.displayAvatarURL()})
            .setTitle('No sponsor')
            .setDescription(`No sponsor. you can sponsor this bot`)
            .setImage(`https://cdn.discordapp.com/attachments/1037406378517606530/1048917092763709500/standard_3.gif`)

            interaction.reply({embeds: [info], components: [row], ephemeral: true});
        };
      };
  };
  if (interaction.isButton()) {
  let {member} = interaction;
  const {channel} = member.voice;
  const player = client.poru.players.get(interaction.guild.id);

  let buttons = interaction.customId === "vdown1" || interaction.customId === "pause2" || interaction.customId === "skip3" || interaction.customId === "songloop4" || interaction.customId === "vup5"  || interaction.customId === "shuffle6" || interaction.customId === "stop7" || interaction.customId === "autoplay8"|| interaction.customId === "back9"|| interaction.customId === "forwd10"
  if (buttons) {
      if(!player || !player.currentTrack) {
      return interaction.reply({
      embeds: [new EmbedBuilder()
          .setColor(client.embedColor)
          .setTitle("❎ There is nothing playing")],
      ephemeral: true
    });
  };
};
if (buttons) {
  if(!channel) {
  return interaction.reply({
      embeds: [new EmbedBuilder()
      .setColor(client.embedColor)
      .setTitle('❎ You need to join a voice channel.')],
      ephemeral: true
    });
  };
};
if (buttons) {
  if (interaction.guild.members.me.voice.channel) {
  if (interaction.guild.members.me.voice.channelId !== interaction.member.voice.channelId) {
  return interaction.reply({
      embeds: [new EmbedBuilder()
      .setTitle('❎ You need to be in my voice channel')
      .setColor(client.embedColor)
      ],
      ephemeral: true
      });
    };
  };
};

  if (interaction.customId === "vdown1") {
      let amount = Number(player.filters.volume) - 0.1;
      if(amount < 0) return interaction.reply({
          embeds: [new EmbedBuilder()
              .setColor(client.embedColor)
              .setTitle("❎ Cannot higher the player volume further more.")
          ],ephemeral: true});
      await player.setVolume(amount);
      interaction.reply({
          embeds: [new EmbedBuilder()
          .setColor(client.embedColor)
          .setTitle(`✅  Volume set to \`${amount * 100}\``)
          ],
          ephemeral: true});
      };

      //back
      if (interaction.customId === "back9") {
        let song = player.previousTrack;
        if(!song) {
          interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor(client.embedColor)
                .setTitle("❎ No previous song found")
            ],
            ephemeral: true
            });
        };
        if(song){
          player.queue.add(song);
          player.stop();
          interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor(client.embedColor)
                .setTitle("✅ Skiped to previous song")
            ],
            ephemeral: true
            });
          };
        };
      //pause-resume
    if (interaction.customId === "pause2") {
      if (!player.isPlaying) {
          player.pause(false);
          interaction.deferUpdate()
      } else {
          player.pause(true);
          interaction.deferUpdate();
      };
      editbutton(client, player);
      };

      //skip
      if (interaction.customId === "skip3") {
        const track = player.currentTrack;
        let link = makeUri(`${track.info.title} By ${track.info.author}`);
            player.stop();
            interaction.reply({
            embeds: [new EmbedBuilder()
                .setDescription(`<:skips:988865012296732732> <@${member.user.id}> *Skipped ${track.info.title && track.info.uri ? `[${track.info.title}](${link})` : `${track.info.title}`}* `)
                .setColor(client.embedColor)
            ]
            });
        };

      //Songloop
      if (interaction.customId === "songloop4") {
        let userid = await db5.findOne({ Id: interaction.member.id });
        let serverid = await db6.findOne({ Id: interaction.guildId });
        let premium = userid || serverid;
        let votes = await db7.findOne({ Id: interaction.member.id });
        if(!votes && !premium) return IsVoted(client, interaction, interaction.member, true);
        
          if(player.loop === 'NONE') {
              player.setLoop('TRACK');
              return interaction.reply({
                  embeds: [new EmbedBuilder()
                  .setColor(client.embedColor)
                  .setTitle('✅ **Enabled \`track\` Loop**')
                  ],
                  ephemeral: true
              });
          } else if(player.loop === 'TRACK') {
              player.setLoop('QUEUE');
              return interaction.reply({
                  embeds: [new EmbedBuilder()
                  .setColor(client.embedColor)
                  .setTitle('✅ **Enabled \`queue\` Loop**')
                  ],
                  ephemeral: true
              });
          } else {
              player.setLoop('NONE');
              return interaction.reply({
                  embeds: [new EmbedBuilder()
                  .setColor(client.embedColor)
                  .setTitle('✅ **Loop disabled**')
                  ],
                  ephemeral: true
              });
          };
      };

      //10+volumeup
      if (interaction.customId === "vup5") {
      let amount = Number(player.filters.volume) + 0.1;
      if(amount >= 1) return interaction.reply({
      embeds: [new EmbedBuilder()
          .setColor(client.embedColor)
          .setTitle("❎ Cannot higher the player volume further more.")
      ],ephemeral: true});
      await player.setVolume(amount);
      interaction.reply({
      embeds: [new EmbedBuilder()
          .setColor(client.embedColor)
          .setTitle(`✅  Volume set to \`${amount * 100}\``)
      ],
      ephemeral: true});
      };
      
      //Shuffle
      if (interaction.customId === "shuffle6") {
      let userid = await db5.findOne({ Id: interaction.member.id });
      let serverid = await db6.findOne({ Id: interaction.guildId });
      let premium = userid || serverid;
      let votes = await db7.findOne({ Id: interaction.member.id });
      if(!votes && !premium) return IsVoted(client, interaction, interaction.member, true);

      player.queue.shuffle();
      interaction.reply({
          embeds: [new EmbedBuilder()
          .setColor(client.embedColor)
          .setTitle(`<:retry:927525489327882240> **Shuffled ${player.queue.length} Songs!**`)
          ],
          ephemeral: true
      });
  };

      //stop
      if (interaction.customId === "stop7") {
        const track = player.currentTrack;
        let link = makeUri(`${track.info.title} By ${track.info.author}`);
        player.destroy();
        interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor(client.embedColor)
                .setDescription(`✅ <@${member.user.id}> *Stopped ${track.info.title && track.info.uri ? `[${track.info.title}](${link})` : `${track.info.title}`}* `)
            ],
            ephemeral: false
            });
        };
  
      //autoplay
      if (interaction.customId === "autoplay8") {
        let userid = await db5.findOne({ Id: interaction.member.id });
        let serverid = await db6.findOne({ Id: interaction.guildId });
        let premium = userid || serverid;
        let votes = await db7.findOne({ Id: interaction.member.id });
        if(!votes && !premium) return IsVoted(client, interaction, interaction.member, true);
          player.auto = !player.auto;
          interaction.reply({
          embeds: [new EmbedBuilder()
              .setColor(client.embedColor)
              .setTitle(`${player.auto ? '✅  **Enabled Autoplay**': '❎ **Disabled Autoplay**'}`)
          ],
          ephemeral: true
          });
      };

      //Forward
      if (interaction.customId === "forwd10") {
        let userid = await db5.findOne({ Id: interaction.member.id });
        let serverid = await db6.findOne({ Id: interaction.guildId });
        let premium = userid || serverid;
        let votes = await db7.findOne({ Id: interaction.member.id });
        if(!votes && !premium) return IsVoted(client, interaction, interaction.member, true);
        
          let seektime = Number(player.position) + 10 * 1000;
          if (10 <= 0) seektime = Number(player.position);
          player.seekTo(Number(seektime));
          interaction.reply({
          embeds: [new EmbedBuilder()
              .setColor(client.embedColor)
              .setTitle("<:forward10:927525488560316456> **Forwarded the song for \`10 Seconds\`!**")
          ],
          ephemeral: true
          });
      };
      if (interaction.customId === "premium") {
        let user = client.user
        let button_support_dc = new ButtonBuilder()
        .setEmoji("🎭")
        .setStyle(ButtonStyle.Link)
        .setLabel('Support Server')
        .setURL("https://discord.gg/bHDq4PqjAe")
    
        let button_invite = new ButtonBuilder()
        .setEmoji("📬")
        .setStyle(ButtonStyle.Link)
        .setLabel("Invite " + user.username)
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${user.id}&permissions=8&scope=bot%20applications.commands`)
        
        let butweb = new ButtonBuilder()
        .setEmoji(`📰`)
        .setStyle(ButtonStyle.Link)
        .setLabel(`Website`)
        .setURL(`https://larabot.tk`)
    
        const allbuttons = [new ActionRowBuilder().addComponents([button_support_dc, button_invite, butweb])];

        interaction.reply({
            embeds: [new EmbedBuilder()
              .setColor(client.embedColor)
              .setTitle('Leco Music™ Premium')
              .setDescription(`**You want to get Leco Music™ premium join support server and read [this](https://discord.com/channels/924888533137764403/1033363849581174794)**`)
              .setImage('https://media.discordapp.net/attachments/971363118695481374/1067272548083060776/standard.gif')
            ],
            components: allbuttons,
            ephemeral: true});
        };
  };
  if(interaction.type === InteractionType.ApplicationCommandAutocomplete) {
    const { guild } = interaction;
      if (!guild) return
    const SlashCommands = client.slashCommands.get(interaction.commandName);
    if (!SlashCommands) return;
    try {
      await SlashCommands.autocomplete(client, interaction);
    } catch (error) {
      console.log(error);
      };
    };
  },
};


