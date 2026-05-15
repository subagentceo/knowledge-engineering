

# What is Amazon Simple Queue Service?
<a name="welcome"></a>

Amazon Simple Queue Service (Amazon SQS) offers a secure, durable, and available hosted queue that lets you integrate and decouple distributed software systems and components. Amazon SQS offers common constructs such as [dead-letter queues](sqs-dead-letter-queues.md) and [cost allocation tags](sqs-queue-tags.md). It provides a generic web services API that you can access using any programming language that the AWS SDK supports.

## Benefits of using Amazon SQS
<a name="sqs-benefits"></a>
+ **Security** – [You control](security-iam.md) who can send messages to and receive messages from an Amazon SQS queue. You can choose to transmit sensitive data by protecting the contents of messages in queues by using default Amazon SQS managed server-side encryption (SSE), or by using custom [SSE](sqs-server-side-encryption.md) keys managed in AWS Key Management Service (AWS KMS).
+ **Durability** – For the safety of your messages, Amazon SQS stores them on multiple servers. Standard queues support [at-least-once message delivery](standard-queues-at-least-once-delivery.md), and FIFO queues support [exactly-once message processing](FIFO-queues-exactly-once-processing.md) and [high-throughput](high-throughput-fifo.md) mode.
+ **Availability** – Amazon SQS uses [redundant infrastructure](#sqs-basic-architecture) to provide highly-concurrent access to messages and high availability for producing and consuming messages. 
+ **Scalability** – Amazon SQS can process each [buffered request](sqs-client-side-buffering-request-batching.md) independently, scaling transparently to handle any load increases or spikes without any provisioning instructions.
+ **Reliability** – Amazon SQS locks your messages during processing, so that multiple producers can send and multiple consumers can receive messages at the same time. 
+ **Customization** – Your queues don't have to be exactly alike—for example, you can [set a default delay on a queue](sqs-delay-queues.md). You can store the contents of messages larger than 1 MiB [using Amazon Simple Storage Service (Amazon S3)](sqs-s3-messages.md) or Amazon DynamoDB, with Amazon SQS holding a pointer to the Amazon S3 object, or you can split a large message into smaller messages.

## Basic Amazon SQS architecture
<a name="sqs-basic-architecture"></a>

   Learn about the parts of a distributed messaging system and the lifecycle of an Amazon SQS message, from creation to deletion.   

This section describes the components of a distributed messaging system and explains the lifecycle of an Amazon SQS message.

### Distributed queues
<a name="sqs-distributed-queue"></a>

There are three main parts in a distributed messaging system: the **components of your distributed system**, your **queue** (distributed on Amazon SQS servers), and the **messages in the queue**.

In the following scenario, your system has several *producers* (components that send messages to the queue) and *consumers* (components that receive messages from the queue). The queue (which holds messages A through E) redundantly stores the messages across multiple Amazon SQS servers.

![Three main parts in a distributed messaging system: the components of your distributed system, your queue (distributed on Amazon SQS servers), and the messages in the queue.](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/images/ArchOverview.png)


### Message lifecycle
<a name="sqs-message-lifecycle"></a>

The following scenario describes the lifecycle of an Amazon SQS message in a queue, from creation to deletion.

![The lifecycle of an Amazon SQS message in a queue, from creation to deletion.](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/images/sqs-message-lifecycle-diagram.png)


![Section one description for the previous lifecycle diagram.](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/images/number-1-red.png) A producer (Component 1) sends message A to a queue, and the message is distributed across the Amazon SQS servers redundantly.

![Section two description for the previous lifecycle diagram.](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/images/number-2-red.png) When a consumer (Component 2) is ready to process messages, it consumes messages from the queue, and message A is returned. While message A is being processed, it remains in the queue and isn't returned to subsequent receive requests for the duration of the [visibility timeout](sqs-visibility-timeout.md).

![Section three description for the previous lifecycle diagram.](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/images/number-3-red.png) The consumer (Component 2) deletes message A from the queue to prevent the message from being received and processed again when the visibility timeout expires.

**Note**  
Amazon SQS automatically deletes messages that have been in a queue for more than the maximum message retention period. The default message retention period is 4 days. However, you can set the message retention period to a value from 60 seconds to 1,209,600 seconds (14 days) using the `[SetQueueAttributes](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/API_SetQueueAttributes.html)` action.

## Differences between Amazon SQS, Amazon MQ, and Amazon SNS
<a name="sqs-difference-from-amazon-mq-sns"></a>

 Amazon SQS, [Amazon SNS](https://aws.amazon.com/sns/), and [Amazon MQ](https://aws.amazon.com/amazon-mq/) offer highly scalable and easy-to-use managed messaging services, each designed for specific roles within distributed systems. Here's an enhanced overview of the differences between these services:

 **Amazon SQS** decouples and scales distributed software systems and components as a queue service. It processes messages through a single subscriber typically, ideal for workflows where order and loss prevention are critical. For wider distribution, integrating Amazon SQS with Amazon SNS enables a [fanout messaging pattern](https://aws.amazon.com/getting-started/hands-on/send-fanout-event-notifications/), effectively pushing messages to multiple subscribers at once.

 **Amazon SNS** allows publishers to send messages to multiple subscribers through topics, which serve as communication channels. Subscribers receive published messages using a supported endpoint type, such as [Amazon Data Firehose](https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html), [Amazon SQS](#welcome), [Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html), HTTP, email, mobile push notifications, and mobile text messages (SMS). This service is ideal for scenarios requiring immediate notifications, such as real-time user engagement or alarm systems. To prevent message loss when subscribers are offline, integrating Amazon SNS with Amazon SQS queue messages ensures consistent delivery.

 **Amazon MQ** fits best with enterprises looking to migrate from traditional message brokers, supporting standard messaging protocols like AMQP and MQTT, along with [Apache ActiveMQ](http://activemq.apache.org/) and [RabbitMQ](https://www.rabbitmq.com/). It offers compatibility with legacy systems needing stable, reliable messaging without significant reconfiguration.

 The following chart provides an overview of each services' resource type: 


| Resource type | Amazon SNS | Amazon SQS | Amazon MQ | 
| --- | --- | --- | --- | 
| Synchronous | No | No | Yes | 
| Asynchronous | Yes | Yes | Yes | 
| Queues | No | Yes | Yes | 
| Publisher-subscriber messaging | Yes | No | Yes | 
| Message brokers | No | No | Yes | 

Both Amazon SQS and Amazon SNS are recommended for new applications that can benefit from nearly unlimited scalability and simple APIs. They generally offer more cost-effective solutions for high-volume applications with their pay-as-you-go pricing. We recommend Amazon MQ for migrating applications from existing message brokers that rely on compatibility with APIs such as JMS or protocols such as Advanced Message Queuing Protocol (AMQP), MQTT, OpenWire, and Simple Text Oriented Message Protocol (STOMP).