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

    this.connectionClass[name] = new this.connectionClass (options);
  }

  push (job) {
    let queue = this.queues[this.defaultConnection];
    queue.push(job,this.connectionClass[this.defaultConnection]);

  }

  onConnection (connection) {
    //this.defaultConnection = connection;

    if(!this.queues[connection]) {
      this.createQueue(connection,this.config.connections[connection]);
    }
    return this.queues[connection];

  }

  onQueue (queueName) {
    let queue = this.queues[this.defaultConnection];
    console.log(queue);
    queue.onQueue(queueName);

  }

}

module.exports = QueueFactory;



