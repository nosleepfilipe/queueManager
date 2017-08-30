'use strict';

const QueueFactory =  require('../queuefactory/factory.js');

class QueueManager {

  constructor (config) {

    this.config = config;
    this.defaultConnection = this.config['default-connection'];
    this.defaultQueueName = this.config['default-queue-name'];
    this.queues = {};
    this.queueFactory =  new QueueFactory();
    this.queues[this.defaultConnection] = this.queueFactory.createQueue(this.config.connections[this.defaultConnection]);

  }

  push (jobName, job) {

    return this.queues[this.defaultConnection].push(jobName,job);

  }


  onConnection (connectionName) {

    if(!this.queues[connectionName]) {
      this.queues[connectionName] = this.queueFactory.createQueue(this.config.connections[connectionName]);
    }
    return this.queues[connectionName] ;

  }
}

module.exports = QueueManager;

