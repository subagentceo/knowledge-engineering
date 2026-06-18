

# Welcome
<a name="Welcome"></a>

 AWS Organizations is a web service that enables you to consolidate your multiple AWS accounts into an *organization* and centrally manage your accounts and their resources.

This guide provides descriptions of the Organizations API. For more information about using this service, see the [AWS Organizations User Guide](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html).

 **API version** 

This version of the Organizations API Reference documents the Organizations API version 2016-11-28.

**Note**  
As an alternative to using the API directly, you can use one of the AWS SDKs, which consist of libraries and sample code for various programming languages and platforms (Java, Ruby, .NET, iOS, Android, and more). The SDKs provide a convenient way to create programmatic access to AWS Organizations. For example, the SDKs take care of cryptographically signing requests, managing errors, and retrying requests automatically. For more information about the AWS SDKs, including how to download and install them, see [Tools for Amazon Web Services](http://aws.amazon.com/tools/).

We recommend that you use the AWS SDKs to make programmatic API calls to Organizations. However, you also can use the Organizations Query API to make direct calls to the Organizations web service. To learn more about the Organizations Query API, see [Calling the API by making HTTP Query requests](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_query-requests.html) in the * AWS Organizations User Guide*. Organizations supports GET and POST requests for all actions. That is, the API doesn't require you to use GET for some actions and POST for others. However, GET requests are subject to the limitation size of a URL. Therefore, for operations that require larger sizes, use a POST request.

 **Signing requests** 

When you send HTTP requests to AWS, sign the requests so that AWS can identify who sent them. You sign requests with your AWS access key, which consists of an access key ID and a secret access key. We strongly recommend that you don't create an access key for your root account. Anyone who has the access key for your root account has unrestricted access to all the resources in your account. Instead, create an access key for an IAM user that has administrative permissions. As another option, use AWS Security Token Service (AWS STS) to generate temporary security credentials, and use those credentials to sign requests.

To sign requests, we recommend that you use [Signature Version 4](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html). If you have an existing application that uses Signature Version 2, you don't have to update it to use Signature Version 4. However, some operations now require Signature Version 4. The documentation for operations that require version 4 indicate this requirement.

When you use the AWS Command Line Interface (AWS CLI) or one of the AWS SDKs to make requests to AWS, these tools automatically sign the requests for you with the access key that you specify when you configure the tools.

In this release, each organization can have only one root.

 **Support and feedback for AWS Organizations ** 

We welcome your feedback. You can post your feedback and questions in the [AWS Organizations support forum](https://forums.aws.amazon.com/forum.jspa?forumID=219). For more information about the AWS Support forums, see [Forums Help](https://forums.aws.amazon.com/help.jspa).

 **Endpoint to call When using the AWS CLI or the AWS SDK** 

For the current release of Organizations, specify the `us-east-1` region for all AWS API and AWS CLI calls made from the commercial AWS Regions outside of China. If calling from one of the AWS Regions in China, then specify `cn-northwest-1`. You can do this in the AWS CLI by using these parameters and commands:
+ Use the following parameter with each command to specify both the endpoint and its region:

   `--endpoint-url https://organizations.us-east-1.amazonaws.com` *(from commercial AWS Regions outside of China)* 

  or

   `--endpoint-url https://organizations.cn-northwest-1.amazonaws.com.cn` *(from AWS Regions in China)* 
+ Use the default endpoint, but configure your default region with this command:

   `aws configure set default.region us-east-1` *(from commercial AWS Regions outside of China)* 

  or

   `aws configure set default.region cn-northwest-1` *(from AWS Regions in China)* 
+ Use the following parameter with each command to specify the endpoint:

   `--region us-east-1` *(from commercial AWS Regions outside of China)* 

  or

   `--region cn-northwest-1` *(from AWS Regions in China)* 

 **How examples are presented** 

The JSON returned by the AWS Organizations service as response to your requests arrives as a single long string without line breaks or formatting whitespace. The examples in this guide include both line breaks and whitespace to improve readability. When example input parameters also would result in long strings that would extend beyond the screen, we insert line breaks to enhance readability. Always submit the input as a single JSON text string.

 **Recording API Requests** 

 AWS Organizations supports AWS CloudTrail, a service that records AWS API calls for your AWS account and delivers log files to an Amazon S3 bucket. By using information collected by CloudTrail, you can determine which requests the Organizations service received, who made the request and when, and so on. For more about AWS Organizations and its support for CloudTrail, see [Logging AWS Organizations API calls with AWS CloudTrail](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_security_incident-response.html#orgs_cloudtrail-integration) in the * AWS Organizations User Guide*. To learn more about CloudTrail, including how to turn it on and find your log files, see the [CloudTrail User Guide](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/what_is_cloud_trail_top_level.html).

This document was last published on June 17, 2026. 