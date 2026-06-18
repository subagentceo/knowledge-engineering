

# What is Amazon Verified Permissions?
<a name="what-is-avp"></a>

Amazon Verified Permissions is a scalable, fine-grained permissions management and authorization service for custom applications built by you. Verified Permissions enables your developers to build secure applications faster by externalizing authorization and centralizing policy management and administration. Verified Permissions uses the Cedar policy language to define fine-grained permissions to protect your application's resources.

For guidance and examples for setting up a policy decision point (PDP) using Verified Permissions, see [Implementing a PDP by using Amazon Verified Permissions](https://docs.aws.amazon.com/prescriptive-guidance/latest/saas-multitenant-api-access-authorization/avp.html) in *AWS Prescriptive Guidance*.

**Topics**
+ [Authorization in Verified Permissions](#avp-authorization)
+ [Cedar policy language](#avp-cedar)
+ [Benefits of Verified Permissions](#avp-benefit-overview)
+ [Related services](#related-services)
+ [Accessing Verified Permissions](#acessing-verified-permissions)
+ [Pricing for Verified Permissions](#verified-permissions-pricing)

## Authorization in Verified Permissions
<a name="avp-authorization"></a>

Verified Permissions provides *authorization* by verifying whether a principal is allowed to perform an action on a resource in a given context in your application. Verified Permissions presumes that the principal has been previously identified and authenticated through other means, such as by using protocols like OpenID Connect, a hosted provider like Amazon Cognito, or another authentication solution. Verified Permissions is agnostic to where the principal is managed and how they were authenticated.

Verified Permissions is a service that enables customers to create, maintain, and test policies in the AWS Management Console, programmatically using the Verified Permissions APIs, or through infrastructure as code solutions like CloudFormation. Permissions are expressed using the Cedar policy language. The client application calls authorization APIs to evaluate the Cedar policies stored with the service and provide an access decision for whether an action is permitted.

## Cedar policy language
<a name="avp-cedar"></a>

Authorization policies in Verified Permissions are written by using the Cedar policy language. Cedar is an open source language for writing authorization policies and making authorization decisions based on those policies. When you create an application, you need to ensure that only authorized principals, human users or machines, can access the application, and can do only what they're authorized to do. Using Cedar, you can decouple your business logic from the authorization logic. In your application’s code, you preface requests made to your operations with a call to the Cedar authorization engine, asking “Is this request authorized?”. Then, the application can either perform the requested operation if the decision is “allow”, or return an error message if the decision is “deny”.

Verified Permissions currently uses **Cedar version 4.7**.

For more information about Cedar, see the following:
+ [Cedar policy language Reference Guide](https://docs.cedarpolicy.com/)
+ [Cedar GitHub repository](https://github.com/cedar-policy/)

## Benefits of Verified Permissions
<a name="avp-benefit-overview"></a>

### Accelerate application development
<a name="avp-benefit-application-development"></a>

Accelerate application development by decoupling authorization from business logic.

Verified Permissions provides integrations with popular development frameworks, making it easier to implement authorization in your applications with minimal code changes. These integrations allow you to focus on your core business logic while Verified Permissions handles the authorization decisions.
+ **Express.js** – A middleware-based integration that enables you to protect API endpoints in your Express applications without modifying existing route handlers. For more information, see [Integrating Express with Amazon Verified Permissions](integration-express.md).

### More secure applications
<a name="avp-benefit-secure-applications"></a>

Verified Permissions enables developers to build more secure applications.

### End-user features
<a name="avp-benefit-features"></a>

Verified Permissions allows you to deliver richer end-user features for permissions management.

## Related services
<a name="related-services"></a>
+ **Amazon Cognito** – Amazon Cognito is an identity platform for web and mobile apps. It’s a user directory, an authentication server, and an authorization service for OAuth 2.0 access tokens and AWS credentials. When you create a policy store, you have the option to build your principals and groups from an Amazon Cognito user pool. For more information, see the [Amazon Cognito Developer Guide](https://docs.aws.amazon.com/cognito/latest/developerguide/).
+ **Amazon API Gateway** – Amazon API Gateway is an AWS service for creating, publishing, maintaining, monitoring, and securing REST, HTTP, and WebSocket APIs at any scale. When you create a policy store, you have the option to build your actions and resources from an API in API Gateway. For more information about API Gateway, see the [API Gateway Developer Guide](https://docs.aws.amazon.com/apigateway/latest/developerguide/).
+ **AWS IAM Identity Center** – With IAM Identity Center, you can manage sign-in security for your workforce identities, also known as workforce users. IAM Identity Center provides one place where you can create or connect workforce users and centrally manage their access across all their AWS accounts and applications. For more information, see the [AWS IAM Identity Center User Guide](https://docs.aws.amazon.com/singlesignon/latest/userguide/).

## Accessing Verified Permissions
<a name="acessing-verified-permissions"></a>

You can work with Amazon Verified Permissions in any of the following ways.

**AWS Management Console**  
The console is a browser-based interface to manage Verified Permissions and AWS resources. For more information about accessing Verified Permissions through the console, see [How to sign in to AWS](https://docs.aws.amazon.com/signin/latest/userguide/how-to-sign-in.html) in the *AWS Sign-In User Guide*.  
+ [Amazon Verified Permissions console](https://console.aws.amazon.com/verifiedpermissions/home)

**AWS Command Line Tools**  
You can use the AWS command line tools to issue commands at your system's command line to perform Verified Permissions and AWS tasks. Using the command line can be faster and more convenient than the console. The command line tools are also useful if you want to build scripts that perform AWS tasks.  
AWS provides two sets of command line tools: the [AWS Command Line Interface](https://aws.amazon.com/cli/) (AWS CLI) and the [AWS Tools for Windows PowerShell](https://aws.amazon.com/powershell/). For information about installing and using the AWS CLI, see the [AWS Command Line Interface User Guide](https://docs.aws.amazon.com/cli/latest/userguide/). For information about installing and using the Tools for Windows PowerShell, see the [AWS Tools for PowerShell User Guide](https://docs.aws.amazon.com/powershell/latest/userguide/).  
+ [verifiedpermissions](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/verifiedpermissions/index.html) in the AWS CLI Command Reference
+ [Amazon Verified Permissions](https://docs.aws.amazon.com/powershell/latest/reference/?page=VerifiedPermissions_cmdlets.html&tocid=VerifiedPermissions_cmdlets) in AWS Tools for Windows PowerShell

**AWS SDKs**  
AWS provides SDKs (software development kits) that consist of libraries and sample code for various programming languages and platforms (Java, Python, Ruby, .NET, iOS, Android, etc.). The SDKs provide a convenient way to create programmatic access to Verified Permissions and AWS. For example, the SDKs take care of tasks such as cryptographically signing requests, managing errors, and retrying requests automatically.   
To learn more and download AWS SDKs, see [Tools for Amazon Web Services](https://aws.amazon.com/tools/).  
The following are links to documentation for Verified Permissions resources in various AWS SDKs.  
+ [AWS SDK for .NET](https://docs.aws.amazon.com/sdkfornet/v3/apidocs/items/VerifiedPermissions/NVerifiedPermissions.html)
+ [AWS SDK for C\+\+](https://sdk.amazonaws.com/cpp/api/LATEST/aws-cpp-sdk-verifiedpermissions/html/class_aws_1_1_verified_permissions_1_1_verified_permissions_client.html)
+ [AWS SDK for Go](https://pkg.go.dev/github.com/aws/aws-sdk-go-v2/service/verifiedpermissions)
+ [AWS SDK for Java](https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/services/verifiedpermissions/package-summary.html)
+ [AWS SDK for JavaScript](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/verifiedpermissions/)
+ [AWS SDK for PHP](https://docs.aws.amazon.com/aws-sdk-php/v3/api/api-verifiedpermissions-2021-12-01.html)
+ [AWS SDK for Python (Boto)](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/verifiedpermissions.html)
+ [AWS SDK for Ruby](https://docs.aws.amazon.com/sdk-for-ruby/v3/api/Aws/VerifiedPermissions/Client.html)
+ [AWS SDK for Rust](https://docs.rs/aws-sdk-verifiedpermissions/latest/aws_sdk_verifiedpermissions/)

**AWS CDK constructs**  
The AWS Cloud Development Kit (AWS CDK) is an open-source software development framework for defining cloud infrastructure in code and provisioning it through CloudFormation. Constructs, or reusable cloud components, can be used to create CloudFormation templates. These templates can then be used to deploy your cloud infrastructure.  
To learn more and download AWS CDK, see [AWS Cloud Development Kit](https://aws.amazon.com/cdk/).  
The following are links to documentation for Verified Permissions AWS CDK resources, such as constructs.  
+ [Amazon Verified Permissions L2 CDK Construct](https://github.com/cdklabs/cdk-verified-permissions)

**Verified Permissions API**  
You can access Verified Permissions and AWS programmatically by using the Verified Permissions API, which lets you issue HTTPS requests directly to the service. When you use the API, you must include code to digitally sign requests using your credentials.  
+ [Amazon Verified Permissions API Reference Guide](https://docs.aws.amazon.com/verifiedpermissions/latest/apireference/)

## Pricing for Verified Permissions
<a name="verified-permissions-pricing"></a>

Verified Permissions provides tiered pricing based on the amount of authorization requests per month made by your applications to Verified Permissions. There is also pricing for policy management actions based on the amount of cURL (client URL) policy API requests per month made by your applications to Verified Permissions.

For a complete list of charges and prices for Verified Permissions see [Amazon Verified Permissions pricing](https://aws.amazon.com/verified-permissions/pricing/).

To see your bill, go to the **Billing and Cost Management Dashboard** in the [AWS Billing and Cost Management console](https://console.aws.amazon.com/billing/). Your bill contains links to usage reports that provide details about your bill. To learn more about AWS account billing, see the [AWS Billing User Guide](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/).

If you have questions concerning AWS billing, accounts, and events, [contact Support](https://aws.amazon.com/contact-us/).