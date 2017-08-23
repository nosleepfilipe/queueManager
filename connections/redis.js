'use strict';

const redis = require("redis");

class ConnectionRedis{

  constructor (config) {
    this.config = config;
    this.client = redis.createClient({
      host: this.config.host,
      port: this.config.port
    });
    return this.client;
  }

}

module.exports = ConnectionRedis;
