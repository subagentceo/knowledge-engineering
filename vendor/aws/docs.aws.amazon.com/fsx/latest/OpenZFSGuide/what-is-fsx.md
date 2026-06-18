

# What is Amazon FSx for OpenZFS?
<a name="what-is-fsx"></a>

Amazon FSx for OpenZFS is a fully managed file storage service that makes it easy to move data to AWS from on-premises ZFS or other Linux-based file servers. You can do this without changing your application code or how you manage data. It offers highly reliable, scalable, performance, and feature-rich file storage built on the open-source OpenZFS file system. It combines these capabilities with the agility, scalability, and simplicity of a fully managed AWS service.

Amazon FSx for OpenZFS file systems are broadly accessible from Linux, Windows, and macOS compute instances and containers using the industry-standard NFS protocol (v3, v4.0, v4.1, v4.2). Powered by the latest AWS compute, disk, and networking technologies, including AWS Scalable Reliable Datagram networking and the AWS Nitro system, Amazon FSx for OpenZFS delivers up to 2 million IOPS with latencies of hundreds of microseconds. With complete support for OpenZFS features like instant point-in-time snapshots and data cloning, FSx for OpenZFS makes it easy for you to replace your on-premises file servers with AWS storage that provides familiar file system capabilities and eliminates the need to perform lengthy qualifications and change or re-architect existing applications or tools. What's more, by combining the power of OpenZFS data management capabilities with the high performance and cost efficiency of the latest AWS technologies, FSx for OpenZFS enables you to build and run high-performance, data-intensive applications.

As a fully managed service, FSx for OpenZFS makes it easy to launch, run, and scale fully managed file systems on AWS that replace the file servers you run on premises while helping to provide better agility and lower costs. With Amazon FSx for OpenZFS, you no longer have to worry about setting up and provisioning file servers and storage volumes, replicating data, installing and patching file server software, detecting and addressing hardware failures, or manually performing backups. FSx for OpenZFS also provides rich integration with other AWS services, such as AWS Identity and Access Management IAM, AWS Key Management Service (AWS KMS), Amazon CloudWatch, and AWS CloudTrail.

For a list of AWS Regions in which Amazon FSx for OpenZFS is available, see [Availability by AWS Region](available-aws-regions.md).

**Topics**
+ [Features of Amazon FSx for OpenZFS](#fsx-openzfs-feature-overview)
+ [Security and data protection](#security-considerations)
+ [Availability and durability](#what-is-availability-durability)
+ [Pricing for FSx for OpenZFS](#pricing-for-fsx-openzfs)
+ [Are you a first-time Amazon FSx user?](#first-time-user)

## Features of Amazon FSx for OpenZFS
<a name="fsx-openzfs-feature-overview"></a>

With FSx for OpenZFS, you get a fully managed file storage solution with: 
+ Support for access from Linux, Windows, and macOS compute instances and containers, including those running on AWS or on-premises, via the industry-standard NFS protocol (v3, v4.0, v4.1, and v4.2).
+ Support for two network type options, IPv4-only and dual-stack (which supports both IPv4 and IPv6), to access and manage your file system. You specify a network type when you create an FSx for OpenZFS file system, and you can change the network type of an existing file system at any time. For more information, see [Modifying network type](manage-network-type.md).
+ Support for [Amazon S3 Access Points attached to FSx for OpenZFS volumes](s3accesspoints-for-FSx.md) that you can use to perform S3 object operations.
+ Millions of IOPS with latencies of a few hundred microseconds, and up to 21 GBps of throughput for frequently accessed data from in-memory or NVMe cache. Up to 400,000 IOPS and 10 GBps of read/write throughput (up to 21 GBps compressed) for data accessed from disk. For more information, see [File system performance](performance.md#zfs-fs-performance).
+ Powerful OpenZFS data management capabilities including data compression, near instant point-in-time snapshots, and data cloning, designed for use with the Amazon FSx API.
+ Three levels of availability and durability, with Multi-AZ (HA), Single-AZ (HA), and Single-AZ (non-HA) file systems.
+ Two storage classes: Intelligent-Tiering and SSD storage. The Intelligent-Tiering storage class offers fully elastic, cost-effective storage that is suitable for most workloads, as well as an optional SSD read cache that you can provision. With Intelligent-Tiering, you are billed for the data you store, depending on the size of your dataset, and do not need to specify a file system size. The SSD storage class provides high performance with low-latency access to your full dataset. With SSD storage, you specify a file system size and pay for the amount of storage that you provision.
+ Support for multiple volumes per file system, thin provisioning, and user and group quotas for cost-efficient shared file systems across multiple users and applications.
+ Support for the following data protection and security features:
  + Built-in, fully managed file system backups stored on S3, with support for cross-region backup copies.
  + Near-instant point-in-time OpenZFS snapshots stored locally on each file system.
  + Automatic encryption of file system data and backups at rest using KMS keys.
  + Automatic encryption in-transit when accessed from [supported EC2 instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/data-protection.html#encryption-transit).

## Security and data protection
<a name="security-considerations"></a>

Amazon FSx provides multiple levels of security and compliance to help ensure that your data is protected. It automatically encrypts data at rest in file systems and backups using keys that you manage in AWS Key Management Service (AWS KMS). Encryption of data in transit is automatically enabled when you access an Amazon FSx file system from [ Amazon EC2 instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/data-protection.html#encryption-transit) that support this feature. For more information, see [Data encryption in Amazon FSx for OpenZFS](data-protection.md).

Amazon FSx has been assessed to comply with International Organization for Standardization (ISO), Payment Card Industry Data Security Standard (PCI DSS), and System and Organization Controls (SOC) certifications, and is Health Insurance Portability and Accountability Act of 1996 (HIPAA) eligible. For more information, see [Compliance validation for Amazon FSx for OpenZFS](fsx-openzfs-compliance.md).

Amazon FSx provides access control at the file system level using Amazon Virtual Private Cloud (Amazon VPC) security groups, and at the API level using AWS Identity and Access Management (IAM) access policies. To provide access control at the file and folder level, Amazon FSx supports Unix permissions. Amazon FSx integrates with AWS CloudTrail to monitor and log your Amazon FSx API calls so that you can see actions taken by users on your Amazon FSx resources. For more information, see [Logging FSx for OpenZFS API calls with AWS CloudTrail](logging-using-cloudtrail-win.md).

Additionally, Amazon FSx protects your data with highly durable file system backups. Amazon FSx performs automatic daily backups, and you can take additional backups at any point. For more information, see [Protecting your Amazon FSx for OpenZFS data](protecting-data.md).

## Availability and durability
<a name="what-is-availability-durability"></a>

 FSx for OpenZFS supports three file system deployment types—Multi-AZ (HA), Single-AZ (HA), and Single-AZ (non-HA)—with each one offering a different level of availability and durability:
+ Multi-AZ (HA) file systems offer high availability and high durability by replicating your data and supporting failover across multiple Availability Zones in the same AWS Region, with a separate copy of your data in each Availability Zone. Failover typically completes within 60 seconds.
+ Single-AZ (HA) file systems offer high availability by deploying a primary and standby file system within the same Availability Zone to deliver continuous availability in the event of failover and failback. Failover typically completes within 60 seconds.
+ Single-AZ (non-HA) file systems ensure self-healing recovery within a single Availability Zone by automatically detecting and addressing component failures. Recovery typically completes within 30 minutes.

For more information, see [Availability and durability for Amazon FSx for OpenZFS](availability-durability.md).

## Pricing for FSx for OpenZFS
<a name="pricing-for-fsx-openzfs"></a>

With Amazon FSx, there are no upfront hardware or software costs. You pay for only the resources used, with no minimum commitments, setup costs, or additional fees. For information about the pricing and fees associated with the service, see [FSx for OpenZFS pricing](https://aws.amazon.com/fsx/openzfs/pricing/). 

## Are you a first-time Amazon FSx user?
<a name="first-time-user"></a>

If you're a first-time user of Amazon FSx, we recommend that you read the following sections in order:

1. If you're new to AWS, see [Prerequisites](getting-started.md#getting-started-prerequisites) to set up an AWS account.

1. If you're ready to create your first Amazon FSx file system, follow the instructions in [Setting up an Amazon FSx for OpenZFS file system](getting-started.md).

1. For information about performance, see [Performance for Amazon FSx for OpenZFSPerformance](performance.md).

1. For Amazon FSx security details, see [Security in Amazon FSx for OpenZFS](security.md).

1. For information about the Amazon FSx API, see [Amazon FSx API Reference](https://docs.aws.amazon.com/fsx/latest/APIReference/welcome.html).

1. For information about the Amazon FSx AWS CLI, see [AWS Command Line Interface Command Reference for Amazon FSx](https://docs.aws.amazon.com/cli/latest/reference/fsx/).

1. For more information about pricing and fees associated with the service, see [FSx for OpenZFS pricing](https://aws.amazon.com/fsx/openzfs/pricing/).