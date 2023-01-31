const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, Collection, ButtonStyle } = require('discord.js');
const { IsVoted } = require("../../utils/functions");
const db = require('../../schema/prefix.js');
const db3 = require("../../schema/dj");
const db5 = require('../../schema/user');
const db6 = require('../../schema/server');
const db7 = require('../../schema/vote');

module.exports = {
  name: 'messageCreate',
  run: async (client, message) => {
    if (!message || message.author.bot || !message.guild || !message.guildId) return;
    let prefix = client.prefix;
    const channel = message?.channel;
    const ress = await db.findOne({ Guild: message.guildId });
    if (ress && ress.Prefix) prefix = ress.Prefix;

    if(!message.channel.permissionsFor(message.guild.members.me).has(PermissionsBitField.resolve('ViewChannel'))) return;
    if (!message.channel.permissionsFor(message.guild.members.me).has(PermissionsBitField.resolve('SendMessages')) || !message.channel.permissionsFor(message.guild.members.me).has(PermissionsBitField.resolve('SendMessagesInThreads'))) return;
    if (!message.channel.permissionsFor(message.guild.members.me).has(PermissionsBitField.resolve('ReadMessageHistory')));
      //return message.channel.send(`❎ I don't have \`ReadMessageHistory\` permission to execute this command!`);
    if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve('ReadMessageHistory')));
      //return message.channel.send(`❎ I don't have \`ReadMessageHistory\` permission to execute this command!`);

    if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve('UseExternalEmojis')));
      //return message.reply(`❎ I don't have \`UseExternalEmojis\` permission to execute this command!`);
    if (!message.channel.permissionsFor(message.guild.members.me).has(PermissionsBitField.resolve('UseExternalEmojis')));
    //return message.reply(`❎ I don't have \`UseExternalEmojis\` permission to execute this command!`);
    if (!message.guild.members.me.permissions.has(PermissionsBitField.resolve('EmbedLinks')));
      //return message.reply(`❎ I don't have \`EmbedLinks\` permission to execute this command!`);
    if (!message.channel.permissionsFor(message.guild.members.me).has(PermissionsBitField.resolve('EmbedLinks')));
      //return message.reply(`❎ I don't have \`EmbedLinks\` permission to execute this command!`);
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (commandName.length === 0) {
      const ess = new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setEmoji("📬")
      .setLabel("Invite Me")
      .setURL("https://discord.com/api/oauth2/authorize?client_id=971355817280430110&permissions=556742831953&scope=bot%20applications.commands")

      const ess1 = new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setEmoji("🎭")
      .setLabel("Support Server")
      .setURL("https://discord.gg/bHDq4PqjAe")

      const ess2 = new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setEmoji("📰")
      .setLabel("Website")
      .setURL("https://larabot.tk")
    const row = new ActionRowBuilder().addComponents([ess, ess1, ess2]);

        if (matchedPrefix.includes(client.user.id))
            return message.reply({
              components: [row],
              embeds: [new EmbedBuilder()
                .setColor(client.embedColor)
                .setThumbnail(client.user.displayAvatarURL())
                .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
                .setDescription("Thanks For Adding **Leco Music™** The Best Quality Music Bot!")
                .addFields([
                  {name: "• Guild Prefix", value: `\`${prefix}\``, inline: true},
                  {name: "• Help Menu", value: `\`${prefix}help\``, inline: true},
                ])
                .setImage("https://media.discordapp.net/attachments/971363118695481374/1048913451042492466/standard_3.gif")
      ]})
    };

    const command = client.commands.get(commandName) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    const embed = new EmbedBuilder()
    .setColor(client.embedColor);

    if (command.userPrams && !message.member.permissions.has(PermissionsBitField.resolve(command.userPrams))) {
      embed.setTitle("❎ You are not allowed to run this command!")
      embed.setDescription(`❎  You need to this \`${command.userPrams.join(', ')}\` permission use this command.`);
      return message.channel.send({ embeds: [embed] });
    };
    if (command.botPrams && !message.guild.members.me.permissions.has(PermissionsBitField.resolve(command.botPrams))) {
      embed.setTitle("❎ You are not allowed to run this command!")
      embed.setDescription(`❎  I need this \`${command.botPrams.join(', ')}\` permission use this command.`,);
      return message.channel.send({ embeds: [embed] });
    };
    if (
      !channel.permissionsFor(message.guild.members.me)?.has(PermissionsBitField.resolve('EmbedLinks')) &&
      client.user.id !== userId
    ) {
      return channel.send({ content: `❎  Error: I need \`EmbedLinks\` permission ` });
    };
    if (command.owner) {
      if (client.config.ownerID) {
        if (!client.config.ownerID.includes(message.author.id)) {
          return message.channel.send({
            embeds: [embed.setTitle('❎ Only Leco Music™ owner can use this command!')],
          });
        };
      };
    };
    
    if (command.vote) {
      let userid = await db5.findOne({ Id: message.author.id });
      let serverid = await db6.findOne({ Id: message.guildId });
      let premium = userid || serverid;
      let votes = await db7.findOne({ Id: message.author.id })
      if(!votes && !premium) return IsVoted(client, message, message.author, false)
    }
    if (!client.cooldowns.has(commandName)) { 
      client.cooldowns.set(commandName, new Collection());
    }
    const now = Date.now(); 
    const timestamps = client.cooldowns.get(commandName); 
    const cooldownAmount = (command.cooldown || 2) * 1000;
    if (timestamps.has(message.author.id)) { 
      let expirationTime = timestamps.get(message.author.id) + cooldownAmount; 
      if (now < expirationTime) { 
        let timeLeft = (expirationTime - now) / 1000; 
        if (timeLeft < 1) timeLeft = Math.round(timeLeft);
        if (timeLeft && timeLeft != 0) {
          return message.reply({
            embeds: [new EmbedBuilder()
              .setColor(client.embedColor)
              .setTitle(`❎ Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the ${commandName} command.`)
            ]
          }).catch(() => {});
        };
      };
    };
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    
    const player = client.poru.players.get(message.guild.id);
    if (command.player && !player) {
      embed.setTitle('❎ Player was not created');
      return message.channel.send({ embeds: [embed] });
    };
    if(command.activeplayer && !player.currentTrack) {
      embed.setTitle('❎ There is nothing playing')
      return message.channel.send({embeds: [embed]})
    };
    if (command.inVoiceChannel && !message.member.voice.channelId) {
      embed.setTitle('❎ You need to join a voice channel.');
      return message.channel.send({ embeds: [embed] });
    };
    if (command.sameVoiceChannel) {
      if (message.guild.members.me.voice.channel) {
        if (message.guild.members.me.voice.channelId !== message.member.voice.channelId) {
          embed.setTitle("❎ You need to be in my voice channel");
          return message.channel.send({ embeds: [embed] });
        };
      };
    };
    if (command.dj) {
      let data = await db3.findOne({ Guild: message.guild.id })
      let perm = PermissionsBitField.resolve('ManageGuild');
      if (data) {
        if (data.Mode) {
          let pass = false;
          if (data.Roles.length > 0) {
            message.member.roles.cache.forEach((x) => {
              let role = data.Roles.find((r) => r === x.id);
              if (role) pass = true;
            });
          };
          if (!pass && !message.member.permissions.has(perm)) return message.channel.send({ embeds: [embed.setTitle("❎ You don't have permission or dj role to use this command")] })
        };
      };
    }
    try {
      command.execute(message, args, client, prefix, player);
    } catch (error) {
      console.log(error);
      embed.setDescription(
        'There was an error executing that command.',
      );
      return message.channel.send({ embeds: [embed] });
    }
  },
};
