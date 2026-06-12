

# What Is AWS CloudTrail?
<a name="cloudtrail-user-guide"></a>

**Tip**  
If you use CloudTrail data events, you can learn advanced monitoring techniques through the [Cloud Operations Enablement workshop and event series](https://aws-experience.com/amer/smb/events/series/Cloud-Operations-Enablement), and [Using CloudTrail for Security and AI Best Practices](https://aws-samples.github.io/cloud-operations-best-practices/docs/recipes/AWS%20CloudTrail/).

AWS CloudTrail is an AWS service that helps you enable operational and risk auditing, governance, and compliance of your AWS account. Actions taken by a user, role, or an AWS service are recorded as events in CloudTrail. Events include actions taken in the AWS Management Console, AWS Command Line Interface, and AWS SDKs and APIs.

CloudTrail provides three ways to record events:
+ **Event history** – The **Event history** provides a viewable, searchable, downloadable, and immutable record of the past 90 days of management events in an AWS Region. You can search events by filtering on a single attribute. You automatically have access to the **Event history** when you create your account. For more information, see [Working with CloudTrail event history](view-cloudtrail-events.md).

  There are no CloudTrail charges for viewing the **Event history**.
+ **CloudTrail Lake** – [AWS CloudTrail Lake](cloudtrail-lake.md) is a managed data lake for capturing, storing, accessing, and analyzing user and API activity on AWS for audit and security purposes. CloudTrail Lake converts existing events in row-based JSON format to [ Apache ORC](https://orc.apache.org/) format. ORC is a columnar storage format that is optimized for fast retrieval of data. Events are aggregated into *event data stores*, which are immutable collections of events based on criteria that you select by applying advanced event selectors. You can keep the event data in an event data store for up to 3,653 days (about 10 years) if you choose the **One-year extendable retention pricing** option, or up to 2,557 days (about 7 years) if you choose the **Seven-year retention pricing** option. You can create an event data store for a single AWS account or for multiple AWS accounts by using AWS Organizations. You can import any existing CloudTrail logs from your S3 buckets into an existing or new event data store. You can also visualize top CloudTrail event trends with [Lake dashboards](lake-dashboard.md). For more information, see [Working with AWS CloudTrail Lake](cloudtrail-lake.md).

  CloudTrail Lake event data stores and queries incur charges. When you create an event data store, you choose the [pricing option](cloudtrail-lake-manage-costs.md#cloudtrail-lake-manage-costs-pricing-option) you want to use for the event data store. The pricing option determines the cost for ingesting and storing events, and the default and maximum retention period for the event data store. When you run queries in Lake, you pay based upon the amount of data scanned. For information about CloudTrail pricing and managing Lake costs, see [AWS CloudTrail Pricing](https://aws.amazon.com/cloudtrail/pricing/) and [Managing CloudTrail Lake costs](cloudtrail-lake-manage-costs.md).
+ **Trails** – *Trails* capture a record of AWS activities, delivering and storing these events in an Amazon S3 bucket, with optional delivery to [CloudWatch Logs](send-cloudtrail-events-to-cloudwatch-logs.md) and [Amazon EventBridge](cloudtrail-aws-service-specific-topics.md#cloudtrail-aws-service-specific-topics-eventbridge). You can input these events into your security monitoring solutions. You can also use your own third-party solutions or solutions such as Amazon Athena to search and analyze your CloudTrail logs. You can create trails for a single AWS account or for multiple AWS accounts by using AWS Organizations. You can [log Insights events](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-insights-events-with-cloudtrail.html) to analyze your management events for anomalous behavior in API call rates and error rates. For more information, see [Creating a trail for your AWS account](cloudtrail-create-and-update-a-trail.md).

  You can deliver one copy of your ongoing management events to your S3 bucket at no charge from CloudTrail by creating a trail, however, there are Amazon S3 storage charges. For more information about CloudTrail pricing, see [AWS CloudTrail Pricing](https://aws.amazon.com/cloudtrail/pricing/). For information about Amazon S3 pricing, see [Amazon S3 Pricing](https://aws.amazon.com/s3/pricing/).

Visibility into your AWS account activity is a key aspect of security and operational best practices. You can use CloudTrail to view, search, download, archive, analyze, and respond to account activity across your AWS infrastructure. You can identify who or what took which action, what resources were acted upon, when the event occurred, and other details to help you analyze and respond to activity in your AWS account. 

You can integrate CloudTrail into applications using the API, automate trail or event data store creation for your organization, check the status of event data stores and trails you create, and control how users view CloudTrail events.

## Accessing CloudTrail
<a name="cloudtrail-accessing"></a>

You can work with CloudTrail in any of the following ways.

**Topics**
+ [CloudTrail console](#cloudtrail-accessing-console)
+ [AWS CLI](#cloudtrail-accessing-cli)
+ [CloudTrail APIs](#cloudtrail-accessing-api)
+ [AWS SDKs](#cloudtrail-accessing-sdk)

### CloudTrail console
<a name="cloudtrail-accessing-console"></a>

Sign in to the AWS Management Console and open the CloudTrail console at [https://console.aws.amazon.com/cloudtrail/](https://console.aws.amazon.com/cloudtrail/).

The CloudTrail console provides a user interface for performing many CloudTrail tasks such as:
+ Viewing recent events and event history for your AWS account.
+ Downloading a filtered or complete file of the last 90 days of management events from **Event history**.
+ Creating and editing CloudTrail trails.
+ Creating and editing CloudTrail Lake event data stores.
+ Running queries on event data stores.
+ Configuring CloudTrail trails, including: 
  + Selecting an Amazon S3 bucket for trails.
  + Setting a prefix.
  + Configuring delivery to CloudWatch Logs.
  + Using AWS KMS keys for encryption of trail data.
  + Enabling Amazon SNS notifications for log file delivery on trails.
  + Adding and managing tags for your trails.
+ Configuring CloudTrail Lake event data stores, including:
  + Integrating event data stores with CloudTrail partners or with your own applications, to log events from sources outside of AWS.
  + Federating event data stores to run queries from Amazon Athena.
  + Using AWS KMS keys for encryption of event data store data.
  + Adding and managing tags for your event data stores.

For more information about the AWS Management Console, see [AWS Management Console](https://docs.aws.amazon.com/awsconsolehelpdocs/latest/gsg/learn-whats-new.html).

### AWS CLI
<a name="cloudtrail-accessing-cli"></a>

The AWS Command Line Interface is a unified tool that you can use to interact with CloudTrail from the command line. For more information, see the [AWS Command Line Interface User Guide](https://docs.aws.amazon.com/cli/latest/userguide/). For a complete list of CloudTrail CLI commands, see [cloudtrail](https://docs.aws.amazon.com/cli/latest/reference/cloudtrail/) and [cloudtrail-data](https://docs.aws.amazon.com/cli/latest/reference/cloudtrail-data/) in the *AWS CLI Command Reference*.

### CloudTrail APIs
<a name="cloudtrail-accessing-api"></a>

In addition to the console and the CLI, you can also use the CloudTrail RESTful APIs to program CloudTrail directly. For more information, see the [AWS CloudTrail API Reference](https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/Welcome.html) and the [CloudTrail-Data API Reference](https://docs.aws.amazon.com/awscloudtraildata/latest/APIReference/Welcome.html).

### AWS SDKs
<a name="cloudtrail-accessing-sdk"></a>

As an alternative to using the CloudTrail API, you can use one of the AWS SDKs. Each SDK consists of libraries and sample code for various programming languages and platforms. The SDKs provide a convenient way to create programmatic access to CloudTrail. For example, you can use the SDKs to sign requests cryptographically, manage errors, and retry requests automatically. For more information, see the [Tools to Build on AWS](https://aws.amazon.com/developer/tools/) page.