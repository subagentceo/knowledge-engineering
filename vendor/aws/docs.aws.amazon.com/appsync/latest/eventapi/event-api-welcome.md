

# What is AWS AppSync Events?
<a name="event-api-welcome"></a>

AWS AppSync Events lets you create secure and performant serverless WebSocket APIs that can broadcast real-time event data to millions of subscribers, without you having to manage connections or resource scaling. With AWS AppSync Events, there is no API code required to get started, so you can create production-ready real-time web and mobile experiences in minutes.

AWS AppSync Events further simplifies the management and scaling of real-time applications by shifting tasks like message transformation and broadcast, publish and subscribe authentication, and the creation of logs and metrics to AWS, while delivering reduced time to market, low latency, enhanced security, and lower total costs.

With Event APIs, you can enable the following network communication types.
+ Unicast
+ Multicast
+ Broadcast
+ Batch publishing and messaging

This allows you to build the following types of interactive and collaborative experiences.
+ Live chat and messaging
+ Sports and score updates
+ Real-time in-app alerts and notifications
+ Live commenting and activity feeds

AWS AppSync Events simplifies real-time application development by providing the following features.
+ Automatic management of WebSocket connections and scaling
+ Built-in support for broadcasting events to large numbers of subscribers 
+ Flexible event filtering and transformation capabilities
+ Fine-grained authentication and authorization
+ Seamless integration with other AWS services, data sources, and external systems for event-driven architectures

Whether you're building a small prototype or a large-scale production application, AWS AppSync Events enables you to incorporate real-time experiences using a fully managed and scalable platform, so you can focus on your application logic instead of the undifferentiated heavy lifting of managing infrastructure. 

## AWS AppSync Events features
<a name="appsync-events-features"></a>

**WebSocket and HTTP Support**  
Clients can publish events over HTTP or WebSocket, and can subscribe to channels using WebSockets.  
Event APIs provide WebSocket endpoints that enable real-time and pub/sub capabilities.

**Channel namespaces and channels**  
Events are published to channels, that are grouped under namespaces.  
Namespaces allow you to define authentication and authorization rules and serverless functions that apply to all channels within that namespace. 

**Namespace handlers**  
You can use the following two types of handlers to configure functions that run in response to publish and subscribe actions.  
+ OnPublish - Runs when an event is published to a channel, allowing you to transform, filter, and reject events.
+ OnSubscribe - Runs when a client subscribes to a channel, allowing you to customize the behavior or reject the subscription request.

**Flexible authentication and authorization**  
Event APIs supports various authentication mechanisms (API key, IAM, Amazon Cognito, OIDC, and Lambda authorizers) that can be configured at the API level and customized at the channel namespace level.

**Channel subscriptions**  
Clients receive events for channels they are subscribed to.

**Wildcard Channel Subscriptions**  
Clients can subscribe to a group of related channels using a wildcard syntax (e.g., "namespace/channel/\*"), allowing them to receive events from multiple channels without explicitly subscribing to each one.

**Scalable Event Broadcasting**  
The Event API automatically scales to handle large numbers of concurrent connections and can efficiently broadcast events to all subscribed clients. 

**Integration with the AWS Ecosystem**  
AWS AppSync Events integrates with other AWS services like Amazon CloudWatch Logs, CloudWatch metrics, and AWS WAF. You can easily implement event-driven architectures by publishing directly from services like Amazon EventBridge, and AWS Lambda. Amazon Cognito is directly supported as an authorization type. AWS AppSync Event APIs can be configured to interact with multiple AWS data sources, enabling you to process and route events efficiently.

## Pricing for AWS AppSync Events
<a name="event-api-pricing"></a>

When you use AWS AppSync Events, you pay only for what you use with no minimum fees or mandatory service usage. For more information, see [AWS AppSync pricing](https://aws.amazon.com/appsync/pricing/).