

# What is Amazon Detective?
<a name="what-is-detective"></a>

Amazon Detective helps you analyze, investigate, and quickly identify the root cause of security findings or suspicious activities. Detective automatically collects log data from your AWS resources. It then uses machine learning, statistical analysis, and graph theory to generate visualizations that help you to conduct faster and more efficient security investigations. The Detective prebuilt data aggregations, summaries, and context help you to quickly analyze and determine the nature and extent of possible security issues. 

With Detective, you can access up to a year of historical event data. This data is available through a set of visualizations that show changes in the type and volume of activity over a selected time window. Detective links these changes to GuardDuty findings. For more information on source data in Detective, see [Source data used in a Detective behavior graph](detective-source-data-about.md).

By automatically aggregating data and providing visual tools, Amazon Detective lets you to conduct faster, more efficient security investigations. You can quickly analyze potential issues and determine the scope of security threats. 

**Topics**
+ [Features of Amazon Detective](#detective-features)
+ [Accessing Amazon Detective](#accessing-detective)
+ [Pricing for Amazon Detective](#detective-pricing)
+ [How does Detective work?](#detective-how-works)
+ [Who uses Detective?](#detective-who-uses)
+ [Related services](#detective-related-services)

## Features of Amazon Detective
<a name="detective-features"></a>

Here are some of the key ways that Amazon Detective is helpful for investigating suspicious activity in your AWS environment and analyze resources to identify the root cause of security issues.

**Detective finding groups**  
[Detective finding groups](https://docs.aws.amazon.com//detective/latest/userguide/groups-about.html) lets you examine multiple activities as they relate to a potential security event. You can analyze the root cause for high severity GuardDuty findings using finding groups. If a threat actor is attempting to compromise your AWS environment, they typically perform a sequence of actions that generate multiple security findings and unusual behaviors.  
The finding groups page in Detective displays all the related finding groups extracted from your behavior graph. For more information about how you can leverage finding groups to analyze the root cause of security findings, see [Analyzing finding groups in Detective](https://docs.aws.amazon.com//detective/latest/userguide/understanding-groups.html).  
Detective provides an interactive visualization of each finding group to help you investigate security issues faster and more thoroughly. The visualization is designed to display entities and findings involved in a security incident, making it easier to understand connections and root causes. help you investigate issues faster and more thoroughly with less effort. The [Finding group Visualization](https://docs.aws.amazon.com//detective/latest/userguide/group-visual-finding-group.html) panel displays the findings and entities involved in a finding group.

**Detective Investigation to triage findings**  
With [Detective Investigation](https://docs.aws.amazon.com//detective/latest/userguide/investigations-about.html) you can investigate IAM users and IAM roles using indicators of compromise, which can help you determine if a resource is involved in a security incident. An indicator of compromise (IOC) is an artifact observed in or on a network, system, or environment that can (with a high level of confidence) identify malicious activity or a security incident. With Detective investigations, you can maximize efficiency, focus on the security threats, and strengthen incidence response capabilities.   
Detective Investigation uses machine learning models and threat intelligence to surface only the most critical, suspicious issues, allowing you to focus on high-level investigations. It automatically analyzes resources in your AWS environment to identify potential indicators of compromise or suspicious activity. This lets you identify patterns and comprehend which resources are impacted by security events, offering a proactive approach to threat identification and mitigation.  
You can use start a Detective Investigation from the Detective console by [Running a Detective Investigation](https://docs.aws.amazon.com/). To run an investigation programmatically, use the [StartInvestigation](https://docs.aws.amazon.com//detective/latest/APIReference/API_StartInvestigation.html) operation of the Detective API. To run an investigation using the AWS Command Line Interface (AWS CLI) run the [start-investigation](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/detective/start-investigation.html) command.

**Detective integration with Amazon Security Lake**  
[Detective integrates with Amazon Security Lake](https://docs.aws.amazon.com//detective/latest/userguide/securitylake-integration.html), which means that you can query and retrieve the raw log data stored by Security Lake. With this integration, you can collect logs and events from the following sources which Security Lake natively supports.   
+ AWS CloudTrail management events version 1.0 and after
+ Amazon Virtual Private Cloud (Amazon VPC) Flow Logs version 1.0 and after
+ Amazon Elastic Kubernetes Service (Amazon EKS) Audit Log version 2.0
After you integrate Detective with Security Lake, Detective begins pulling raw logs from Security Lake related to AWS CloudTrail management events and Amazon VPC Flow Logs. You can [query raw logs](https://docs.aws.amazon.com//detective/latest/userguide/securitylake-integration.html#query-raw-logs-detective) to view the logs and events in Detective. 

**Investigate VPC flow volume**  
With Detective you can interactively examine the [activity details of the virtual private cloud (VPC) network flows](https://docs.aws.amazon.com//detective/latest/userguide/profile-panel-drilldown-overall-vpc-volume.html) of your Amazon Elastic Compute Cloud (Amazon EC2) instances and Kubernetes pods. Detective automatically collects VPC flow logs from your monitored accounts, aggregates them by EC2 instance, and presents visual summaries and analytics about these network flows.   
For an EC2 instance, the activity details for Overall VPC flow volume show the interactions between the EC2 instance and IP addresses during a selected time range.  
 For a Kubernetes pod, Overall VPC flow volume displays the overall volume of bytes into and out of the Kubernetes pod's assigned IP address for all destination IP addresses.

## Accessing Amazon Detective
<a name="accessing-detective"></a>

Amazon Detective is available in most AWS Regions. For a list of Regions where Detective is currently available, see [Amazon Detective endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/detective.html) in the *AWS General Reference*. For information about managing AWS Regions for your AWS account, see [Specifying which AWS Regions your account can use](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-regions.html) in the *AWS Account Management Reference Guide*.

In each Region, you can work with Detective in any of the following ways.

**AWS Management Console**  
The AWS Management Console is a browser-based interface that you can use to create and manage AWS resources. As part of that console, the Amazon Detective console provides access to your Detective account, data, and resources. You can perform any Detective task by using the Detective console—review potential security threats and analyze, investigate, and identify the root cause of security findings.

**AWS command line tools**  
With AWS command line tools, you can issue commands at your system's command line to perform Detective tasks and AWS tasks. Using the command line can be faster and more convenient than using the console. The command line tools are also useful if you want to build scripts that perform tasks.  
AWS provides two sets of command line tools: the AWS Command Line Interface (AWS CLI) and the AWS Tools for PowerShell. For information about installing and using the AWS CLI, see the [AWS Command Line Interface User Guide](https://docs.aws.amazon.com/cli/latest/userguide/). For information about installing and using the Tools for PowerShell, see the [AWS Tools for PowerShell User Guide](https://docs.aws.amazon.com//powershell/latest/userguide/pstools-welcome.html).

**AWS SDKs**  
AWS provides SDKs that consist of libraries and sample code for various programming languages and platforms—for example, Java, Go, Python, C\+\+, and .NET. The SDKs provide convenient, programmatic access to Detective and other AWS services. They also handle tasks such as cryptographically signing requests, managing errors, and retrying requests automatically. For information about installing and using the AWS SDKs, see [Tools to Build on AWS](https://aws.amazon.com//developer/tools/).

**Amazon Detective REST API**  
The Amazon Detective REST API gives you comprehensive, programmatic access to your Detective account, data, and resources. With this API, you can send HTTPS requests directly to Detective. However, unlike the AWS command line tools and SDKs, use of this API requires your application to handle low-level details such as generating a hash to sign a request. For information about this API, see the [Detective API Reference](https://docs.aws.amazon.com/detective/latest/APIReference/welcome.html).

## Pricing for Amazon Detective
<a name="detective-pricing"></a>

As with other AWS products, there are no contracts or minimum commitments for using Amazon Detective.

Detective pricing is based on several dimensions— and charges a tiered flat rate per GB for all data regardless of the source. For more information, see [Amazon Detective pricing](https://aws.amazon.com/detective/pricing/).

To help you understand and forecast the cost of using Detective, Detective provides estimated usage costs for your account. You can [review these estimates](tracking-usage-logging.md) on the Amazon Detective console and access them with the Amazon Detective API. Depending on how you use the service, you might incur additional costs for using other AWS services in combination with certain Detective features, such as Security Lake integration and Detective Investigations.

When you enable Detective for the first time, your AWS account is automatically enrolled in the 30-day free trial of Detective. This includes individual accounts that are enabled as part of an organization in AWS Organizations. During the free trial, there’s no charge for using Detective in the applicable AWS Region.

To help you understand and forecast the cost of using Detective after the free trial ends, Detective provides you with estimated usage costs based on your use of Detective during the trial. Your usage data also indicates the amount of time that remains before your free trial ends. You can [review your Detective account's usage related data](https://docs.aws.amazon.com//detective/latest/userguide/tracking-usage-logging.html) on the Amazon Detective console and access it with the Amazon Detective API.

## How does Detective work?
<a name="detective-how-works"></a>

Detective automatically extracts time-based events such as login attempts, API calls, and network traffic from AWS CloudTrail and Amazon VPC flow logs. It also ingests findings detected by GuardDuty.

From those events, Detective uses machine learning and visualization to create a unified, interactive view of your resource behaviors and the interactions between them over time. You can explore this behavior graph to examine disparate actions such as failed logon attempts or suspicious API calls. You can also see how these actions affect resources such as AWS accounts and Amazon EC2 instances. You can adjust the behavior graph's scope and timeline for a variety of tasks:
+ Rapidly investigate any activity that falls outside the norm.
+ Identify patterns that may indicate a security issue.
+ Understand all of the resources affected by a finding.

Detective tailored visualizations provide a baseline for and summarize the account information. These findings can help answer questions such as "Is this an unusual API call for this role?" Or "Is this spike in traffic from this instance expected?"

With Detective, you don't have to organize any data or develop, configure, or tune your own queries and algorithms. There are no upfront costs and you pay only for the events analyzed, with no additional software to deploy or other feeds to subscribe to.

## Who uses Detective?
<a name="detective-who-uses"></a>

When an account enables Detective, it becomes the administrator account for a behavior graph. A behavior graph is a linked set of extracted and analyzed data from one or more AWS accounts. Administrator accounts invite member accounts to contribute their data to the administrator account's behavior graph.

Detective is also integrated with AWS Organizations. Your organization management account designates a Detective administrator account for the organization. The Detective administrator account enables organization accounts as member accounts in the organization behavior graph.

For information about how Detective uses source data from behavior graph accounts, see [Source data used in a Detective behavior graph](detective-source-data-about.md).

For information on how administrator accounts manage behavior graphs, see [Managing accounts in Detective](accounts.md). For information on how member accounts manage their behavior graph invitations and memberships, see [For member accounts: Managing behavior graph invitations and memberships](member-account-graph-management.md).

The administrator account uses the analytics and visualizations generated from the behavior graph to investigate AWS resources and GuardDuty findings. Using the Detective integrations with GuardDuty and AWS Security Hub CSPM, you can pivot from a GuardDuty finding in these services directly into the Detective console.

A Detective investigation focuses on the activity that is connected to the involved AWS resources. For an overview of the investigation process in Detective, see [How Amazon Detective is used for investigation](https://docs.aws.amazon.com/detective/latest/userguide/detective-investigation-about.html) in *Detective User Guide*.

## Related services
<a name="detective-related-services"></a>

To further secure your data, workloads, and applications in AWS, consider using the following AWS services in combination with Amazon Detective.

**AWS Security Hub CSPM**  
AWS Security Hub CSPM gives you a comprehensive view of the security state of your AWS resources and helps you check your AWS environment against security industry standards and best practices. It does this partly by consuming, aggregating, organizing, and prioritizing your security findings from multiple AWS services (including Detective) and supported AWS Partner Network (APN) products. Security Hub CSPM helps you analyze your security trends and identify the highest priority security issues across your AWS environment.  
To learn more about Security Hub CSPM, see the [AWS Security Hub CSPM User Guide](https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html).

**Amazon GuardDuty**  
Amazon GuardDuty is a security monitoring service that analyzes and processes certain types of AWS logs, such as AWS CloudTrail data event logs for Amazon S3 and CloudTrail management event logs. It uses threat intelligence feeds, such as lists of malicious IP addresses and domains, and machine learning to identify unexpected and potentially unauthorized and malicious activity within your AWS environment.  
To learn more about GuardDuty, see the [Amazon GuardDuty User Guide](https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html).

**Amazon Security Lake**  
Amazon Security Lake is a fully managed security data lake service. You can use Security Lake to automatically centralize security data from AWS environments, SaaS providers, on-premises sources, cloud sources, and third-party sources into a purpose-built data lake that's stored in your AWS account. Security Lake helps you analyze security data, so you can get a more complete understanding of your security posture across your entire organization. With Security Lake, you can also improve the protection of your workloads, applications, and data.  
To learn more about Security Lake, see the [Amazon Security Lake User Guide](https://docs.aws.amazon.com/security-lake/latest/userguide/what-is-security-lake.html). To learn more about using Detective and Security Lake together, see [Amazon Detective Integration with Amazon Security Lake](securitylake-integration.md).

To learn about additional AWS security services, see [Security, Identity, and Compliance on AWS](https://aws.amazon.com//products/security/).