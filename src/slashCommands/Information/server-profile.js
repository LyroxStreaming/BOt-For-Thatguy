const { EmbedBuilder, CommandInteraction, Client, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const db = require('../../schema/server');

module.exports = {
    name: 'server-profile',
    description: 'premium user profile info',
    userPrams: [],
    botPrams: ['EmbedLinks'],

    /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

    run: async (client, interaction) => {
        let server = await db.findOne({ Id: interaction.member.id });

        if(server) {
            let redeemtime= server.redeemedAt.toString().split("");
                redeemtime.pop();
                redeemtime.pop();
                redeemtime.pop();
                redeemtime = redeemtime.join("");
    
            let expiretime= server.expireTime.toString().split("");
                expiretime.pop();
                expiretime.pop();
                expiretime.pop();
                expiretime = expiretime.join("");
    
            let userembed = new EmbedBuilder()
            .setColor(client.embedColor)
            .setTitle(`Leco Music™ Premium Servers`)
            .setDescription(`
            **Plan Redeemed By - <@${server.redeemedBy}>**
            **Server Id - ${server.Id}**
            **Server Name - ${server.name}**
            **Plan - ${server.plan}**
            **Plan Redeemed At - <t:${redeemtime}>(<t:${redeemtime}:R>)**
            **Plan Expiretime - <t:${expiretime}>(<t:${expiretime}:R>)**
            `)
            .setImage('https://media.discordapp.net/attachments/971363118695481374/1067272548083060776/standard.gif')
    
            interaction.reply({embeds: [userembed]});
    
            } else {
            let premium = new ButtonBuilder()
                .setEmoji("🎁")
                .setStyle(ButtonStyle.Secondary)
                .setCustomId('premium')
                .setLabel('Premium')

            const row = new ActionRowBuilder().addComponents([premium]);

            let nouserembed = new EmbedBuilder()
                .setColor(client.embedColor)
                .setTitle(`Leco Music™ Premium`)
                .setDescription(`**You are not premium user, if you want to be premium user click the button**`)
                .setImage('https://media.discordapp.net/attachments/971363118695481374/1067275455738167358/standard_2.gif')
    
                interaction.reply({embeds: [nouserembed], components: [row]});
        };
    },
};
