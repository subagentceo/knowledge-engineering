

# What is AWS Sign-In?
<a name="what-is-sign-in"></a>

This guide helps you understand the different ways that you can sign in to Amazon Web Services (AWS), depending on what type of user you are. For more information about how to sign in based on your user type and the AWS resources that you want to access, see one of the following tutorials. 
+ [Sign in to the AWS Management Console](how-to-sign-in.md)
+ [Sign in to your AWS access portal](iam-id-center-sign-in-tutorial.md)
+ [Sign in as a federated identity](federated-identity-overview.md)
+ [Sign in through the AWS Command Line Interface](command-line-sign-in.md)
+ [Sign in with AWS Builder ID](sign-in-builder-id.md)

If you're having issues signing in to your AWS account, see [Troubleshooting AWS account sign-in issues](troubleshooting-sign-in-issues.md). For help with your AWS Builder ID see [Troubleshooting AWS Builder ID issues](troubleshooting-builder-id-issues.md). Looking to create an AWS account? [Sign up for AWS](https://portal.aws.amazon.com/billing/signup#/start/email). For more information about how signing up for AWS can help you or your organization, see [Contact Us](https://aws.amazon.com/contact-us/sales-support-1v/).

**Topics**
+ [Terminology](#terminology)
+ [Region availability for AWS Sign-In](#sign-in-regions)
+ [Sign-in event logging](#sign-in-events)
+ [Determine your user type](user-types-list.md)
+ [Determine your sign-in URL](sign-in-urls-defined.md)
+ [Domains to add to your allow list](allowlist-domains.md)
+ [Security best practices for AWS account administrators](best-practices-admin.md)

## Terminology
<a name="terminology"></a>

Amazon Web Services (AWS) uses [common terminology](https://docs.aws.amazon.com//general/latest/gr/glos-chap.html) to describe the sign in process. We recommend you read and understand these terms. 

### Administrator
<a name="administrator"></a>

Also referred to as an AWS account administrator or IAM administrator. The administrator, typically Information Technology (IT) personnel, is an individual who oversees an AWS account. Administrators have a higher level of permissions to the AWS account than other members of their organization. Administrators establish and implement settings for the AWS account. They also create IAM or IAM Identity Center users. The administrator provides these users with their access credentials and a sign-in URL to sign in to AWS.

### Account
<a name="account"></a>

A standard AWS account contains both your AWS resources and the identities that can access those resources. Accounts are associated with the account owner’s email address and password.

### Credentials
<a name="credentials"></a>

Also referred to as access credentials or security credentials. In authentication and authorization, a system uses credentials to identify who is making a call and whether to allow the requested access. Credentials are the information that users provide to AWS to sign in and gain access to AWS resources. Credentials for human users can include an email address, a user name, a user defined password, an account ID or alias, a verification code, and a single use multi-factor authentication (MFA) code. For programmatic access, you can also use access keys. We recommend using short-term access keys when possible.

For more information about credentials, see [AWS security credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/security-creds.html).

**Note**  
The type of credentials a user must submit depends on their user type. 

### Corporate credentials
<a name="corporate-credentials"></a>

The credentials that users provide when accessing their corporate network and resources. Your corporate administrator can set up your AWS account to use the same credentials that you use to access your corporate network and resources. These credentials are provided to you by your administrator or help desk employee.

### Profile
<a name="profile-builder-id"></a>

When you sign up for an AWS Builder ID, you create a profile. Your profile includes the contact information you provided and the ability to manage multi-factor authentication (MFA) devices and active sessions. You can also learn more about privacy and how we handle your data in your profile. For more information about your profile and how it relates to an AWS account, see [AWS Builder ID and other AWS credentials](differences-builder-id.md). 

### Root user credentials
<a name="root-user-credentials"></a>

The root user credentials are the email address and password used to create the AWS account. We strongly recommend that MFA be added to the root user credentials for additional security. Root user credentials provide complete access to all AWS services and resources in the account. For more information on the root user, see [Root user](user-types-list.md#account-root-user-type).

### User
<a name="user"></a>

A user is a person or application that has permissions to make API calls to AWS products or to access AWS resources. Each user has a unique set of security credentials that aren't shared with other users. These credentials are separate from the security credentials for the AWS account. For more information, see [Determine your user type](user-types-list.md).

### Verification code
<a name="verification-code-defined"></a>

A verification code verifies your identity during the sign-in process [using multi-factor authentication (MFA)](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html). The delivery methods for verification codes varies. They can be sent via text message or email. Check with your administrator for more information. 

## Region availability for AWS Sign-In
<a name="sign-in-regions"></a>

AWS Sign-in is available in several commonly used AWS Regions. This availability makes it easier for you to access AWS services and business applications. For a full list of the Regions that Sign-in supports, see [AWS Sign-In endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/signin-service.html).

## Sign-in event logging
<a name="sign-in-events"></a>

 CloudTrail is automatically enabled on your AWS account and records events when activity occurs. The following resources can help you learn more about logging and monitoring sign-in events.
+ CloudTrail logs attempts to sign in to the AWS Management Console. All IAM user, root user, and federated user sign-in events generate records in CloudTrail log files. For more information, see [AWS Management Console sign-in events](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-event-reference-aws-console-sign-in-events.html) in the *AWS CloudTrail User Guide*.
+ If you use a Regional endpoint to sign in to the AWS Management Console, CloudTrail records the `ConsoleLogin` event in the appropriate Region for the endpoint. For more information about AWS Sign-In endpoints, see [AWS Sign-In endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/signin-service.html) in the *AWS General Reference Guide*.
+ To learn more about how CloudTrail logs sign-in events for IAM Identity Center, see [Understanding IAM Identity Center sign-in events](https://docs.aws.amazon.com/singlesignon/latest/userguide/understanding-sign-in-events.html) in the *IAM Identity Center User Guide*.
+  To learn more about how CloudTrail logs different user identity information in IAM, see [Logging IAM and AWS STS API calls with AWS CloudTrail](https://docs.aws.amazon.com/IAM/latest/UserGuide/cloudtrail-integration.html) in the *AWS Identity and Access Management User Guide*.

AWS Sign-In supports resource-based policies and resource control policies that enable you to restrict console access based on network location and principal identity. For root users, network location is validated before the password prompt appears. For all principal types, policies are evaluated at pre-authentication and post-authentication. For more information, see [Controlling console access with resource-based policies and resource control policies](console-access-control.md).