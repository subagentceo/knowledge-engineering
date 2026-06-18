

# What is Amazon DocumentDB (with MongoDB compatibility)
<a name="what-is"></a>

Amazon DocumentDB (with MongoDB compatibility) is a fast, reliable, and fully managed database service. Amazon DocumentDB makes it easy to set up, operate, and scale MongoDB-compatible databases in the cloud. With Amazon DocumentDB, you can run the same application code and use the same drivers and tools that you use with MongoDB.

Before using Amazon DocumentDB, you should review the concepts and features described in [How it works](how-it-works.md). After that, complete the steps in [Get started guide](get-started-guide.md).

**Topics**
+ [Overview](#overview)
+ [Clusters](#what-is-db-clusters)
+ [Instances](#what-is-db-instances)
+ [Regions and AZs](#what-is-regions-and-azs)
+ [Pricing](#docdb-pricing)
+ [Monitoring](#what-is-monitoring)
+ [Interfaces](#what-is-interfaces)
+ [What's next?](#what-is-next)
+ [How it works](how-it-works.md)
+ [What is a document database?](what-is-document-db.md)

## Overview of Amazon DocumentDB
<a name="overview"></a>

The following are some high-level features of Amazon DocumentDB:
+ Amazon DocumentDB supports two types of clusters: instance-based clusters and elastic clusters. Elastic clusters support workloads with millions of reads/writes per second and petabytes of storage capacity. For more information about elastic clusters, see [Using Amazon DocumentDB elastic clusters](docdb-using-elastic-clusters.md). The content below refers to Amazon DocumentDB instance-based clusters .
+ Amazon DocumentDB automatically grows the size of your storage volume as your database storage needs grow. Your storage volume grows in increments of 10 GB, up to a maximum of 128 TiB. You don't need to provision any excess storage for your cluster to handle future growth.
+ With Amazon DocumentDB, you can increase read throughput to support high-volume application requests by creating up to 15 replica instances. Amazon DocumentDB replicas share the same underlying storage, lowering costs and avoiding the need to perform writes at the replica nodes. This capability frees up more processing power to serve read requests and reduces the replica lag time—often down to single digit milliseconds. You can add replicas in minutes regardless of the storage volume size. Amazon DocumentDB also provides a reader endpoint, so the application can connect without having to track replicas as they are added and removed.
+ Amazon DocumentDB lets you scale the compute and memory resources for each of your instances up or down. Compute scaling operations typically complete in a few minutes.
+ Amazon DocumentDB runs in Amazon Virtual Private Cloud (Amazon VPC), so you can isolate your database in your own virtual network. You can also configure firewall settings to control network access to your cluster.
+ Amazon DocumentDB continuously monitors the health of your cluster. On an instance failure, Amazon DocumentDB automatically restarts the instance and associated processes. Amazon DocumentDB doesn't require a crash recovery replay of database redo logs, which greatly reduces restart times. Amazon DocumentDB also isolates the database cache from the database process, enabling the cache to survive an instance restart.
+ On instance failure, Amazon DocumentDB automates failover to one of up to 15 Amazon DocumentDB replicas that you create in other Availability Zones. If no replicas have been provisioned and a failure occurs, Amazon DocumentDB tries to create a new Amazon DocumentDB instance automatically.
+ The backup capability in Amazon DocumentDB enables point-in-time recovery for your cluster. This feature allows you to restore your cluster to any second during your retention period, up to the last 5 minutes. You can configure your automatic backup retention period up to 35 days. Automated backups are stored in Amazon Simple Storage Service (Amazon S3), which is designed for 99.999999999% durability. Amazon DocumentDB backups are automatic, incremental, and continuous, and they have no impact on your cluster performance.
+ With Amazon DocumentDB, you can encrypt your databases using keys that you create and control through AWS Key Management Service (AWS KMS). On a database cluster running with Amazon DocumentDB encryption, data stored at rest in the underlying storage is encrypted. The automated backups, snapshots, and replicas in the same cluster are also encrypted.
+ Amazon DocumentDB is authorized under Federal Risk and Authorization Management Program (FedRAMP). It has FedRAMP High authorization for AWS GovCloud (US) regions and FedRAMP Moderate authorization for AWS US East/West Regions. For details about AWS and compliance efforts, see [AWS Services in Scope by Compliance Program](https://aws.amazon.com/compliance/services-in-scope/FedRAMP/).

If you are new to AWS services, use the following resources to learn more:
+ AWS offers services for computing, databases, storage, analytics, and other functionality. For an overview of all AWS services, see [Cloud Computing with Amazon Web Services](https://aws.amazon.com/what-is-aws/).
+ AWS provides a number of database services. For guidance on which service is best for your environment, see [Databases on AWS](https://aws.amazon.com/products/databases/).

## Clusters
<a name="what-is-db-clusters"></a>

A *cluster* consists of 0 to 16 instances and a cluster storage volume that manages the data for those instances. All writes are done through the primary instance. All instances (primary and replicas) support reads. The cluster's data is stored in the cluster volume with copies in three different Availability Zones.

![Amazon DocumentDB cluster containing primary instance in Availability Zone 1, writing to cluster volume for replicas in zones 2 and 3.](http://docs.aws.amazon.com/documentdb/latest/devguide/images/how-it-works-01c.png)


Amazon DocumentDB 5.0 instance-based clusters support two storage configurations for a database cluster: Amazon DocumentDB standard and Amazon DocumentDB I/O-optimized. For more information see [Amazon DocumentDB cluster storage configurations](db-cluster-storage-configs.md).

## Instances
<a name="what-is-db-instances"></a>

An Amazon DocumentDB instance is an isolated database environment in the cloud. An instance can contain multiple user-created databases. You can create and modify an instance using the AWS Management Console or the AWS CLI.

The computation and memory capacity of an instance are determined by its *instance class*. You can select the instance that best meets your needs. If your needs change over time, you can choose a different instance class. For instance class specifications, see [Instance class specifications](db-instance-classes.md#db-instance-class-specs).

Amazon DocumentDB instances run only in the Amazon VPC environment. Amazon VPC gives you control of your virtual networking environment: You can choose your own IP address range, create subnets, and configure routing and access control lists (ACLs).

Before you can create Amazon DocumentDB instances, you must create a cluster to contain the instances.

Not all instance classes are supported in every region. The following table shows which instance classes are supported in each region.

**Note**  
For a complete list of instance types supported by Amazon DocumentDB in each instance class, see [Instance class specifications](db-instance-classes.md#db-instance-class-specs).


**Supported instance classes by Region**  

<table>
<thead>
  <tr><th></th><th colspan="8">Instance Classes</th></tr>
  <tr><th>Region</th><th>R8G</th><th>R6GD</th><th>R6G</th><th>R5</th><th>R4</th><th>T4G</th><th>T3</th><th>Serverless</th></tr>
</thead>
<tbody>
  <tr><td>US East (Ohio)</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td></tr>
  <tr><td>US East (N. Virginia)</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td></tr>
  <tr><td>US West (Oregon)</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td></tr>
  <tr><td>Africa (Cape Town)</td><td></td><td></td><td>Supported</td><td>Supported</td><td></td><td>Supported</td><td>Supported</td><td>Supported</td></tr>
  <tr><td>South America (São Paulo)</td><td></td><td>Supported</td><td>Supported</td><td>Supported</td><td></td><td>Supported</td><td>Supported</td><td>Supported</td></tr>
  <tr><td>Asia Pacific (Hong Kong)</td><td></td><td></td><td>Supported</td><td>Supported</td><td></td><td>Supported</td><td>Supported</td><td>Supported</td></tr>
  <tr><td>Asia Pacific (Hyderabad)</td><td></td><td></td><td>Supported</td><td>Supported</td><td></td><td>Supported</td><td>Supported</td><td>Supported</td></tr>
  <tr><td>Asia Pacific (Malaysia)</td><td></td><td></td><td>Supported</td><td></td><td></td><td>Supported</td><td>Supported</td><td></td></tr>
  <tr><td>Asia Pacific (Mumbai)</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td><td></td><td>Supported</td><td>Supported</td><td>Supported</td></tr>
  <tr><td>Asia Pacific (Osaka)</td><td></td><td>Supported</td><td>Supported</td><td>Supported</td><td></td><td>Supported</td><td>Supported</td><td></td></tr>
  <tr><td>Asia Pacific (Seoul)</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td><td></td><td>Supported</td><td>Supported</td><td>Supported</td></tr>
  <tr><td>Asia Pacific (Sydney)</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td><td></td><td>Supported</td><td>Supported</td><td>Supported</td></tr>
  <tr><td>Asia Pacific (Jakarta)</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td><td></td><td>Supported</td><td>Supported</td><td></td></tr>
  <tr><td>Asia Pacific (Melbourne)</td><td></td><td></td><td>Supported</td><td>Supported</td><td></td><td>Supported</td><td>Supported</td><td></td></tr>
  <tr><td>Asia Pacific (Singapore)</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td><td></td><td>Supported</td><td>Supported</td><td>Supported</td></tr>
  <tr><td>Asia Pacific (Thailand)</td><td></td><td></td><td>Supported</td><td></td><td></td><td>Supported</td><td>Supported</td><td></td></tr>
  <tr><td>Asia Pacific (Tokyo)</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td><td></td><td>Supported</td><td>Supported</td><td>Supported</td></tr>
  <tr><td>Canada (Central)</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td><td></td><td>Supported</td><td>Supported</td><td>Supported</td></tr>
  <tr><td>Canada West (Calgary)</td><td></td><td></td><td>Supported</td><td>Supported</td><td></td><td>Supported</td><td>Supported</td><td></td></tr>
  <tr><td>Europe (Frankfurt)</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td><td></td><td>Supported</td><td>Supported</td><td>Supported</td></tr>
  <tr><td>Europe (Zurich)</td><td></td><td>Supported</td><td>Supported</td><td>Supported</td><td></td><td>Supported</td><td>Supported</td><td></td></tr>
  <tr><td>Europe (Ireland)</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td></tr>
  <tr><td>Europe (London)</td><td></td><td>Supported</td><td>Supported</td><td>Supported</td><td></td><td>Supported</td><td>Supported</td><td>Supported</td></tr>
  <tr><td>Europe (Milan)</td><td></td><td></td><td>Supported</td><td>Supported</td><td></td><td>Supported</td><td>Supported</td><td>Supported</td></tr>
  <tr><td>Europe (Paris)</td><td></td><td>Supported</td><td>Supported</td><td>Supported</td><td></td><td>Supported</td><td>Supported</td><td>Supported</td></tr>
  <tr><td>Europe (Spain)</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td><td></td><td>Supported</td><td>Supported</td><td>Supported</td></tr>
  <tr><td>Europe (Stockholm)</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td><td></td><td>Supported</td><td>Supported</td><td></td></tr>
  <tr><td>Mexico (Central)</td><td></td><td></td><td>Supported</td><td></td><td></td><td>Supported</td><td>Supported</td><td></td></tr>
  <tr><td>Middle East (UAE)</td><td></td><td></td><td>Supported</td><td>Supported</td><td></td><td>Supported</td><td>Supported</td><td>Supported</td></tr>
  <tr><td>China (Beijing)</td><td></td><td>Supported</td><td>Supported</td><td>Supported</td><td></td><td>Supported</td><td>Supported</td><td>Supported</td></tr>
  <tr><td>China (Ningxia)</td><td></td><td></td><td>Supported</td><td>Supported</td><td></td><td>Supported</td><td>Supported</td><td>Supported</td></tr>
  <tr><td>Israel (Tel Aviv)</td><td></td><td></td><td>Supported</td><td>Supported</td><td></td><td>Supported</td><td>Supported</td><td></td></tr>
  <tr><td>AWS GovCloud (US-West)</td><td>Supported</td><td>Supported</td><td>Supported</td><td>Supported</td><td></td><td></td><td>Supported</td><td>Supported</td></tr>
  <tr><td>AWS GovCloud (US-East)</td><td></td><td>Supported</td><td>Supported</td><td>Supported</td><td></td><td>Supported</td><td>Supported</td><td>Supported</td></tr>
</tbody>
</table>


## Regions and availability zones
<a name="what-is-regions-and-azs"></a>

Regions and Availability Zones define the physical locations of your cluster and instances.

### Regions
<a name="what-is-regions"></a>

AWS Cloud computing resources are housed in highly available data center facilities in different areas of the world (for example, North America, Europe, or Asia). Each data center location is called a *Region*.

Each AWS Region is designed to be completely isolated from the other AWS Regions. Within each are multiple Availability Zones. By launching your nodes in different Availability Zones, you can achieve the greatest possible fault tolerance. The following diagram shows a high-level view of how AWS Regions and Availability Zones work.

![Amazon DocumentDB high-level view of AWS Regions and Availability Zones.](http://docs.aws.amazon.com/documentdb/latest/devguide/images/docdb-regions-and-azs.png)


### Availability zones
<a name="what-is-availability-zones"></a>

Each AWS Region contains multiple distinct locations called *Availability Zones*. Each Availability Zone is engineered to be isolated from failures in other Availability Zones, and to provide inexpensive, low-latency network connectivity to other Availability Zones in the same Region. By launching instances for a given cluster in multiple Availability Zones, you can protect your applications from the unlikely event of an Availability Zone failing.

The Amazon DocumentDB architecture separates storage and compute. For the storage layer, Amazon DocumentDB replicates six copies of your data across three AWS Availability Zones. As an example, if you are launching an Amazon DocumentDB cluster in a Region that only supports two Availability Zones, your data storage will be replicated six ways across three Availability Zones but your compute instances will only be available in two Availability Zones.

 The following table lists the number of Availability Zones that you can use in a given AWS Region to provision compute instances for your cluster.


| Region Name | Region | Availability Zones (compute) | 
| --- | --- | --- | 
| US East (Ohio) | `us-east-2` | 3 | 
| US East (N. Virginia) | `us-east-1` | 6 | 
| US West (Oregon) | `us-west-2` | 4 | 
| Africa (Cape Town) | `af-south-1` | 3 | 
| South America (São Paulo) | `sa-east-1` | 3 | 
| Asia Pacific (Hong Kong) | `ap-east-1` | 3 | 
| Asia Pacific (Hyderabad) | `ap-south-2` | 3 | 
| Asia Pacific (Malaysia) | `ap-southeast-5` | 3 | 
| Asia Pacific (Mumbai) | `ap-south-1` | 3 | 
| Asia Pacific (Osaka) | `ap-northeast-3` | 3 | 
| Asia Pacific (Seoul) | `ap-northeast-2` | 4 | 
| Asia Pacific (Singapore) | `ap-southeast-1` | 3 | 
| Asia Pacific (Sydney) | `ap-southeast-2` | 3 | 
| Asia Pacific (Jakarta) | `ap-southeast-3` | 3 | 
| Asia Pacific (Melbourne) | `ap-southeast-4` | 3 | 
| Asia Pacific (Thailand) | `ap-southeast-7` | 3 | 
| Asia Pacific (Tokyo) | `ap-northeast-1` | 3 | 
| Canada (Central) | `ca-central-1` | 3 | 
| Canada West (Calgary) | `ca-west-1` | 3 | 
| China (Beijing) Region | `cn-north-1` | 3 | 
| China (Ningxia) | `cn-northwest-1` | 3 | 
| Europe (Frankfurt) | `eu-central-1` | 3 | 
| Europe (Zurich) | `eu-central-2` | 3 | 
| Europe (Ireland) | `eu-west-1` | 3 | 
| Europe (London) | `eu-west-2` | 3 | 
| Europe (Milan) | `eu-south-1` | 3 | 
| Europe (Paris) | `eu-west-3` | 3 | 
| Europe (Spain) | `eu-south-2` | 3 | 
| Europe (Stockholm) | `eu-north-1` | 3 | 
| Mexico (Central) | `mx-central-1` | 3 | 
| Middle East (UAE) | `me-central-1` | 3 | 
| Israel (Tel Aviv) | `il-central-1` | 3 | 
| AWS GovCloud (US-West) | `us-gov-west-1` | 3 | 
| AWS GovCloud (US-East) | `us-gov-east-1` | 3 | 

## Amazon DocumentDB Pricing
<a name="docdb-pricing"></a>

Amazon DocumentDB clusters are billed based on the following components: 
+ **Instance hours (per hour)**—Based on the instance class of the instance (for example, `db.r5.xlarge`). Pricing is listed on a per-hour basis, but bills are calculated down to the second and show times in decimal form. Amazon DocumentDB usage is billed in one second increments, with a minimum of 10 minutes. For more information, see [Managing instance classes](db-instance-classes.md). 
+ **I/O requests (per 1 million requests per month)** — Total number of storage I/O requests that you make in a billing cycle.
+ **Backup storage (per GiB per month)** — Backup storage is the storage that is associated with automated database backups and any active database snapshots that you have taken. Increasing your backup retention period or taking additional database snapshots increases the backup storage consumed by your database. Backup storage is metered in GB-months and per second does not apply. For more information, see [Backing up and restoring in Amazon DocumentDB](backup_restore.md). 
+ **Data transfer (per GB)** — Data transfer in and out of your instance from or to the internet or other AWS Regions.

For detailed information, see [Amazon DocumentDB pricing](https://aws.amazon.com/documentdb/pricing/).

### Free trial
<a name="free-trial"></a>

You can try Amazon DocumentDB for free using the 1-month free trial. For more information, see Free trial in [Amazon DocumentDB pricing](https://aws.amazon.com/documentdb/pricing/) or see the [Amazon DocumentDB free trial FAQ](https://aws.amazon.com/documentdb/free-trial/).

## Monitoring
<a name="what-is-monitoring"></a>

There are several ways that you can track the performance and health of an instance. You can use the free Amazon CloudWatch service to monitor the performance and health of an instance. You can find performance charts on the Amazon DocumentDB console. You can subscribe to Amazon DocumentDB events to be notified when changes occur with an instance, snapshot, parameter group, or security group.

For more information, see the following:
+ [Monitoring Amazon DocumentDB with CloudWatch](cloud_watch.md)
+ [Logging Amazon DocumentDB API calls with AWS CloudTrail](logging-with-cloudtrail.md)

## Interfaces
<a name="what-is-interfaces"></a>

There are multiple ways for you to interact with Amazon DocumentDB, including the AWS Management Console and the AWS CLI.

### AWS Management Console
<a name="what-is-console"></a>

The AWS Management Console is a simple web-based user interface. You can manage your clusters and instances from the console with no programming required. To access the Amazon DocumentDB console, sign in to the AWS Management Console and open the Amazon DocumentDB console at [https://console.aws.amazon.com/docdb](https://console.aws.amazon.com/docdb). 

### AWS CLI
<a name="what-is-cli"></a>

You can use the AWS Command Line Interface (AWS CLI) to manage your Amazon DocumentDB clusters and instances. With minimal configuration, you can start using all of the functionality provided by the Amazon DocumentDB console from your favorite terminal program.
+ To install the AWS CLI, see [Installing the AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/installing.html).
+ To begin using the AWS CLI for Amazon DocumentDB, see [AWS Command Line Interface Reference for Amazon DocumentDB](https://docs.aws.amazon.com/cli/latest/reference/docdb/index.html).

### MongoDB drivers
<a name="what-is-mongodb-drivers"></a>

For developing and writing applications against an Amazon DocumentDB cluster, you can also use the MongoDB drivers with Amazon DocumentDB. For more information, see the MongoDB shell tab in [Connecting with TLS enabled](connect_programmatically.md#connect_programmatically-tls_enabled) or [Connecting with TLS disabled](connect_programmatically.md#connect_programmatically-tls_disabled).

## What's next?
<a name="what-is-next"></a>

The preceding sections introduced you to the basic infrastructure components that Amazon DocumentDB offers. What should you do next? Depending upon your circumstances, see one of the following topics to get started:
+ Get started with Amazon DocumentDB by creating a cluster and instance using CloudFormation [Amazon DocumentDB quick start using CloudFormation](quick_start_cfn.md).
+ Get started with Amazon DocumentDB by creating a cluster and instance using the instructions in our [Get started guide](get-started-guide.md).
+ Get started with Amazon DocumentDB by creating an elastic cluster using the instructions in [Get started with Amazon DocumentDB elastic clusters](elastic-get-started.md).
+ Migrate your MongoDB implementation to Amazon DocumentDB using the guidance at [Migrating to Amazon DocumentDB](docdb-migration.md)