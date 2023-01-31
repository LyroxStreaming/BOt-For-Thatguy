
const CronJob = require('cron').CronJob;
const db = require('../schema/user');
const { EmbedBuilder, WebhookClient } = require('discord.js');
const web = new WebhookClient({ url: 'https://discord.com/api/webhooks/1067310306298187907/hejHPqXY3flvf3ZexgubV3bvFm13RmzvOFvUx2b4ubiqU8rjCVqkmM0RYgoqBBGBhC5S' });

module.exports = (client) => {
  if (client.config.cornclusters === client.cluster.id) {
    const Job = new CronJob('*/10 * * * * *', async function() {
      premiumuser(client);
    });
    Job.start();
    client.logger.log("Loading Premium Uerver handler");
  }
  async function premiumuser(client) {
    let maindata = await db.find();
    if (!maindata || maindata.length == 0) return;

    for (let data of maindata) {
      if (Date.now() >= data.expireTime) {
        let time = data.redeemedAt.toString().split("");
        time.pop();
        time.pop();
        time.pop();
        time = time.join("");

        let expuser = new EmbedBuilder()
          .setTitle('Leco Music™ Premium User Expired')
          .setDescription(
            `<@${data.redeemedBy}> Premium has been expired!

                **Redeemed At - <t:${time}>**
                **Plan - ${data.plan}**`)
          .setColor(client.embedColor)
        web.send({ embeds: [expuser] });
        await data.delete();
      };
    };
  };
};