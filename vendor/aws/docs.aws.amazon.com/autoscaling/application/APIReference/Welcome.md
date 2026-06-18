

# Welcome
<a name="Welcome"></a>

This is the *Application Auto Scaling API Reference*. With Application Auto Scaling, you can configure automatic scaling for the following resources:
+ Amazon AppStream 2.0 fleets
+ Amazon Aurora Replicas
+ Amazon Comprehend document classification and entity recognizer endpoints
+ Amazon DynamoDB tables and global secondary indexes throughput capacity
+ Amazon ECS services
+ Amazon ElastiCache replication groups (Redis OSS and Valkey) and Memcached clusters
+ Amazon EMR clusters
+ Amazon Keyspaces (for Apache Cassandra) tables
+  AWS Lambda function provisioned concurrency
+ Amazon Managed Streaming for Apache Kafka broker storage
+ Amazon Neptune clusters
+ Amazon SageMaker endpoint variants
+ Amazon SageMaker inference components
+ Amazon SageMaker serverless endpoint provisioned concurrency
+ Spot Fleets (Amazon EC2)
+ Pool of WorkSpaces
+ Custom resources provided by your own applications or services

To learn more about Application Auto Scaling, see the [Application Auto Scaling User Guide](https://docs.aws.amazon.com/autoscaling/application/userguide/what-is-application-auto-scaling.html).

 **API Summary** 

The Application Auto Scaling service API includes three key sets of actions: 
+ Register and manage scalable targets - Register AWS or custom resources as scalable targets (a resource that Application Auto Scaling can scale), set minimum and maximum capacity limits, and retrieve information on existing scalable targets.
+ Configure and manage automatic scaling - Define scaling policies to dynamically scale your resources in response to CloudWatch alarms, schedule one-time or recurring scaling actions, and retrieve your recent scaling activity history.
+ Suspend and resume scaling - Temporarily suspend and later resume automatic scaling by calling the [RegisterScalableTarget](https://docs.aws.amazon.com/autoscaling/application/APIReference/API_RegisterScalableTarget.html) API action for any Application Auto Scaling scalable target. You can suspend and resume (individually or in combination) scale-out activities that are triggered by a scaling policy, scale-in activities that are triggered by a scaling policy, and scheduled scaling.

The documentation for each action shows the request syntax, the request parameters, and the response elements and provides links to language-specific SDK reference topics. For more information, see [AWS SDKs](http://aws.amazon.com/tools/#SDKs). 

 **API request rate** 

Application Auto Scaling uses the token bucket algorithm to implement API throttling. With this algorithm, your account has a bucket that holds a specific number of tokens. The number of tokens in the bucket represents your throttling limit at any given second. Application Auto Scaling throttles API requests based on a shared API bucket. For example, calls to the [DescribeScalableTargets](API_DescribeScalableTargets.md) and [DescribeScheduledActions](API_DescribeScheduledActions.md) API operations use tokens from the same bucket. Throttling means that Application Auto Scaling rejects a request because the request exceeds the service's limit for the number of requests per second. When a request is throttled, Application Auto Scaling returns a `RateExceeded` error. For more information, see [My Auto Scaling API calls are getting throttled. What can I do to avoid this?](http://aws.amazon.com/premiumsupport/knowledge-center/autoscaling-api-calls-throttled) in the AWS Knowledge Center.

This document was last published on June 17, 2026. 