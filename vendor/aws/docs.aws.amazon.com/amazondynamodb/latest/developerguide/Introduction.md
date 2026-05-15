

# What is Amazon DynamoDB?
<a name="Introduction"></a>

 Amazon DynamoDB is a serverless, fully managed, distributed NoSQL database with single-digit millisecond performance at any scale. 

 DynamoDB addresses your needs to overcome scaling and operational complexities of relational databases. DynamoDB is purpose-built and optimized for operational workloads that require consistent performance at any scale. For example, DynamoDB delivers consistent single-digit millisecond performance for a shopping cart use case, whether you have 10 or 100 million users. [Launched in 2012](https://press.aboutamazon.com/2012/1/amazon-web-services-launches-amazon-dynamodb-a-new-nosql-database-service-designed-for-the-scale-of-the-internet), DynamoDB continues to help you move away from relational databases while reducing cost and improving performance at scale. 

 Customers across all sizes, industries, and geographies use DynamoDB to build modern, serverless applications that can start small and scale globally. DynamoDB scales to support tables of virtually any size while providing consistent single-digit millisecond performance and high availability. 

 For events, such as [Amazon Prime Day](https://aws.amazon.com/blogs/aws/prime-day-2023-powered-by-aws-all-the-numbers/), DynamoDB powers multiple high-traffic Amazon properties and systems, including [Alexa](https://alexa.com/), [Amazon.com](https://www.amazon.com/) sites, and all [Amazon fulfillment centers](https://www.aboutamazon.com/workplace/facilities). For such events, DynamoDB APIs have handled trillions of calls from Amazon properties and systems. DynamoDB continuously serves hundreds of customers with tables that have peak traffic of over half a million requests per second. It also serves hundreds of customers whose table sizes exceed 200 TB, and processes over one billion requests per hour. 

**Topics**
+ [Characteristics of DynamoDB](#ddb-characteristics)
+ [DynamoDB use cases](#ddb-use-cases)
+ [Capabilities of DynamoDB](#ddb-capabilities)
+ [Service integrations](#ddb-service-integrations)
+ [Security](#ddb-intro-security)
+ [Resilience](#ddb-intro-resilience)
+ [Accessing DynamoDB](#ddb-access)
+ [DynamoDB pricing](#ddb-pricing)
+ [Getting started with DynamoDB](#ddb-intro-get-started)

## Characteristics of DynamoDB
<a name="ddb-characteristics"></a>

### Serverless
<a name="ddb-characteristics-serverless"></a>

With DynamoDB, you don't need to provision any servers, or patch, manage, install, maintain, or operate any software. DynamoDB provides zero downtime maintenance. It has no versions (major, minor, or patch), and there are no maintenance windows.

DynamoDB's [on-demand capacity mode](on-demand-capacity-mode.md) offers pay-as-you-go pricing for read and write requests so you only pay for what you use. With on-demand, DynamoDB instantly scales up or down your tables to adjust for capacity and maintains performance with zero administration. It also scales down to zero so you don't pay for throughput when your table doesn't have traffic and there are no cold starts.

### NoSQL
<a name="ddb-characteristics-nosql"></a>

As a NoSQL database, DynamoDB is purpose-built to deliver improved performance, scalability, manageability, and flexibility compared to traditional relational databases. To support a wide variety of use cases, DynamoDB supports both key-value and document data models.

Unlike relational databases, DynamoDB doesn't support a JOIN operator. We recommend that you denormalize your data model to reduce database round trips and processing power needed to answer queries. As a NoSQL database, DynamoDB provides strong [read consistency](HowItWorks.ReadConsistency.md) and [ACID transactions](https://aws.amazon.com/blogs/aws/new-amazon-dynamodb-transactions/) to build enterprise-grade applications.

### Fully managed
<a name="ddb-characteristics-fully-managed"></a>

As a fully managed database service, DynamoDB handles the undifferentiated heavy lifting of managing a database so that you can focus on building value for your customers. It handles setup, configurations, maintenance, high availability, hardware provisioning, security, backups, monitoring, and more. This ensures that when you create a DynamoDB table, it's instantly ready for production workloads. DynamoDB constantly improves its availability, reliability, performance, security, and functionality without requiring upgrades or downtime.

### Single-digit millisecond performance at any scale
<a name="ddb-characteristics-performance-at-scale"></a>

DynamoDB was purpose-built to improve upon the performance and scalability of relational databases to deliver single-digit millisecond performance at any scale. To achieve this scale and performance, DynamoDB is optimized for high-performance workloads and provides APIs that encourage efficient database usage. It omits features that are inefficient and non-performing at scale, for example, JOIN operations. DynamoDB delivers consistent single-digit millisecond performance for your application, whether you have 100 or 100 million users.

## DynamoDB use cases
<a name="ddb-use-cases"></a>

Customers across all sizes, industries, and geographies use DynamoDB to build modern, serverless applications that can start small and scale globally. DynamoDB is ideal for use cases that require consistent performance at any scale with little to zero operational overhead. The following list presents some use cases where you can use DynamoDB:
+ **Financial service applications** – Suppose you're a financial services company building applications, such as live trading and routing, loan management, token generation, and transaction ledgers. With DynamoDB [global tables](GlobalTables.md), your applications can respond to events and serve traffic from your chosen AWS Regions with fast, local read and write performance. 

  DynamoDB is suitable for applications with the most stringent availability requirements. It removes the operational burden of manually scaling instances for increased storage or throughput, versioning, and licensing.

  You can use [DynamoDB transactions](transactions.md) to achieve atomicity, consistency, isolation, and durability (ACID) across one or more tables with a single request. [(ACID) transactions](transaction-apis.md) suit workloads that include processing financial transactions or fulfilling orders. DynamoDB instantly accommodates your workloads as they ramp up or down, enabling you to efficiently scale your database for market conditions, such as trading hours.
+ **Gaming applications** – As a gaming company, you can use DynamoDB for all parts of game platforms, for example, game state, player data, session history, and leaderboards. Choose DynamoDB for its scale, consistent performance, and the ease of operations provided by its serverless architecture. DynamoDB is well suited for scale-out architectures needed to support successful games. It quickly scales your game’s throughput both in and out (scale to zero with no cold start). This scalability optimizes your architecture's efficiency whether you’re scaling out for peak traffic or scaling back when gameplay usage is low.
+ **Streaming applications** – Media and entertainment companies use DynamoDB as a metadata index for content, content management service, or to serve near real-time sports statistics. They also use DynamoDB to run user watchlist and bookmarking services and process billions of daily customer events for generating recommendations. These customers benefit from DynamoDB's scalability, performance, and resiliency. DynamoDB scales to workload changes as they ramp up or down, enabling streaming media use cases that can support any levels of demand.

To learn more about how customers from different industries use DynamoDB, see [Amazon DynamoDB Customers](https://aws.amazon.com/dynamodb/customers/) and [This is My Architecture](https://aws.amazon.com/architecture/this-is-my-architecture/?tma.sort-by=item.additionalFields.airDate&tma.sort-order=desc&awsf.category=*all&awsf.industry=*all&awsf.language=*all&awsf.show=*all&awsf.product=*all&tma.q=DynamoDB&tma.q_operator=AND).

## Capabilities of DynamoDB
<a name="ddb-capabilities"></a>

### Multi-active replication with global tables
<a name="ddb-capabilities-gt"></a>

[Global tables](GlobalTables.md) provide multi-active replication of your data across your chosen AWS Regions with [99.999% availability](https://aws.amazon.com/dynamodb/sla/). Global tables deliver a fully managed solution for deploying a multi-Region, multi-active database, without building and maintaining your own replication solution. With global tables, you can specify the AWS Regions where you want the tables to be available. DynamoDB replicates ongoing data changes to all of these tables.

Your globally distributed applications can access data locally in your selected Regions to achieve single-digit millisecond read and write performance. Because global tables are multi-active, you don't need a primary table. This means there are no complicated or delayed fail-overs, or database downtime when failing over an application between Regions.

### ACID transactions
<a name="ddb-capabilities-acid-tx"></a>

DynamoDB is built for mission-critical workloads. It includes [(ACID) transactions](transaction-apis.md) support for applications that require complex business logic. DynamoDB provides native, server-side support for transactions, simplifying the developer experience of making coordinated, all-or-nothing changes to multiple items within and across tables.

### Change data capture for event-driven architectures
<a name="ddb-capabilities-cdc-eda"></a>

DynamoDB supports streaming of item-level change data capture (CDC) records in near-real time. It offers two streaming models for CDC: [DynamoDB Streams](Streams.md) and [Kinesis Data Streams for DynamoDB](kds.md). Whenever an application creates, updates, or deletes items in a table, streams records a time-ordered sequence of every item-level change in near-real time. This makes DynamoDB Streams ideal for applications with event-driven architecture to consume and act upon the changes.

### Secondary indexes
<a name="ddb-capabilities-secondary-indexes"></a>

DynamoDB offers the option to create both [global and local secondary indexes](SecondaryIndexes.md), which let you query the table data using an alternate key. With these secondary indexes, you can access data with attributes other than the primary key, giving you maximum flexibility in accessing your data.

## Service integrations
<a name="ddb-service-integrations"></a>

DynamoDB broadly integrates with several AWS services to help you get more value from your data, eliminate undifferentiated heavy lifting, and operate your workloads at scale. Some examples are: AWS CloudFormation, Amazon CloudWatch, Amazon S3, AWS Identity and Access Management (IAM), and AWS Auto Scaling. The following sections describe some of the service integrations that you can perform using DynamoDB:

### Serverless integrations
<a name="ddb-service-integrations-serverless"></a>

To build end-to-end serverless applications, DynamoDB integrates natively with a number of serverless AWS services. For example, you can integrate DynamoDB with AWS Lambda to [create triggers](Streams.Lambda.md), which are pieces of code that automatically respond to events in DynamoDB Streams. With triggers, you can build event-driven applications that react to data modifications in DynamoDB tables. For cost optimization, you can [filter events](Streams.Lambda.Tutorial2.md) that Lambda processes from a DynamoDB stream.

The following list presents some examples of serverless integrations with DynamoDB:
+ [AWS AppSync](https://docs.aws.amazon.com/appsync/latest/devguide/what-is-appsync.html) for creating GraphQL APIs
+ [Amazon API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) for creating REST APIs
+ [Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) for serverless compute
+ [Amazon Kinesis Data Streams](https://docs.aws.amazon.com/streams/latest/dev/introduction.html) for change data capture (CDC)

### Importing and exporting data to Amazon S3
<a name="ddb-service-integrations-s3"></a>

Integrating DynamoDB with Amazon S3 enables you to easily export data to an Amazon S3 bucket for analytics and machine learning. DynamoDB supports [full table exports and incremental exports](S3DataExport_Requesting.md) to export changed, updated, or deleted data between a specified time period. You can also [import data from Amazon S3](S3DataImport.HowItWorks.md) into a new DynamoDB table.

### Zero-ETL integration
<a name="ddb-service-integrations-zetl"></a>

DynamoDB supports [zero-ETL integration with Amazon Redshift](https://docs.aws.amazon.com/redshift/latest/mgmt/zero-etl-using.html) and [Using an OpenSearch Ingestion pipeline with Amazon DynamoDB](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/configure-client-ddb.html). These integrations enable you to run complex analytics and use advanced search capabilities on your DynamoDB table data. For example, you can perform full-text and vector search, and semantic search on your DynamoDB data. Zero-ETL integrations have no impact on production workloads running on DynamoDB.

### Caching
<a name="ddb-service-integrations-caching"></a>

[DynamoDB Accelerator (DAX)](DAX.md) is a fully managed, highly available caching service built for DynamoDB. DAX delivers up to 10 times performance improvement – from milliseconds to microseconds – even at millions of requests per second. DAX does all the heavy lifting required to add in-memory acceleration to your DynamoDB tables, without requiring you to manage cache invalidation, data population, or cluster management.

## Security
<a name="ddb-intro-security"></a>

DynamoDB utilizes [IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) to help you securely control access to your DynamoDB resources. With IAM, you can centrally manage permissions that control which DynamoDB users can access resources. You use IAM to control who is authenticated (signed in) and authorized (has permissions) to use resources. Because DynamoDB utilizes IAM, there are no user names or passwords for accessing DynamoDB. Because you don't have any complicated password rotation policies to manage, it simplifies your security posture. With IAM, you can also enable [fine-grained access control](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_examples_dynamodb_attributes.html) to provide authorization at the attribute level. You can also define [resource-based policies](access-control-resource-based.md) with support for [IAM Access Analyzer](https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html#what-is-access-analyzer-resource-identification) and [Block Public Access (BPA)](rbac-bpa-rbp.md) to simplify policy management.

By default, DynamoDB encrypts all customer data at rest. [Encryption at rest](EncryptionAtRest.md) enhances the security of your data by using encryption keys stored in [AWS Key Management Service](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html) (AWS KMS). With encryption at rest, you can build security-sensitive applications that meet strict encryption compliance and regulatory requirements. When you access an encrypted table, DynamoDB decrypts the table data transparently. You don't have to change any code or applications to use or manage encrypted tables. DynamoDB continues to deliver the same single-digit millisecond latency that you have come to expect, and all [DynamoDB queries](Query.md) work seamlessly on your encrypted data.

You can specify whether DynamoDB should use an AWS owned key (default encryption type), AWS managed key, or a Customer managed key to encrypt user data. The default encryption using [AWS-owned KMS keys](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html#key-mgmt) is available at no additional charge. For client-side encryption, you can use the [AWS Database Encryption SDK](https://aws.amazon.com/blogs/security/how-to-use-aws-database-encryption-sdk-for-client-side-encryption-and-perform-searches-on-encrypted-attributes-in-dynamodb-tables/).

DynamoDB also adheres to several [compliance standards](https://aws.amazon.com/compliance/services-in-scope/), including HIPAA, PCI DSS, and GDPR, which enables you to meet regulatory requirements.

## Resilience
<a name="ddb-intro-resilience"></a>

By default, DynamoDB automatically replicates your data across three [Availability Zones](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/) to provide high durability and a 99.99% availability SLA. DynamoDB also provides additional capabilities to help you achieve your business continuity and disaster recovery objectives.

DynamoDB includes the following features to help support your data resiliency and backup needs:

**Topics**
+ [Global tables](#ddb-resilience-gt)
+ [Continuous backups and point-in-time recovery](#ddb-resilience-backups-pitr)
+ [On-demand backup and restore](#ddb-resilience-ondemand-backup-restore)

### Global tables
<a name="ddb-resilience-gt"></a>

DynamoDB global tables enable a [99.999% availability SLA](https://aws.amazon.com/dynamodb/sla/) and multi-Region resilience. This helps you build resilient applications and optimize them for the lowest recovery time objective (RTO) and recovery point objective (RPO). Global tables also integrates with [AWS Fault Injection Service (AWS FIS)](https://docs.aws.amazon.com/fis/latest/userguide/what-is.html) to perform fault injection experiments on your global table workloads. For example, [ pausing global table replication](https://docs.aws.amazon.com/fis/latest/userguide/fis-actions-reference.html#dynamodb-actions-reference) to any replica table.

### Continuous backups and point-in-time recovery
<a name="ddb-resilience-backups-pitr"></a>

[Continuous backups](Point-in-time-recovery.md) provide you per-second granularity and the ability to initiate a point-in-time recovery. With point-in-time recovery, you can restore a table to any point in time up to the second during the last 35 days. You can set the recovery period to any value between 1 and 35 days.

Continuous backups and initiating a point-in-time restore doesn't use provisioned capacity. They also don't have any impact on the performance or availability of your applications.

### On-demand backup and restore
<a name="ddb-resilience-ondemand-backup-restore"></a>

[On-demand backup and restore](Backup-and-Restore.md) let you create full backups of a table for long-term retention and archival for regulatory compliance needs. Backups don't impact the performance of your table and you can back up tables of any size. With [AWS Backup integration](Backup-and-Restore.md), you can use AWS Backup to schedule, copy, tag, and manage the life cycle of your DynamoDB on-demand backups automatically. Using AWS Backup, you can copy on-demand backups across accounts and Regions, and transition older backups to cold storage for cost-optimization.

## Accessing DynamoDB
<a name="ddb-access"></a>

You can work with DynamoDB using the [AWS Management Console](https://console.aws.amazon.com/dynamodb), the [AWS Command Line Interface](https://aws.amazon.com/cli/), [NoSQL Workbench for DynamoDB](workbench.md), or [DynamoDB APIs](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Operations_Amazon_DynamoDB.html).

For more information, see [Accessing DynamoDB](AccessingDynamoDB.md).

## DynamoDB pricing
<a name="ddb-pricing"></a>

DynamoDB charges for reading, writing, and storing data in your tables, along with any optional features you choose to enable. DynamoDB has two capacity modes with their respective billing options for processing reads and writes on your tables: [on-demand](on-demand-capacity-mode.md) and [provisioned](provisioned-capacity-mode.md).

DynamoDB is also included in the **always free tier**, providing 25 GB of storage. The **Always free tier** also includes 25 provisioned Write and 25 provisioned Read Capacity Units (WCU, RCU) which is enough to handle 200 M requests per month.

For more information, see [Amazon DynamoDB pricing](https://aws.amazon.com/dynamodb/pricing/).

## Getting started with DynamoDB
<a name="ddb-intro-get-started"></a>

If you're a first-time user of DynamoDB, we recommend that you begin by reading the following topics:
+ [Getting started with DynamoDB](GettingStartedDynamoDB.md) – Walks you through the process of setting up DynamoDB, creating sample tables, and uploading data. This topic also provides information about performing some basic database operations using the AWS Management Console, AWS CLI, NoSQL Workbench, and DynamoDB APIs.
+ [DynamoDB core components](HowItWorks.CoreComponents.md) – Describes the basic DynamoDB concepts.
+ [Best practices for designing and architecting with DynamoDB](best-practices.md) – Provides recommendations about NoSQL design, DynamoDB Well-Architected Lens, table design and several other DynamoDB features. These best practices help you maximize performance and minimize throughput costs when working with DynamoDB.

We also recommend that you review the following tutorials that present complete end-to-end procedures to familiarize yourself with DynamoDB. You can complete these tutorials using the **always free tier** feature.
+ [Create and Query a NoSQL Table with Amazon DynamoDB](https://aws.amazon.com/tutorials/create-nosql-table/)
+ [Build an Application Using a NoSQL Key-Value Data Store](https://aws.amazon.com/tutorials/build-an-application-using-a-no-sql-key-value-data-store/)

For information about resources, tools, and strategies to migrate to DynamoDB, see [Migrating to DynamoDB](migration-guide.md#migration-guide.title). To read the latest blogs and whitepapers, see [Amazon DynamoDB resources](https://aws.amazon.com/dynamodb/resources/).