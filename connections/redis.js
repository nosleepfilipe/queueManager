'use strict';

const redis = require("redis");

class ConnectionRedis{

  constructor (config) {
    this.config = config;
    this.client = redis.createClient();
    return this.client;
  }

}

module.exports = ConnectionRedis;
