

# Welcome
<a name="Welcome"></a>

The API operations in the Account Management (`account`) namespace enable you to modify your AWS account.

Every AWS account supports metadata with information about the account, including information about up to three alternate contacts associated with the account. These are in addition to the email address associated with the [root user](https://docs.aws.amazon.com/accounts/latest/reference/root-user.html) of the account. You can specify only one of each of the following contact types associated with an account.
+ Billing contact
+ Operations contact
+ Security contact

By default, the API operations discussed in this guide apply directly to the account that calls the operation. The [identity](https://docs.aws.amazon.com/IAM/latest/UserGuide/id.html) in the account that is calling the operation is typically an IAM role or IAM user and must have permission applied by an IAM policy to call the API operation. Alternatively, you can call these API operations from an identity in an AWS Organizations management account and specify the account ID number for any AWS account that is a member of the organization.

 **API version** 

This version of the Accounts API Reference documents the Account Management API version 2021-02-01.

**Note**  
As an alternative to using the API directly, you can use one of the AWS SDKs, which consist of libraries and sample code for various programming languages and platforms (Java, Ruby, .NET, iOS, Android, and more). The SDKs provide a convenient way to create programmatic access to Account Management. For example, the SDKs take care of cryptographically signing requests, managing errors, and retrying requests automatically. For more information about the AWS SDKs, including how to download and install them, see [Tools for Amazon Web Services](https://console.aws.amazon.com/).

We recommend that you use the AWS SDKs to make programmatic API calls to the Account Management service. However, you also can use the Account Management Query API to make direct calls to the Account Management web service. To learn more about the Account Management Query API, see [Calling the API by making HTTP Query requests](https://docs.aws.amazon.com/accounts/latest/reference/query-requests.html) in the AWS Account Management Reference Guide. Account Management supports GET and POST requests for all actions. That is, the API does not require you to use GET for some actions and POST for others. However, GET requests are subject to the limitation size of a URL. Therefore, for operations that require larger sizes, use a POST request.

 **Signing requests** 

When you send HTTP requests to AWS, you must sign the requests so that AWS can identify who sent them. You sign requests with your AWS access key, which consists of an access key ID and a secret access key. We strongly recommend that you do not create an access key for your root account. Anyone who has the access key for your root account has unrestricted access to all the resources in your account. Instead, create an access key for an IAM user that has administrative privileges. As another option, use AWS Security Token Service to generate temporary security credentials, and use those credentials to sign requests.

To sign requests, we recommend that you use Signature Version 4. If you have an existing application that uses Signature Version 2, you do not have to update it to use Signature Version 4. However, some operations now require Signature Version 4. The documentation for operations that require version 4 indicates this requirement. For more information, see [Signing AWS API requests](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_aws-signing.html) in the *IAM User Guide*.

When you use the AWS Command Line Interface (AWS CLI) or one of the AWS SDKs to make requests to AWS, these tools automatically sign the requests for you with the access key that you specify when you configure the tools.

 **Support and feedback for Account Management** 

We welcome your feedback. Send your comments to [feedback-awsaccounts@amazon.com](mailto://feedback-awsaccounts@amazon.com) or post your feedback and questions in the [Account Management support forum](http://forums.aws.amazon.com/forum.jspa?forumID=219). For more information about the AWS support forums, see [Forums Help](http://forums.aws.amazon.com/help.jspa).

 **How examples are presented** 

The JSON returned by Account Management in response to your requests is a single long string without line breaks or formatting whitespace. Both line breaks and whitespace are shown in the examples in this guide to improve readability. When example input parameters also would result in long strings that would extend beyond the screen, we insert line breaks to enhance readability. You should always submit the input as a single JSON text string.

 **Recording API Requests** 

Account Management supports CloudTrail, a service that records AWS API calls for your AWS account and delivers log files to an Amazon S3 bucket. By using information collected by CloudTrail, you can determine which requests were successfully made to Account Management, who made the request, when it was made, and so on. For more about Account Management and its support for CloudTrail, see [Logging AWS Account Management API calls using AWS CloudTrail](https://docs.aws.amazon.com/accounts/latest/reference/monitoring-cloudtrail.html). To learn more about CloudTrail, including how to turn it on and find your log files, see the [CloudTrail User Guide](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/).

This document was last published on June 12, 2026. 