const { Client, GatewayIntentBits, Collection, Options, Sweepers } = require("discord.js");
const mongoose = require('mongoose');
const { Poru } = require('poru');
const colors = require("colors");
const Cluster = require("discord-hybrid-sharding");
const Topgg = require("@top-gg/sdk");

class MusicBot extends Client {
  constructor() {
    super({
      shards: Cluster.data.SHARD_LIST,        
      shardCount: Cluster.data.TOTAL_SHARDS,
      allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: false
      },
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
      ],
      makeCache: Options.cacheWithLimits({
      GuildBanManager: 0,
      GuildInviteManager: 0, 
      GuildStickerManager: 0, 
      GuildScheduledEventManager: 0, 
      PresenceManager: 0, 
      ReactionManager: 0, 
      ReactionUserManager: 0,
      ThreadManager: 0, 
      ThreadMemberManager: 0, 
      MessageManager: {
      maxSize: 0,
      sweepInterval: 2000,
      sweepFilter: Sweepers.filterByLifetime({
        lifetime: 1800,
        getComparisonTimestamp: e => e.editedTimestamp ?? e.createdTimestamp,
      })
    },
      UserManager: {
      maxSize: 0,
      sweepFilter: () => userFilter,
      sweepInterval: 30 * 60 * 1000,
    },
      GuildMemberManager: {
      maxSize: 1500000,
      sweepFilter: () => userFilter,
      sweepInterval: 30 * 60 * 1000,
    }
    }),
    });
    this.commands = new Collection();
    this.slashCommands = new Collection();
    this.config = require("../config.js");
    this.cluster = new Cluster.Client(this);
    this.owner = this.config.ownerID;
    this.prefix = this.config.prefix;
    this.embedColor = this.config.embedColor;
    this.aliases = new Collection();
    this.cooldowns = new Collection();
    this.logger = require("../utils/logger.js");
    this.topgg = new Topgg.Api(this.config.topg);
    if (!this.token) this.token = this.config.token;
    const PoruOptions = {
      reconnectTime: 0,
      resumeKey: "MyPlayers",
      resumeTimeout: 60,
      defaultPlatform: "ytsearch",
      clientID: this.config.SpotifyID,
      clientSecret: this.config.SpotifySecret,
    };
    this.poru = new Poru(this, this.config.nodes,PoruOptions);
    this._requirehandlers();
    if(this.cluster.maintenance) console.log("[Maitainance Mode] Cluster is in maitainance");
    this.rest.on("rateLimited", (info) => {
      this.logger.log(info, "log");
    });
    
    const userFilter = (user) => user?.id !== client?.user?.id;
    
    const dbOptions = {
      useNewUrlParser: true,
      autoIndex: false,
      connectTimeoutMS: 10000,
      family: 4,
      useUnifiedTopology: true,
    };
    mongoose.connect(this.config.mongourl, dbOptions);
    mongoose.Promise = global.Promise;
    mongoose.connection.on('connected', () => {
      this.logger.log('[DB] DATABASE CONNECTED', "ready");
    });
    mongoose.connection.on('err', (err) => {
      console.log(`Mongoose connection error: \n ${err.stack}`, "error");
    });
    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected');
    });
  }
  
  async _requirehandlers(){
    for(const handler of [
      "command", "slashcommand", "clientevent", "shardevent", "poruevents", "errorHandler", "premiumserver", "premiumuser"
    ]) 
      try{ await require(`../handlers/${handler}`)(this); }catch (e){ console.log(e) }
  }
  
  connect() {
    return super.login(this.token);
  };
};

module.exports = MusicBot;
