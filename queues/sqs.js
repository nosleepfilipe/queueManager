'use strict';

const Queue = require('./queue.js');

class QueueSqs extends Queue {

  constructor (queue,connection) {

    super();
    this.queue = queue;
    this.connection = connection;
    this.data = {
      MessageBody : null,
      QueueUrl : `https://sqs.${this.queue.region}.amazonaws.com/${this.queue.account}/${this.queue.queueName}`
    };

  }


  push (jobName,job) {

    this.data.MessageBody = this.standardizeJob(jobName,job);
    return this.connection.sendMessage(this.data).promise().then(result =>{
      return result.MessageId;
    }).catch(err =>{
      return err;
    }) ;

  }

}

module.exports = QueueSqs;
