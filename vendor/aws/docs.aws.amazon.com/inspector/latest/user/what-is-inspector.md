

# What is Amazon Inspector?
<a name="what-is-inspector"></a>

 Amazon Inspector is a vulnerability management service that automatically discovers workloads and continually scans them for software vulnerabilities and unintended network exposure. Amazon Inspector discovers and scans [Amazon EC2 instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html), [container images in Amazon ECR](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html), and [Lambda functions](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html). When Amazon Inspector detects a software vulnerability or unintended network exposure, it creates [a finding](https://docs.aws.amazon.com/inspector/latest/user/findings-understanding.html), which is a detailed report about the issue. You can [manage findings](https://docs.aws.amazon.com/inspector/latest/user/findings-managing.html) in the Amazon Inspector console or API. 

**Note**  
 When submitting a support request, Amazon Inspector might access and process relevant findings in the AWS Region where they are stored (but within the same geography) to address the issue. 

**Topics**
+ [Features of Amazon Inspector](#features)
+ [Accessing Amazon Inspector](#accessing)

## Features of Amazon Inspector
<a name="features"></a>

**Centrally manage multiple Amazon Inspector accounts**

If your AWS environment has multiple accounts, you can centrally manage your environment through a single account by using AWS Organizations. Using this approach, you can designate an account as the delegated administrator account for Amazon Inspector. 

Amazon Inspector can be activated for your entire organization with a single click. Additionally, you can automate activating the service for future members whenever they join your organization. The Amazon Inspector delegated administrator account can manage findings data and certain settings for members of the organization. This includes viewing aggregated findings details for all member accounts, activating or deactivating scans for member accounts, and reviewing scanned resources within the AWS organization.

**Continuously scan your environment for vulnerabilities and network exposure**

With Amazon Inspector, you don't need to manually schedule or configure assessment scans. Amazon Inspector automatically discovers and begins [scanning your eligible resources](scanning-resources.md). Amazon Inspector continues to assess your environment throughout the lifecycle of your resources by automatically rescanning resources in response to changes that could introduce a new vulnerability, such as: installing a new package in an EC2 instance, installing a patch, and when a new common vulnerabilities and exposures (CVE) that impacts the resource is published. Unlike traditional security scanning software, Amazon Inspector has minimal impact on the performance of your fleet.

 When vulnerabilities or open network paths are identified, Amazon Inspector produces a [finding](findings-understanding.md) that you can investigate. The finding includes comprehensive details about the vulnerability, the affected resource, and remediation recommendations. If you appropriately remediate a finding, Amazon Inspector automatically detects the remediation and closes the finding. 

**Assess vulnerabilities accurately with the Amazon Inspector Risk score**

As Amazon Inspector collects information about your environment through scans, it provides severity scores specifically tailored to your environment. Amazon Inspector examines the security metrics that compose the [National Vulnerability Database](https://nvd.nist.gov/vuln) (NVD) base score for a vulnerability and adjusts them according to your compute environment. For example, the service may lower the Amazon Inspector score of a finding for an Amazon EC2 instance if the vulnerability is exploitable over the network but no open network path to the internet is available from the instance. This score is in CVSS format and is a modification of the base [Common Vulnerability Scoring System](https://www.first.org/cvss/) (CVSS) score provided by NVD. 

**Identify high-impact findings with the Amazon Inspector dashboard**

The [Amazon Inspector dashboard](understanding-dashboard.md) offers a high-level view of findings from across your environment. From the dashboard, you can access the granular details of a finding. The dashboard contains streamlined information about scan coverage in your environment, your most critical findings, and which resources have the most findings. The risk-based remediation panel in the Amazon Inspector dashboard presents the findings that affect the largest number of instances and images. This panel makes it easier to identify the findings with the greatest impact on your environment, review finding details, and review suggested solutions.

**Manage your findings using customizable views**

In addition to the dashboard, the Amazon Inspector console offers a **Findings** view. This page lists all findings for your environment and provides the details of individual findings. You can view findings grouped by category or vulnerability type. In each view, you can further customize your results using filters. You can also use filters to create suppression rules that hide unwanted findings from your views. 

You can use filters and suppression rules to generate finding reports that show all findings or a customized selection of findings. Reports can be generated in CSV or JSON formats. 

**Monitor and process findings with other services and systems**

To support integration with other services and systems, Amazon Inspector [publishes findings to Amazon EventBridge](findings-managing-automating-responses.md) as finding events. EventBridge is a serverless event bus service that can route findings data to targets such as AWS Lambda functions and Amazon Simple Notification Service (Amazon SNS) topics. With EventBridge, you can monitor and process findings in near-real time as part of your existing security and compliance workflows. 

 If you have activated [AWS Security Hub CSPM](securityhub-integration.md), then Amazon Inspector will also [publish findings to Security Hub CSPM](integrations.md#integrations-security-hub). Security Hub CSPM is a service that provides a comprehensive view of your security posture across your AWS environment and helps you check your environment against security industry standards and best practices. With Security Hub CSPM, you can more easily monitor and process your findings as part of a broader analysis of your organization's security posture in AWS. 

## Accessing Amazon Inspector
<a name="accessing"></a>

Amazon Inspector is available in most AWS Regions. For a list of Regions where Amazon Inspector is currently available, see [Amazon Inspector endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/inspector2.html) in the *Amazon Web Services General Reference*. To learn more about AWS Regions, see [Managing AWS Regions](https://docs.aws.amazon.com/general/latest/gr/rande-manage.html) in the *Amazon Web Services General Reference*. In each Region, you can work with Amazon Inspector in the following ways.

**AWS Management Console** 

The AWS Management Console is a browser-based interface that you can use to create and manage AWS resources. As part of that console, the Amazon Inspector console provides access to your Amazon Inspector account and resources. You can perform Amazon Inspector tasks from the Amazon Inspector console. 

**AWS command line tools** 

With AWS command line tools, you can issue commands at your system's command line to perform Amazon Inspector tasks. Using the command line can be faster and more convenient than using the console. The command line tools are also useful if you want to build scripts that perform tasks. 

 AWS provides two sets of command line tools: the AWS Command Line Interface (AWS CLI) and the AWS Tools for PowerShell. For information about installing and using the AWS CLI, see the [AWS Command Line Interface User Guide](https://docs.aws.amazon.com/cli/latest/userguide/). For information about installing and using the Tools for PowerShell, see the [AWS Tools for PowerShell User Guide](https://docs.aws.amazon.com/powershell/v5/userguide/pstools-getting-set-up.html).

**AWS SDKs** 

AWS provides SDKs that consist of libraries and sample code for various programming languages and platforms, including Java, Go, Python, C\+\+, and .NET. The SDKs provide convenient, programmatic access to Amazon Inspector and other AWS services. They also handle tasks such as cryptographically signing requests, managing errors, and retrying requests automatically. For information about installing and using the AWS SDKs, see [Tools to Build on AWS](https://aws.amazon.com/tools/).

**Amazon Inspector REST API** 

The Amazon Inspector REST API gives you comprehensive, programmatic access to your Amazon Inspector account and resources. With this API, you can send HTTPS requests directly to Amazon Inspector. However, unlike the AWS command line tools and SDKs, use of this API requires your application to handle low-level details such as generating a hash to sign a request.