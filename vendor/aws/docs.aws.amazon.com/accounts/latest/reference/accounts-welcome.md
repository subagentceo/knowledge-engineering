

# What is an AWS account?
<a name="accounts-welcome"></a>

An AWS account represents a formal business relationship you establish with AWS. You create and manage your AWS resources in an AWS account, and your account provides identity management capabilities for access and billing. Each AWS account has a unique ID which differentiates it from other AWS accounts. 

Your cloud resources and data are contained in an AWS account. An account acts as an identity and access management isolation boundary. When you need to share resources and data between two accounts, you must explicitly allow this access. By default, no access is allowed between accounts. For example, if you designate different accounts to contain your production and non-production resources and data, no access is allowed between those environments by default.

AWS accounts are also a fundamental part of accessing AWS services. As shown in the following illustration, an AWS account serves two primary functions:
+ **Resources container** – An AWS account is the basic container for all the AWS resources you create as an AWS customer. For example, an Amazon Simple Storage Service (Amazon S3) bucket, an Amazon Relational Database Service (Amazon RDS) database, and an Amazon Elastic Compute Cloud (Amazon EC2) instance are all resources. Every resource is uniquely identified by an Amazon Resource Name (ARN) that includes the account ID of the account that contains, or owns, the resource.
+ **Security boundary** – An AWS account is also the basic security boundary for your AWS resources. Resources that you create in your account are available to users who have credentials for your account. Among the key resources you can create in your account are *identities*, such as users and roles. Identities have credentials that someone can use to sign in (*authenticate*) to AWS. Identities also have permission policies that specify what a user can do (*authorization*) with the resources in the account. 

![This image shows how the resources container, security boundary, and policies determine the level of access that users and roles have to shared resources in your account.](http://docs.aws.amazon.com/accounts/latest/reference/images/container-and-security-boundary.png)


Using multiple AWS accounts is a best practice for scaling your environment, as it provides a natural billing boundary for costs, isolates resources for security, gives flexibility for individuals and teams, in addition to being adaptable for new business processes. For more information, see [Benefits of using multiple AWS accounts](welcome-multiple-accounts.md).

## Features of an AWS account
<a name="accounts-feature-overview"></a>

AWS accounts include the following core features:
+ **Monitor and control costs** – An account is the default means by which AWS costs are allocated. Because of this fact, using different accounts for different business units and groups of workloads can help you more easily track, control, forecast, budget, and report your cloud expenditures. In addition to cost reporting at the account level, AWS also has built-in support to consolidate and report costs across your entire set of accounts should you choose to use AWS Organizations at some point. You can also use AWS Service Quotas to help protect you from unexpected excessive provisioning of AWS resources and malicious actions that could dramatically impact your AWS costs.
+ **Unit of isolation** – An AWS account provides security, access, and billing boundaries for your AWS resources that can help you achieve resource autonomy and isolation. By design, all resources provisioned within an account are logically isolated from resources provisioned in other accounts, even within your own AWS environment. This isolation boundary provides you with a way to limit the risks of an application-related issue, misconfiguration, or malicious actions. If an issue occurs within one account, impacts to workloads contained in other accounts can be either reduced or eliminated.
+ **Mirror your business workloads** – Use multiple accounts to group workloads with a common business purpose in distinct accounts. As a result, you can align the ownership and decision making with those accounts and avoid dependencies and conflicts with how workloads in other accounts are secured and managed. Depending on your overall business model, you might choose to isolate distinct business units or subsidiaries in different accounts. This approach might also ease divestment of those units over time.

## Are you a first-time AWS user?
<a name="welcome-first-time-user"></a>

If you are a first-time user of AWS, your first step is to sign up for an AWS account. When you sign up, AWS creates an account with the details that you provide and assigns the account to you. After you create your AWS account, sign in as the [root user](root-user.md), activate multi-factor authentication (MFA) for the root user, and assign administrative access to a user.

For step-by-step instructions on how to set up a new account, see [Getting started with an AWS account](getting-started.md).