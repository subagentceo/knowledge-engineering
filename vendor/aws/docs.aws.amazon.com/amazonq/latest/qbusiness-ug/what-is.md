

# What is Amazon Q Business?
<a name="what-is"></a>


|  | 
| --- |
| Powered by Amazon Bedrock: AWS implements [automated abuse detection](https://docs.aws.amazon.com//bedrock/latest/userguide/abuse-detection.html). Because Amazon Q Business is built on Amazon Bedrock, users can take full advantage of the controls implemented in Amazon Bedrock to enforce safety, security, and the responsible use of artificial intelligence (AI). | 

Amazon Q Business is a fully managed, generative-AI powered assistant that you can configure to answer questions, provide summaries, generate content, and complete tasks based on your enterprise data. It allows end users to receive immediate, permissions-aware responses from enterprise data sources with citations, for use cases such as IT, HR, and benefits help desks.

Amazon Q Business also helps streamline tasks and accelerate problem solving. You can use Amazon Q Business to create and share task automation applications, or perform routine actions like submitting time-off requests and sending meeting invites.

Amazon Q Business integrates with services like [Amazon Kendra](https://docs.aws.amazon.com/kendra/latest/dg/what-is-kendra.html) and [other supported data sources](https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/supported-connectors.html) such as [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html), [https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/sharepoint-cloud-connector.html](https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/sharepoint-cloud-connector.html), and [https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/salesforce-connector.html](https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/salesforce-connector.html).

To get started with Amazon Q Business, visit [Amazon Q Business](https://aws.amazon.com/q/business/).


|  | 
| --- |
|  [![AWS Videos](http://img.youtube.com/vi/https://www.youtube.com/embed/JZsu6Mh9KuI?si=83m6nRe8GW7MBs5H/0.jpg)](http://www.youtube.com/watch?v=https://www.youtube.com/embed/JZsu6Mh9KuI?si=83m6nRe8GW7MBs5H)  | 

**Topics**
+ [Benefits of Amazon Q Business](#benefits-overview)
+ [Pricing and availability](#pricing)
+ [Accessing Amazon Q Business](#accessing)
+ [Related services](#related-services)
+ [Are you a first-time Amazon Q Business user?](#first-time-user)

## Benefits of Amazon Q Business
<a name="benefits-overview"></a>

Some of the benefits of Amazon Q Business include:

**Accurate and comprehensive answers**  
Amazon Q Business generates comprehensive responses to natural language queries from users by analyzing information across all enterprise content that it has access to. It can avoid incorrect statements by confining its generated responses to existing enterprise data, and provides citations to the sources that it used to generate its response. When a query results in conflicting or inconsistent answers, Amazon Q Business lists the details for each answer. With [hallucination mitigation](https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/guardrails-global-controls.html#guardrails-global-response), Amazon Q Business checks supported chat responses for inconsistencies and automatically corrects them in real-time during conversations.

**Simple to deploy and manage**  
Amazon Q Business takes care of the complex task of developing and managing machine learning infrastructure and models so that you can build your chat solution quickly. Amazon Q Business connects to your data and ingests it for processing using its pre-built connectors, document retrievers, document upload capabilities.

**Configurable and customizable**  
Amazon Q Business provides you with the flexibility of choosing what sources should be used to respond to user queries. You can control whether the responses should only use your enterprise data, or use both enterprise data and model knowledge. For public-facing scenarios, you can create [anonymous applications](https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/create-anonymous-application.html) that don't require user authentication, allowing you to serve a broader audience. You can [customize your chat interface](https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/customize-web-experience.html) with your organization's branding, visual themes, and conversation starters to create a tailored user interface.

**Data and application security**  
Amazon Q Business supports access control for your data so that the right users can access the right content. Its responses to questions are based on the content that your end user has permissions to access. You can use AWS IAM Identity Center or AWS Identity and Access Management to manage end user access for Amazon Q Business.

**Broad connectivity**  
Amazon Q Business offers out-of-the-box connections to [ multiple supported data sources](https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/supported-connectors.html). You can also connect Amazon Q to any third-party application using [plugins](https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/plugins.html) to perform actions and query application data. With [data accessors](https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/data-accessors.html), you can securely share your enterprise data with verified ISVs, allowing them to retrieve relevant content from your Amazon Q index. Amazon Q Business [integrations](https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/integrations.html) bring AI-powered assistance directly into daily workflows through browser extensions and applications for Slack, Microsoft Teams, and Microsoft Office. You can also [embed Amazon Q Business](https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/embed-amazon-q-business.html) directly into your applications and websites to enhance user productivity.

## Pricing and availability
<a name="pricing"></a>

Amazon Q Business charges you both for user subscriptions to applications, and for index capacity. For information about what's included in the tiers of user subscriptions and index capacity, see [Subscription and index pricing](https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/tiers.html).

For pricing information, including examples of charges for index capacity, subscribing and unsubscribing users to Amazon Q Business tiers, upgrading and downgrading Amazon Q Business tiers, and more, see [Amazon Q Business Pricing](https://aws.amazon.com/q/business/pricing). 

For a list of regions where Amazon Q Business is currently available, see [Supported regions](https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/quotas-regions.html).

## Accessing Amazon Q Business
<a name="accessing"></a>

You can access Amazon Q Business in the following ways in the AWS Regions that it's available in:

** [AWS Management Console](https://aws.amazon.com/console/) **  
You can use the AWS Management Console—a browser-based interface to interact with AWS services—to access the Amazon Q Business console and resources. You can perform most Amazon Q Business tasks using the Amazon Q Business console.

** [Amazon Q Business API](https://docs.aws.amazon.com/amazonq/latest/api-reference/Welcome.html) **  
To access Amazon Q Business programmatically, you can use the Amazon Q API. For more information, see the [Amazon Q Business API Reference](https://docs.aws.amazon.com/amazonq/latest/api-reference/Welcome.html).

** [AWS Command Line Interface](https://aws.amazon.com/cli/) **  
The AWS Command Line Interface (AWS CLI) is an open source tool. You can use the AWS CLI to interact with AWS services using commands in your command line shell. If you want to build task-based scripts, using the command line can be faster and more convenient than using the console.

** [SDKs](https://aws.amazon.com/developer/tools/) **  
AWS SDKs provide language APIs for AWS services to use programmatically.

## Related services
<a name="related-services"></a>

The following are some of the other AWS services that Amazon Q Business integrates with:

** [Amazon Kendra](https://docs.aws.amazon.com/kendra/latest/dg/what-is-kendra.html) **  
Amazon Kendra is an intelligent search service that uses natural language processing and machine learning algorithms to return specific answers from your data for end user queries. If you're already an Amazon Kendra user, you can use Amazon Kendra as a data retriever for your Amazon Q Business web application. 

** [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) **  
Amazon S3 is an object storage service. If you're an Amazon S3 user, you can use Amazon S3 as a data source for your Amazon Q Business application.

** [Quick](https://docs.aws.amazon.com/quicksight/latest/user/what-is-quicksight.html) **  
Quick is a business intelligence service that helps you create and share interactive dashboards and reports. You can [integrate Amazon Q Business with Quick](https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/create-application-quicksight.html) to enable users to ask natural language questions about their data and receive AI-generated insights directly within their dashboards.

## Are you a first-time Amazon Q Business user?
<a name="first-time-user"></a>

If you're a first-time user of Amazon Q Business, we recommend that you read the following sections in order:

** [How it works](https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/how-it-works.html) **  
Introduces Amazon Q Business components and describes how they work to create your Retrieval Augmented Generation (RAG) solution.

** [Key concepts](https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/concepts-terms.html) **  
Explains key concepts and important Amazon Q Business terminology.

** [Setting up](https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/setting-up.html) **  
Outlines how to set up Amazon Q Business so that you can begin creating your Amazon Q Business application and web experience.

** [Creating an application](https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/create-application.html) **  
Explains how to create the Amazon Q Business application integrated with IAM Identity Center. 

** [Connecting Amazon Q Business data source connectors](supported-connectors.md) **  
Configuration information for specific connectors to use with your Amazon Q Business web experience.