const { EmbedBuilder, WebhookClient } = require('discord.js');
const web = new WebhookClient({ url: 'https://discord.com/api/webhooks/1067310562033274942/PFY7k_MzUswenXX8dvaA_SH_Iuutr2nNBisGVhzuIbVn1IwCa0gOWFBFZm7BJmCewvVl' });
const Server = require('../../schema/server');

module.exports = {
    name: "redeem-server",
    category: "Owner",
    description: "Add premium to servers",
    args: false,
    permission: [],
    owner: true,
    execute: async (message, args, client, prefix) => {
        let id = args[0];
        if (!id) {
            return message.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setColor(client.embedColor)
                    .setDescription(`❎ **Please specify the server id you want to add premium!**`),
                ],
            });
        };
        let guild = await client.getGuild(id);
        const plan = args[1];
        const plans = ['1-month', '3-months', '1-year'];
        if (!plan) return message.channel.send({ embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setDescription('❎ **Please provide plan you want to add premium**')]})
    
        if (!plans.includes(args[1])) {
        return message.channel.send({ embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setDescription(`❎ **Invalid Plan, available plans:** ${plans.join(', ')}`)]})}
        
        const reddemu = args[2];
        if(!reddemu) {
            return message.channel.send({ embeds: [new EmbedBuilder()
                .setColor(client.embedColor)
                .setDescription(`❎ **Add Redeem User**`)]})
        }
        let times;
        if (plan === '1-month') times = 1 * 2678400000
        if (plan === '3-months') times = 3 * 2678400000
        if (plan === '1-year') times = 12 * 2678400000

        let ftime = Date.now()+times;
        let server = await Server.findOne({Id: id,});

        if (server) {
        server.expireTime = server.expireTime + times
        let time = server.expireTime.toString().split("");
            time.pop();
            time.pop();
            time.pop();
            time = time.join("");
        
        server.isPremium = true
        server.redeemedBy = reddemu
        server.redeemedAt = Date.now()
        server.plan = plan,
        server.expireAt = server.expireTime,
        server.expireTime = server.expireTime

        server = await server.save({ new: true });
        let serverembed = new EmbedBuilder()
        .setTitle('Leco Music™ Premium')
        .setDescription(
            `✅ **Successfully Added Leco Music™ Premium Servers!**

            **Server Name - ${guild.name}**
            **Server Id - ${id}**
            **Added By - <@${message.author.id}>**
            **Redeemed By - <@${reddemu}>**

            Expires at: <t:${time}>(<t:${time}:R>)`)
        .setImage('https://media.discordapp.net/attachments/971363118695481374/1067272548083060776/standard.gif')
        .setColor(client.embedColor)
        
        message.channel.send({ embeds: [serverembed] });
        web.send({embeds: [serverembed]});
        } 
            else if(!server) {
            let time = ftime.toString().split("");
                time.pop();
                time.pop();
                time.pop();
                time = time.join("");

            await Server.create({
                Id: id,
                name: guild.name,
                isPremium: true,
                redeemedBy : reddemu,
                redeemedAt : Date.now(),
                plan: plan,
                expireAt : ftime,
                expireTime: ftime
            })
            let serverembed = new EmbedBuilder()
            .setTitle('Leco Music™ Premium')
            .setDescription(
                `✅ **Successfully Added Leco Music™ Premium Servers!**

                **Server Name - ${guild.name}**
                **Server Id - ${id}**
                **Added By - <@${message.author.id}>**
                **Redeemed By - <@${reddemu}>**

                Expires at: <t:${time}>(<t:${time}:R>)`)
            .setImage('https://media.discordapp.net/attachments/971363118695481374/1067272548083060776/standard.gif')
            .setColor(client.embedColor)

                message.channel.send({ embeds: [serverembed] });
                web.send({ embeds: [serverembed] });
            };
    },
};