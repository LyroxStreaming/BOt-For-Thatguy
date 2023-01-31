module.exports = {
  name: "slashreload",
  category: "Owner",
  description: "Reload Slash command or deploy it",
  args: false,
  usage: "<string>",
  permission: [],
  owner: true,
  execute: async (message, args, client, prefix) => {
      let loadSlashsGlobal = true;
      let guildId = args[0];
      if (guildId) {
          let guild = client.guilds.cache.get(guildId);
          if (guild) {
          loadSlashsGlobal = false;
          guildId = guild.id;
          }
      }
      if (loadSlashsGlobal) {
        let themsg = await message.reply(`<a:Loading:833101350623117342> **Attempting to set the global slash commands in \`${client.guilds.cache.size} guilds\`...**`)
          client.application.commands.set(client.data)
          .then(slashCommandsData => {
            themsg.edit(`**\`${slashCommandsData.size} Slash-Commands\`** (\`${slashCommandsData.map(d => d.options).flat().length} Subcommands\`) loaded for all **possible guilds**\n> those guilds are those, who invited me with the **SLASH COMMAND INVITE LINK** from \`${prefix}invite\`\n> *because u are using global settings, it can take up to 1 hour until the commands are changed!*`);
          }).catch(() => {});
      } else {
          let guild = client.guilds.cache.get(guildId);
        let themsg = await message.reply(`<a:Loading:833101350623117342> **Attempting to set the guild slash commands in \`${guild.name}\`...**`)
          await guild.commands.set(client.data).then((slashCommandsData) => {
          themsg.edit(`**\`${slashCommandsData.size} Slash-Commands\`** (\`${slashCommandsData.map(d => d.options).flat().length} Subcommands\`) loaded for all **${guild.name}**\n> those guilds are those, who invited me with the **SLASH COMMAND INVITE LINK** from \`${prefix}invite\`\n> *because u are using global settings, it can take up to 1 hour until the commands are changed!*`);
          }).catch((e) => {
          console.log(e)
          themsg.edit(`**Could not load the slash commands for ${guild.name}**\n\n**did you invite me with this link in that server?**\n>`)
          });
      }
  }
}