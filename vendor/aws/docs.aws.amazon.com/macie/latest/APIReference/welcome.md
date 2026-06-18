

# Welcome
<a name="welcome"></a>

Amazon Macie is a data security service that discovers sensitive data by using machine learning and pattern matching, provides visibility into data security risks, and enables automated protection against those risks.

To help you manage the security posture of your organization's Amazon Simple Storage Service (Amazon S3) data estate, Macie provides you with an inventory of your S3 general purpose buckets, and automatically evaluates and monitors the buckets for security and access control. If Macie detects a potential issue with the security or privacy of your data, such as a bucket that becomes publicly accessible, Macie generates a finding for you to review and remediate as necessary.

Macie also automates discovery and reporting of sensitive data to provide you with a better understanding of the data that your organization stores in Amazon S3. To detect sensitive data, you can use built-in criteria and techniques that Macie provides, custom criteria that you define, or a combination of the two. If Macie detects sensitive data in an S3 object, Macie generates a finding to notify you of the sensitive data that it found. 

In addition to findings, Macie provides statistics and information that offer insight into the security posture of your Amazon S3 data and where sensitive data might reside in your data estate. The statistics and information can guide your decisions to perform deeper investigations of specific S3 buckets and objects. You can analyze and process findings, statistics, and other information by using the Amazon Macie API. You can also leverage Macie integration with Amazon EventBridge and AWS Security Hub to monitor, process, and remediate findings by using other services, applications, and systems.

This guide, the *Amazon Macie REST API Reference*, provides information about the Amazon Macie API. This includes supported resources, HTTP methods, parameters, and schemas. If you're new to Macie, you might find it helpful to also review the [Amazon Macie User Guide](https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html). The *Amazon Macie User Guide* explains key concepts and provides procedures that demonstrate how to use Macie features. It also provides information about topics such as integrating Macie with other AWS services.

In addition to interacting with Macie by making RESTful calls to the Amazon Macie API, you can use a current version of an AWS command line tool or SDK. AWS provides tools and SDKs that consist of libraries and sample code for various languages and platforms, such as PowerShell, Java, Go, Python, C\+\+, and .NET. These tools and SDKs provide convenient, programmatic access to Macie and other AWS services. They also handle tasks such as signing requests, managing errors, and retrying requests automatically. For information about installing and using AWS tools and SDKs, see [Tools to Build on AWS](https://aws.amazon.com/developertools/).

## Finding regional endpoints
<a name="rest-api-mce-endpoints"></a>

The Amazon Macie API is available in most AWS Regions and it provides an endpoint for each of these Regions. For a list of Regions and endpoints where the API is currently available, see [Amazon Macie endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/macie.html) in the *AWS General Reference*. To learn about managing AWS Regions for your AWS account, see [Enable or disable AWS Regions in your account](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-regions.html) in the *AWS Account Management Reference Guide*.

When you send a request to the Amazon Macie API, the request applies only to the AWS Region that’s currently active for your AWS account or specified in the request. If your request submits changes to configuration or other settings for your account, the changes apply only to that Region. To make the same changes in other Regions, send the request in each additional Region that you want to apply the changes to.

## Managing multiple accounts
<a name="rest-api-mce-org-mgmt"></a>

If your AWS environment has multiple accounts, you can associate the Amazon Macie accounts in your environment and centrally manage them as an organization in Macie. To do this, designate a single account as the delegated Macie administrator account and associate other accounts with it as Macie member accounts. You can do this in two ways: by integrating Macie with AWS Organizations, or by sending and accepting membership invitations in Macie. We recommend that you integrate Macie with AWS Organizations.

With this configuration, a designated Macie administrator can assess and monitor the overall security posture of the organization’s Amazon Simple Storage Service (Amazon S3) data estate. For example, the Macie administrator can:
+ Access inventory data, policy findings, and certain Macie settings for member accounts.
+ Enable automated sensitive data discovery and run classification jobs to detect sensitive data in S3 buckets that member accounts own.
+ Perform account management and administration tasks at scale, such as monitoring estimated usage costs and assessing account quotas.

If you have a member account in an organization, you can access Macie settings, data, and resources only for your own account. For this reason, you might not be able to use certain operations of the Amazon Macie API.

For information about the tasks that administrator and member accounts can perform, see [Managing multiple accounts as an organization](https://docs.aws.amazon.com/macie/latest/user/macie-accounts.html) in the *Amazon Macie User Guide*.

## Signing requests
<a name="rest-api-mce-signing-requests"></a>

When you send an HTTPS request to the Amazon Macie API, you have to sign the request by using your AWS access key, which consists of an access key ID and a secret access key. For everyday work with Macie, we strongly recommend that you not use the access key ID and secret access key for your root AWS account. Instead, use the access key ID and secret access key for an AWS Identity and Access Management (IAM) identity. You can also use the AWS Security Token Service to generate temporary security credentials that you can use to sign requests. All Amazon Macie operations require Signature Version 4.

For information about using credentials and signing requests, refer to the following resources in the *IAM User Guide*:
+ [AWS security credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/security-creds.html) – Provides information about the types of credentials that can be used to access AWS.
+ [IAM identities](https://docs.aws.amazon.com/IAM/latest/UserGuide/id.html) – Provides information about the types of identities that can be used to access an AWS account.
+ [Temporary security credentials in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html) – Provides information about creating and using temporary security credentials.
+ [AWS Signature Version 4 for API requests](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_aws-signing.html) – Provides information about signing an API request.

## Logging API calls
<a name="rest-api-mce-logging"></a>

Amazon Macie integrates with AWS CloudTrail, which is a service that provides a record of actions that were taken in Macie by a user, a role, or another AWS service. This includes actions that were performed using the Amazon Macie console and programmatic calls to Amazon Macie operations.

By using the information collected by CloudTrail, you can determine which requests were sent to Macie successfully. For each request, you can identify when it was made, the IP address from which it was made, who made it, and additional details. For more information, see [Logging API calls with AWS CloudTrail](https://docs.aws.amazon.com/macie/latest/user/macie-cloudtrail.html) in the *Amazon Macie User Guide*.