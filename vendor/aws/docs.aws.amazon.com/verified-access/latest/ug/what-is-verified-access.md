

# What is AWS Verified Access?
<a name="what-is-verified-access"></a>

With AWS Verified Access, you can provide secure access to your applications without requiring the use of a virtual private network (VPN). Verified Access evaluates each application request and helps ensure that users can access each application only when they meet the specified security requirements. 

## Benefits of Verified Access
<a name="feature-overview"></a>
+ **Improved security posture** – A traditional security model evaluates access once and grants the user access to all applications. Verified Access evaluates each application access request in real time. This makes it difficult for bad actors to move from one application to another. 
+ **Integration with security services** – Verified Access integrates with identity and device management services, including both AWS and third-party services. Using data from these services, Verified Access verifies the trustworthiness of users and devices against a set of security requirements and determines whether the user should have access to an application.
+ **Improved user experience** – Verified Access removes the need for users to use a VPN to access your applications. This helps reduce the number of support cases arising from VPN-related issues.
+ **Simplified troubleshooting and audits** – Verified Access logs all access attempts, providing centralized visibility into application access, to help you quickly respond to security incidents and audit requests. 

## Accessing Verified Access
<a name="acessing-verified-access"></a>

You can use any of the following interfaces to work with Verified Access:
+ **AWS Management Console** – Provides a web interface that you can use to create and manage Verified Access resources. Sign in to the AWS Management Console and open the Amazon VPC console at [https://console.aws.amazon.com/vpc/](https://console.aws.amazon.com/vpc/).
+ **AWS Command Line Interface (AWS CLI)** – Provides commands for a broad set of AWS services, including AWS Verified Access. The AWS CLI is supported on Windows, macOS, and Linux. To get the AWS CLI, see [AWS Command Line Interface](https://aws.amazon.com/cli/).
+ **AWS SDKs** – Provide language-specific APIs. The AWS SDKs take care of many of the connection details, such as calculating signatures, and handling request retries and errors. For more information, see [AWS SDKs](http://aws.amazon.com/tools/#SDKs).
+ **Query API** – Provides low-level API actions that you call using HTTPS requests. Using the Query API is the most direct way to access Verified Access. However, it requires your application to handle low-level details such as generating the hash to sign the request and handling errors. For more information, see [Verified Access actions](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/operation-list-verified-access.html) in the *Amazon EC2 API Reference*.

This guide describes how to use the AWS Management Console to create, access, and manage Verified Access resources.

## Pricing
<a name="verified-access-pricing"></a>

You are charged hourly for each application on Verified Access, and you are charged for the amount of data processed by Verified Access. For more information, see [AWS Verified Access pricing](https://aws.amazon.com/verified-access/pricing/).