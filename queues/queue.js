'use strict';

class Queue {


  standardizeJob (jobName,job) {

    let jobQueue = {
      jobInfo : {
        jobName : jobName,
        attempts : 0
      },
      payload : job
    };

    return JSON.stringify(jobQueue);

  }

  incrementAttemps (job) {

    job.jonInfo.attempts = job.jobInfo.attempts + 1;

    return job;

  }

  retrieveJob (job,jobId) {

    job = JSON.parse(job);
    job.jobInfo.id = jobId;
    job.jobInfo.connection = this.connection;

    return job;
  }

}

module.exports = Queue;
