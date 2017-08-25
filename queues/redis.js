'use strict';

const sha1 = require('sha1');

class QueueRedis {

  constructor (options, connection) {
    this.options = options;
    this.connection = connection;
  }


  push (job) {
    let key = sha1(job);
    return new Promise((resolve, reject) => {
      this.connection.set(key,job, (err, result) => {
      err ? reject(err) : resolve(key);
      });
    });
  }

}

module.exports = QueueRedis;
