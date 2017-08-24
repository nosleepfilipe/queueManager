'use strict';

class QueueRedis {

  constructor (options, connection) {
    this.options = options;
    this.connection = connection;
  }


  push (job) {
    let key = 'one';
    return new Promise((resolve, reject) => {
      this.connection.set(key,job, (err, result) => {
      err ? reject(err) : resolve(result);
      });
    });
  }

}

module.exports = QueueRedis;
