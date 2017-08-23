'use strict';

const QueueSqs = require('../queues/sqs.js');
const QueueRedis = require('../queues/redis.js');

const ConnectionSqs =  require('../connections/sqs.js');
const ConnectionRedis =  require('../connections/redis.js');


class QueueFactory {

  constructor (config) {
    this.config = config;
    this.queues = {};
    this.connections = {};
    this.defaultConnection = this.config['default-connection'];
    this.defaultQueueName = this.config['default-queue-name'];
    this.createQueue(this.config['default-connection'],this.config.connections[this.config['default-connection']]);
  }

  createQueue (name,options) {

     switch (options.driver) {
      case 'sqs' :
        this.queueClass = QueueSqs;
        this.connectionClass = ConnectionSqs;
        break;
      case 'redis' :
        this.queueClass = QueueRedis;
        this.connectionClass = ConnectionRedis;
        break;
    }
    this.queues[name] = new this.queueClass (options);
    this.connectionClass[name] = new this.connectionClass (options,this.defaultQueueName) ;
    this.connection = name;

  }

  push (job) {

    console.log()
    let queue = this.queues[this.connection || this.defaultConnection];
    let pushedJob = queue.push(job,this.connectionClass[this.connection || this.defaultConnection],(this.queue || this.defaultQueueName));
    this.queue = undefined;
    this.connection = undefined;
    return pushedJob;

  }

  onConnection (connectionName) {

    this.connection = connectionName;
    if(!this.queues[connectionName]){
      this.createQueue(connectionName,this.config.connections[connectionName]);
    }
    return this;

  }

  onQueue (queueName) {

    this.queue = queueName;
    return this;

  }

}

module.exports = QueueFactory;



