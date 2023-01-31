const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const db = require('../../schema/vote');

module.exports = {
    name: 'checkvote',
    category: 'Information',
    aliases: ['cv'],
    description: 'Check if you are vote or not',
    args: false,
    usage: '',
    userPrams: [],
    botPrams: ['EmbedLinks'],
    owner: false,
    execute: async (message, args, client, prefix) => {
        let vote = await db.findOne({ Id: message.author.id });
        if (vote) {
            let expiretime= vote.expireTime.toString().split("");
                expiretime.pop();
                expiretime.pop();
                expiretime.pop();
                expiretime = expiretime.join("");

            const embss = new EmbedBuilder()
                .setColor(client.embedColor)
                .setDescription(`❎ **You Already Vote Leco Music™, You can vote again at <t:${expiretime}>(<t:${expiretime}:R>)**`)
            return message.reply({ embeds: [embss]});
        }
        if(!vote) {
            let times = 44640000;
            let ftime = Date.now()+times;

            let expiretimes= ftime.toString().split("");
                expiretimes.pop();
                expiretimes.pop();
                expiretimes.pop();
                expiretimes = expiretimes.join("");

            let votes = await client.topgg.hasVoted(message.author.id);
            if(votes) {
            await db.create({
                Id: message.author.id,
                expireTime: ftime
            })
            const embss = new EmbedBuilder()
            .setColor(client.embedColor)
            .setDescription(`✅ **Added to database, Now you can vote after <t:${expiretimes}>(<t:${expiretimes}:R>)**`)
            
            return message.reply({ embeds: [embss]});

            } else {
                let vote = new ButtonBuilder()
                .setEmoji('👍')
                .setStyle(ButtonStyle.Link)
                .setLabel(`Vote Me`)
                .setURL("https://top.gg/bot/944016826751389717/vote")
                
                let support = new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setEmoji("🎭")
                .setLabel(`Support Server`)
                .setURL("https://discord.gg/bHDq4PqjAe")
    
                let premium = new ButtonBuilder()
                .setEmoji("🎁")
                .setStyle(ButtonStyle.Secondary)
                .setCustomId('premium')
                .setLabel('Premium')
        
            const row = [new ActionRowBuilder().addComponents([vote, support, premium])];
                const embed = new EmbedBuilder()
                .setColor(client.embedColor)
                .setAuthor({name: `Vote Required/Premium `, iconURL: message.author.displayAvatarURL({dynamic: true}), url: `https://larabot.tk`})
                .setDescription(`You Must [Vote Me](https://top.gg/bot/944016826751389717/vote) To Use This Commands, You Can Bypass Voting By Becoming [Premium](https://discord.com/channels/924888533137764403/1033363849581174794) Member!`)
                .setImage("https://media.discordapp.net/attachments/971363118695481374/1067273711817867378/standard_1.gif")
                .setFooter({text: 'By Leco Music™'})
            return message.reply({ embeds: [embed], components: row});
            };
        };
    },
};
