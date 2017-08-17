'use strict';

class QueueSqs {

  constructor (options) {
    this.options = options;
  }
  pushJob (job, connection){
    console.log('queue SQS ', job);
  }
}

module.exports = QueueSqs;
