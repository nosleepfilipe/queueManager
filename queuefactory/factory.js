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
    console.log('set default  queue ',this.defaultConnection);
    this.createQueue(this.config['default-connection'],this.config.connections[this.config['default-connection']]);
    //return this;
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
    console.log('create new queue ', name);
    this.queues[name] = new this.queueClass (options);

    this.connectionClass[name] = new this.connectionClass (options);
  }

  push (job) {
    //console.log(this.connectionClass[this.defaultConnection]);
    //console.log(this.queues);
    //return false ;
    let queue = this.queues[this.defaultConnection];
    queue.pushJob(job,this.connectionClass[this.defaultConnection]);
  }

  onConnection (connection) {
    this.defaultConnection = connection;

    if(!this.queues[connection]) {
      console.log('create new queue first time ', connection);
      this.createQueue(connection,this.config.connections[connection]);
    }
    return this.queues[connection];

  }


}

module.exports = QueueFactory;



