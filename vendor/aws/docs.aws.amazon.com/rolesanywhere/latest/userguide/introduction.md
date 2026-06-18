

# What is AWS Identity and Access Management Roles Anywhere?
<a name="introduction"></a>

You can use AWS Identity and Access Management Roles Anywhere to obtain [temporary security credentials in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html) for workloads such as servers, containers, and applications that run outside of AWS. Your workloads can use the same [IAM policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html) and [IAM roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html) that you use with AWS applications to access AWS resources. Using IAM Roles Anywhere means you don't need to manage long-term AWS credentials for workloads running outside of AWS. 

To use IAM Roles Anywhere, your workloads must use X.509 certificates issued by your [certificate authority (CA)](https://docs.aws.amazon.com/privateca/latest/userguide/PcaTerms.html#terms-ca). You register the CA with IAM Roles Anywhere as a trust anchor to establish trust between your public-key infrastructure (PKI) and IAM Roles Anywhere. You can also use AWS Private Certificate Authority (AWS Private CA) to create a CA and then use that to establish trust with IAM Roles Anywhere. AWS Private CA is a managed private CA service for managing your CA infrastructure and your private certificates. For more information, see [What is AWS Private CA](https://docs.aws.amazon.com/acm-pca/latest/userguide/PcaWelcome.html).

**Topics**
+ [IAM Roles Anywhere concepts](#first-time-user)
+ [Accessing IAM Roles Anywhere](#access)

## IAM Roles Anywhere concepts
<a name="first-time-user"></a>

Learn the basic terms and concepts used in IAM Roles Anywhere.
+ **Trust anchors**

   You establish trust between IAM Roles Anywhere and your certificate authority (CA) by creating a *trust anchor*. A trust anchor is a reference to either [AWS Private CA](https://docs.aws.amazon.com/acm-pca/latest/userguide/PcaWelcome.html) or  an external CA certificate. Your workloads outside of AWS authenticate with the trust anchor using certificates issued by the trusted CA in exchange for temporary AWS credentials. There can be several trust anchors in one AWS account. For more information, see [IAM Roles Anywhere trust model](trust-model.md). 
+ **Roles**

  An [IAM role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html) is an IAM identity that you can create in your account that has specific permissions. A role is intended to be assumable by anyone who needs it. For IAM Roles Anywhere to be able to assume a role and deliver temporary AWS credentials, the role must trust the IAM Roles Anywhere service principal. A trust anchor is tied to the IAM role via the `aws:SourceArn` condition key that uses the trust anchor's ARN as its value in the role's trust policy. For more information, see [Role trusts](trust-model.md#role-trusts).
+ **Profiles**

  To specify which roles IAM Roles Anywhere assumes and what your workloads can do with the temporary credentials, you create a profile. In a profile, you can define IAM session policies, which can be managed or inline, to limit the permissions created for a session. A profile can have many IAM roles, but only one session policy. Any session returned by a CreateSession call that references the profile will have its permissions limited by the session policy.

**Note**  
All IAM Roles Anywhere resources are regional and they must be created in the same account and region to be used together.

### Account trust boundary
<a name="account-trust-boundary.title"></a>

For IAM Roles Anywhere, the trust boundary is established at the account level. This means:
+ Certificates issued by any trust anchor in the account can be used to assume any target role in that same account, unless you specify conditions in the role's trust policy.
+ There is no automatic integration with organization-wide controls.

### Multi-account setups
<a name="multi-account-setups"></a>

For information on setting up multi-account access, see: [Access for an IAM user in another AWS account that you own.](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_common-scenarios_aws-accounts.html)

## Accessing IAM Roles Anywhere
<a name="access"></a>

 **AWS Management Console** 

You can manage your IAM Roles Anywhere resources using the [IAM Roles Anywhere console](https://console.aws.amazon.com/rolesanywhere/home).

 **AWS Command Line Tools**

You can use the AWS command line tools to issue commands at your system command line to perform IAM Roles Anywhere and other AWS tasks. This can be faster and more convenient than using the console. The command line tools can be useful if you want to build scripts to perform AWS tasks.

AWS provides the [AWS Command Line Interface (AWS CLI)](http://aws.amazon.com/cli/). For information about installing and using the AWS CLI, see the AWS [Command Line Interface User Guide ](https://docs.aws.amazon.com/cli/latest/userguide/).

 **AWS SDKs**

The AWS software development kits (SDKs) consist of libraries and sample code for various programming languages and platforms including Java, Python, Ruby, .NET, iOS and Android, and others. The SDKs include tasks such as cryptographically signing requests, managing errors, and retrying requests automatically. For more information about the AWS SDKs, including how to download and install them, see [Tools for Amazon Web Services](https://aws.amazon.com/tools/).