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

}

module.exports = Queue;
