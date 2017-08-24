'use strict';

const ConnectionSqs = require('../connections/sqs.js');

class QueueSqs {

  constructor (queue,connection) {
    this.queue = queue;
    this.connection = connection;
    this.data = {
      MessageBody : null,
      QueueUrl : `https://sqs.${this.queue.region}.amazonaws.com/${this.queue.account}/${this.queue.queueName}`
    };
  }


  push (job) {
    this.data.MessageBody = job;
    return this.connection.sendMessage(this.data).promise();

  }

}

module.exports = QueueSqs;
