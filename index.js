const Cluster = require("discord-hybrid-sharding");
const config = require("./src/config");
const shconfig = require('./shard-config.json')
const colors = require("colors");
const totalShards = shconfig.clustercount * shconfig.shardcount;
const manager = new Cluster.Manager("./src/index.js", {
    mode: "process",
    token: config.token,
    totalShards: totalShards,
    shardsPerClusters: shconfig.shardcount, 
    respawn: true
});

manager.extend(
    new Cluster.HeartbeatManager({
        interval: 10000, 
        maxMissedHeartbeats: 5,
    })
    )
manager.on("clusterCreate", cluster => {
    console.log(`[SHARDING-MANAGER]: `.magenta + `Launched Cluster #${cluster.id} | ${cluster.id+1}/${cluster.manager.totalClusters} [${cluster.manager.shardsPerClusters}/${cluster.manager.totalShards} Shards]`.green)

    cluster.on("death", function () {
        console.log(`${colors.red.bold(`Cluster ${cluster.id} died..`)}`);
    });

    cluster.on("message", async (msg) => {
        if(!msg._sCustom) return
        if (msg.dm) {
            const { interaction, message, dm, packet } = msg
            await manager.broadcast({ interaction, message, dm, packet })
        }
    })

    cluster.on("error", e => {
        console.log(`${colors.red.bold(`Cluster ${cluster.id} errored ..`)}`);
        console.error(e);
    })
    
    cluster.on("disconnect", function () {
        console.log(`${colors.red.bold(`Cluster ${cluster.id} disconnected..`)}`);
    });

    cluster.on("reconnecting", function () {
        console.log(`${colors.yellow.bold(`Cluster ${cluster.id} reconnecting..`)}`);
    });

    cluster.on("close", function (code) {
        console.log(`${colors.red.bold(`Cluster ${cluster.id} close with code ${code}`)}`);
    });

    cluster.on("exit", function (code) {
        console.log(`${colors.red.bold(`Cluster ${cluster.id} exited with code ${code}`)}`);
    });
});


manager.on('clientRequest', async (message) => {
    if(message._sRequest && message.songRequest){
        if(message.target === 0 || message.target) {
            const msg = await manager.clusters.get(message.target).request(message.raw);
            message.reply(msg)
        } else {
            manager.clusters.forEach(async cluster => {
            const msg = await  cluster.request(message.raw);
            message.reply(msg)
            })
        }
    }
})


manager.once("debug", (d) => d.includes("[CM => Manager] [Spawning Clusters]") ? console.log(d) : "")

manager.spawn({timeout: -1});