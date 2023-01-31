
const CronJob = require('cron').CronJob;
const db = require('../schema/server');
const { EmbedBuilder, WebhookClient } = require('discord.js');
const web = new WebhookClient({ url: 'https://discord.com/api/webhooks/1067310562033274942/PFY7k_MzUswenXX8dvaA_SH_Iuutr2nNBisGVhzuIbVn1IwCa0gOWFBFZm7BJmCewvVl' });

module.exports = (client) => {
        if(client.config.cornclusters === client.cluster.id) {
        const Job = new CronJob('*/10 * * * * *', async function() {
            premiumserver(client);
        });
        Job.start();
        client.logger.log("Loading Premium Server handler");
    }
    async function premiumserver(client) {
        let maindata = await db.find();
        if(!maindata || maindata.length == 0) return;

        for (let data of maindata) {
            if (Date.now() >= data.expireTime) {
            let time = data.redeemedAt.toString().split("");
                time.pop();
                time.pop();
                time.pop();
                time = time.join("");

            let expserver = new EmbedBuilder()
                .setTitle('Leco Music™ Premium Server Expired')
                .setDescription(
                `${data.name} Premium has been expired!

                **Redeemed At - <t:${time}>**`)
                .setColor(client.embedColor)
            web.send({embeds: [expserver]});
            await data.delete();
            };
        };
    };
};