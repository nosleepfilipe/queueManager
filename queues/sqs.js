'use strict';

class QueueSqs {

  constructor (options) {
    this.options = options;
  }

  push (job, connection){
    console.log('queue SQS ', job);
  }

  onQueue (queueName) {
    if(this.options.queueName !== queueName) {
      throw new Error("This queue doesn't exist in this connection");
    }
  }


}

module.exports = QueueSqs;
