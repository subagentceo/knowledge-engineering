

# What is Amazon GuardDuty?
<a name="what-is-guardduty"></a>

Amazon GuardDuty is a threat detection service that continuously monitors, analyzes, and processes AWS data sources and logs in your AWS environment. GuardDuty uses threat intelligence feeds, such as lists of malicious IP addresses and domains, file hashes, and machine learning (ML) models to identify suspicious and potentially malicious activity in your AWS environment. The following list provides an overview of potential threat scenarios that GuardDuty can help you detect:
+ Compromised and exfiltrated AWS credentials.
+ Data exfiltration and destruction that can lead to a ransomware event. Unusual patterns of login events in the supported engine versions of Amazon Aurora and Amazon RDS databases, that indicate anomalous behavior.
+ Unauthorized cryptomining activity in your Amazon Elastic Compute Cloud (Amazon EC2) instances and container workloads.
+ Presence of malware in your Amazon EC2 instances and container workloads, and newly uploaded files in your Amazon Simple Storage Service (Amazon S3) buckets.
+ Operating system-level, networking, and file events that indicate unauthorized behavior on your Amazon Elastic Kubernetes Service (Amazon EKS) clusters, Amazon Elastic Container Service (Amazon ECS) - AWS Fargate tasks, and Amazon EC2 instances and container workloads.

The following video provides an overview of how GuardDuty helps you detect threats in your AWS environment.

[![AWS Videos](http://img.youtube.com/vi/ng14ToMXnTA/0.jpg)](http://www.youtube.com/watch?v=ng14ToMXnTA)


**Topics**
+ [Features of GuardDuty](#features-of-guardduty)
+ [PCI DSS Compliance](#guardduty-pci-dss-compliance)
+ [Pricing in GuardDuty](guardduty-pricing.md)
+ [Accessing GuardDuty](guardduty-access.md)

## Features of GuardDuty
<a name="features-of-guardduty"></a>

Here are some of the key ways in which Amazon GuardDuty can help you monitor, detect, and manage potential threats in your AWS environment.

**Continuously monitors specific data sources and event logs**  
+ **Foundational threat detection** – When you enable GuardDuty in an AWS account, GuardDuty automatically starts ingesting the foundational data sources associated with that account. These data sources include AWS CloudTrail management events, VPC flow logs (from Amazon EC2 instances), and DNS logs. You don't need to enable anything else for GuardDuty to start analyzing and processing these data sources to generate associated security findings. For more information, see [GuardDuty foundational data sources](guardduty_data-sources.md).
+ **Extended Threat Detection** – This capability detects multi-stage attacks that span foundational data sources, multiple types of AWS resources, and time, within an AWS account. There might be multiple events in your account that, individually, don't present themselves as a clear threat. However, when these events are observed in a sequence that is indicative of a suspicious activity, GuardDuty identifies it as an attack sequence. GuardDuty notifies you by generating the associated attack sequence finding type to provide details about the observed attack sequence.

  With no additional cost associated with it, Extended Threat Detection is automatically enabled for each AWS account when they enable GuardDuty. This capability doesn't require you to enable any use-case focused protection plan. However, to increase the breadth of security to your Amazon S3 resources, GuardDuty recommends enabling S3 Protection in your account. This will help Extended Threat Detection to identify multi-stage attacks that potentially impact your Amazon S3 resources.

  For more information about how this capability works and what threat scenarios it covers, see [GuardDuty Extended Threat Detection](guardduty-extended-threat-detection.md).
+ **Use-case focused GuardDuty protection plans** – For enhanced threat detection visibility into the security of your AWS environment, GuardDuty offers dedicated protection plans that you can choose to enable. Protection plans help you monitor logs and events from other AWS services. These sources include EKS audit logs, RDS login activity, Amazon S3 data events in CloudTrail, EBS volumes, Runtime Monitoring across Amazon EKS, Amazon EC2, and Amazon ECS-Fargate, and Lambda network activity logs. GuardDuty consolidates these log and event sources under the term - [Features](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty-features-activation-model.html). You can enable one or more dedicated protection plans in a supported AWS Region at any time. GuardDuty will start monitoring, processing, and analyzing the activities based on which protection plan you enable. For more information about each protection plan and how it works, see the corresponding protection plan document.    
[See the AWS documentation website for more details](http://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html)
**Enable Malware Protection for S3 independently**  
GuardDuty offers flexibility to use Malware Protection for S3 independently, without enabling the Amazon GuardDuty service. For more information about getting started with only Malware Protection for S3, see [GuardDuty Malware Protection for S3](gdu-malware-protection-s3.md). To use all other protection plans, you must enable the GuardDuty service.

**Manage multiple-account environment**  
You can manage a multiple-account AWS environment by using either AWS Organizations (recommended) or legacy invitation method. For more information, see [Multiple accounts in GuardDuty](guardduty_accounts.md).

**Generates security findings for detected threats**  
When GuardDuty detects potential security threats associated with your AWS resources, it starts generating security findings that provide information about the potentially compromised resource. After you enable GuardDuty in your account, generate [Sample findings](sample_findings.md) to view the associated [Finding details](guardduty_findings-summary.md). For a complete list of security findings, see [GuardDuty finding types](guardduty_finding-types-active.md).  
With GuardDuty, you can also use a tester script that generates specific GuardDuty security findings to understand how to review and respond to GuardDuty findings. For more information, see [Test GuardDuty findings in dedicated accounts](guardduty_findings-scripts.md).

**Assessing and managing security findings**  
GuardDuty consolidates your security findings across accounts and displays results in the Summary dashboard on the GuardDuty console. You can also retrieve findings through the AWS Security Hub CSPM API, AWS Command Line Interface, or AWS SDK. With a holistic view of your current security status, you can identify trends and potential issues, and take necessary remediation steps. For more information, see [Managing GuardDuty findings](findings_management.md).

 **Integrate with related AWS security services**   
To further help you analyze and investigate the security trends in your AWS environment, consider using the following AWS security-related services in combination with GuardDuty.  
+ **AWS Security Hub CSPM** – This service gives you a comprehensive view of the security state of your AWS resources and helps you check your AWS environment against security industry standards and best practices. It does this partly by consuming, aggregating, organizing, and prioritizing your security findings from multiple AWS services (including Amazon Macie) and supported AWS Partner Network (APN) products. Security Hub CSPM helps you analyze your security trends and identify the highest priority security issues across your AWS environment.

  For information about using GuardDuty and Security Hub CSPM together, see [Integrating GuardDuty with AWS Security Hub CSPM](guardduty_integrations.md#gd-securityhub). To learn more about Security Hub CSPM, see the [AWS Security Hub User Guide](https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html).
+ **Amazon Detective** – This service helps you analyze, investigate, and quickly identify the root cause of security findings or suspicious activities. Detective automatically collects log data from your AWS resources. It then uses machine learning, statistical analysis, and graph theory to generate visualizations that help you to conduct faster and more efficient security investigations. The Detective prebuilt data aggregations, summaries, and context help you analyze and determine the nature and extent of potential security issues.

  For information about using GuardDuty and Detective together, see [Integrating GuardDuty with Amazon Detective](guardduty_integrations.md#gd-detective). To learn more about Detective, see the [Amazon Detective User Guide](https://docs.aws.amazon.com/detective/latest/userguide/what-is-detective.html).
+ **Amazon EventBridge** – This service helps you receive notifications and respond to GuardDuty security findings in near-real time. GuardDuty creates an event when there is a change in the findings. You can choose how frequently you want to receive the notifications from EventBridge. For more information, see [What is Amazon EventBridge](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html) in the *Amazon EventBridge User Guide*.

## PCI DSS Compliance
<a name="guardduty-pci-dss-compliance"></a>

GuardDuty supports the processing, storage, and transmission of credit card data by a merchant or service provider, and has been validated as being compliant with Payment Card Industry (PCI) Data Security Standard (DSS). For more information about PCI DSS, including how to request a copy of the AWS PCI Compliance Package, see [PCI DSS Level 1](https://aws.amazon.com/compliance/pci-dss-level-1-faqs/). 

For more information, see [New third-party test compares Amazon GuardDuty to network intrusion detection systems](https://aws.amazon.com/blogs/security/new-third-party-test-compares-amazon-guardduty-to-network-intrusion-detection-systems/) in the *AWS Security Blog*.