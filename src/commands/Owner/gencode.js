const { EmbedBuilder } = require('discord.js');
const schema = require('../../schema/code');
const moment = require('moment');
let voucher_codes = require('voucher-code-generator');

module.exports = {
    name: "gencode",
    category: "Owner",
    description: "premium code generate",
    args: false,
    permission: [],
    owner: true,
    execute: async (message, args, client, prefix) => {
    let codes = [];
    const plan = args[0];
    const plans = ['1-month', '3-months', '1-year'];
    if (!plan) return message.channel.send({ embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setDescription('❎ **Please provide plan you want to add premium**')]})
    
    if (!plans.includes(args[0]))
    return message.channel.send({ embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setDescription(`❎ **Invalid Plan, available plans:** ${plans.join(', ')}`)]})

    let time
    if (plan === '1-month') time = 1 * 2678400000
    if (plan === '3-months') time = 3 * 2678400000
    if (plan === '1-year') time = 12 * 2678400000

    let ftime = Date.now()+time;

    let amount = args[1];
    if (!amount) amount = 1;

    for (var i = 0; i < amount; i++) {
    const codePremium = voucher_codes.generate({
        pattern: '######-######-######-######-######'
    })

    const code = codePremium.toString().toUpperCase();

    const find = await schema.findOne({
        code: code
    });
    
    if (!find) {
    schema.create({
        code: code,
        expireAt: ftime,
        plan: plan,
        expireTime : ftime,
        times: time
        })

        codes.push(`${i + 1}- ${code}`);
    };
};
    message.channel.send({embeds: [new EmbedBuilder()
        .setColor(client.embedColor)
        .setTitle('Code Generated')
        .setDescription(`
        ✅ **Codes +${codes.length}**

        \`\`\`${codes.join('\n')}\`\`\`

        **Months - ${plan}**
        
        **Expires - ${moment(ftime).format('dddd, MMMM Do YYYY')}**`)]})
    
    },
};