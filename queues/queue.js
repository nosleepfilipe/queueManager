'use strict';

class Queue {


  standardizeJob (name,payload) {

    let jobQueue = {
      name,
      attempts : 0,
      payload
    };

    return jobQueue;

  }

  incrementAttempts (job) {

    job.attempts++;

    return job;

  }

  retrieveJob (job,id) {

    job = JSON.parse(job);
    job.id = id;
    //job.connection = this.connection;

    return job;
  }

}

module.exports = Queue;
