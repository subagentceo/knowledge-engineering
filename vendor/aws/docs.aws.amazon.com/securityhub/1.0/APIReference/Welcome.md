

# AWS Security Hub CSPM API Reference
<a name="Welcome"></a>

AWS Security Hub CSPM provides you with a comprehensive view of your security state in AWS and helps you assess your AWS environment against security industry standards and best practices.

Security Hub CSPM collects security data across AWS accounts, AWS services, and supported third-party products and helps you analyze your security trends and identify the highest priority security issues.

To help you manage the security state of your organization, Security Hub CSPM supports multiple security standards. These include the AWS Foundational Security Best Practices (FSBP) standard developed by AWS, and external compliance frameworks such as the Center for Internet Security (CIS), the Payment Card Industry Data Security Standard (PCI DSS), and the National Institute of Standards and Technology (NIST). Each standard includes several security controls, each of which represents a security best practice. Security Hub CSPM runs checks against security controls and generates control findings to help you assess your compliance against security best practices.

In addition to generating control findings, Security Hub CSPM also receives findings from other AWS services, such as Amazon GuardDuty and Amazon Inspector, and supported third-party products. This gives you visibility into a variety of security-related issues. You can also send Security Hub CSPM findings to other AWS services and supported third-party products.

Security Hub CSPM offers automation features that help you triage and remediate security issues. For example, you can use automation rules to automatically update critical findings when a security check fails. You can also leverage the integration with Amazon EventBridge to trigger automatic responses to specific findings.

This guide, the *AWS Security Hub CSPM API Reference*, provides information about the Security Hub CSPM API. This includes supported resources, HTTP methods, parameters, and schemas. If you're new to Security Hub CSPM, you might find it helpful to also review the [https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html](https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html). The user guide explains key concepts and provides procedures that demonstrate how to use Security Hub CSPM features. It also provides information about topics such as integrating Security Hub CSPM with other AWS services. Additional information about the [AWS Security Finding Format (ASFF)](https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-findings-format.html) is also included in the *AWS Security Hub CSPM User Guide*.

In addition to interacting with Security Hub CSPM by making calls to the Security Hub CSPM API, you can use a current version of an AWS command line tool or SDK. AWS provides tools and SDKs that consist of libraries and sample code for various languages and platforms, such as PowerShell, Java, Go, Python, C\+\+, and .NET. These tools and SDKs provide convenient, programmatic access to Security Hub CSPM and other AWS services . They also handle tasks such as signing requests, managing errors, and retrying requests automatically. For information about installing and using the AWS tools and SDKs, see [Tools to Build on AWS](https://aws.amazon.com/developer/tools/).

## Finding Regional endpoints
<a name="endpoints"></a>

The AWS Security Hub CSPM API is available in most AWS Regions, and it provides an endpoint for each of these Regions. For a list of Regions and endpoints where the API is currently available, see [AWS Security Hub CSPM endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/sechub.html) in the *AWS General Reference*. To learn about managing AWS Regions for your AWS account, see [Enable or disable AWS Regions in your account](https://docs.aws.amazon.com/) in the *AWS Account Management Reference Guide*.

With the exception of operations that are related to central configuration, Security Hub CSPM API requests are executed only in the AWS Region that's currently active in your AWS account or specified in your request. Any changes submitted by a request apply only in that Region. To make the same changes in other Regions, send the request in each additional Region that you want to apply the changes to. When you use central configuration, API requests for configuring Security Hub CSPM, standards, and controls are executed in the home Region and all linked Regions. For more information, see [Central configuration](https://docs.aws.amazon.com/securityhub/latest/userguide/central-configuration-intro.html) in the *AWS Security Hub CSPM User Guide*.

## Throttling limits
<a name="throttling-limits"></a>

The following throttling limits apply to Security Hub CSPM API operations.
+ `BatchEnableStandards` - `RateLimit` of 1 request per second. `BurstLimit` of 1 request per second.
+ `GetFindings` - `RateLimit` of 3 requests per second. `BurstLimit` of 6 requests per second.
+ `BatchImportFindings` - `RateLimit` of 10 requests per second. `BurstLimit` of 30 requests per second.
+ `BatchUpdateFindings` - `RateLimit` of 10 requests per second. `BurstLimit` of 30 requests per second.
+ `UpdateStandardsControl` - `RateLimit` of 1 request per second. `BurstLimit` of 5 requests per second.
+ All other operations - `RateLimit` of 10 requests per second. `BurstLimit` of 30 requests per second.

## Timestamps
<a name="timestamps"></a>

In the Security Hub CSPM API, timestamp fields can end with `Z` or `("+" / "-") time-hour [":" time-minute]`. The time-secfrac after seconds is limited to a maximum of 9 digits. The offset is bounded by \+/-18:00. Here are valid timestamp formats that you can send to Security Hub CSPM:
+ `YYYY-MM-DDTHH:MM:SSZ` (for example, `2019-01-31T23:00:00Z`)
+ `YYYY-MM-DDTHH:MM:SS.mmmmmmmmmZ` (for example, `2019-01-31T23:00:00.123456789Z`)
+ `YYYY-MM-DDTHH:MM:SS+HH:MM` (for example, `2024-01-04T15:25:10+17:59`)
+ `YYYY-MM-DDTHH:MM:SS-HHMM` (for example, `2024-01-04T15:25:10-1759`)
+ `YYYY-MM-DDTHH:MM:SS.mmmmmmmmm+HH:MM` (for example, `2024-01-04T15:25:10.123456789+17:59`)

If a finding provider sends a finding to Security Hub CSPM that contains a timestamp in nanoseconds, we round it to milliseconds. For example, we round `2024-10-31T23:00:00.123456789Z` to `2024-10-31T23:00:00.123Z`.