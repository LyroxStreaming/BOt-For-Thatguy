const { readdirSync } = require("fs");

module.exports = (client) => {
    readdirSync("./src/commands").forEach(dir => {
        const commandFiles = readdirSync(`./src/commands/${dir}/`).filter(f => f.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../commands/${dir}/${file}`);
            client.commands.set(command.name, command);
        };
    });
    client.logger.log("[ • ] Message Command Loaded:", "cmd");
};