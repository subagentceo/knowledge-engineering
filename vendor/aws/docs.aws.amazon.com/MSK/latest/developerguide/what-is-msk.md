

# Welcome to the Amazon MSK Developer Guide
<a name="what-is-msk"></a>

Welcome to the *Amazon Managed Streaming for Apache Kafka Developer Guide*. The following topics can help you get started using this guide, based on what you're trying to do.
+ Create an MSK Provisioned cluster by following the [Get started using Amazon MSK](getting-started.md) tutorial.
+ Dive deeper into the functionality of MSK Provisioned in [What is MSK Provisioned?](msk-provisioned.md).
+ Run Apache Kafka without having to manage and scale cluster capacity with [MSK Serverless](serverless.md).
+ Use [MSK Connect](msk-connect.md) to stream data to and from your Apache Kafka cluster.
+ Use [MSK Replicator](msk-replicator.md) to reliably replicate data across MSK Provisioned clusters in different or the same AWS Regions.

For highlights, product details, and pricing, see the service page for [Amazon MSK](https://aws.amazon.com/msk).

## What is Amazon MSK?
<a name="what-is-msk-intro"></a>

Amazon Managed Streaming for Apache Kafka (Amazon MSK) is a fully managed service that enables you to build and run applications that use Apache Kafka to process streaming data. Amazon MSK provides the control-plane operations, such as those for creating, updating, and deleting clusters. It lets you use Apache Kafka data-plane operations, such as those for producing and consuming data. It runs open-source versions of Apache Kafka. This means existing applications, tooling, and plugins from partners and the Apache Kafka community are supported without requiring changes to application code. You can use Amazon MSK to create clusters that use any of the Apache Kafka versions listed under [Supported Apache Kafka versions](supported-kafka-versions.md).

These components describe the architecture of Amazon MSK:
+ **Broker nodes** — When creating an Amazon MSK cluster, you specify how many broker nodes you want Amazon MSK to create in each [Availability Zone](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-availability-zones.html). The minimum is one broker per Availability Zone. Each Availability Zone has its own virtual private cloud (VPC) subnet.

  Amazon MSK Provisioned offers two broker types: [Amazon MSK Standard brokers](msk-broker-types-standard.md) and [Amazon MSK Express brokers](msk-broker-types-express.md). In [MSK Serverless](serverless.md), MSK manages the broker nodes used to handle your traffic and you only provision your Kafka server resources at a cluster level.
+ **ZooKeeper nodes** — Amazon MSK also creates the Apache ZooKeeper nodes for you. Apache ZooKeeper is an open-source server that enables highly reliable distributed coordination.
+ **KRaft controllers** —The Apache Kafka community developed KRaft to replace Apache ZooKeeper for metadata management in Apache Kafka clusters. In KRaft mode, cluster metadata is propagated within a group of Kafka controllers, which are part of the Kafka cluster, instead of across ZooKeeper nodes. KRaft controllers are included at no additional cost to you, and require no additional setup or management from you.
+ **Producers, consumers, and topic creators** — Amazon MSK lets you use Apache Kafka data-plane operations to create topics and to produce and consume data.
+ **Cluster Operations** You can use the AWS Management Console, the AWS Command Line Interface (AWS CLI), or the APIs in the SDK to perform control-plane operations. For example, you can create or delete an Amazon MSK cluster, list all the clusters in an account, view the properties of a cluster, and update the number and type of brokers in a cluster.

Amazon MSK detects and automatically recovers from the most common failure scenarios for clusters so that your producer and consumer applications can continue their write and read operations with minimal impact. When Amazon MSK detects a broker failure, it mitigates the failure or replaces the unhealthy or unreachable broker with a new one. In addition, where possible, it reuses the storage from the older broker to reduce the data that Apache Kafka needs to replicate. Your availability impact is limited to the time required for Amazon MSK to complete the detection and recovery. After a recovery, your producer and consumer apps can continue to communicate with the same broker IP addresses that they used before the failure.