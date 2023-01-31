const { readdirSync } = require("fs");

module.exports = (client) => {
    readdirSync("./src/events/Client").forEach(file => {
        const event = require(`../events/Client/${file}`);
        client.on(event.name, (...args) => event.run(client, ...args));

    });
    client.logger.log("Loading Client Events", "event");
};