const { EmbedBuilder, WebhookClient } = require('discord.js');
const web = new WebhookClient({ url: 'https://discord.com/api/webhooks/1067309573423235123/8IsPZTiIY7uxbhwYRN1X0NswVx_YqL_ItgRZdvxBcPVUazYiCH8Sf0YjsPsU_NmKZH0l' });

module.exports = {
  name: "guildCreate",
  run: async (client, guild) => {
  if (!guild || guild.available === false) return;
  let theowner = "NO OWNER DATA! ID: ";
  await guild.fetchOwner().then(({user}) => {theowner = user}).catch(() => {});
  
  let gds = await client.cluster.fetchClientValues('guilds.cache.size');
  const totalGuilds = gds.reduce((acc, guildCount) => acc + guildCount, 0);
  let embed = new EmbedBuilder()
    .setColor("#00f00f")
    .setTitle(`👍 Joined a New Guild`)
    .addFields([
      {name: "Guild Info", value: `>>> \`\`\`${guild.name} (${guild.id})\`\`\``},
      {name: "Owner Info", value: `>>> \`\`\`${theowner ? `${theowner.tag} (${theowner.id})` : `${theowner} (${guild.ownerId})`}\`\`\``},
      {name: "Member Count", value: `>>> \`\`\`${guild.memberCount}\`\`\``},
      {name: "Guilds Bot is in", value: `>>> \`\`\`${totalGuilds}\`\`\``},
    ])
    .setThumbnail(guild.iconURL({ dynamic: true }));
    web.send({embeds: [embed]});
  },
};
