'use strict';

const QueueFactory =  require('../queuefactory/factory.js');

class QueueManager {

  constructor (config) {

    this.config = config;
    this.defaultConnection = this.config['default-connection'];
    this.defaultQueueName = this.config['default-queue-name'];
    this.queues = {};
    this.queueFactory =  new QueueFactory();
    this.queues[this.defaultConnection] = this.queueFactory.createQueue(this.config.connections[this.defaultConnection]);

  }

  /**
   * Standardize the job and sends to SQS.
   * @param name string
   * @param job object
  */
  push (jobName, job) {

    return this.queues[this.defaultConnection].push(jobName,job);
  }

  /**
   * Delete a job from the queue
   * @param job object
  */
  deleteJob (job) {

    return this.queues[this.defaultConnection].deleteJob(job);
  }

  /**
   * Add more one attempt to the job
   * Deletes the job from the queue
   * Adds the job again in the queue
   * @param job object
  */
  releaseFailedJob (job) {

    return this.queues[this.defaultConnection].releaseFailedJob(job);
  }

  /**
   * Get a job from queue
  */
  getJob () {

    return this.queues[this.defaultConnection].getJob();
  }

  /**
   * Creates a new Queue with the connection
   * if doesn't exist
   * if exist it returns the queue with the connection
   * @param connectionName string:w
  */
  onConnection (connectionName) {

    if(!this.queues[connectionName]) {
      this.queues[connectionName] = this.queueFactory.createQueue(this.config.connections[connectionName]);
    }

    return this.queues[connectionName] ;
  }
}

module.exports = QueueManager;

