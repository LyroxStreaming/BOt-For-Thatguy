const { readdirSync } = require("fs");

module.exports = (client) => {
    readdirSync("./src/events/Poru").forEach(file => {
        const event = require(`../events/Poru/${file}`);
        client.poru.on(event.name, (...args) => event.run(client, ...args));
    });
    client.logger.log("Loading Poru Events", "event");
};