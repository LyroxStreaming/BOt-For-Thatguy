const { EmbedBuilder, CommandInteraction, Client, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const db = require('../../schema/user');

module.exports = {
    name: 'user-profile',
    description: 'premium user profile info',
    userPrams: [],
    botPrams: ['EmbedLinks'],

    /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

    run: async (client, interaction) => {
        let user = await db.findOne({ Id: interaction.member.id });

        if(user) {
        let redeemtime= user.redeemedAt.toString().split("");
            redeemtime.pop();
            redeemtime.pop();
            redeemtime.pop();
            redeemtime = redeemtime.join("");

        let expiretime= user.expireTime.toString().split("");
            expiretime.pop();
            expiretime.pop();
            expiretime.pop();
            expiretime = expiretime.join("");

        let userembed = new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle(`Leco Music™ Premium User`)
        .setDescription(`
        **Plan Redeemed By - <@${user.redeemedBy}>**
        **Plan - ${user.plan}**
        **Plan Redeemed At - <t:${redeemtime}>(<t:${redeemtime}:R>)**
        **Plan Expiretime - <t:${expiretime}>(<t:${expiretime}:R>)**
        `)
        .setImage('https://media.discordapp.net/attachments/971363118695481374/1067272548083060776/standard.gif')

        interaction.reply({embeds: [userembed]})

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
