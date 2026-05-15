

# What are AWS managed policies?
<a name="about-managed-policy-reference"></a>

An AWS managed policy is a standalone policy that is created and administered by AWS. AWS managed policies are designed to provide permissions for many common use cases. They make it easier for you to get started with assigning permissions to users, groups, and roles than if you had to write the policies yourself. 

Keep in mind that AWS managed policies might not grant least-privilege permissions for your specific use cases because they are available for use by all AWS customers. We recommend that you reduce permissions further by defining [customer managed policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html#customer-managed-policies) that are specific to your use cases. 

You cannot change the permissions defined in AWS managed policies. If AWS updates the permissions defined in an AWS managed policy, the update affects all principal identities (users, groups, and roles) that the policy is attached to. AWS is most likely to update an AWS managed policy when a new AWS service is launched or new API operations become available for existing services.

For more information, see [AWS managed policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html#aws-managed-policies) in the IAM User Guide.

## Understanding policy reference pages
<a name="mp-reference-pages"></a>

Each policy reference page includes the following information:
+ **Using this policy ** – Whether you can attach the policy to users, groups, and roles
+ **Policy details**
  + **Type** – The type of AWS managed policy
    + `AWS managed policy` – A standard AWS managed policy
    + `Job function policy` – Policy that aligns with common industry job functions
    + `Service-linked role policy` – Policy that is attached to a service-linked role that allows a service to perform actions on your behalf, such as [AmazonRDSPreviewServiceRolePolicy](AmazonRDSPreviewServiceRolePolicy.md)
    + `Service role policy` – Policy designed to work with service roles, such as [AWSControlTowerServiceRolePolicy](AWSControlTowerServiceRolePolicy.md)
  + **Creation time** – When the policy was first created
  + **Edited time** – When this version of the policy was edited
  + **ARN** – The Amazon Resource Name of the policy
+ **Policy version** – The version of the permissions granted by the policy
+ **JSON policy document** – The policy JSON
+ **Learn more** – Links to documentation related to AWS managed policies

## Deprecated AWS managed policies
<a name="deprecated-managed-policies"></a>

AWS regularly updates AWS managed policies. In most cases, we add permissions to a policy. This happens when we launch a new service or feature. To improve the security of AWS managed policies, we sometimes reduce the scope of policies. When we remove permissions from a policy, we set the policy to a *deprecated* state and make a new one available. When AWS deprecates a service or feature, we also deprecate the AWS managed policy for that feature.

If you receive an email notification that a policy you are using is deprecated, we recommend that you immediately take action. Identify the change to the policy and update your workflows. If AWS provides a replacement policy, plan to attach it to all affected identities (users, groups, and roles) and then detach the deprecated policy from those identities.

A deprecated policy has the following characteristics:
+ It is removed from this guide.
+ Permissions continue to work for all *currently* attached identities. 
+ In accounts where the policy is attached to an identity, it appears in the **Policies** list in the IAM console with a warning icon next to it.
+ It *cannot* be attached to any new identities. If you detach it from a current identity, you cannot reattach it.
+ After you detach it from all current entities, it is no longer visible. 