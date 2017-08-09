'use strict';

const QueueSqs = require('../queues/sqs.js');
const QueueRedis = require('../queues/redis.js');


class QueueFactory {

  constructor (config) {
    this.config = config;
    this.queues = {};
    this.createQueue(this.config['default-connection'],this.config.connections[this.config['default-connection']]);
    //return this;
  }

  createQueue (name,options) {

     switch (options.driver) {
      case 'sqs' :
        this.queueClass = QueueSqs;
        break;
      case 'redis' :
        this.queueClass = QueueRedis;
        break;
    }
    this.queues[name] = new this.queueClass (options);

  }

  push (job) {
    console.log('job ',job);
  }

  connection (connection) {
    if(!this.queues[connection]) {
      return this.createQueue(connection,this.config.connections[connection]);
    }
    return this.queues[connection];

  }

}

module.exports = QueueFactory;



