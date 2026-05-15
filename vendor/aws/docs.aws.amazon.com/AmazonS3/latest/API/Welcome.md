

# Welcome
<a name="Welcome"></a>

 Welcome to the *Amazon Simple Storage Service API Reference*. This guide explains the Amazon Simple Storage Service (Amazon S3) application programming interface (API). 

You can use any toolkit that supports HTTP to use the REST API. You can even use a browser to fetch objects, as long as they are anonymously readable.

The REST API uses the standard HTTP headers and status codes, so that standard browsers and toolkits work as expected. In some areas, we have added functionality to HTTP (for example, we added headers to support access control). In these cases, we have done our best to add the new functionality in a way that matched the style of standard HTTP usage.

*Version*

The current version of the Amazon S3 API is `2006-03-01`. 

*Type* 

Amazon S3 supports the REST API. 

**Note**  
Support for SOAP over HTTP is deprecated, but it is still available over HTTPS. However, new Amazon S3 features will not be supported for SOAP. We recommend that you use either this REST API or the AWS SDKs at the following link:  
[https://aws.amazon.com/developer/tools/](https://aws.amazon.com/developer/tools/?nc1=f_dr)

This REST API reference includes:
+ [S3 API Reference](Type_API_Reference.md) — which contains [Actions](API_Operations.md) (operations) and [Data Types](API_Types.md)
+ *Headers* — [Common request headers](RESTCommonRequestHeaders.md) and [Common response headers](RESTCommonResponseHeaders.md)
+ [Error responses](ErrorResponses.md) 
+ [Browser-Based Uploads Using POST (AWS Signature Version 4)](sigv4-UsingHTTPPOST.md) 

**Important**  
Read the following about authentication and access control before going to specific API topics.

Requests to Amazon S3 can be authenticated or anonymous. Authenticated access requires credentials that AWS can use to authenticate your requests. 

*API call recommendations*

Making REST API calls directly from your code can be cumbersome. It requires you to write the necessary code to calculate a valid signature to authenticate your requests. We recommend the following alternatives instead: 

 
+ Use the [AWS SDKs](https://aws.amazon.com/developer/tools/?nc1=f_dr) to send your requests.

  Also, see the [Sample Code and Libraries](https://aws.amazon.com/code). 

  If you use the SDKs, you don't need to write code to calculate a signature for request authentication because the SDK clients authenticate your requests by using access keys that you provide. Unless you have a good reason not to, you should always use the AWS SDKs.
+ Use the AWS CLI to make Amazon S3 API calls. For information about setting up the AWS CLI and example Amazon S3 commands see the following topics:

   [Set Up the AWS CLI](https://docs.aws.amazon.com/AmazonS3/latest/userguide/setup-aws-cli.html) in the *Amazon Simple Storage Service User Guide*. 

   [Using Amazon S3 with the AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/cli-s3.html) in the *AWS Command Line Interface User Guide*.

*Making direct REST API calls*

**Note**  
The `PUT` request header is limited to 8 KB in size. Within the PUT request header, the system-defined metadata is limited to 2 KB in size. The size of system-defined metadata is measured by taking the sum of the number of bytes in the US-ASCII encoding of each key and value.

If you'd like to make your own REST API calls instead of using one of the above alternatives, there are some things to keep in mind. 
+ To make direct REST API calls from your code, create a signature using valid credentials and include the signature in your request. For information about various authentication methods and signature calculations, see [Authenticating Requests (AWS Signature Version 4)](sig-v4-authenticating-requests.md).
+ The REST API uses standard HTTP headers and status codes, so standard browsers and toolkits work as expected. In some areas, we have added functionality to HTTP (for example, we added headers to support access control). In these cases, we have done our best to add the new functionality in a way that matches the style of standard HTTP usage. For more information about making requests, see [Making requests](https://docs.aws.amazon.com/AmazonS3/latest/API/MakingRequests.html). 

*Permissions*

You can have valid credentials to authenticate your requests, but unless you have S3 permissions from the account owner or bucket owner you cannot create or access Amazon S3 resources. These permissions are typically granted through an AWS Identity and Access Management (IAM) [policy](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-iam.html#security_iam_access-manage), such as a bucket policy. For example, you must have permissions to create an S3 bucket or get an object in a bucket. For a complete list of S3 permissions, see [Actions, resources, and condition keys for Amazon S3](/service-authorization/latest/reference/list_amazons3.html). 

For more information about the permissions to S3 API operations by S3 resource types, see [Required permissions for Amazon S3 API operations](/AmazonS3/latest/userguide/using-with-s3-policy-actions.html) in the *Amazon Simple Storage Service User Guide*.

If you use the root user credentials of your AWS account, you have all the permissions. However, using root user credentials is not recommended. Instead, we recommend that you create AWS Identity and Access Management (IAM) roles in your account and manage user permissions. For more information, see [Access Management](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-management.html) in the *Amazon Simple Storage Service User Guide*. 

