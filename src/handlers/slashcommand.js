const { readdirSync } = require("fs");

module.exports = (client) => {
    client.data = [];
    readdirSync("./src/slashCommands").forEach((dir) => {
        const slashCommandFile = readdirSync(`./src/slashCommands/${dir}/`).filter((files) => files.endsWith(".js"));
        for (const file of slashCommandFile) {
        const slashCommand = require(`../slashCommands/${dir}/${file}`);
        if (!slashCommand.name) return console.error(`slashCommandNameError: ${slashCommand.split(".")[0]} application command name is required.`);
        if (!slashCommand.description) return console.error(`slashCommandDescriptionError: ${slashCommand.split(".")[0]} application command description is required.`);
        client.slashCommands.set(slashCommand.name, slashCommand);
        client.data.push(slashCommand);
        }
    });
    client.logger.log("[ / ] Slash Command Loaded:", "cmd");
};