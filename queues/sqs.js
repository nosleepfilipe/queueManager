'use strict';

const Queue = require('./queue.js');

class QueueSqs extends Queue {

  constructor (queue,connection) {

    super();
    this.queue = queue;
    this.connection = connection;
    this.queueURL =  `https://sqs.${this.queue.region}.amazonaws.com/${this.queue.account}/${this.queue.queueName}`
    this.pushData = {
      MessageBody : null,
      QueueUrl : this.queueURL,
    };
    this.getData = {
      AttributeNames: [
          "SentTimestamp"
      ],
      MaxNumberOfMessages: 1,
      MessageAttributeNames: [
          "All"
      ],
      QueueUrl: this.queueURL,
      VisibilityTimeout: 0,
      WaitTimeSeconds: 0
      };


  }


  push (jobName,job) {

    this.pushData.MessageBody = this.standardizeJob(jobName,job);
    return this.connection.sendMessage(this.pushData).promise().then(result =>{

      return result.MessageId;
    }).catch(err =>{
      return err;
    });

  }

  getJob () {

    return this.connection.receiveMessage(this.getData).promise().then(result => {

      return this.retrieveJob(result.Messages[0].Body,result.Messages[0].MessageId);

    }).catch(err => {

      return err;

    });

  }

}

module.exports = QueueSqs;
