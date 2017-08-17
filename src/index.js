'use strict';

const QueueFactory =  require('../queuefactory/factory.js');

class QueueManager {

  constructor (config) {
    this.config = config;
    this.defaultConnection = this.config['default-connection'];
    this.queues = {};
    this.queueFactory =  new QueueFactory(this.config);
    //console.log(this.queueFactory);
  }

  push (job) {
    this.queueFactory.push(job);

  }


  onConnection (connection) {
    return this.queueFactory.onConnection(connection);
  }
}



