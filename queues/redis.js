'use strict';

class QueueRedis {

  constructor (options) {
    this.options = options;
  }

  push (job, connection) {
    let key = 'one';
    return new Promise((resolve, reject) => {
      connection.set(key,job, (err, result) => {
      err ? reject(err) : resolve(result);
      });
    });
    console.log('queue REDIS ', job);
  }
}

module.exports = QueueRedis;
