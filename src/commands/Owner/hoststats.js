const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "hoststats",
    category: "Owner",
    description: "Leco Music™ host stats",
    args: false,
    usage: "<string>",
    permission: [],
    owner: true,
    execute: async (message, args, client, prefix) => {
        const embed = new EmbedBuilder()
            .setDescription(`\`\`\`\n\n` + 
                    `Total Memory  :: ${Math.round(require('os').totalmem() / 1024 / 1024)} mb\n` +
                    `Current Usage :: ${Math.round(require('os').totalmem() / 1024 / 1024)-Math.round(require('os').freemem() / 1024 / 1024)} mb\n` +
                    `Free Memory   :: ${Math.round(require('os').freemem() / 1024 / 1024)} mb\n` +
                    `RSS           :: ${Math.round(process.memoryUsage().rss / 1024 / 1024)} mb\n` +
                    `Heap Total    :: ${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} mb\n` +
                    `Heap Used     :: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} mb\n` +
                    `External      :: ${Math.round(process.memoryUsage().external / 1024 / 1024)} mb\n` +
                    `Array Buffer  :: ${Math.round(process.memoryUsage().rss / 1024 / 1024)} mb\n` +
                    `CPU Model     :: ${require('os').cpus()[0].model}\n` +
                    `Cores         :: ${require('os').cpus().length}\n` +
                    `Speed         :: ${require('os').cpus()[0].speed}Mhz\n` +
                    `Platform      :: ${process.platform}\n` +
                    `PID           :: ${process.pid}\n` +
                    `\n` + `\`\`\``)
            .setColor(client.embedColor)
        message.reply({embeds: [embed]});
    },
};