

# What is Amazon MQ?
<a name="welcome"></a>

 Amazon MQ is a managed message broker service for [Apache ActiveMQ](http://activemq.apache.org/) Classic and [RabbitMQ](https://www.rabbitmq.com/) that manages the setup, operation, and maintenance of message brokers. You can create a new Amazon MQ broker using industry standard messaging protocols, or migrate existing message brokers to Amazon MQ without rewriting messaging code. 

 A *broker* is a message broker environment running on Amazon MQ. It is the basic building block of Amazon MQ. A *message* broker allows software applications and components to communicate using various programming languages, operating systems, and formal messaging protocols. You can use Amazon MQ brokers for communication between large scale, cloud native applications and components. 

**Topics**
+ [Amazon MQ features](#amazonmq-features)
+ [How can I get started with Amazon MQ?](#get-started)
+ [How can I provide feedback to Amazon MQ?](#amazon-mq-we-want-to-hear-from-you)

## Amazon MQ features
<a name="amazonmq-features"></a>

**Managed maintenance and version upgrades**

 Amazon MQ performs [maintenance](maintaining-brokers.md) and [version upgrades](upgrading-brokers.md) for a message broker during your scheduled [maintenance window](maintaining-brokers.md). 

**Monitor brokers with CloudWatch**

 Amazon MQ is integrated with [Amazon CloudWatch](security-logging-monitoring.md) so you can view and analyze metrics for your brokers and queues. You can view and analyze metrics from the Amazon MQ console, the CloudWatch console, command line, and API. Metrics are automatically collected and pushed to CloudWatch every minute. 

**Security**

 Amazon MQ provides [encryption](data-protection.md) of your messages at rest and in transit. Connections to the broker use SSL, and access can be restricted to a private endpoint within your Amazon VPC. Additonality, you can use [AWS Identity and Access Management](security-iam.md) (IAM) to control the actions your IAM users and groups can take on specific Amazon MQ brokers. 

**Quorum queues for RabbitMQ on Amazon MQ**

 [Quorum queues](quorum-queues.md) are a replicated queue type made up of a leader node (primary replica) and follower nodes (other replicas). Each node is in a different availability zone, so if one node is temporarily unavailable, message delivery continues with a newly elected leader replica in another availability zone. Quorum queues are useful for handling poison messages, which occur when a message fails and is requeued multiple times. 

**Cross-Region data replication for ActiveMQ on Amazon MQ **

 [Cross-Region data replication](crdr-for-active-mq.md) (CRDR) allows for asynchronous message replication from the primary broker in a primary AWS Region to the replica broker in a replica Region. By issuing a failover request to the Amazon MQ API, the current replica broker is promoted to the primary broker role, and the current primary broker is demoted to the replica role. 

## How can I get started with Amazon MQ?
<a name="get-started"></a>

 To get started with *ActiveMQ on Amazon MQ*, review the following documentation: 
+ [Getting started: Creating and connecting to an ActiveMQ broker](getting-started-activemq.md)
+ [Deployment options for Amazon MQ for ActiveMQ brokers](amazon-mq-broker-architecture.md)
+ [ActiveMQ tutorials](activemq-on-amazon-mq.md)
+ [Amazon MQ for ActiveMQ best practices](best-practices-activemq.md)

 To get started with *RabbitMQ on Amazon MQ*, review the following documentation: 
+ [Getting started: Creating and connecting to a RabbitMQ broker](getting-started-rabbitmq.md)
+ [Deployment options for Amazon MQ for RabbitMQ brokers](rabbitmq-broker-architecture.md)
+ [RabbitMQ tutorials](rabbitmq-on-amazon-mq.md)
+ [Amazon MQ for RabbitMQ best practices](best-practices-rabbitmq.md)

To learn about Amazon MQ REST APIs, see the *[Amazon MQ REST API Reference](https://docs.aws.amazon.com/amazon-mq/latest/api-reference/)*.

To learn about Amazon MQ AWS CLI commands, see [Amazon MQ in the *AWS CLI Command Reference*](https://docs.aws.amazon.com/cli/latest/reference/mq/index.html). 

## How can I provide feedback to Amazon MQ?
<a name="amazon-mq-we-want-to-hear-from-you"></a>

We welcome and encourgae your feedback on the documentation. You can use the thumbs up and thumbs down icons on the right hand side to submit feedback, or you can use the "Provide feedback" form linked below. 

To contact the Amazon MQ team, use the [Amazon MQ Discussion Forum](https://forums.aws.amazon.com/forum.jspa?forumID=279).