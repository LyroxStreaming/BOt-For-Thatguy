module.exports = (client) => {
    client.getGuild = (id) => {
        return new Promise(async (res, rej) => {
        if(!id) rej(new Error("No Guild_ID Provided"));
        let guild = client.guilds.cache.get(id) || await client.guilds.fetch(id).catch(() => null);
        if(guild) res(guild); else {
            await client.cluster.broadcastEval(async (c, ctx) => await c.guilds.cache.get(ctx) || await c.guilds.fetch(ctx).catch(() => null), {context: id
            }).catch(rej).then(d => res(d.filter(Boolean)[0]))
            rej(new Error("No Guild Found"))
            };
        });
    };
    client.getChannel = (id) => {
        return new Promise(async (res, rej) => {
        if(!id) rej(new Error("No channelId Provided"));
        let channel = client.channels.cache.get(id) || await client.channels.fetch(id).catch(() => null);
        if(channel) res(channel); else {
            await client.cluster.broadcastEval(async (c, ctx) => c.channels.cache.get(ctx) || await c.channels.fetch(ctx).catch(() => null), {context: id
            }).catch(rej).then(d => res(d.filter(Boolean)[0]))
            rej(new Error("No Channel found"))
            };
        });
    };
};