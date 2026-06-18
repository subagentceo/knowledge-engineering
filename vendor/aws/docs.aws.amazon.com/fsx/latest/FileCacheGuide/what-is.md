

# What is Amazon File Cache?
<a name="what-is"></a>

Amazon File Cache is a fully managed, high-speed cache on AWS that's used to process file data, regardless of where the data is stored. Amazon File Cache serves as a temporary, high-performance storage location for data that's stored in on-premises file systems, AWS file systems, and Amazon Simple Storage Service (Amazon S3) buckets. You can use this capability to make dispersed datasets available to file-based applications on AWS with a unified view, and at high speeds—sub-millisecond latencies and high throughput.

Amazon File Cache presents data from linked datasets as a unified set of files and directories. It serves data in the cache at consistent high speeds with sub-millisecond latency to applications running on AWS—up to hundreds of GBps of throughput, and up to millions of operations per second, speeding up workload completion times and optimizing compute resource consumption costs. Amazon File Cache automatically loads data into the cache when it’s accessed for the first time and releases data when it’s not used.

With a few clicks in the AWS console, CLI, or API, you can create a high-performance cache. With Amazon File Cache, you don't have to worry about managing file servers and storage volumes, updating hardware, configuring software, running out of capacity, or tuning performance—Amazon File Cache automates these time-consuming administration tasks.

Amazon File Cache is POSIX-compliant, so you can use your current Linux-based applications without having to make any changes. Amazon File Cache provides a native file system interface and works as any file system does with your Linux operating system. It also provides read-after-write consistency and supports file locking.

**Topics**
+ [Amazon File Cache availability](#cache-availability)
+ [Amazon File Cache and data repositories](#data-repo-features)
+ [Deployment and storage type](#deployment-storage-types)
+ [Accessing Amazon File Cache](#compute-access)
+ [Integrations with AWS services](#integration-aws-services)
+ [Security and compliance](#security-compliance)
+ [Assumptions](#assumptions)
+ [Pricing for Amazon File Cache](#pricing)
+ [Are you a first-time user of Amazon File Cache?](#first-time-user)

## Amazon File Cache availability
<a name="cache-availability"></a>

Amazon File Cache is available in the following AWS Regions:
+ US East (N. Virginia)
+ US East (Ohio)
+ US West (Oregon)
+ Canada (Central)
+ Europe (Frankfurt)
+ Europe (Ireland)
+ Europe (London)
+ Europe (Stockholm)
+ Asia Pacific (Hong Kong)
+ Asia Pacific (Mumbai)
+ Asia Pacific (Seoul)
+ Asia Pacific (Tokyo)
+ Asia Pacific (Singapore)
+ Asia Pacific (Sydney)

## Amazon File Cache and data repositories
<a name="data-repo-features"></a>

You can link your cache to data repositories on Amazon S3, or on file systems that support the NFSv3 protocol. The NFS data repository can be on-premises or in the AWS Cloud. You can link a maximum of 8 data repositories, but they must all be of the same repository type (either all Amazon S3 or all NFS). For more information about linking your cache to a data repository, see [Linking your cache to a data repository](create-linked-data-repo.md).

When linked to a data repository, a cache transparently presents Amazon S3 or NFS objects as files and directories. By default, Amazon File Cache automatically loads data into the cache when it’s accessed for the first time. You can optionally pre-load data into the cache before starting your workload. For more information about importing data repository files and directories, see [Importing files from your data repository](importing-files.md).

When the files in your cache are changed (either by users or by your workloads), you can write the cache data back to the data repository. You can use HSM commands to transfer the data and metadata between your cache and its linked data repositories. For more information, see [Exporting changes to the data repository](export-changed-data.md).

## Deployment and storage type
<a name="deployment-storage-types"></a>

Amazon File Cache supports the `CACHE_1` deployment type. When you create a new cache on the AWS Management Console, this deployment type is automatically preset for your cache. For caches using the `CACHE_1` deployment type, data is automatically replicated within the same Availability Zone in which the cache is located, and file servers are replaced if they fail.

Amazon File Cache is built on solid state drive (SSD) storage. SSD storage is suited for low-latency, IOPS-intensive workloads that typically have small, random file operations. For more information about cache performance, see [Amazon File Cache performance](performance.md).

## Accessing Amazon File Cache
<a name="compute-access"></a>

You can mix and match compute instance types and Linux Amazon Machine Images (AMIs) that are connected to a single cache.

 Amazon File Cache is accessible from compute workloads running on Amazon Elastic Compute Cloud (Amazon EC2) instances, on Amazon Elastic Container Service (Amazon ECS) Docker containers, and on containers running on Amazon Elastic Kubernetes Service (Amazon EKS).
+ **Amazon EC2** – You can access your cache from your Amazon EC2 compute instances using the open-source Lustre client. Amazon EC2 instances can access your cache from other Availability Zones within the same Amazon Virtual Private Cloud (Amazon VPC), provided that your networking configuration allows access across subnets within the VPC. After your cache is mounted, you can work with its files and directories as you do when using a local file system.
+ **Amazon ECS** – You can access Amazon File Cache from Amazon ECS Docker containers on Amazon EC2 instances. For more information, see [Mounting from Amazon Elastic Container Service](mounting-ecs.md).
+ **Amazon EKS** – You access Amazon File Cache from containers running on Amazon EKS using the open-source [Amazon File Cache CSI driver](https://docs.aws.amazon.com/eks/latest/userguide/file-cache-csi.html), as described in **Amazon EKS User Guide**. Your containers running on Amazon EKS can use high-performance persistent volumes (PVs) backed by Amazon File Cache.

Amazon File Cache is compatible with the most popular Linux-based AMIs, including Amazon Linux 2 and Amazon Linux, Red Hat Enterprise Linux (RHEL), CentOS, Rocky Linux, and Ubuntu. The Lustre client is included with Amazon Linux 2 and Amazon Linux. For RHEL, CentOS, Rocky Linux, and Ubuntu, an AWS Lustre client repository provides clients that are compatible with these operating systems.

For more information about the clients, compute instances, and environments from which you can access your cache, see [Accessing caches](accessing-caches.md).

## Integrations with AWS services
<a name="integration-aws-services"></a>

Amazon File Cache integrates with AWS Batch using Amazon EC2 Launch Templates. You can use AWS Batch to run batch computing workloads on the AWS Cloud, including high performance computing (HPC), machine learning (ML), and other asynchronous workloads. AWS Batch automatically and dynamically sizes instances based on job resource requirements. For more information, see [What Is AWS Batch?](https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html) in the *AWS Batch User Guide*.

Amazon File Cache integrates with AWS Thinkbox Deadline. Deadline is an administration and compute management toolkit for Windows, Linux, and macOS based render farms. For more information about Deadline, see the [Deadline User Guide](https://docs.thinkboxsoftware.com/products/deadline/10.1/1_User%20Manual/index-linear.html). 

## Security and compliance
<a name="security-compliance"></a>

Amazon File Cache supports encryption at rest and in transit. Amazon File Cache automatically encrypts cache data at rest using keys managed in the AWS Key Management Service (AWS KMS). Data in transit is also automatically encrypted on caches when accessed from supported Amazon EC2 instances. For more information about data encryption in Amazon File Cache, see [Data encryption in Amazon File Cache](encryption.md). For more information about security, see [Security in Amazon File Cache](security.md).

## Assumptions
<a name="assumptions"></a>

In this guide, we make the following assumptions:
+ If you use Amazon Elastic Compute Cloud (Amazon EC2), we assume that you're familiar with that service. For more information about how to use Amazon EC2, see the [Amazon EC2 documentation](https://docs.aws.amazon.com/ec2).
+ We assume that you're familiar with using Amazon Virtual Private Cloud (Amazon VPC). For more information about how to use Amazon VPC, see the [Amazon VPC User Guide](https://docs.aws.amazon.com/vpc/latest/userguide/).
+ We assume that you haven't changed the rules on the default security group for your VPC based on the Amazon VPC service. If you have, make sure that you add the necessary rules to allow network traffic from your Amazon EC2 instance to your cache. For more details, see [Cache access control with Amazon VPC](limit-access-security-groups.md).

## Pricing for Amazon File Cache
<a name="pricing"></a>

With Amazon File Cache, there are no up front hardware or software costs. You pay only for the resources used, with no minimum commitments, setup costs, or additional fees. For information about the pricing and fees associated with the service, see [Amazon File Cache Pricing](https://aws.amazon.com/filecache/pricing).

## Are you a first-time user of Amazon File Cache?
<a name="first-time-user"></a>

If you are a first-time user of Amazon File Cache, we recommend that you read the following sections in order:

1. If you're ready to create your first cache, try [Getting started with Amazon File Cache](getting-started.md).

1. For information about performance, see [Amazon File Cache performance](performance.md).

1. For information about linking your cache to an Amazon S3 bucket or NFS data repository, see [Using data repositories with Amazon File Cache](using-data-repositories.md).

1. For Amazon File Cache security details, see [Security in Amazon File Cache](security.md).

1. For information about the scalability limits of Amazon File Cache, see [Quotas](limits.md).

1. For information about the Amazon File Cache API, see the [Amazon File Cache API Reference](https://docs.aws.amazon.com/fsx/latest/APIReference/Welcome.html).