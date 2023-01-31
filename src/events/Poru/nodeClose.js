module.exports = {
    name: "nodeClose",
    run: async (client, node) => {
        client.logger.log(`${node.name} Is Closed`, "log");
    },
};
