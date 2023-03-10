const { EmbedBuilder } = require('discord.js');
const { duration } = require('../../utils/functions');

module.exports = {
    name: "node",
    category: "Owner",
    description: "node stats",
    args: false,
    usage: "<string>",
    permission: [],
    owner: true,
    execute: async (message, args, client, prefix) => {
    
        const all = [...client.poru.nodes.values()].map(node => 
            `yml\nNode ${node.name} Connected` +
            `\nPlayers:  ${node.stats.playingPlayers}` +
            `\nPlaying Players:  ${node.stats.players}` +
            `\nUptime: ${duration(node.stats.uptime)}` +
            `\n\nMemory` +
            `\nReservable Memory: ${Math.round(node.stats.memory.reservable / 1024 / 1024)}mb` +
            `\nUsed Memory: ${Math.round(node.stats.memory.used / 1024 / 1024)}mb` +
            `\nFree Memory: ${Math.round(node.stats.memory.free / 1024 / 1024)}mb` +
            `\nAllocated Memory: ${Math.round(node.stats.memory.allocated / 1024 / 1024)}mb` +
            "\n\nCPU" +
            `\nCores: ${node.stats.cpu.cores}` +
            `\nSystem Load: ${(Math.round(node.stats.cpu.systemLoad * 100) / 100).toFixed(2)}%` +
            `\nLavalink Load: ${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}%`
        ).join('\n\n----------------------------\n');
        
        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Lavalink Node', iconURL: client.user.displayAvatarURL()})
            .setDescription(`\`\`\`${all}\`\`\``)
            .setColor(client.embedColor)
        message.reply({embeds: [embed]});
    },
};