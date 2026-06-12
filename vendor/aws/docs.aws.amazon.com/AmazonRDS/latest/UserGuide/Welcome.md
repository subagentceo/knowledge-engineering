

# What is Amazon Relational Database Service (Amazon RDS)?
<a name="Welcome"></a>

Amazon Relational Database Service (Amazon RDS) is a web service that makes it easier to set up, operate, and scale a relational database in the AWS Cloud. It provides cost-efficient, resizable capacity for an industry-standard relational database and manages common database administration tasks.

**Note**  
This guide covers Amazon RDS database engines other than Amazon Aurora. For information about using Amazon Aurora, see the [https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html).

If you are new to AWS products and services, begin learning more with the following resources:
+ For an overview of all AWS products, see [What is cloud computing?](http://aws.amazon.com/what-is-aws/)
+ Amazon Web Services provides a number of database services. To learn more about the variety of database options available on AWS, see [Choosing an AWS database service](https://aws.amazon.com/getting-started/decision-guides/databases-on-aws-how-to-choose) and [Running databases on AWS](http://aws.amazon.com/running_databases/). 

## Advantages of Amazon RDS
<a name="Welcome.Concepts.on-prem"></a>

Amazon RDS is a managed database service. It's responsible for most management tasks. By eliminating tedious manual processes, Amazon RDS frees you to focus on your application and your users. 

Amazon RDS provides the following principal advantages over database deployments that aren't fully managed:
+ You can use database engines that you are already familiar with: IBM Db2, MariaDB, Microsoft SQL Server, MySQL, Oracle Database, and PostgreSQL.
+ Amazon RDS manages backups, software patching, automatic failure detection, and recovery.
+ You can turn on automated backups, or manually create your own backup snapshots. You can use these backups to restore a database. The Amazon RDS restore process works reliably and efficiently.
+ You can get high availability with a primary DB instance and a synchronous secondary DB instance that you can fail over to when problems occur. You can also use read replicas to increase read scaling.
+ In addition to the security in your database package, you can control access by using AWS Identity and Access Management (IAM) to define users and permissions. You can also help protect your databases by putting them in a virtual private cloud (VPC).

## Comparison of responsibilities with Amazon EC2 and on-premises deployments
<a name="Welcome.Concepts.comparison"></a>

We recommend Amazon RDS as your default choice for most relational database deployments. The following alternatives have the disadvantage of making you spend more time managing software and hardware:

**On-premises deployment**  
When you buy an on-premises server, you get CPU, memory, storage, and IOPS, all bundled together. You assume full responsibility for the server, operating system, and database software.

**Amazon EC2**  
Amazon Elastic Compute Cloud (Amazon EC2) provides scalable computing capacity in the AWS Cloud. Unlike in an on-premises server, CPU, memory, storage, and IOPS are separated so that you can scale them independently. AWS manages the hardware layers, which eliminates some of the burden of managing an on-premises database server.  
The disadvantage to running a database on Amazon EC2 is that you're more prone to user errors. For example, when you update the operating system or database software manually, you might accidentally cause application downtime. You might spend hours checking every change to identify and fix an issue.

The following table compares the management models for on-premises databases, Amazon EC2, and Amazon RDS.


|  Feature  |  On-premises management  |  Amazon EC2 management  |  Amazon RDS management  | 
| --- | --- | --- | --- | 
| Application optimization | Customer | Customer | Customer | 
| Scaling | Customer | Customer | AWS | 
| High availability | Customer | Customer | AWS | 
| Database backups | Customer | Customer | AWS | 
| Database software patching | Customer | Customer | AWS | 
| Database software install | Customer | Customer | AWS | 
| Operating system (OS) patching | Customer | Customer | AWS | 
| OS installation | Customer | Customer | AWS | 
| Server maintenance | Customer | AWS | AWS | 
| Hardware lifecycle | Customer | AWS | AWS | 
| Power, network, and cooling | Customer | AWS | AWS | 

## Amazon RDS shared responsibility model
<a name="Welcome.Concepts.SharedResponsibility"></a>

Amazon RDS is responsible for hosting the software components and infrastructure of DB instances and DB clusters. You are responsible for query tuning, which is the process of adjusting SQL queries to improve performance. Query performance is highly dependent on database design, data size, data distribution, application workload, and query patterns, which can vary greatly. Monitoring and tuning are highly individualized processes that you own for your RDS databases. You can use Amazon RDS Performance Insights and other tools to identify problematic queries.

## Amazon RDS DB instances
<a name="Welcome.Concepts.DBInstance"></a>

A *DB instance* is an isolated database environment in the AWS Cloud. The basic building block of Amazon RDS is the DB instance. Your DB instance can contain one or more user-created databases. The following diagram shows a virtual private cloud (VPC) that contains two Availability Zones, with each AZ containing two DB instances.

![Shows a VPC that spans two Availability Zones. Each AZ hosts two DB instances.](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/images/db-instances.png)


You can access your DB instances by using the same tools and applications that you use with a standalone database instance. You can create and modify a DB instance by using the AWS Command Line Interface (AWS CLI), the Amazon RDS API, or the AWS Management Console.

**Topics**
+ [Amazon RDS application architecture: example](#Welcome.Concepts.DBInstance.architecture)
+ [DB engines](#Welcome.Concepts.DBInstance.engine)
+ [DB instance classes](#Welcome.Concepts.DBInstance.instance-class)
+ [DB instance storage](#Welcome.Concepts.DBInstance.storage)
+ [DB instances in an Amazon Virtual Private Cloud (Amazon VPC)](#Welcome.Concepts.DBInstance.VPC)

### Amazon RDS application architecture: example
<a name="Welcome.Concepts.DBInstance.architecture"></a>

The following image shows a typical use case of a dynamic website that uses Amazon RDS DB instances for database storage:

![A Region with a VPC spanning two Availability Zones, each containing an application server and DB instance.](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/images/aws-cloud-deployment-architecture.png)


The primary components of the preceding architecture are as follows:

**Elastic Load Balancing**  
AWS routes user traffic through Elastic Load Balancing. A load balancer distributes workloads across multiple compute resources, such as virtual servers. In this sample use case, the Elastic Load Balancer forwards client requests to application servers.

**Application servers**  
Application servers interact with RDS DB instances. An application server in AWS is typically hosted on EC2 instances, which provide scalable computing capacity. The application servers reside in public subnets with different Availability Zones (AZs) within the same Virtual Private Cloud (VPC). 

**RDS DB instances**  
The EC2 application servers interact with RDS DB instances. The DB instances reside in private subnets within different Availability Zones (AZs) within the same Virtual Private Cloud (VPC). Because the subnets are private, no requests from the internet are permitted.   
The primary DB instance replicates to another DB instance, called a read replica. Both DB instances are in private subnets within the VPC, which means that Internet users can't access them directly.

### DB engines
<a name="Welcome.Concepts.DBInstance.engine"></a>

A *DB engine* is the specific relational database software that runs on your DB instance. Amazon RDS supports the following database engines:
+ IBM Db2

  For more information, see [Amazon RDS for Db2](CHAP_Db2.md).
+ MariaDB

  For more information, see [Amazon RDS for MariaDB](CHAP_MariaDB.md).
+ Microsoft SQL Server

  For more information, see [Amazon RDS for Microsoft SQL Server](CHAP_SQLServer.md).
+ MySQL

  For more information, see [Amazon RDS for MySQL](CHAP_MySQL.md).
+ Oracle Database

  For more information, see [Amazon RDS for Oracle](CHAP_Oracle.md).
+ PostgreSQL

  For more information, see [Amazon RDS for PostgreSQL](CHAP_PostgreSQL.md).

Each DB engine has its own supported features, and each version of a DB engine can include specific features. Support for Amazon RDS features varies across AWS Regions and specific versions of each DB engine. To check feature support in different engine versions and Regions, see [Supported features in Amazon RDS by AWS Region and DB engine](Concepts.RDSFeaturesRegionsDBEngines.grids.md).

Additionally, each DB engine has a set of parameters in a DB parameter group that control the behavior of the databases that it manages. For more information about parameter groups, see [Parameter groups for Amazon RDS](USER_WorkingWithParamGroups.md).

### DB instance classes
<a name="Welcome.Concepts.DBInstance.instance-class"></a>

A *DB instance class* determines the computation and memory capacity of a DB instance. A DB instance class consists of both the DB instance class type and the size. Amazon RDS supports the following instance class types, where the asterisk (\*) represents the generation, optional attribute, and size:
+ General purpose – db.m\*
+ Memory optimized – db.z\*, db.x\*, db.r\*
+ Compute optimized – db.c\*
+ Burstable performance – db.t\*

Each instance class offers different compute, memory, and storage capabilities. For example, db.m7g is a 7th-generation, general-purpose DB instance class type powered by AWS Graviton3 processors. When you create a DB instance, you specify a DB instance class such as db.m7g.2xlarge, where 2xlarge is the size. For more information about the hardware specifications for the different instance classes, see [Hardware specifications for DB instance classes](Concepts.DBInstanceClass.Summary.md).

You can select the DB instance class that best meets your requirements. If your requirements change over time, you can change your DB instance class. For example, you might scale up your db.m7g.2xlarge instance to db.m7g.4xlarge. For more information, see [DB instance classes](Concepts.DBInstanceClass.md).

**Note**  
For pricing information on DB instance classes, see the Pricing section of the [Amazon RDS](http://aws.amazon.com/rds/) product page.

### DB instance storage
<a name="Welcome.Concepts.DBInstance.storage"></a>

Amazon EBS provides durable, block-level storage volumes that you can attach to a running instance. DB instance storage comes in the following types:
+ General Purpose (SSD)

  This cost-effective storage type is ideal for a broad range of workloads running on medium-sized DB instances. General Purpose storage is best suited for development and testing environments.
+ Provisioned IOPS (PIOPS)

  This storage type is designed to meet the needs of I/O-intensive workloads, particularly database workloads, that require low I/O latency and consistent I/O throughput. Provisioned IOPS storage is best suited for production environments.
+ Magnetic

  Amazon RDS supports magnetic storage for backward compatibility. We recommend that you use General Purpose SSD or Provisioned IOPS SSD for any new storage needs. 

The storage types differ in performance characteristics and price. You can tailor your storage performance and cost to the requirements of your database. 

Each DB instance has minimum and maximum storage requirements depending on the storage type and the database engine it supports. It's important to have sufficient storage so that your databases have room to grow. Also, sufficient storage makes sure that features for the DB engine have room to write content or log entries. For more information, see [Amazon RDS DB instance storage](CHAP_Storage.md).

### DB instances in an Amazon Virtual Private Cloud (Amazon VPC)
<a name="Welcome.Concepts.DBInstance.VPC"></a>

You can run a DB instance on a virtual private cloud (VPC) using the Amazon Virtual Private Cloud (Amazon VPC) service. When you use a VPC, you have control over your virtual networking environment. You can choose your own IP address range, create subnets, and configure routing and access control lists. 

The basic functionality of Amazon RDS is the same whether it's running in a VPC or not. Amazon RDS manages backups, software patching, automatic failure detection, and recovery. There's no additional cost to run your DB instance in a VPC. For more information on using Amazon VPC with RDS, see [Amazon VPC and Amazon RDS](USER_VPC.md). 

Amazon RDS uses Network Time Protocol (NTP) to synchronize the time on DB instances.

## AWS Regions and Availability Zones
<a name="Welcome.Concepts.Regions"></a>

Amazon cloud computing resources are housed in highly available data center facilities in different areas of the world (for example, North America, Europe, or Asia). Each data center location is called an AWS Region. With Amazon RDS, you can create your DB instances in multiple Regions.

The following scenario shows an RDS DB instance in one Region that replicates asynchronously to a standby DB instance in a different Region. If one Region becomes unavailable, the instance in the other Region is still available.

![Cross-Region read replica configuration.](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/images/read-replica-cross-region.png)


### Availability Zones
<a name="Welcome.Concepts.Regions.AZ"></a>

Each AWS Region contains multiple distinct locations called Availability Zones, or AZs. Each Availability Zone is engineered to be isolated from failures in other Availability Zones. Each is engineered to provide inexpensive, low-latency network connectivity to other Availability Zones in the same AWS Region. By launching DB instances in separate Availability Zones, you can protect your applications from the failure of a single location. For more information, see [Regions, Availability Zones, and Local Zones](Concepts.RegionsAndAvailabilityZones.md).

### Multi-AZ deployments
<a name="Welcome.Concepts.Regions.MAZ"></a>

You can run your DB instance in several Availability Zones, an option called a Multi-AZ deployment. When you choose this option, Amazon automatically provisions and maintains one or more secondary standby DB instances in a different AZ. Your primary DB instance is replicated across Availability Zones to each secondary DB instance.

A Multi-AZ deployment provides the following advantages:
+ Providing data redundancy and failover support
+ Eliminating I/O freezes
+ Minimizing latency spikes during system backups
+ Serving read traffic on secondary DB instances (Multi-AZ DB clusters deployment only)

The following diagram depicts a Multi-AZ DB instance deployment, where Amazon RDS automatically provisions and maintains a synchronous standby replica in a different Availability Zone. The replica database doesn't serve read traffic.

![High availability scenario for a Multi-AZ instance deployment.](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/images/con-multi-AZ.png)


The following diagram depicts a Multi-AZ DB cluster deployment, which has a writer DB instance and two reader DB instances in three separate Availability Zones in the same AWS Region. All three DB instances can serve read traffic.

![High availability scenario for a Multi-AZ cluster deployment.](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/images/multi-az-db-cluster.png)


For more information, see [Configuring and managing a Multi-AZ deployment for Amazon RDS](Concepts.MultiAZ.md).

## Access control with security groups
<a name="Welcome.Concepts.SecurityGroups"></a>

A *security group *controls the access to a DB instance by allowing access to IP address ranges or Amazon EC2 instances that you specify. You can apply a security group to one or more DB instances.

A common use of a DB instance in a VPC is to share data with an application server in the same VPC. The following example uses VPC security group `ec2-rds-x` to define inbound rules that use the IP addresses of the client application as the source. The application server belongs to this security group. A second security group named `rds-ec2-x` specifies `ec2-rds-x` as the source and attaches to an RDS DB instance. According to the security group rules, client applications can't directly access the DB instance, but the EC2 instance can access the DB instance.

![DB instance and EC2 instance in a VPC.](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/images/con-VPC-sec-grp.png)


For more information about security groups, see [Security in Amazon RDS ](UsingWithRDS.md).

## Amazon RDS monitoring
<a name="Welcome.Monitoring"></a>

Monitoring is an important part of maintaining the reliability, availability, and performance of Amazon RDS and your other AWS solutions. AWS provides various monitoring tools to watch Amazon RDS, report when something is wrong, and take automatic actions when appropriate.

You can track the performance and health of your DB instances using various automated and manual tools:

**Amazon RDS DB instance status and recommendations**  
View details about the current status of your instance by using the Amazon RDS console, AWS CLI, or RDS API. You can also respond to automated recommendations for database resources, such as DB instances, read replicas, and DB parameter groups. For more information, see [Recommendations from Amazon RDS](monitoring-recommendations.md).

**Amazon CloudWatch metrics for Amazon RDS**  
You can use the Amazon CloudWatch service to monitor the performance and health of a DB instance. CloudWatch performance charts are shown in the Amazon RDS console. Amazon RDS automatically sends metrics to CloudWatch every minute for each active database. You don't get additional charges for Amazon RDS metrics in CloudWatch.  
Using Amazon CloudWatch alarms, you can watch a single Amazon RDS metric over a specific time period. You can then perform one or more actions based on the value of the metric relative to a threshold that you set. For more information, see [Monitoring Amazon RDS metrics with Amazon CloudWatch](monitoring-cloudwatch.md).

**Amazon RDS Performance Insights and operating-system monitoring**  
Performance Insights assesses the load on your database, and determine when and where to take action. For more information, see [Monitoring DB load with Performance Insights on Amazon RDS](USER_PerfInsights.md). Amazon RDS Enhanced Monitoring looks at metrics in real time for the operating system. For more information, see [Monitoring OS metrics with Enhanced Monitoring](USER_Monitoring.OS.md).

**Integrated AWS services**  
Amazon RDS is integrated with Amazon EventBridge, Amazon CloudWatch Logs, and Amazon DevOps Guru. For more information, see [Monitoring metrics in an Amazon RDS instance](CHAP_Monitoring.md). 

## User interfaces to Amazon RDS
<a name="Welcome.Interfaces"></a>

You can interact with Amazon RDS in multiple ways.

**Topics**
+ [AWS Management Console](#Welcome.Interfaces.Console)
+ [Command line interface](#Welcome.Interfaces.CLI)
+ [Amazon RDS APIs](#Welcome.Interfaces.API)

### AWS Management Console
<a name="Welcome.Interfaces.Console"></a>

The AWS Management Console is a simple web-based user interface. You can manage your DB instances from the console with no programming required. To access the Amazon RDS console, sign in to the AWS Management Console and open the Amazon RDS console at [https://console.aws.amazon.com/rds/](https://console.aws.amazon.com/rds/). 

![Home page of the RDS console with navigation links and resource listings.](http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/images/rds_console.png)


### Command line interface
<a name="Welcome.Interfaces.CLI"></a>

You can use the AWS Command Line Interface (AWS CLI) to access the Amazon RDS API interactively. To install the AWS CLI, see [Installing the AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/installing.html). To begin using the AWS CLI for RDS, see [AWS Command Line Interface reference for Amazon RDS](https://docs.aws.amazon.com/cli/latest/reference/rds/index.html). 

### Amazon RDS APIs
<a name="Welcome.Interfaces.API"></a>

If you are a developer, you can access the Amazon RDS programmatically using APIs. For more information, see [Amazon RDS API reference](ProgrammingGuide.md). 

For application development, we recommend that you use one of the AWS Software Development Kits (SDKs). The AWS SDKs handle low-level details such as authentication, retry logic, and error handling, so that you can focus on your application logic. AWS SDKs are available for a wide variety of languages. For more information, see [Tools for Amazon web services ](https://aws.amazon.com/tools/). 

AWS also provides libraries, sample code, tutorials, and other resources to help you get started more easily. For more information, see [Sample code & libraries](https://aws.amazon.com/code). 

## How you are charged for Amazon RDS
<a name="Welcome.Costs"></a>

When you use Amazon RDS, you can choose to use on-demand DB instances or reserved DB instances. For more information, see [DB instance billing for Amazon RDS ](User_DBInstanceBilling.md). 

For Amazon RDS pricing information, see the [Amazon RDS product page](https://aws.amazon.com/rds/pricing).

## AWS Free Tier on Amazon RDS
<a name="free-tier-limitations"></a>

You can use AWS Free Tier on Amazon RDS with the following engines and DB instance classes:
+ **Engine types** – MariaDB, MySQL, PostgreSQL, or SQL Server Express Edition
+ **DB instance classes** 
  + **t3.micro** – For all engine types
  + **t4g.micro** – For all engine types except SQL Server Express Edition

You can't use the following features, resources, and actions with AWS Free Tier on Amazon RDS:
+ Amazon RDS custom engine options
+ Reserved DB instances
+ Deployment options other than Single-AZ
+ Migrating snapshots
+ Query editor
+ Creating Aurora read replicas

These limitations are subject to change as the AWS Free Tier program evolves. For more information about AWS Free Tier, see [Explore AWS services with AWS Free Tier](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier.html). For more information about Amazon RDS Free Tier, see [Amazon RDS Free Tier](https://aws.amazon.com/rds/free/).

If you were an AWS Free Tier customer before July 17, 2025, you can continue to use Amazon RDS Free Tier until the 12 months of your free usage expires. During this time period, you remain eligible for the following usage:
+ 750 hours each month of Single-AZ db.t3.micro and db.t4g.micro instance classes running MySQL, MariaDB, or PostgreSQL on Amazon RDS
+ 750 hours each month of a db.t3.micro instance class running SQL Server Express Edition on Amazon RDS

After July 17, 2025, any new AWS Free Tier resources that you create on AWS will use the new AWS Free Tier offering.

## What's next?
<a name="Welcome.WhatsNext"></a>

The preceding section introduced you to the basic infrastructure components that RDS offers. What should you do next? 

### Getting started
<a name="Welcome.WhatsNext.GettingStarted"></a>

Create a DB instance using instructions in [Getting started with Amazon RDS](CHAP_GettingStarted.md). 

### Topics specific to database engines
<a name="Welcome.WhatsNext.DBTopics"></a>

You can review information specific to a particular DB engine in the following sections:
+ [Amazon RDS for Db2](CHAP_Db2.md)
+ [Amazon RDS for MariaDB](CHAP_MariaDB.md)
+ [Amazon RDS for Microsoft SQL Server](CHAP_SQLServer.md)
+ [Amazon RDS for MySQL](CHAP_MySQL.md)
+ [Amazon RDS for Oracle](CHAP_Oracle.md)
+ [Amazon RDS for PostgreSQL](CHAP_PostgreSQL.md)