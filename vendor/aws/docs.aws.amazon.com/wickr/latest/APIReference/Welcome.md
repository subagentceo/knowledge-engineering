

# Welcome
<a name="Welcome"></a>

Welcome to the * AWS Wickr API Reference*.

The AWS Wickr application programming interface (API) is designed for administrators to perform key tasks, such as creating and managing AWS Wickr, networks, users, security groups, bots and more. This guide provides detailed information about the AWS Wickr API, including operations, types, inputs and outputs, and error codes. You can use an AWS SDK, the AWS Command Line Interface (AWS CLI, or the REST API to make API calls for AWS Wickr. 

 *Using AWS SDK* 

The SDK clients authenticate your requests by using access keys that you provide. For more information, see [Authentication and access using AWS SDKs and tools](https://docs.aws.amazon.com/sdkref/latest/guide/access.html) in the * AWS SDKs and Tools Reference Guide*. 

 *Using AWS CLI* 

Use your access keys with the AWS CLI to make API calls. For more information about setting up the AWS CLI, see [Getting started with the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) in the * AWS Command Line Interface User Guide for Version 2*. 

 *Using REST APIs* 

If you use REST to make API calls, you must authenticate your request by providing a signature. AWS Wickr supports Signature Version 4. For more information, see [AWS Signature Version 4 for API requests](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_sigv.html) in the * AWS Identity and Access Management User Guide*. 

Access and permissions to the APIs can be controlled by AWS Identity and Access Management. The managed policy [AWSWickrFullAccess](https://docs.aws.amazon.com/wickr/latest/adminguide/security-iam-awsmanpol.html#security-iam-awsmanpol-AWSWickrFullAccess) grants full administrative permission to the AWS Wickr service APIs. For more information on restricting access to specific operations, see [Identity and access management for AWS Wickr ](https://docs.aws.amazon.com/wickr/latest/adminguide/security-iam.html) in the * AWS Wickr Administration Guide*. 

 *Types of Errors*:

The AWS Wickr APIs provide an HTTP interface. HTTP defines ranges of HTTP Status Codes for different types of error responses.

1. Client errors are indicated by HTTP Status Code class of 4xx

1. Service errors are indicated by HTTP Status Code class of 5xx

In this reference guide, the documentation for each API has an Errors section that includes a brief discussion about HTTP status codes. We recommend looking there as part of your investigation when you get an error.

 *Regional availability* 

The AWS Wickr API is available in several AWS Regions and it provides an endpoint for each of these Regions. For a list of all the Regions and endpoints where the API is currently available, see [AWS Wickr endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/wickr.html) in the * AWS General Reference Guide*.

**Note**  
Wickr API endpoints are region-specific and include a region code in the format: `https://admin.wickr.[regioncode].amazonaws.com`. For example, for the US East (N.Virginia) `us-east-1`, the API endpoint is `https://admin.wickr.us-east-1.amazonaws.com`.

This document was last published on June 17, 2026. 