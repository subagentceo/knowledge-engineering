

# Welcome
<a name="Welcome"></a>

 AWS Secrets Manager provides a service to enable you to store, manage, and retrieve, secrets.

This guide provides descriptions of the Secrets Manager API. For more information about using this service, see the [AWS Secrets Manager User Guide](https://docs.aws.amazon.com/secretsmanager/latest/userguide/introduction.html).

 **API Version** 

This version of the Secrets Manager API Reference documents the Secrets Manager API version 2017-10-17.

Although you can make direct calls to the Secrets Manager HTTPS Query API, we recommend that you use one of the SDKs instead. The SDK performs many useful tasks you otherwise must perform manually. For example, the SDKs automatically sign your requests and convert responses into a structure syntactically appropriate to your language.

For SDKs, see:
+  [C\+\+](http://sdk.amazonaws.com/cpp/api/LATEST/namespace_aws_1_1_secrets_manager.html) 
+  [Java](https://docs.aws.amazon.com/AWSJavaSDK/latest/javadoc/com/amazonaws/services/secretsmanager/package-summary.html) 
+  [PHP](https://docs.aws.amazon.com//aws-sdk-php/v3/api/namespace-Aws.SecretsManager.html) 
+  [Python](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/secretsmanager.html) 
+  [Ruby](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/SecretsManager.html) 
+  [.NET](https://docs.aws.amazon.com/sdkfornet/v3/apidocs/items/SecretsManager/NSecretsManagerModel.html) 
+  [Node.js](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-secrets-manager) 
+  [Go](https://docs.aws.amazon.com/sdk-for-go/api/service/secretsmanager/) 

 **Making HTTPS query requests** 

The Query API for AWS Secrets Manager lets you call service operations. Query API requests are HTTPS requests that must contain an `Action` parameter to indicate the operation to be performed. AWS Secrets Manager supports GET and POST requests for all operations. The API doesn't require you to use GET for some operations and POST for others. However, GET requests are subject to the limitation size of a URL. Although this limit depends on the browser, a typical limit is 2048 bytes. Therefore, for Query API requests that require larger sizes, you must use a POST request.

For a list of endpoints, see [AWS Secrets Manager endpoints](https://docs.aws.amazon.com/secretsmanager/latest/userguide/asm_access.html#endpoints).

The API returns the response in an XML document. For details about the response, see the individual API description pages in the [AWS Organizations API reference](https://docs.aws.amazon.com/organizations/latest/APIReference/Welcome.html).

Because the Query API returns sensitive information such as security credentials, you must use HTTPS to encrypt all API requests.

When you send HTTP requests to AWS, you must sign the requests so AWS can identify the sender. You must use [Signature Version 4](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html). If you have an existing application that uses Signature Version 2, you must update it to use Signature Version 4. 

You sign requests with your AWS access key, which consists of an access key ID and a secret access key. We strongly recommend you don't create an access key for your root user. Anyone who has the access key for your root user has unrestricted access to all the resources in your account. Instead, create an access key for an IAM user with permissions required for the task at hand. As another option, use AWS Security Token Service to generate temporary security credentials, and use those credentials to sign requests. 

For more information, see the following:
+  [AWS Security Credentials](https://docs.aws.amazon.com/general/latest/gr/aws-security-credentials.html). Provides general information about the types of credentials you can use to access AWS. 
+  [IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html). Offers suggestions for using the IAM service to help secure your AWS resources, including those in Secrets Manager. 
+  [Temporary Credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html). Describes how to create and use temporary security credentials. 

When you use the AWS Command Line Interface (AWS CLI) or one of the AWS SDKs to make requests to AWS, these tools automatically sign the requests for you with the access key that you specify when you configure the tools.

The JSON that AWS Secrets Manager expects as your request parameters and the service returns as a response to HTTP query requests contain single, long strings without line breaks or white space formatting. The JSON shown in the examples in this guide displays the code formatted with both line breaks and white space to improve readability. When example input parameters can also cause long strings extending beyond the screen, you can insert line breaks to enhance readability. You should always submit the input as a single JSON text string.

 **Support and Feedback for AWS Secrets Manager** 

We welcome your feedback. Send your comments to [awssecretsmanager-feedback@amazon.com](mailto:awssecretsmanager-feedback@amazon.com), or post your feedback and questions in the [AWS Secrets Manager Discussion Forum](http://forums.aws.amazon.com/forum.jspa?forumID=296). For more information about the AWS Discussion Forums, see [Forums Help](http://forums.aws.amazon.com/help.jspa).

 **Logging API Requests** 

 AWS Secrets Manager supports AWS CloudTrail, a service that records AWS API calls for your AWS account and delivers log files to an Amazon S3 bucket. By using information that's collected by AWS CloudTrail, you can determine the requests successfully made to Secrets Manager, who made the request, when it was made, and so on. For more about AWS Secrets Manager and support for AWS CloudTrail, see [Logging AWS Secrets Manager Events with AWS CloudTrail](https://docs.aws.amazon.com/secretsmanager/latest/userguide/monitoring.html#monitoring_cloudtrail) in the * AWS Secrets Manager User Guide*. To learn more about CloudTrail, including enabling it and find your log files, see the [AWS CloudTrail User Guide](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/what_is_cloud_trail_top_level.html).

This document was last published on June 17, 2026. 