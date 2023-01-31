const { EmbedBuilder } = require('discord.js');
const { duration, nFormatter, collectormsg } = require('../../utils/functions');

module.exports = {
    name: "stats",
    category: "Owner",
    description: "Leco Music™ Stats",
    args: false,
    usage: "<string>",
    permission: [],
    owner: true,
    execute: async (message, args, client, prefix) => {
        const promises = [
            client.cluster.fetchClientValues('cluster.id'),
            client.cluster.broadcastEval(c => c.cluster.ids.map(d => `${d.id}`).join(", ")),
            client.cluster.fetchClientValues('guilds.cache.size'),
            client.cluster.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
            client.cluster.broadcastEval(c => (process.memoryUsage().heapUsed/1024/1024).toFixed(0)),
            client.cluster.broadcastEval(c => (process.memoryUsage().rss/1024/1024).toFixed(0)),
            client.cluster.fetchClientValues('ws.ping'),
            client.cluster.fetchClientValues('poru.players'),
            client.cluster.fetchClientValues('uptime'),
            ];
            
            return Promise.all(promises)
            .then(([cluster, shards, guilds, members, ram, rssRam, ping, players, uptime]) => {
                const totalguild = guilds.reduce((acc, guildCount) => acc + guildCount, 0);
                const totalmembers = members.reduce((acc, guildCount) => acc + guildCount, 0);
                const embeds = [];
                for(let index = 0; index<shards.length; index++) {
                let emb = new EmbedBuilder()
                .setColor(client.embedColor)
                .setFields([
                    {name: `Leco Music™ Stats`, value: `\`\`\`yml\nServers: ${nFormatter(totalguild, 2)}\nUsers: ${nFormatter(totalmembers, 2)}\nClusters: ${client.cluster.count}\nShards: ${client.cluster.info.TOTAL_SHARDS}\`\`\``},
                    {name: `${uptime[index] < 1000 || members[index] < 1 || guilds[index] < 1 ? `<:infos:927525488577114152>` : `<:infos:927525488577114152>`} **Cluster** ${cluster[index]}${cluster[index] == client.cluster.id ? `` : ``}`, value: `\`\`\`yml\n Shards: ${shards[index]}\nServers: ${guilds[index]}\nMembers: ${nFormatter(members[index], 1)}\n Memory: ${ram[index]}mb / ${rssRam[index]}mb\n   Ping: ${ping[index]}ms\n Uptime: ${duration(uptime[index]).map(d => d.split(" ")[1] ? d.split(" ")[0] + d.split(" ")[1].slice(0, 1).toLowerCase() : "0m").join("")}\n\`\`\``}
                ])
                embeds.push(emb);
            };
            collectormsg(client, message, embeds, message.author);
            });
    },
};