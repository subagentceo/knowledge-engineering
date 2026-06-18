

# What is Amazon Macie?
<a name="what-is-macie"></a>

Amazon Macie is a data security service that discovers sensitive data by using machine learning and pattern matching, provides visibility into data security risks, and enables automated protection against those risks.

To help you manage the security posture of your organization's Amazon Simple Storage Service (Amazon S3) data estate, Macie provides you with an inventory of your S3 general purpose buckets, and automatically evaluates and monitors the buckets for security and access control. If Macie detects a potential issue with the security or privacy of your data, such as a bucket that becomes publicly accessible, Macie generates a finding for you to review and remediate as necessary.

Macie also automates discovery and reporting of sensitive data to provide you with a better understanding of the data that your organization stores in Amazon S3. To detect sensitive data, you can use built-in criteria and techniques that Macie provides, custom criteria that you define, or a combination of the two. If Macie detects sensitive data in an S3 object, Macie generates a finding to notify you of the sensitive data that it found. 

In addition to findings, Macie provides statistics and information that offer insight into the security posture of your Amazon S3 data and where sensitive data might reside in your data estate. The statistics and information can guide your decisions to perform deeper investigations of specific S3 buckets and objects. You can review and analyze findings, statistics, and other information by using the Amazon Macie console or the Amazon Macie API. You can also leverage Macie integration with Amazon EventBridge and AWS Security Hub CSPM to monitor, process, and remediate findings by using other services, applications, and systems.

**Topics**
+ [Features of Macie](#macie-features)
+ [Accessing Macie](#macie-access)
+ [Pricing for Macie](#macie-pricing)
+ [Related services](#macie-related-services)

## Features of Macie
<a name="macie-features"></a>

Here are some of the key ways that Amazon Macie can help you discover, monitor, and protect your sensitive data in Amazon S3.

**Automate the discovery of sensitive data**  
With Macie, you can automate discovery and reporting of sensitive data in two ways: by configuring Macie to [perform automated sensitive data discovery](discovery-asdd.md), and by [creating and running sensitive data discovery jobs](discovery-jobs.md). If Macie detects sensitive data in an S3 object, it creates a sensitive data finding for you. The finding provides a detailed report of the sensitive data that Macie detected.  
Automated sensitive data discovery provides broad visibility into where sensitive data might reside in your Amazon S3 data estate. With this option, Macie continually evaluates your S3 bucket inventory and uses sampling techniques to identify and select representative S3 objects from your buckets. Macie then retrieves and analyzes the selected objects, inspecting them for sensitive data.   
Sensitive data discovery jobs provide deeper, more targeted analysis. With this option, you define the breadth and depth of the analysis—the S3 buckets to analyze, the sampling depth, and custom criteria that derive from properties of S3 objects. You can also configure a job to run only once for on-demand analysis and assessment, or on a recurring basis for periodic analysis, assessment, and monitoring.  
Both options can help you build and maintain a comprehensive view of the data that your organization stores in Amazon S3 and any security or compliance risks for that data.

**Discover a variety of sensitive data types**  
To discover sensitive data with Macie, you can use built-in criteria and techniques, such as machine learning and pattern matching, to analyze objects in S3 buckets. These criteria and techniques, referred to as [managed data identifiers](managed-data-identifiers.md), can detect a large and growing list of sensitive data types for many countries and regions, including multiple types of personally identifiable information (PII), financial information, and credentials data.  
You can also use [custom data identifiers](custom-data-identifiers.md). A custom data identifier is a set of criteria that you define to detect sensitive data—a regular expression (*regex*) that defines a text pattern to match and, optionally, character sequences and a proximity rule that refine the results. With this type of identifier, you can detect sensitive data that reflects your particular scenarios, intellectual property, or proprietary data. You can supplement the managed data identifiers that Macie provides.  
To fine tune analyses, you can also use [allow lists](allow-lists.md). Allow lists define specific text and text patterns that you want Macie to ignore in S3 objects. These are typically sensitive data exceptions for your particular scenarios or environment—for example, the names of public representatives for your organization, public phone numbers for your organization, or sample data that your organization uses for testing.

**Evaluate and monitor data for security and access control**  
When you enable Macie, Macie automatically generates and begins maintaining an inventory of your S3 general purpose buckets. Macie also begins evaluating and monitoring the buckets for security and access control. If Macie detects a potential issue with the security or privacy of a bucket, it creates a [policy finding](findings-types.md#findings-policy-types) for you.  
In addition to findings, a [dashboard](monitoring-s3-dashboard.md) gives you a snapshot of aggregated statistics for your Amazon S3 data. This includes statistics for key metrics such as the number of buckets that are publicly accessible or shared with other AWS accounts. You can drill down on each statistic to review the supporting data.  
Macie also provides detailed information and statistics for individual S3 buckets in your inventory. The data includes breakdowns of a bucket’s public access and encryption settings, and the size and number of objects that Macie can analyze to detect sensitive data in the bucket. You can [browse the inventory](monitoring-s3-inventory.md), or sort and filter the inventory by certain fields.

**Review and analyze findings**  
In Macie, a finding is a detailed report of sensitive data that Macie detected in an S3 object or a potential issue with the security or privacy of an S3 general purpose bucket. Each finding provides a severity rating, information about the affected resource, and additional details, such as when and how Macie detected the data or issue.  
To [review, analyze, and manage findings](findings.md), you can use **Findings** pages on the Amazon Macie console. These pages list your findings and provide the details of individual findings. They also provide multiple options for grouping, filtering, sorting, and suppressing findings. You can also use the Amazon Macie API to retrieve and review findings. If you use the API, you can pass the data to another application, service, or system for deeper analysis, long-term storage, or reporting.

**Monitor and process findings with other services and systems**  
To support integration with other services and systems, Macie [publishes findings to Amazon EventBridge](findings-monitor-events-eventbridge.md) as events. EventBridge is a serverless event bus service that can route findings data to targets such as AWS Lambda functions and Amazon Simple Notification Service (Amazon SNS) topics. With EventBridge, you can monitor and process findings in near real time as part of your existing security and compliance workflows.  
You can configure Macie to also [publish findings to AWS Security Hub CSPM](securityhub-integration.md). Security Hub CSPM is a service that provides a comprehensive view of your security posture across your AWS environment and helps you check your environment against security industry standards and best practices. With Security Hub CSPM, you can more easily evaluate and process findings as part of a broader analysis of your organization's security posture in AWS. You can also aggregate findings from multiple AWS Regions, and then evaluate and process aggregated findings data from a single Region.

**Centrally manage multiple Macie accounts**  
If your AWS environment has multiple accounts, you can [centrally manage Macie](macie-accounts.md) for accounts in your environment. You can do this in two ways, by integrating Macie with AWS Organizations or by sending and accepting membership invitations in Macie.  
In a multiple-account configuration, a designated Macie administrator can perform certain tasks and access certain Macie settings, data, and resources for accounts that are members of the same organization. Tasks include reviewing information about S3 buckets that are owned by member accounts, reviewing policy findings for those buckets, and inspecting the buckets for sensitive data. If the accounts are associated through AWS Organizations, the Macie administrator can also enable Macie for member accounts in the organization.

**Develop and manage resources programmatically**  
In addition to the Amazon Macie console, you can interact with Macie by using the [Amazon Macie API](https://docs.aws.amazon.com/macie/latest/APIReference/welcome.html). The Amazon Macie API gives you comprehensive, programmatic access to your Macie settings, data, and resources.  
To interact with Macie programmatically, you can send HTTPS requests directly to Macie or use a current version of an AWS command line tool or an AWS SDK. AWS provides tools and SDKs that consist of libraries and sample code for various languages and platforms, such as PowerShell, Java, Go, Python, C\+\+, and .NET.

## Accessing Macie
<a name="macie-access"></a>

Amazon Macie is available in most AWS Regions. For a list of Regions where Macie is currently available, see [Amazon Macie endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/macie.html) in the *AWS General Reference*. For information about managing AWS Regions for your AWS account, see [Enable or disable AWS Regions in your account](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-regions.html) in the *AWS Account Management Reference Guide*.

In each Region, you can work with Macie in any of the following ways.

**AWS Management Console**  
The AWS Management Console is a browser-based interface that you can use to create and manage AWS resources. As part of that console, the Amazon Macie console provides access to your Macie account, data, and resources. You can perform any Macie task by using the Macie console—review statistics and other information about your S3 buckets, create and run sensitive data discovery jobs, review and analyze findings, and more.

**AWS command line tools**  
With AWS command line tools, you can issue commands at your system's command line to perform Macie tasks and AWS tasks. Using the command line can be faster and more convenient than using the console. The command line tools are also useful if you want to build scripts that perform tasks.  
AWS provides two sets of command line tools: the AWS Command Line Interface (AWS CLI) and the AWS Tools for PowerShell. For information about installing and using the AWS CLI, see the [AWS Command Line Interface User Guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html). For information about installing and using the Tools for PowerShell, see the [AWS Tools for PowerShell User Guide](https://docs.aws.amazon.com/powershell/latest/userguide/pstools-welcome.html).

**AWS SDKs**  
AWS provides SDKs that consist of libraries and sample code for various programming languages and platforms—for example, Java, Go, Python, C\+\+, and .NET. The SDKs provide convenient, programmatic access to Macie and other AWS services. They also handle tasks such as cryptographically signing requests, managing errors, and retrying requests automatically. For information about installing and using the AWS SDKs, see [Tools to Build on AWS](https://aws.amazon.com/developer/tools/).

**Amazon Macie REST API**  
The Amazon Macie REST API gives you comprehensive, programmatic access to your Macie account, data, and resources. With this API, you can send HTTPS requests directly to Macie. However, unlike the AWS command line tools and SDKs, use of this API requires your application to handle low-level details such as generating a hash to sign a request. For information about this API, see the [Amazon Macie API Reference](https://docs.aws.amazon.com/macie/latest/APIReference/welcome.html).

## Pricing for Macie
<a name="macie-pricing"></a>

As with other AWS products, there are no contracts or minimum commitments for using Amazon Macie.

Macie pricing is based on several dimensions—evaluating and monitoring S3 buckets for security and access control, monitoring S3 objects for automated sensitive data discovery, and analyzing S3 objects to discover and report sensitive data in the objects. For more information, see [Amazon Macie pricing](https://aws.amazon.com/macie/pricing/).

To help you understand and forecast the cost of using Macie, Macie provides estimated usage costs for your account. You can [review these estimates](account-mgmt-costs-review.md) on the Amazon Macie console and access them with the Amazon Macie API. Depending on how you use the service, you might incur additional costs for using other AWS services in combination with certain Macie features, such as retrieving bucket data from Amazon S3 and using customer managed AWS KMS keys to decrypt objects for analysis.

When you enable Macie for the first time, your AWS account is automatically enrolled in the 30-day free trial of Macie. This includes individual accounts that are enabled as part of an organization in AWS Organizations. During the free trial, there’s no charge for using Macie in the applicable AWS Region to evaluate and monitor your S3 buckets for security and access control. Depending on your account settings, the free trial can also include performing automated sensitive data discovery for your Amazon S3 data. The free trial doesn't include running sensitive data discovery jobs to discover and report sensitive data in S3 objects.

To help you understand and forecast the cost of using Macie after the free trial ends, Macie provides you with estimated usage costs based on your use of Macie during the trial. Your usage data also indicates the amount of time that remains before your free trial ends. You can review this data on the Amazon Macie console and access it with the Amazon Macie API. For more information, see [Participating in the free trial](account-mgmt-free-trial.md).

## Related services
<a name="macie-related-services"></a>

To further secure your data, workloads, and applications in AWS, consider using the following AWS services in combination with Amazon Macie.

**AWS Security Hub CSPM**  
AWS Security Hub CSPM gives you a comprehensive view of the security state of your AWS resources and helps you check your AWS environment against security industry standards and best practices. It does this partly by consuming, aggregating, organizing, and prioritizing your security findings from multiple AWS services (including Macie) and supported AWS Partner Network (APN) products. Security Hub CSPM helps you analyze your security trends and identify the highest priority security issues across your AWS environment.  
To learn more about Security Hub CSPM, see the [AWS Security Hub User Guide](https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html). To learn about using Macie and Security Hub CSPM together, see [Evaluating Macie findings with AWS Security Hub CSPM](securityhub-integration.md).

**Amazon GuardDuty**  
Amazon GuardDuty is a security monitoring service that analyzes and processes certain types of AWS logs, such as AWS CloudTrail data event logs for Amazon S3 and CloudTrail management event logs. It uses threat intelligence feeds, such as lists of malicious IP addresses and domains, and machine learning to identify unexpected and potentially unauthorized and malicious activity within your AWS environment.  
To learn more about GuardDuty, see the [Amazon GuardDuty User Guide](https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html).

To learn about additional AWS security services, see [Security, Identity, and Compliance on AWS](https://aws.amazon.com/products/security/).