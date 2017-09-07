'use strict';


const AWS = require('aws-sdk');

class ConnectionSqs {

  constructor (connection) {
    this.connection = connection;
    this.sqs = new AWS.SQS({
      region: this.connection.region,
    });

    return this.sqs;
  }

}

module.exports = ConnectionSqs;
