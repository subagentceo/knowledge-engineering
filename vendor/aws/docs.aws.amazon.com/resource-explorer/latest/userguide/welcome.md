

# What is AWS Resource Explorer?
<a name="welcome"></a>

AWS Resource Explorer is a resource search and discovery service. With Resource Explorer, you can explore your resources, such as Amazon Elastic Compute Cloud instances, Amazon Kinesis streams, or Amazon DynamoDB tables, using an internet search engine-like experience. Resource Explorer allows you to easily search for your resources using resource metadata like names, tags, and IDs, and displays additional resource details from other AWS services, such as AWS Config and AWS Cloud Control. You can add resource metadata using [tags](https://docs.aws.amazon.com/tag-editor/latest/userguide/tagging-resources.html), and collectively manage resources in an [application](https://docs.aws.amazon.com/awsconsolehelpdocs/latest/gsg/myApp-manage-apps.html). Resource Explorer works across AWS Regions in your account to simplify your cross-Region workloads.

AWS Resource Explorer provides fast responses to your search queries by using indexes that are created and maintained by the AWS Resource Explorer service. These indexes come in two types: Resource Explorer-owned indexes that provide immediate partial results, and user-owned indexes that provide complete results with automatic updates. Resource Explorer uses a variety of data sources to gather information about resources in your AWS account. Resource Explorer stores that information in the indexes for Resource Explorer to search.

Beginning October 6, 2025, Resource Explorer is enabled by default in your AWS account with no setup steps required to begin searching for and finding resources. When you first access Resource Explorer through the AWS Management Console, [Unified Search](https://docs.aws.amazon.com/awsconsolehelpdocs/latest/gsg/using-search.html), or CLI/SDK/API, you'll automatically receive search functionality based on your IAM permissions, as explained later in this page under [Are you a first-time Resource Explorer user?](#first-time-user). Resource Explorer provides immediate search results in each AWS Region you access, with Unified Search showing results from your current AWS Region without requiring any additional configuration.

For enhanced functionality, you can search across multiple AWS Regions by enabling cross-Region search with a single click or API call to select an aggregator AWS Region. Organizations can set up multi-account search by enabling trusted access and using AWS CloudFormation deployment. If you previously configured Resource Explorer with cross-Region search, your existing setup remains unchanged. You can now search for resources across hundreds of AWS services, such as Amazon Elastic Compute Cloud instances, Amazon Kinesis streams, Amazon DynamoDB tables, and more, without any initial configuration, making it easier to manage resources and troubleshoot issues from the moment you access your account.

**We want your feedback about this documentation**  
Our goal is to help you get everything you can from Resource Explorer. If this guide helps you to do that, then let us know. If the guide isn't helping you, then we want to hear from you so we can address the issue. Use the **Feedback** link that's in the upper-right corner of every page. That sends your comments directly to the writers of this guide. We review every submission, looking for opportunities to improve the documentation. Thank you in advance for your help\!

**Topics**
+ [Are you a first-time Resource Explorer user?](#first-time-user)
+ [Features of Resource Explorer](#resource-explorer-feature-overview)
+ [Resource Explorer supported Regions](#supported-regions)
+ [Related AWS services](#related-services)
+ [Pricing](#pricing-resource-explorer)

## Are you a first-time Resource Explorer user?
<a name="first-time-user"></a>

As a first-time user of Resource Explorer, you can start searching for resources immediately without any setup steps. You can access Resource Explorer through the AWS Management Console, Unified Search, or CLI/SDK/API to begin finding your resources.

Your search experience is automatically enabled based on your IAM permissions. If you have, at minimum, the permissions in the `[AWSResourceExplorerReadOnlyAccess](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AWSResourceExplorerReadOnlyAccess.html)` managed policy, you can immediately search in partial results (all tagged resources and supported untagged resources created after the [immediate resource discovery](https://docs.aws.amazon.com/resource-explorer/latest/userguide/manage-immediate-resource-discovery-experience.html) release). Resource Explorer uses a service-linked channel to receive AWS CloudTrail events on your behalf, and this visibility is available in the CloudTrail console across all supported Regions. For complete resource inventory with automatic updates, you'll also need the `iam:CreateServiceLinkedRole` permission (included in the `[AWSResourceExplorerFullAccess](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AWSResourceExplorerFullAccess.html)` managed policy). After the service-linked role is created in your account by any user, subsequent users only need the permissions in the `[AWSResourceExplorerReadOnlyAccess](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AWSResourceExplorerReadOnlyAccess.html)` managed policy to get complete results on first search in subsequent Regions.

To get the most from Resource Explorer, we recommend starting with search and then exploring these topics as needed:
+ [Using AWS Resource Explorer to search for resources](using-search.md)
+ [Terms and concepts for Resource Explorer](getting-started-terms-and-concepts.md)
+ [Setting up and configuring Resource Explorer](getting-started-setting-up.md)

## Features of Resource Explorer
<a name="resource-explorer-feature-overview"></a>

Resource Explorer provides the following features:
+ Automatic features (available immediately):
  + Resource Explorer is automatically enabled when you first access the service or search in Unified Search, providing immediate search functionality. Depending on your IAM permissions, you can view either partial results immediately or complete resource inventory with automatic updates.
  + Users can search for resources in their current AWS Region through the Resource Explorer console, Unified Search, or CLI/SDK/API.
  + Users can use keywords, search operators, and attributes like tags to filter the search results to only matching resources.
  + When users find a resource in the search results, they can immediately go to the resource's native console to work with that resource.
+ Enhanced features (optional configuration):
  + Cross-Region search capability when you select an aggregator AWS Region.
  + Multi-account search through AWS Organizations integration.
  + Additional resource details from other AWS services, such as AWS Config and AWS Cloud Control, directly in the Resource Explorer console.
  + Resource management using quick Actions in the Resource Explorer console to manage tags and add resources to new or existing applications.
  + Custom views that administrators can create to define which resources are available in search results, with different views for different user groups based on their needs.

  Manual configuration is only needed in specific cases:
  + When you need to add missing permissions
  + When you want enhanced features like cross-Region search
  + When you want to set up multi-account configurations
  + When you want to customize your Resource Explorer setup
+ Resource Explorer, like many other AWS services, is *[eventually consistent](https://wikipedia.org/wiki/Eventual_consistency)*. Resource Explorer achieves high availability by replicating data across multiple servers within Amazon data centers around the world. If a request to change some data is successful, the change is committed and safely stored. However, then the change must be replicated across Resource Explorer, which can take some time. As an example, this includes Resource Explorer finding a resource in one AWS Region, and replicating that to the AWS Region that contains the aggregator index for the account.

## Resource Explorer supported Regions
<a name="supported-regions"></a>

The following table provides information about the AWS Regions where Resource Explorer is available.


| Region Name | Region | Endpoint | Protocol | 
| --- | --- | --- | --- | 
| US East (Ohio) | us-east-2 |  resource-explorer-2.us-east-2.amazonaws.com <br /> resource-explorer-2-fips.us-east-2.amazonaws.com <br /> resource-explorer-2-fips.us-east-2.api.aws  | HTTPS<br />HTTPS<br />HTTPS | 
| US East (N. Virginia) | us-east-1 |  resource-explorer-2.us-east-1.amazonaws.com <br /> resource-explorer-2-fips.us-east-1.amazonaws.com <br /> resource-explorer-2-fips.us-east-1.api.aws  | HTTPS<br />HTTPS<br />HTTPS | 
| US West (N. California) | us-west-1 |  resource-explorer-2.us-west-1.amazonaws.com <br /> resource-explorer-2-fips.us-west-1.amazonaws.com <br /> resource-explorer-2-fips.us-west-1.api.aws  | HTTPS<br />HTTPS<br />HTTPS | 
| US West (Oregon) | us-west-2 |  resource-explorer-2.us-west-2.amazonaws.com <br /> resource-explorer-2-fips.us-west-2.amazonaws.com <br /> resource-explorer-2-fips.us-west-2.api.aws  | HTTPS<br />HTTPS<br />HTTPS | 
| Africa (Cape Town) | af-south-1 |  resource-explorer-2.af-south-1.amazonaws.com  | HTTPS | 
| Asia Pacific (Hong Kong) | ap-east-1 |  resource-explorer-2.ap-east-1.amazonaws.com  | HTTPS | 
| Asia Pacific (Hyderabad) | ap-south-2 |  resource-explorer-2.ap-south-2.amazonaws.com  | HTTPS | 
| Asia Pacific (Jakarta) | ap-southeast-3 |  resource-explorer-2.ap-southeast-3.amazonaws.com  | HTTPS | 
| Asia Pacific (Malaysia) | ap-southeast-5 |  resource-explorer-2.ap-southeast-5.amazonaws.com  | HTTPS | 
| Asia Pacific (Melbourne) | ap-southeast-4 |  resource-explorer-2.ap-southeast-4.amazonaws.com  | HTTPS | 
| Asia Pacific (Mumbai) | ap-south-1 |  resource-explorer-2.ap-south-1.amazonaws.com  | HTTPS | 
| Asia Pacific (New Zealand) | ap-southeast-6 |  resource-explorer-2.ap-southeast-6.amazonaws.com  | HTTPS | 
| Asia Pacific (Osaka) | ap-northeast-3 |  resource-explorer-2.ap-northeast-3.amazonaws.com  | HTTPS | 
| Asia Pacific (Seoul) | ap-northeast-2 |  resource-explorer-2.ap-northeast-2.amazonaws.com  | HTTPS | 
| Asia Pacific (Singapore) | ap-southeast-1 |  resource-explorer-2.ap-southeast-1.amazonaws.com  | HTTPS | 
| Asia Pacific (Sydney) | ap-southeast-2 |  resource-explorer-2.ap-southeast-2.amazonaws.com  | HTTPS | 
| Asia Pacific (Taipei) | ap-east-2 |  resource-explorer-2.ap-east-2.amazonaws.com  | HTTPS | 
| Asia Pacific (Thailand) | ap-southeast-7 |  resource-explorer-2.ap-southeast-7.amazonaws.com  | HTTPS | 
| Asia Pacific (Tokyo) | ap-northeast-1 |  resource-explorer-2.ap-northeast-1.amazonaws.com  | HTTPS | 
| Canada (Central) | ca-central-1 |  resource-explorer-2.ca-central-1.amazonaws.com <br /> resource-explorer-2-fips.ca-central-1.amazonaws.com <br /> resource-explorer-2-fips.ca-central-1.api.aws  | HTTPS<br />HTTPS<br />HTTPS | 
| Canada West (Calgary) | ca-west-1 |  resource-explorer-2.ca-west-1.amazonaws.com <br /> resource-explorer-2-fips.ca-west-1.amazonaws.com <br /> resource-explorer-2-fips.ca-west-1.api.aws  | HTTPS<br />HTTPS<br />HTTPS | 
| Europe (Frankfurt) | eu-central-1 |  resource-explorer-2.eu-central-1.amazonaws.com  | HTTPS | 
| Europe (Ireland) | eu-west-1 |  resource-explorer-2.eu-west-1.amazonaws.com  | HTTPS | 
| Europe (London) | eu-west-2 |  resource-explorer-2.eu-west-2.amazonaws.com  | HTTPS | 
| Europe (Milan) | eu-south-1 |  resource-explorer-2.eu-south-1.amazonaws.com  | HTTPS | 
| Europe (Paris) | eu-west-3 |  resource-explorer-2.eu-west-3.amazonaws.com  | HTTPS | 
| Europe (Spain) | eu-south-2 |  resource-explorer-2.eu-south-2.amazonaws.com  | HTTPS | 
| Europe (Stockholm) | eu-north-1 |  resource-explorer-2.eu-north-1.amazonaws.com  | HTTPS | 
| Europe (Zurich) | eu-central-2 |  resource-explorer-2.eu-central-2.amazonaws.com  | HTTPS | 
| Israel (Tel Aviv) | il-central-1 |  resource-explorer-2.il-central-1.amazonaws.com  | HTTPS | 
| Mexico (Central) | mx-central-1 |  resource-explorer-2.mx-central-1.amazonaws.com  | HTTPS | 
| Middle East (Bahrain) | me-south-1 |  resource-explorer-2.me-south-1.amazonaws.com  | HTTPS | 
| Middle East (UAE) | me-central-1 |  resource-explorer-2.me-central-1.amazonaws.com  | HTTPS | 
| South America (São Paulo) | sa-east-1 |  resource-explorer-2.sa-east-1.amazonaws.com  | HTTPS | 
|  AWS GovCloud (US-East) | us-gov-east-1 |  resource-explorer-2.us-gov-east-1.amazonaws.com <br /> resource-explorer-2-fips.us-gov-east-1.amazonaws.com <br /> resource-explorer-2-fips.us-gov-east-1.api.aws  | HTTPS<br />HTTPS<br />HTTPS | 
|  AWS GovCloud (US-West) | us-gov-west-1 |  resource-explorer-2.us-gov-west-1.amazonaws.com <br /> resource-explorer-2-fips.us-gov-west-1.amazonaws.com <br /> resource-explorer-2-fips.us-gov-west-1.api.aws  | HTTPS<br />HTTPS<br />HTTPS | 

## Related AWS services
<a name="related-services"></a>

The following are the other AWS services whose primary purpose is to help you manage your AWS resources:

[myApplications in the AWS Management Console](https://docs.aws.amazon.com/awsconsolehelpdocs/latest/gsg/aws-myApplications.html)

myApplications is an extension of the AWS Management Console that helps you manage and monitor the cost, health, security posture, and performance of your applications in AWS. Applications allow you to group resources and metadata. From the AWS Management Console, you can access all of the applications in your account, view metrics across all applications, and review cost, security, and operations metrics from multiple AWS services in a single view. myApplications includes resource information from the following AWS services:
+ [AWS Resource Access Manager (AWS RAM)](https://docs.aws.amazon.com/ARG/index.html#sharing-your-aws-resources)

  Share the resources in one AWS account with other AWS accounts. If your account is managed by AWS Organizations, you can use AWS RAM to share resources with the accounts in an organizational unit, or all of the accounts in the organization. The shared resources work for users in those accounts just like they would if they were created in the local account.
+ [AWS Resource Groups](https://docs.aws.amazon.com/ARG/index.html#grouping-your-aws-resources)

  Create groups for your AWS resources. Then, you can use and manage each group as a unit instead of having to reference every resource individually. Your groups can consist of resources that are part of the same AWS CloudFormation stack, or that are tagged with the same tags. Some resource types also support applying a configuration to a resource group to affect all relevant resources in that group.
+ [AWS Resource Groups Tagging API](https://docs.aws.amazon.com/ARG/index.html#tagging-your-aws-resources)

  Tags are customer-defined metadata that you can attach to your resources. You can categorize your resources for purposes like [cost allocation](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html) and [attribute-based access control](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_attribute-based-access-control.html).

## Pricing
<a name="pricing-resource-explorer"></a>

Automatic setup and basic search functionality are available at no additional cost. There are no charges to search for resources by using AWS Resource Explorer, including creating views, completing setup in AWS Regions, or searching for resources.

In the process of building your resource inventory, Resource Explorer calls APIs on your behalf that may result in charges. Interacting with the resources that you find in your search results can result in usage charges that vary depending on the resource type and its AWS service. Some sources of additional data available in the Resource Explorer console are from other AWS services that can result in usage charges, such as AWS Config. These sources are only used if you explicitly enable them in your account. For more information about how AWS bills for the normal use of a specific resource type, refer to the documentation for that resource type's owning service.