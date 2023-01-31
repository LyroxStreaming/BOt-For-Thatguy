
module.exports = {
    name: "nodeError",
    run: async (client, node) => {
        client.logger.log(`${node.name} Has Error`, "log");
    },
};