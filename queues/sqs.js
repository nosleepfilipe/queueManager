'use strict';

const Queue = require('./queue.js');

class QueueSqs extends Queue {

  constructor (queue,connection) {

    super();
    this.queue = queue;
    this.connection = connection;
    this.queueURL =  `https://sqs.${this.queue.region}.amazonaws.com/${this.queue.account}/${this.queue.queueName}`

  }

  /**
   * Standardize the job and sends to SQS.
   * @param name string
   * @param job object
  */
  push (name,job) {

    return this.pushRaw(this.standardizeJob(name,job));
  }

  /**
   * push a job to queue
   * @param job object
  */
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

  /**
   * Get a job from queue
  */
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

      if(result.Messages){
        return this.retrieveJob(result.Messages[0].Body, result.Messages[0].ReceiptHandle);
      } else {
        return undefined;
      }
    }).catch(err => {

      return err;
    });

  }

  /**
   * Add more one attempt to the job
   * Deletes the job from the queue
   * Adds the job again in the queue
   * @param job object
  */
  releaseFailedJob (job) {

    job = this.incrementAttempts(job);
    return this.deleteJob(job).then( result => {

      return this.pushRaw(job);
    }).catch(err => {

      return err;
    });
  }


  /**
   * Delete a job from the queue
   * @param job object
  */
  deleteJob (job) {

    let data = {
      QueueUrl : this.queueURL,
      ReceiptHandle : job.id
    };
    return this.connection.deleteMessage(data).promise().then(result => {

      return result;
    }).catch(err =>{

      return err;
    });

  }



}

module.exports = QueueSqs;
