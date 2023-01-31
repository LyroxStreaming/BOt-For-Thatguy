const { ActivityType } = require('discord.js');

module.exports ={
name: "ready",
run: async (client) => {
    client.logger.log(`${client.user.username} online!`, "ready");
    client.poru.init(client);
    const status = [
        `/play`,
        ]
      client.user.setActivity({name: status[Math.floor(Math.random() * status.length)], type: ActivityType.Listening });
  },
};