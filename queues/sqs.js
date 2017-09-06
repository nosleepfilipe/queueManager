'use strict';

const Queue = require('./queue.js');

class QueueSqs extends Queue {

  constructor (queue,connection) {

    super();
    this.queue = queue;
    this.connection = connection;
    this.queueURL =  `https://sqs.${this.queue.region}.amazonaws.com/${this.queue.account}/${this.queue.queueName}`


  }


  push (name,job) {

    return this.pushRaw(this.standardizeJob(name,job));
  }

  pushRaw (job) {

    let data = {
      MessageBody : JSON.stringify(job),
      QueueUrl : this.queueURL,
    };
    return this.connection.sendMessage(data).promise().then(result => {
      return result;
    }).catch(err => {

      return err;
    });
  }

  getJob () {

    let data = {
       AttributeNames: [
          "SentTimestamp"
      ],
      MaxNumberOfMessages: 1,
      MessageAttributeNames: [
          "All"
      ],
      QueueUrl: this.queueURL,
      VisibilityTimeout: 0, // timeout in seconds need to com from a config var
      WaitTimeSeconds: 0
    };

    return this.connection.receiveMessage(data).promise().then(result => {

      return this.retrieveJob(result.Messages[0].Body, result.Messages[0].ReceiptHandle);
    }).catch(err => {

      return err;
    });

  }

  releaseFailedJob (job) {

    job = this.incrementAttempts(job);
    return this.deleteJob(job).then( result => {

      return this.pushRaw(job);
    }).catch(err => {

      return err;
    });
  }

  deleteJob (job) {

    let data = {
      QueueUrl : this.queueURL,
      ReceiptHandle : job.id
    };
    return this.connection.deleteMessage(data).promise().then(result => {
      console.log('result of deleting a job from the queue -> ',result);

      return result;
    }).catch(err =>{

      console.log('erro trying to delete a job from the queue -> ', err)
      return err;
    });

  }



}

module.exports = QueueSqs;
