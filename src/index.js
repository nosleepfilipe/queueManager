'use strict';

const QueueFactory =  require('../queuefactory/factory.js');

class QueueManager {

  constructor (config) {
    this.config = config;
    this.defaultConnection = config['default-connection'];
    this.queues = {};
    this.queueFactory =  new QueueFactory(config);
    //console.log(this.queueFactory);
  }

  push (job) {
    this.queueFactory.push(job);

  }


  onConnection (connection) {
    return this.queueFactory.connection(connection);
  }
}



