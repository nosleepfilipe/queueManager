'use strict';

class QueueRedis {

  constructor (options) {
    this.options = options;
  }

  pushJob (job, connection) {
    console.log('queue REDIS ', job);
  }
}

module.exports = QueueRedis;
