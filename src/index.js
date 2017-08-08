//type of queues

//SQS
function QueueSqs (options) {
  this.config = options;

}
//REDIS
function QueueRedis (options) {
  this.config = options;

}


//queueManager

function QueueManager () {}


QueueManager.prototype.queueClass = QueueSqs;


QueueManager.prototype.createQueue = function (options) {

  switch (options.queueType) {
    case 'sqs' :
      this.queueClass = QueueSqs;
      break;
    case 'redis' :
      this.queueClass = QueueRedis;
      break;
  }

  return new this.queueClass (options);

};


const queue = new QueueManager();
const sqs = queue.createQueue({
  queueType : 'sqs',
  config : {
    url : '',
    user : '',
    password : ''
  }
});

console.log(sqs instanceof QueueSqs);
console.log(sqs);




