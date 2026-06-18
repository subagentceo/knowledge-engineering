

AWS Snowball Edge is no longer available to new customers. New customers should explore [AWS DataSync](https://aws.amazon.com/datasync/) for online transfers, [AWS Data Transfer Terminal](https://aws.amazon.com/data-transfer-terminal/) for secure physical transfers, or AWS Partner solutions. For edge computing, explore [AWS Outposts](https://aws.amazon.com/outposts/). 

# What is Snowball Edge?
<a name="whatisedge"></a>

Snowball Edge is a device with on-board storage and compute power for select AWS capabilities. Snowball Edge can process data locally, run edge-computing workloads, and transfer data to or from the AWS Cloud.

Each Snowball Edge device can transport data at speeds faster than the internet. This transport is done by shipping the data in the devices through a regional carrier. The appliances are rugged, complete with E Ink shipping labels. 

Snowball Edge devices have two options for device configurations—*Storage Optimized 210 TB* and *Compute Optimized*. When this guide refers to Snowball Edge devices, it's referring to all options of the device. When specific information applies only to one or more optional configurations of devices, it is called out specifically. For more information, see [Snowball Edge device configurations](device-differences.md#device-options).

**Topics**
+ [Snowball Edge features](#edge-feature-overview)
+ [Services related to Snowball Edge](#edge-related)
+ [Accessing the Snowball Edge service](#accessing-service)
+ [Pricing for the Snowball Edge](#pricing-for-edge)
+ [AWS monitoring of Snowball Edge](#device-monitoring)
+ [Resources for first-time AWS Snowball Edge users](#first-time-user)
+ [AWS Snowball Edge device hardware information](device-differences.md)
+ [Prerequisites for using Snowball Edge](snowball-prereqs.md)

## Snowball Edge features
<a name="edge-feature-overview"></a>

Snowball Edge devices have the following features:
+ Large amounts of storage capacity or compute functionality for devices. This depends on the options you choose when you create your job.
+ Network adapters with transfer speeds of up to 100 Gbit/second.
+ Encryption is enforced, protecting your data at rest and in physical transit.
+ You can import or export data between your local environments and Amazon S3, and physically transport the data with one or more devices without using the internet.
+ Snowball Edge devices are their own rugged box. The built-in E Ink display changes to show your shipping label when the device is ready to ship.
+ Snowball Edge devices come with an on-board LCD display that can be used to manage network connections and get service status information.
+ You can cluster Snowball Edge devices for local storage and compute jobs to achieve data durability across 3 to 16 devices and locally grow or shrink storage on demand.
+ You can use Amazon EKS Anywhere on Snowball Edge devices for Kubernetes workloads.
+ Snowball Edge devices have Amazon S3 and Amazon EC2 compatible endpoints available, enabling programmatic use cases.
+ Snowball Edge devices support the new `sbe1`, `sbe-c`, and `sbe-g` instance types, which you can use to run compute instances on the device using Amazon Machine Images (AMIs).
+ Snowball Edge supports these data transfer protocols for data migration:
  + NFSv3
  + NFSv4
  + NFSv4.1
  + Amazon S3 over HTTP or HTTPS (via API compatible with AWS CLI version 1.16.14 and earlier)

## Services related to Snowball Edge
<a name="edge-related"></a>

You can use an AWS Snowball Edge device with the following related AWS services:
+ **Amazon S3 adapter** — Use for programmatic data transfer in to and out of AWS using the Amazon S3 API for Snowball Edge, which supports a subset of Amazon S3 API operations. In this role, data is transferred to the Snow device by AWS on your behalf and the device is shipped to you (for an export job), or AWS ships an empty Snow device to you and you transfer data from your on-premises sources to the device and ship it back to AWS (for an import job)" 
+ **Amazon S3 compatible storage on Snowball Edge** — Use to support the data needs of compute services such as Amazon EC2, Amazon EKS Anywhere on Snow, and others. This feature is available on Snowball Edge devices and provides an expanded Amazon S3 API set and features such as increased resiliency with flexible cluster setup for 3 to 16 nodes, local bucket management, and local notifications.
+ **Amazon EC2** – Run compute instances on a Snowball Edge device using the Amazon EC2 compatible endpoint, which supports a subset of the Amazon EC2 API operations. For more information about using Amazon EC2 in AWS, see [Getting started with Amazon EC2 Linux instances](https://docs.aws.amazon.com/AWSEC2/latest/GettingStartedGuide/).
+ **Amazon EKS Anywhere on Snow** – Create and operate Kubernetes clusters on Snowball Edge devices. See [Using Amazon EKS Anywhere on AWS Snow](using-eksa.md).
+ **AWS Lambda powered by AWS IoT Greengrass** – Invoke Lambda functions based on Amazon S3 compatible storage on Snowball Edge storage actions made on an AWS Snowball Edge device. For more information about using Lambda, see [Using AWS Lambda with an AWS Snowball Edge](using-lambda.md) and the [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/).
+ **Amazon Elastic Block Store (Amazon EBS)** – Provide block-level storage volumes for use with EC2-compatible instances. For more information, see [Amazon Elastic Block Store (Amazon EBS)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AmazonEBS.html).
+ **AWS Identity and Access Management (IAM)** – Use this service to securely control access to AWS resources. For more information, see [What is IAM?](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html)
+ **AWS Security Token Service (AWS STS)** – Request temporary, limited-privilege credentials for IAM users or for users that you authenticate (federated users). For more information, see [Temporary security credentials in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html).
+ **Amazon EC2 Systems Manager** – Use this service to view and control your infrastructure on AWS. For more information, see [What is AWS Systems Manager?](https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html)

## Accessing the Snowball Edge service
<a name="accessing-service"></a>

You can use the [AWS Snow Family Management Console](https://console.aws.amazon.com/snowfamily/home) or the job management API to create and manage jobs. For more information about using the [AWS Snow Family Management Console](https://console.aws.amazon.com/snowfamily/home), see [Getting started with Snowball Edge](getting-started.md). For information about the job management API, see [Job Management API Reference for Snowball Edge](https://docs.aws.amazon.com/snowball/latest/api-reference/api-reference.html).

### Accessing an AWS Snowball Edge device
<a name="accessing-edge"></a>

After your Snowball Edge device is onsite, you can configure it with an IP address using the LCD screen then you can unlock the device using the Snowball Edge client or AWS OpsHub. Then, you run can perform data transfer or edge compute tasks. For more information, see [Receiving the Snowball Edge](https://docs.aws.amazon.com/snowball/latest/developer-guide/receive-device.html).

## Pricing for the Snowball Edge
<a name="pricing-for-edge"></a>

For information about the pricing and fees associated with the service and its devices, see [AWS Snowball Edge Pricing.](https://aws.amazon.com/snowball/pricing/)

## AWS monitoring of Snowball Edge
<a name="device-monitoring"></a>

AWS will monitor the Snow device and may collect metrics and usage information when the Snow device is connected to an AWS Region. If the Snow device is not connected to the AWS Region, then AWS will not monitor the Snow device.

If AWS detects an irreparable issue, and there is a need to replace physical equipment, AWS will notify you. You can then place a replacement job that we will ship to your site. There is no additional charge for this, as Snow device monitoring is included as part of the Snow device service fee.

## Resources for first-time AWS Snowball Edge users
<a name="first-time-user"></a>

If you are a first-time user of the AWS Snowball Edge service, we recommend that you read the following sections in order:

1. For information about device types and options, see [AWS Snowball Edge device hardware information](device-differences.md).

1. To learn more about the types of jobs, see [Understanding Snowball Edge jobs](jobs.md).

1. For an end-to-end overview of how to use an AWS Snowball Edge device, see [How AWS Snowball Edge works](how-it-works.md).

1. When you're ready to get started, see [Getting started with Snowball Edge](getting-started.md).

1. For information about using compute instances on a device, see [Using Amazon EC2-compatible compute instances on Snowball Edge](using-ec2.md).