'use strict';

const Queue = require('./queue.js');
const sha1 = require('sha1');

class QueueRedis extends Queue {

  constructor (options, connection) {

    super();
    this.options = options;
    this.connection = connection;

  }

  getAllKeys () {

    return new Promise( (resolve, reject) =>{
      this.connection.keys('*', (err, result) => {
        err ? reject(err) : resolve({scope:this,keys:result});
      });
    });

  }

  getAllValues (result) {

    const keysPromise = result.keys.map(key => {
      return new Promise( (resolve, reject) => {
        result.scope.connection.get(key, (err, result) => {
          err ? reject(err) : resolve(result);
        });
      });
    });

    return Promise.all(keysPromise);

  }

  getJobs () {

    return this.getAllKeys().then(this.getAllValues);

  }

  push (jobName, job) {

    let key = sha1(new Date());
    return new Promise((resolve, reject) => {
      this.connection.set(key,this.standardizeJob(jobName,job), (err, result) => {
      err ? reject(err) : resolve(key);
      });
    });

  }

}

module.exports = QueueRedis;
