'use strict';

class Queue {

  /**
   * Creates a standardize job to insert in the queue
   * @param name string
   * @param payload object
  */
  standardizeJob (name,payload) {

    let jobQueue = {
      name,
      attempts : 0,
      payload
    };

    return jobQueue;

  }

  /**
   * Incrementes the attempts of the jobs when it fails
   * @params job object
  */
  incrementAttempts (job) {

    job.attempts++;

    return job;

  }

  /**
   * Add the id to the job object
   * @params job object,
   * @params id string
  */
  retrieveJob (job,id) {

    job = JSON.parse(job);
    job.id = id;

    return job;
  }

}

module.exports = Queue;
