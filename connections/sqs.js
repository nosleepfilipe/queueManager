'use strict';


const AWS = require('aws-sdk');

class ConnectionSqs {

  constructor (config) {
    this.config = config;
    this.sqs = new AWS.SQS({
      region: this.config.region,
    });

    return this.sqs;
  }

}

module.exports = ConnectionSqs;
