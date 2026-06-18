

# What is Amazon Security Lake?
<a name="what-is-security-lake"></a>

Amazon Security Lake is a fully managed security data lake service. You can use Security Lake to automatically centralize security data from AWS environments, SaaS providers, on premises, cloud sources, and third-party sources into a purpose-built data lake that's stored in your AWS account. Security Lake helps you analyze security data, so you can get a more complete understanding of your security posture across the entire organization. With Security Lake, you can also improve the protection of your workloads, applications, and data.

The data lake is backed by Amazon Simple Storage Service (Amazon S3) buckets, and you retain ownership over your data.

Security Lake automates the collection of security-related log and event data from integrated AWS services and third-party services. It also helps you manage the lifecycle of data with customizable retention and replication settings. Security Lake converts ingested data into Apache Parquet format and a standard open-source schema called the Open Cybersecurity Schema Framework (OCSF). With OCSF support, Security Lake normalizes and combines security data from AWS and a broad range of enterprise security data sources.

Other AWS services and third-party services can subscribe to the data that's stored in Security Lake for incident response and security data analytics.

## Overview of Security Lake
<a name="securitylake-diagram"></a>

![Overview diagram of the Amazon Security Lake data lake which shows how Security Lake automatically builds a security data lake into your account.](http://docs.aws.amazon.com/security-lake/latest/userguide/images/Product-Page-Diagram_Amazon-Security-Lake.png)


## Features of Security Lake
<a name="securitylake-feature-overview"></a>

Here are some key ways that Security Lake helps you centralize, manage, and subscribe to security-related log and event data.

**Data aggregation into your account**  
Security Lake creates a purpose-built security data lake in your account. Security Lake collects log and event data from cloud, on premises, and custom data sources across accounts and Regions. The data lake is backed by Amazon Simple Storage Service (Amazon S3) buckets, and you retain ownership over your data.

**Variety of supported log and event sources**  
Security Lake collects security logs and events from multiple sources, including on-premises, AWS services, and third-party services. After ingesting logs, regardless of the source, you can access them centrally, and manage their lifecycle. For details about sources from which logs and events are collected by Security Lake, see [Source management in Security Lake](source-management.md) 

**Data transformation and normalization**  
Security Lake automatically partitions incoming data from natively supported AWS services and converts it to a storage- and query-efficient Parquet format. It also transforms data from natively supported AWS services to the Open Cybersecurity Schema Framework (OCSF) open-source schema. This makes the data compatible with other AWS services and third-party providers without the need for post-processing. Since Security Lake normalizes data, many security solutions can consume this data in parallel.

**Multiple levels of access for subscribers**  
Subscribers consume data stored in Security Lake. You can choose a subscriber's level of access to your data. Subscribers may consume data only from the sources, and in the AWS Regions, that you specify. Subscribers may be automatically notified about new objects as they're written to the data lake. Or, subscribers can query data from the data lake. Security Lake automatically creates and exchanges the credentials needed between Security Lake and the subscriber.

**Multi-account and multi-Region data management**  
You can centrally enable Security Lake across all Regions where it's available, and across multiple AWS accounts. In Security Lake, you can also designate rollup Regions to consolidate security log and event data from multiple Regions. This can help you comply with data residency compliance requirements.

**Configurable and customizable**  
Security Lake is a configurable and customizable service. You can specify which sources, accounts, and Regions you want to configure log collection for. You can also specify a subscriber's level of access to the data lake.

**Data lifecycle management and optimization**  
Security Lake manages the lifecycle of your data with customizable retention settings and storage costs with automated storage tiering. Security Lake automatically partitions and converts incoming security data to a storage and query efficient Apache Parquet format. 

## Accessing Security Lake
<a name="accessing-securitylake"></a>

For a list of Regions where Security Lake is currently available, see [Security Lake Regions and endpoints](supported-regions.md). To learn more about Regions, see [AWS service endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html) in the *AWS General Reference*.

In each Region, you can access Security Lake in any of the following ways:

**AWS Management Console**  
The AWS Management Console is a browser-based interface that you can use to create and manage AWS resources. The Security Lake console provides access to your Security Lake account and resources. You can perform most Security Lake tasks by using the Security Lake console.

**Security Lake API**  
To access Security Lake programmatically, use the Security Lake API, and issue HTTPS requests directly to the service. For more information, see the [Security Lake API Reference](https://docs.aws.amazon.com/security-lake/latest/APIReference/Welcome.html).

**AWS Command Line Interface (AWS CLI)**  
With the AWS CLI, you can issue commands at your system's command line to perform Security Lake tasks and AWS tasks. Using the command line can be faster and more convenient than using the console. The command line tools are also useful if you want to build scripts that perform tasks. For information about installing and using the AWS CLI, see the [AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html).

**AWS SDKs**  
AWS provides SDKs that consist of libraries and sample code for various programming languages and platforms, such as Java, Go, Python, C\+\+, and .NET. The SDKs provide convenient, programmatic access to Security Lake and other AWS services. They also handle tasks such as cryptographically signing requests, managing errors, and retrying requests automatically. For information about installing and using the AWS SDKs, see [Tools to Build on AWS](https://aws.amazon.com/developer/tools/).

## Related services
<a name="related-services"></a>

The following are other AWS services that Security Lake uses:
+ [Amazon EventBridge](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html) – Security Lake uses EventBridge to notify subscribers when objects are written to the data lake.
+ [AWS Glue](https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html) – Security Lake uses AWS Glue crawlers to create the AWS Glue Data Catalog tables and send newly written data to the Data Catalog. Security Lake also stores partition metadata for AWS Lake Formation tables in the Data Catalog.
+ [AWS Lake Formation](https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html) – Security Lake creates a separate Lake Formation table for each source that contributes data to Security Lake. Lake Formation tables contain information about data from each source, including schema, partition, and data location information. Subscribers have the option to consume data by querying the Lake Formation tables.
+ [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) – Security Lake uses Lambda functions to support extract, transform, and load (ETL) jobs on raw data and to register partitions for source data in AWS Glue.
+ [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) – Security Lake stores your data as Amazon S3 objects. Storage classes and retention settings are based on Amazon S3 offerings. Security Lake doesn't support Amazon S3 Select.
+ [Amazon Simple Queue Service](https://docs.aws.amazon.com//AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html) – Security Lake uses Amazon SQS to enable event-driven processing and manage notifications.

Security Lake collects data from custom sources in addition to the following AWS services:
+ AWS CloudTrail management and data events (S3, Lambda)
+ Amazon Elastic Kubernetes Service (Amazon EKS) Audit Logs
+ Amazon Route 53 resolver query logs
+ AWS Security Hub CSPM findings
+ Amazon Virtual Private Cloud (Amazon VPC) Flow Logs
+ AWS WAFv2 Logs

For more information about these sources, see [Collecting data from AWS services in Security Lake](internal-sources.md). You can consume the Amazon S3 objects in your security data lake by creating a subscriber that can read data in the OCSF schema. You can also query data by using Amazon Athena, Amazon Redshift, and third-party subscription services that integrate with AWS Glue.