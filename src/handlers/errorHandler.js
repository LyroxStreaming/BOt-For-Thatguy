
const { EmbedBuilder, WebhookClient } = require("discord.js");
const web = new WebhookClient({ url: 'hhttps://discord.com/api/webhooks/1067310908646371348/bZ6MqopAdksi-ecxJRQ9iBWVLNflakFVneMPXsDX8VrDB3vrmUcIed9Kfy3tk7Tb6lr0' });
const chalk = require("chalk");

module.exports = async (client) => {
    const embed = new EmbedBuilder()
    .setColor("#303236");

process.on("beforeExit", (code) => {
    console.log(chalk.yellow.dim("[AntiCrash] | [BeforeExit_Logs] | [Start] : ==============="));
    web.send({embeds: [embed.setTitle('BeforeExit_Logs').setDescription(`\`\`\`js\n${code}\`\`\``)]});
    console.log(code);
    console.log(chalk.yellow("[AntiCrash] | [BeforeExit_Logs] | [End] : ==============="));
    });
process.on("exit", (error) => {
    console.log(chalk.yellow("[AntiCrash] | [Exit_Logs] | [Start]  : ==============="));
    web.send({embeds: [embed.setTitle('Exit_Logs').setDescription(`\`\`\`js\n${error}\`\`\``)]});
    console.log(error);
    console.log(chalk.yellow("[AntiCrash] | [Exit_Logs] | [End] : ==============="));
});
process.on("unhandledRejection", async (reason, promise) => {
    console.log(chalk.yellow("[AntiCrash] | [UnhandledRejection_Logs] | [start] : ==============="));
    web.send({embeds: [embed.setTitle('UnhandledRejection_Logs').setDescription(`\`\`\`js\n${reason.stack}\`\`\``)]});
    console.log(reason);
    console.log(chalk.yellow("[AntiCrash] | [UnhandledRejection_Logs] | [end] : ==============="));
});
process.on("rejectionHandled", (promise) => {
    console.log(chalk.yellow("[AntiCrash] | [RejectionHandled_Logs] | [Start] : ==============="));
    web.send({embeds: [embed.setTitle('RejectionHandled_Logs').setDescription(`\`\`\`js\n${promise}\`\`\``)]});
    console.log(promise);
    console.log(chalk.yellow("[AntiCrash] | [RejectionHandled_Logs] | [End] : ==============="));
});
process.on("uncaughtException", (err, origin) => {
    console.log(chalk.yellow("[AntiCrash] | [UncaughtException_Logs] | [Start] : ==============="));
    web.send({embeds: [embed.setTitle('UncaughtException_Logs').setDescription(`\`\`\`js\n${err.stack}\`\`\``)]});
    console.log(err);
    console.log(chalk.yellow("[AntiCrash] | [UncaughtException_Logs] | [End] : ==============="));
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(chalk.yellow("[AntiCrash] | [UncaughtExceptionMonitor_Logs] | [Start] : ==============="));
    web.send({embeds: [embed.setTitle('UncaughtExceptionMonitor_Logs').setDescription(`\`\`\`js\n${err.stack}\`\`\``)]});
    console.log(err);
    console.log(chalk.yellow("[AntiCrash] | [UncaughtExceptionMonitor_Logs] | [End] : ==============="));
});
process.on("warning", (warning) => {
    console.log(chalk.yellow("[AntiCrash] | [Warning_Logs] | [Start] : ==============="));
    web.send({embeds: [embed.setTitle('Warning_Logs').setDescription(`\`\`\`js\n${warning}\`\`\``)]});
    console.log(warning);
    console.log(chalk.yellow("[AntiCrash] | [Warning_Logs] | [End] : ==============="));
});
    client.logger.log('Loaded ErrorHandler', "event");
};
