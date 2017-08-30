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


  push (jobName,job) {

    let jobStringify = JSON.stringify(job);
    this.data.MessageBody = jobStringify;
    return this.connection.sendMessage(this.data).promise().then(result =>{
      return result.MessageId;
    }).catch(err =>{
      return err;
    }) ;

  }

}

module.exports = QueueSqs;
