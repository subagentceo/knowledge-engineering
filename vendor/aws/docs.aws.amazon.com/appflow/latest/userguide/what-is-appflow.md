

# What is Amazon AppFlow?
<a name="what-is-appflow"></a>

Amazon AppFlow is a fully-managed integration service that enables you to securely exchange data between software as a service (SaaS) applications, such as Salesforce, and AWS services, such as Amazon Simple Storage Service (Amazon S3) and Amazon Redshift. For example, you can ingest contact records from Salesforce to Amazon Redshift or pull support tickets from Zendesk to an Amazon S3 bucket. The following diagram illustrates how it works:

![Amazon AppFlow overview page.](http://docs.aws.amazon.com/appflow/latest/userguide/images/whatis-appflow.png)


In addition to this User Guide, you can also refer to the [Amazon AppFlow API Reference](https://docs.aws.amazon.com/appflow/1.0/APIReference/Welcome.html).

Amazon AppFlow enables you to do the following:
+ **Get started quickly** — Create data flows to transfer data between a source and destination in minutes, without writing any code.
+ **Keep your data in sync** — Run flows on demand or on a schedule to keep data in sync across your SaaS applications and AWS services.
+ **Bring your data together** — Aggregate data from multiple sources so that you can train your analytics tools more effectively and save money.
+ **Keep track of your data** — Use Amazon AppFlow flow management tools to monitor what data has moved where and when.
+ **Keep your data secure** — Security is a top priority. We encrypt your data at rest and in transit.
+ **Transfer data privately** — Amazon AppFlow integrates with AWS PrivateLink to provide private data transfer over AWS infrastructure instead of public data transfer over the internet.
+ **Catalog your data for search and discovery** — Catalog the data that you transfer to Amazon S3 in the AWS Glue Data Catalog. When you catalog your data, you make it easier to discover and access with AWS analytics and machine learning services.
+ **Organize transferred data into partitions and files** — Use partition and aggregation settings to optimize query performance for applications that access the data that you transfer.
+ **Develop custom connectors** — Use the Amazon AppFlow Custom Connector SDKs to build connectors for data sources that aren't already integrated with the service. With custom connectors, you can transfer data between private APIs, on-premise systems, other cloud services, and AWS. The SDKs are available on GitHub:
  + [Amazon AppFlow Custom Connector SDK (Python)](https://github.com/awslabs/aws-appflow-custom-connector-python)
  + [Amazon AppFlow Custom Connector SDK (Java)](https://github.com/awslabs/aws-appflow-custom-connector-java)

For a list of Amazon AppFlow Regions, see [Amazon AppFlow Regions and Endpoints](https://docs.aws.amazon.com/general/latest/gr/appflow.html) in the *AWS General Reference*.

## Use cases
<a name="w2aab5c15"></a>

Following are some example uses cases that illustrate the benefits of using Amazon AppFlow.

**Transfer Salesforce opportunities to Amazon Redshift tables**  
 Create a flow triggered on each new record created in Salesforce Cloud that calculates the sales potential and then transfers the modified record to an Amazon Redshift table. 

**Analyze Slack conversations**  
 Create a flow triggered on a schedule that transfers conversation data from a Slack channel to Amazon Redshift, Snowflake, or Amazon S3 for storage and analysis. 

**Transfer support tickets from Zendesk for storage and analysis**  
 Create a manually triggered flow for all tickets with a common case number in Zendesk that transfers ticket data to Amazon Redshift, Snowflake, or Amazon S3 for storage and analysis. 

**Transfer aggregate data weekly to S3 at 100GB per flow**  
 Create a flow triggered on a weekly schedule to transfer Salesforce, Marketo, ServiceNow, and Zendesk data to Amazon S3 in aggregate up to 100GB per flow with low latency. 

## Related AWS services
<a name="related-services"></a>

You can use the following services with Amazon AppFlow.

**AWS CloudTrail**  
 Amazon AppFlow is integrated with AWS CloudTrail, a service that provides a record of actions taken by a user, role, or an AWS service in Amazon AppFlow. CloudTrail captures all API calls for Amazon AppFlow as events. The calls captured include calls from the Amazon AppFlow console and code calls to the Amazon AppFlow API operations. If you create a trail, you can enable continuous delivery of CloudTrail events to an Amazon S3 bucket, including events for Amazon AppFlow. If you don't configure a trail, you can still view the most recent events in the CloudTrail console in **Event history**. Using the information collected by CloudTrail, you can determine the request that was made to Amazon AppFlow, the IP address from which the request was made, who made the request, when it was made, and additional details. For more information, see [Logging Amazon AppFlow API calls with AWS CloudTrail](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html) in the *Amazon AppFlow User Guide*. 

**AWS CloudFormation**  
AWS CloudFormation provides a common language for you to model and provision AWS and third party application resources in your cloud environment. AWS CloudFormation allows you to use programming languages or a simple text file to model and provision, in an automated and secure manner, all the resources needed for your applications across all regions and accounts. This gives you a single source of truth for your AWS and third party resources. Amazon AppFlow supports AWS CloudFormation for creating and configuring Amazon AppFlow resources along with the rest of your AWS infrastructure—in a secure, efficient, and repeatable way. For more information, see [AWS::AppFlow::ConnectorProfile](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-connectorprofile.html) and [AWS::AppFlow::Flow](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appflow-flow.html) in the *AWS CloudFormation User Guide*. 

**Amazon EventBridge**  
Amazon AppFlow integrates with Amazon EventBridge to receive events from Amazon AppFlow sources such as Salesforce. This enables you to publish events ingested by Amazon AppFlow to a partner event bus in Amazon EventBridge. Amazon AppFlow supports the ingestion of Salesforce Platform events and Change Data Capture events. You can configure rules in Amazon EventBridge to match patterns from events such as those from Salesforce, and then route them to AWS services such as AWS Lambda, AWS Step Functions, Amazon Simple Queue Service, and others. You can also use Amazon AppFlow’s private data transfer option to ensure that events don't get exposed to the public internet during transfers between AWS and Salesforce, improving security and minimizing risks of Internet-based attack vectors. For more information, see the [Amazon EventBridge documentation page](https://docs.aws.amazon.com/appflow/latest/userguide/requirements.html#EventBridge) in the *Amazon AppFlow User Guide*.

**AWS Identity and Access Management (IAM)**  
IAM is an AWS service that helps an administrator securely control access to AWS resources. Amazon AppFlow integrates with the IAM service so that you can control who in your organization has access to Amazon AppFlow. For more information, see [AWS Identity and Access Management for Amazon AppFlow](https://docs.aws.amazon.com/appflow/latest/userguide/security-iam.html) in the *Amazon AppFlow User Guide*. 