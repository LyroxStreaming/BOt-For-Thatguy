const { EmbedBuilder, WebhookClient } = require('discord.js');
const web = new WebhookClient({ url: 'https://discord.com/api/webhooks/1067310306298187907/hejHPqXY3flvf3ZexgubV3bvFm13RmzvOFvUx2b4ubiqU8rjCVqkmM0RYgoqBBGBhC5S' });
const schema = require('../../schema/code');
const User = require('../../schema/user');

module.exports = {
  name: "redeem",
  category: "Information",
  description: "Redeem Premium codes",
  args: false,
  permission: [],
  execute: async (message, args, client, prefix) => {
    let code = args[0]
    let user = await User.findOne({ Id: message.author.id });
    if (!code)
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(client.embedColor)
            .setDescription(`❎ **Please specify the code you want to redeem!**`),
        ],
      });

    const Pcode = await schema.findOne({
      code: code.toUpperCase(),
    });
    if (!Pcode) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(client.embedColor)
            .setDescription(`❎ **The code is invalid. Please try again using valid one!**`),
        ],
      });
    };
    if (Pcode && user) {
      user.expireTime = user.expireTime + Pcode.times;
      let time = user.expireTime.toString().split("");
      time.pop();
      time.pop();
      time.pop();
      time = time.join("");

      user.isPremium = true
      user.redeemedBy = message.author.id
      user.redeemedAt = Date.now()
      user.plan = Pcode.plan,
        user.expireAt = user.expireTime,
        user.expireTime = user.expireTime

      user = await user.save({ new: true });
      await Pcode.deleteOne();

      let userembed = new EmbedBuilder()
        .setTitle('Leco Music™ Premium')
        .setDescription(
          `✅ **You have successfully redeemed Leco Music™ Premium!**

            **Redeemed By - <@${message.author.id}>**
            **Plan - ${Pcode.plan}**
            Expires at: <t:${time}>(<t:${time}:R>)`)
        .setImage('https://media.discordapp.net/attachments/971363118695481374/1067272548083060776/standard.gif')
        .setColor(client.embedColor)

      message.channel.send({ embeds: [userembed] });
      web.send({ embeds: [userembed] });
    }
    else if (Pcode && !user) {
      let time = Pcode.expireTime.toString().split("");
      time.pop();
      time.pop();
      time.pop();
      time = time.join("");

      await User.create({
        Id: message.author.id,
        isPremium: true,
        redeemedBy: message.author.id,
        redeemedAt: Date.now(),
        plan: Pcode.plan,
        expireAt: Pcode.expireTime,
        expireTime: Pcode.expireTime
      });
      await Pcode.deleteOne().catch(() => { });
      let userembed = new EmbedBuilder()
        .setTitle('Leco Music™ Premium')
        .setDescription(
          `✅ **You have successfully redeemed Leco Music™ Premium!**

                **Redeemed By - <@${message.author.id}>**
                **Plan - ${Pcode.plan}**
                Expires at: <t:${time}>(<t:${time}:R>)`)
        .setImage('https://media.discordapp.net/attachments/971363118695481374/1067272548083060776/standard.gif')
        .setColor(client.embedColor)
      message.channel.send({ embeds: [userembed] });
      web.send({ embeds: [userembed] });
    };
  },
};