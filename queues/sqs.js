'use strict';

class QueueSqs {

  constructor (options,defaultQueueName) {
    this.options = options;
    this.options.defaultQueueName = defaultQueueName;
  }

  push (job, connection, queueName){
    if(!queueName) {
      queueName = this.queueName;
    }
    let data = {
      MessageBody : job,
      QueueUrl : `${this.options.queueUrl}${this.options.queueAccount}/${queueName}`
    }
    return connection.sendMessage(data).promise();

  }

}

module.exports = QueueSqs;
