

# What is Amazon SNS?
<a name="welcome"></a>

Amazon Simple Notification Service (Amazon SNS) is a fully managed service that provides message delivery from publishers (producers) to subscribers (consumers). Publishers communicate asynchronously with subscribers by sending messages to a *topic*, which is a logical access point and communication channel.

## How it works
<a name="how-it-works"></a>

In SNS, publishers send messages to a topic, which acts as a communication channel. The topic acts as a logical access point, ensuring messages are delivered to multiple subscribers across different platforms.

Subscribers to an SNS topic can receive messages through different endpoints, depending on their use case, such as:
+ Amazon SQS
+ Lambda
+ HTTP(S) endpoints
+ Email
+ Mobile push notifications
+ Mobile text messages (SMS)
+ Amazon Data Firehose
+ Service providers (For example, Datadog, MongoDB, Splunk)

SNS supports both Application-to-Application (A2A) and Application-to-Person (A2P) messaging, giving flexibility to send messages between different applications or directly to mobile phones, email addresses, and more.

![Amazon SNS delivers messages from publishers to subscribers across both application-to-application (A2A) and application-to-person (A2P) endpoints. It shows A2A endpoints like Lambda functions, Amazon SQS queues, HTTP/S endpoints, and Data Firehose, along with A2P endpoints including SMS, mobile push notifications, and email, highlighting the flexibility of Amazon SNS for asynchronous, event-driven communication.](http://docs.aws.amazon.com/sns/latest/dg/images/sns-delivery-protocols.png)


## Accessing Amazon SNS
<a name="welcome-accessing"></a>

You can access and manage Amazon SNS through the console, AWS CLI, or AWS SDKs, depending on your preferred method of interaction. The console offers a graphical interface for basic tasks, while the AWS CLI and SDKs provide advanced configuration and automation capabilities for more complex use cases.
+ The [Amazon SNS console](https://console.aws.amazon.com/sns/v3/home) provides a convenient user interface for creating topics and subscriptions, sending and receiving messages, and monitoring events and logs.
+ The AWS Command Line Interface (AWS CLI) gives you direct access to the Amazon SNS API for advanced configuration and automation use cases. For more information, see [Using Amazon SNS with the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-services-sns.html).
+ AWS provides SDKs in various languages. For more information, see [SDKs and Toolkits](https://aws.amazon.com/getting-started/tools-sdks/).

## Common Amazon SNS scenarios
<a name="sns-common-scenarios"></a>

Use these common Amazon SNS scenarios to implement scalable, event-driven architectures and ensure reliable, real-time communication between applications and users.

### Application integration
<a name="SNSFanoutScenario"></a>

The *Fanout* scenario is when a message published to an SNS topic is replicated and pushed to multiple endpoints, such as Firehose delivery streams, Amazon SQS queues, HTTP(S) endpoints, and Lambda functions. This allows for parallel asynchronous processing.

For example, you can develop an application that publishes a message to an SNS topic whenever an order is placed for a product. Then, SQS queues that are subscribed to the SNS topic receive identical notifications for the new order. An Amazon Elastic Compute Cloud (Amazon EC2) server instance attached to one of the SQS queues can handle the processing or fulfillment of the order. And you can attach another Amazon EC2 server instance to a data warehouse for analysis of all orders received.

![A fanout scenario in Amazon SNS, where a single message from a publisher is sent to an Amazon SNS topic and then replicated to multiple endpoints, such as Amazon SQS queues. Each Amazon SQS queue forwards the message to an Amazon EC2 instance—one handling order processing and another performing data analysis, demonstrating parallel, asynchronous message delivery for event-driven applications.](http://docs.aws.amazon.com/sns/latest/dg/images/sns-fanout.png)


You can also use fanout to replicate data sent to your production environment with your test environment. Expanding upon the previous example, you can subscribe another SQS queue to the same SNS topic for new incoming orders. Then, by attaching this new SQS queue to your test environment, you can continue to improve and test your application using data received from your production environment.

**Important**  
Make sure that you consider data privacy and security before you send any production data to your test environment.

For more information, see the following resources:
+ [Fanout to Firehose delivery streams](sns-firehose-as-subscriber.md)
+ [Fanout Amazon SNS notifications to Lambda functions for automated processing](sns-lambda-as-subscriber.md)
+ [Fanout Amazon SNS notifications to Amazon SQS queues for asynchronous processing](sns-sqs-as-subscriber.md)
+ [Fanout Amazon SNS notifications to HTTPS endpoints](sns-http-https-endpoint-as-subscriber.md)
+ [ Event-Driven Computing with Amazon SNS and AWS Compute, Storage, Database, and Networking Services](https://aws.amazon.com/blogs/compute/event-driven-computing-with-amazon-sns-compute-storage-database-and-networking-services/) 

### Application alerts
<a name="SNSAlertsScenario"></a>

Application and system alerts are notifications that are triggered by predefined thresholds. Amazon SNS can send these notifications to specified users via SMS and email. For example, you can receive immediate notification when an event occurs, such as a specific change to your Amazon EC2 Auto Scaling group, a new file uploaded to an Amazon S3 bucket, or a metric threshold breached in Amazon CloudWatch. For more information, see [Setting up Amazon SNS notifications](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/US_SetupSNS.html) in the *Amazon CloudWatch User Guide*.

### User notifications
<a name="SNSPushMessaging"></a>

Amazon SNS can send push email messages and text messages (SMS messages) to individuals or groups. For example, you could send e-commerce order confirmations as user notifications. For more information about using Amazon SNS to send SMS messages, see [Mobile text messaging with Amazon SNS](sns-mobile-phone-number-as-subscriber.md).

### Mobile push notifications
<a name="SNSMobilePushScenario"></a>

Mobile push notifications enable you to send messages directly to mobile apps. For example, you can use Amazon SNS to send update notifications to an app. The notification message can include a link to download and install the update. For more information about using Amazon SNS to send push notification messages, see [Sending mobile push notifications with Amazon SNS](sns-mobile-application-as-subscriber.md).

## Pricing for Amazon SNS
<a name="welcome-pricing"></a>

Amazon SNS has no upfront costs. You pay based on the number of messages that you publish, the number of notifications that you deliver, and any additional API calls for managing topics and subscriptions. Delivery pricing varies by endpoint type. You can get started for free with the Amazon SNS free tier. For information, see [Worldwide SMS Pricing](https://aws.amazon.com/sns/sms-pricing/).