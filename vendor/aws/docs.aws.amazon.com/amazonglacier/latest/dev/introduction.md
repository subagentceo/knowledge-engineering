

 **This page is only for existing customers of the Amazon Glacier service using Vaults and the original REST API from 2012.**

If you're looking for archival storage solutions, we recommend using the Amazon Glacier storage classes in Amazon S3, S3 Glacier Instant Retrieval, S3 Glacier Flexible Retrieval, and S3 Glacier Deep Archive. To learn more about these storage options, see [Amazon Glacier storage classes](https://aws.amazon.com/s3/storage-classes/glacier/).

Amazon Glacier (original standalone vault-based service) is no longer accepting new customers. Amazon Glacier is a standalone service with its own APIs that stores data in vaults and is distinct from Amazon S3 and the Amazon S3 Glacier storage classes. Your existing data will remain secure and accessible in Amazon Glacier indefinitely. No migration is required. For low-cost, long-term archival storage, AWS recommends the [Amazon S3 Glacier storage classes](https://aws.amazon.com/s3/storage-classes/glacier/), which deliver a superior customer experience with S3 bucket-based APIs, full AWS Region availability, lower costs, and AWS service integration. If you want enhanced capabilities, consider migrating to Amazon S3 Glacier storage classes by using our [AWS Solutions Guidance for transferring data from Amazon Glacier vaults to Amazon S3 Glacier storage classes](https://aws.amazon.com/solutions/guidance/data-transfer-from-amazon-s3-glacier-vaults-to-amazon-s3/).

# What Is Amazon Glacier?
<a name="introduction"></a>

If you're currently using the Amazon Glacier service and want to learn more, you'll find the information that you need in this guide. Amazon Glacier is a secure and durable service for low-cost data archiving and long-term backup using vaults. For more information about Amazon Glacier service pricing, see [Amazon Glacier pricing](https://aws.amazon.com/s3/glacier/pricing/).

**Topics**
+ [Do You Currently Use Amazon Glacier?](#are-you-a-firsttime-glacier-user)
+ [Amazon Glacier Data Model](amazon-glacier-data-model.md)
+ [Supported Operations in Amazon Glacier](amazon-glacier-supported-operations.md)
+ [Accessing Amazon Glacier](amazon-glacier-accessing.md)

## Do You Currently Use Amazon Glacier?
<a name="are-you-a-firsttime-glacier-user"></a>

**Note**  
This section is about the Amazon Glacier service. If you currently use the Amazon S3 Glacier storage classes (**S3 Glacier Instant Retrieval**, **S3 Glacier Flexible Retrieval**, and **S3 Glacier Deep Archive**), see [Storage classes for archiving objects](https://docs.aws.amazon.com/AmazonS3/latest/userguide/glacier-storage-classes) in the *Amazon S3 User Guide*.

If you currently use the Amazon Glacier service and want to learn more, we recommend that you begin by reading the following sections:

 
+ **What is Amazon Glacier** – The rest of this section describes the underlying data model, the operations it supports, and the AWS SDKs that you can use to interact with the service. 
+ **Getting Started** – The [Getting Started with Amazon Glacier](amazon-glacier-getting-started.md) section walks you through the process of creating a vault, uploading archives, creating jobs to download archives, retrieving the job output, and deleting archives. 
**Important**  
Amazon Glacier does provide a console. However, any archive operation, such as upload, download, or deletion, requires you to use the AWS Command Line Interface (AWS CLI) or write code. There is no console support for archive operations. For example, to upload data, such as photos, videos, and other documents, you must either use the AWS CLI or write code to make requests, by using either the REST API directly or by using the AWS SDKs.   
To install the AWS CLI, see [AWS Command Line Interface](http://aws.amazon.com/cli/). For more information about using Amazon Glacier with the AWS CLI, see the [AWS CLI Reference for Amazon Glacier](http://docs.aws.amazon.com/cli/latest/reference/glacier/index.html). For examples of using the AWS CLI to upload archives to Amazon Glacier, see [Using Amazon Glacier with the AWS Command Line Interface](http://docs.aws.amazon.com/cli/latest/userguide/cli-using-glacier.html). 

Beyond the getting started section, you'll probably want to learn more about Amazon Glacier operations. The following sections provide detailed information about working with Amazon Glacier by using the REST API and the AWS SDKs for Java and Microsoft .NET: 
+ [Using the AWS SDKs with Amazon Glacier](using-aws-sdk.md)

  This section provides an overview of the AWS SDKs used in various code examples in this guide. A review of this section will help when reading the following sections. It includes an overview of the high-level and the low-level APIs that these SDKs offer, when to use them, and common steps for running the code examples provided in this guide. 
+ [Working with Vaults in Amazon Glacier](working-with-vaults.md)

  This section provides details of various vault operations, such as creating a vault, retrieving vault metadata, using jobs to retrieve vault inventory, and configuring vault notifications. In addition to using the Amazon Glacier console, you can use the AWS SDKs for various vault operations. This section describes the API and provides working samples by using the AWS SDK for Java and the AWS SDK for .NET.
+ [Working with Archives in Amazon Glacier](working-with-archives.md)

  This section provides details of archive operations, such as uploading an archive in a single request or using a multipart upload operation to upload large archives in parts. The section also explains how to create jobs to download archives asynchronously. The section provides examples by using the AWS SDK for Java and the AWS SDK for .NET.
+ [API Reference for Amazon Glacier](amazon-glacier-api.md)

  Amazon Glacier is a RESTful service. This section describes the REST operations, including the syntax, and example requests and responses for all the operations. The AWS SDK libraries wrap this API, simplifying your programming tasks. 