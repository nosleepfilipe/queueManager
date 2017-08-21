'use strict';

class QueueRedis {

  constructor (options) {
    this.options = options;
  }

  push (job, connection) {
    console.log('queue REDIS ', job);
  }
}

module.exports = QueueRedis;
