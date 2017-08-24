'use strict';

const QueueSqs = require('../queues/sqs.js');
const QueueRedis = require('../queues/redis.js');

const ConnectionSqs =  require('../connections/sqs.js');
const ConnectionRedis =  require('../connections/redis.js');


class QueueFactory {

  constructor () {

  }

  createQueue (config) {
    //let connectionConfig = this.config.connections[name];
     switch (config.driver) {
      case 'sqs' :
        this.queueClass = QueueSqs;
        this.connectionClass = ConnectionSqs;
        break;
      case 'redis' :
        this.queueClass = QueueRedis;
        this.connectionClass = ConnectionRedis;
        break;
    }

    return new this.queueClass(config, new this.connectionClass(config));

  }


}

module.exports = QueueFactory;



