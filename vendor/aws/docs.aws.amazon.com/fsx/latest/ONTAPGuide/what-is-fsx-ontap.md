

# What is Amazon FSx for NetApp ONTAP?
<a name="what-is-fsx-ontap"></a>

Amazon FSx for NetApp ONTAP is a fully managed service that provides highly reliable, scalable, high-performing, and feature-rich file storage built on NetApp's popular ONTAP file system. FSx for ONTAP combines the familiar features, performance, capabilities, and API operations of NetApp file systems with the agility, scalability, and simplicity of a fully managed AWS service.

FSx for ONTAP provides feature-rich, fast, and flexible shared file storage that’s broadly accessible from Linux, Windows, and macOS compute instances running in AWS or on premises. FSx for ONTAP offers high-performance solid state drive (SSD) storage with submillisecond latencies. With FSx for ONTAP, you can achieve SSD levels of performance for your workload while paying for SSD storage for only a small fraction of your data.

Managing your data with FSx for ONTAP is easier because you can snapshot, clone, and replicate your files with the click of a button. In addition, FSx for ONTAP automatically tiers your data to lower-cost, elastic storage, lessening the need for you to provision or manage capacity. 

FSx for ONTAP also provides highly available and durable storage with fully managed backups and support for cross-Region disaster recovery. To make it easier to protect and secure your data, FSx for ONTAP supports popular data security and antivirus applications. 

For customers who use NetApp ONTAP on-premises, FSx for ONTAP is an ideal solution to migrate, back up, or burst your file-based applications from on-premises to AWS without the need to change your application code or how you manage your data.

As a fully managed service, FSx for ONTAP makes it easier to launch and scale reliable, high-performing, and secure shared file storage in the cloud. With FSx for ONTAP, you no longer have to worry about:
+ Setting up and provisioning file servers and storage volumes
+ Replicating data
+ Installing and patching file server software
+ Detecting and addressing hardware failures
+ Managing failover and failback
+ Manually performing backups

FSx for ONTAP also provides rich integration with other AWS services, such as AWS Identity and Access Management (IAM), Amazon WorkSpaces, AWS Key Management Service (AWS KMS), and AWS CloudTrail.

**Topics**
+ [Features of FSx for ONTAP](#features-overview)
+ [Security and data protection](#security-considerations)
+ [Monitoring tools](#monitoring-tools)
+ [Pricing for FSx for ONTAP](#pricing-for-fsx-ontap)
+ [FSx for ONTAP on AWS re:Post](#forums)
+ [Are you a first-time Amazon FSx user?](#first-time-user)

## Features of FSx for ONTAP
<a name="features-overview"></a>

With FSx for ONTAP, you get a fully managed file storage solution with:
+ Support for petabyte-scale datasets in a single namespace
+ Up to tens of gigabytes per second (GBps) of [throughput per file system](managing-throughput-capacity.md)
+ Multi-protocol [access to data](supported-fsx-clients.md) using the Network File System (NFS), Server Message Block (SMB), Internet Small Computer Systems Interface (iSCSI), and Non-Volatile Memory Express (NVMe) protocols
+ Highly available and durable [Multi-AZ and Single-AZ](high-availability-AZ.md) deployment options
+ Automatic data-tiering that reduces storage costs by automatically transitioning infrequently accessed data to a lower-cost storage tier based on your access patterns
+ Data compression, deduplication, and compaction to reduce your storage consumption
+ Support for two [network type options](manage-network-type.md), IPv4-only and dual-stack (which supports both IPv4 and IPv6), to access and manage your file system
+ Support for NetApp's [SnapMirror replication](scheduled-replication.md) feature
+ Support for NetApp's FlexCache on-premises caching solution
+ Support for access and management using native AWS or NetApp tools and API operations
  + AWS Management Console, AWS Command Line Interface (AWS CLI), and SDKs
  + [NetApp ONTAP CLI, REST API, and NetApp Console](managing-resources-ontap-apps.md)

## Security and data protection
<a name="security-considerations"></a>

The shared responsibility model is employed as it relates to [Security in Amazon FSx for NetApp ONTAP](security.md). Amazon FSx provides multiple levels of security and [compliance](fsx-ontap-compliance.md) to facilitate protecting your data. 

FSx for ONTAP supports the following data protection, security, and access control features:
+ [Encrypting data at rest](encryption-at-rest.md) for file system data and backups using AWS KMS keys
+ Encrypting data in transit using:
  + [SMB Kerberos](encryption-in-transit.md#kerberos-encryption)
  + [IPSEC](encryption-in-transit.md#ipsec-encryption)
  + [Nitro-based](encryption-in-transit.md#nitro-encryption) encryption
+ On-demand [antivirus scanning](using-vscan.md)
+ Authentication and authorization using [Microsoft Active Directory](ad-integration-ontap.md)
+ [File access auditing](file-access-auditing.md)
+ [NetAppSnapLock](snaplock.md) WORM with Compliance and Enterprise retention modes

For more information, see [Data protection in Amazon FSx for NetApp ONTAP](data-protection.md) and [Protecting your data](protecting-data.md).

Additionally, Amazon FSx protects your data with highly durable file system backups. Amazon FSx performs automatic daily backups, and you can take additional backups at any point. For more information, see [Protecting your data](protecting-data.md).

## Monitoring tools
<a name="monitoring-tools"></a>

Monitoring tools include [CloudWatch](monitoring-cloudwatch.md), [CloudTrail](logging-using-cloudtrail-win.md), [ONTAP EMS events](ems-events.md), [NetApp Data Infrastructure Insights](monitoring-cloud-insights.md), and [NetApp Harvest](monitoring-harvest-grafana.md).

## Pricing for FSx for ONTAP
<a name="pricing-for-fsx-ontap"></a>

You are billed for file systems based on the following categories:
+ SSD storage capacity (per gigabyte-month, or GB-month)
+ SSD IOPS that you provision above three IOPS/GB (per IOPS-month)
+ Throughput capacity (per megabytes per second [MBps]-month)
+ Capacity pool storage consumption (per GB-month)
+ Capacity pool requests (per read and write)
+ Backup storage consumption (per GB-month)

For more information about pricing and fees associated with the service, see [Amazon FSx for NetApp ONTAP pricing](https://aws.amazon.com/fsx/netapp-ontap/pricing/).

## FSx for ONTAP on AWS re:Post
<a name="forums"></a>

If you encounter issues while using Amazon FSx, use [AWS re:Post](https://forums.aws.amazon.com/forum.jspa?forumID=402) to get answers to your FSx for ONTAP questions.

## Are you a first-time Amazon FSx user?
<a name="first-time-user"></a>

If you're a first-time user of Amazon FSx, we recommend that you read the following sections in order:

1. If you're new to AWS, see [Setting up FSx for ONTAP](getting-started.md#setting-up) to set up an AWS account.

1. If you're ready to create your first Amazon FSx file system, follow the instructions in [Getting started with Amazon FSx for NetApp ONTAP](getting-started.md).

1. For information about performance, see [Amazon FSx for NetApp ONTAP performancePerformance](performance.md).

1. For Amazon FSx security details, see [Security in Amazon FSx for NetApp ONTAP](security.md).

1. For information about the Amazon FSx API, see the [Amazon FSx API Reference](https://docs.aws.amazon.com/fsx/latest/APIReference/Welcome.html).