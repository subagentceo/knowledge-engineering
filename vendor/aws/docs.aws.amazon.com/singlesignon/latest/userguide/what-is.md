

# What is IAM Identity Center?
<a name="what-is"></a>

AWS IAM Identity Center is the AWS solution for connecting your workforce users to AWS managed applications such as Kiro and Amazon Quick, and other AWS resources. You can connect your existing identity provider and synchronize users and groups from your directory, or create and manage your users directly in IAM Identity Center. You can then use IAM Identity Center for either or both of the following:
+ User access to applications
+ User access to AWS accounts

**Already using IAM for access to AWS accounts?**

You don’t need to make any changes to your current AWS account workflows to use IAM Identity Center for access to AWS managed applications. If you’re using [federation with IAM](https://docs.aws.amazon.com//IAM/latest/UserGuide/id_roles_providers.html#id_roles_providers_iam) for AWS account access, your users can continue to access AWS accounts in the same way they always have, and you can continue to use your existing workflows to manage that access.

## Why use IAM Identity Center?
<a name="features"></a>

IAM Identity Center streamlines and simplifies workforce user access to applications or AWS accounts, or both, through the following key capabilities.

**Integration with AWS managed applications**  
[AWS managed applications](awsapps.md) such as Kiro and Amazon Redshift integrate with IAM Identity Center. IAM Identity Center provides AWS managed applications with a common view of users and groups.

**Trusted identity propagation across applications **  
With trusted identity propagation, AWS managed applications such as Amazon Quick can securely share a user’s identity with other AWS managed applications such as Amazon Redshift and authorize access to AWS resources based on the user’s identity. You can more easily audit user activity because CloudTrail events are logged based on the user and the actions the user initiated. This makes it easier to understand who accessed what. For information about supported use cases, including end-to-end configuration guidance, see [Trusted identity propagation use cases](trustedidentitypropagation-integrations.md).

**One place to assign permissions to multiple AWS accounts**  
With multi-account permissions, IAM Identity Center provides a single place for you to assign permissions to groups of users in multiple AWS accounts. You can create permissions based on common job functions or define custom permissions that meet your security needs. You can then assign those permissions to workforce users to control their access to specific AWS accounts.   
This optional feature is available only for [organization instances](organization-instances-identity-center.md) of IAM Identity Center.

**One point of federation to simplify user access to AWS**  
By providing one point of federation, IAM Identity Center reduces the administrative effort required to use multiple AWS managed applications and AWS accounts. With IAM Identity Center, you only federate once, and you have only one certificate to manage when using a [https://wiki.oasis-open.org/security](https://wiki.oasis-open.org/security) identity provider. IAM Identity Center provides AWS managed applications with a common view of users and groups for trusted identity propagation use cases, or when users share access to AWS resources with other people.  
For information about how to configure commonly used identity providers to work with IAM Identity Center, see [IAM Identity Center identity source tutorials](tutorials.md). If you don’t have an existing identity provider, you can [create and manage users directly in IAM Identity Center](quick-start-default-idc.md).

**Two instance types**  
IAM Identity Center supports two types of instances: *organization instances* and *account instances*. An organization instance is the best practice. It's the only instance that enables you to manage access to AWS accounts and it is recommended for all production use of applications. An organization instance is deployed in the AWS Organizations management account and gives you a single point from which to manage user access across AWS.   
Account instances are bound to the AWS account in which they are enabled. Use account instances of IAM Identity Center only to support isolated deployments of select AWS managed applications. For more information, see [Organization and account instances of IAM Identity Center](identity-center-instances.md).

**User-friendly web portal access for your users**  
The AWS access portal is a user-friendly web portal that provides your users with seamless access to all their assigned applications, AWS accounts, or both.

**Multi-Region access to AWS accounts and applications**  
When you replicate your IAM Identity Center instance to additional Regions, your workforce can access their assigned AWS accounts and applications through all enabled Regions, and they can deploy AWS managed applications in each enabled Region.

## IAM Identity Center rename
<a name="renamed"></a>

On July 26, 2022, AWS Single Sign-On was renamed to AWS IAM Identity Center.

### Legacy namespaces remain the same
<a name="legacy-namespaces"></a>



The `sso` and `identitystore` API namespaces along with the following related namespaces **remain unchanged** for backward compatibility purposes.


+ CLI commands
  + [https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html)
  + [https://awscli.amazonaws.com/v2/documentation/api/latest/reference/identitystore/index.html](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/identitystore/index.html)
  + [https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sso/index.html](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sso/index.html)
  + [https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sso-admin/index.html](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sso-admin/index.html)
  + [https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sso-oidc/index.html](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/sso-oidc/index.html)
+ [Managed policies](https://docs.aws.amazon.com//singlesignon/latest/userguide/security-iam-awsmanpol.html) containing `AWSSSO` and `AWSIdentitySync` prefixes
+ [Service endpoints](https://docs.aws.amazon.com//general/latest/gr/sso.html#sso_region) containing `sso` and `identitystore`
+ [CloudFormation](https://docs.aws.amazon.com//AWSCloudFormation/latest/UserGuide/AWS_SSO.html) resources containing `AWS::SSO` prefixes
+ [Service-linked role](https://docs.aws.amazon.com//singlesignon/latest/userguide/using-service-linked-roles.html#slr-permissions) containing `AWSServiceRoleForSSO`
+ Console URLs containing `sso` and `singlesignon`
+ Documentation URLs containing `singlesignon`