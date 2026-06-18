

# AWS Resource Groups Tagging API Reference
<a name="overview"></a>

This guide describes the API operations for AWS Resource Groups Tagging.

A tag is a label that you assign to an AWS resource. A tag consists of a key and a value, both of which you define. For example, if you have two Amazon EC2 instances, you might assign both a tag key of "Stack." But the value of "Stack" might be "Testing" for one and "Production" for the other.

AWS supports tagging on all core infrastructure resources that incur charges. Most other AWS resources also support tagging. Some resources support tagging only through that service's native tagging operations, and don't yet support this API. See the documentation for an individual service for information about that service's native tagging operations.

**Important**  
Do not store personally identifiable information (PII) or other confidential or sensitive information in tags. We use tags to provide you with billing and administration services. Tags are not intended to be used for private or sensitive data.

Tagging can help you organize your resources and enables you to simplify resource management, access management and cost allocation. 

For information about tagging your AWS resources, including strategies and techniques, see [Tagging AWS resources](https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html) in the *Amazon Web Services General Reference*.

You can use the Resource Groups Tagging API operations to complete the following tasks:
+ Tag and untag supported resources located in the specified Region for the AWS account.
+ Use tag-based filters to search for resources located in the specified Region for the AWS account.
+ List all existing tag keys in the specified Region for the AWS account.
+ List all existing values for the specified key in the specified Region for the AWS account.

To use Resource Groups Tagging API operations, you must add the following permissions to your IAM policy:
+ `tag:GetResources`
+ `tag:TagResources`
+ `tag:UntagResources`
+ `tag:GetTagKeys`
+ `tag:GetTagValues`

You'll also need permissions to access the resources of individual services so that you can tag and untag those resources.

For more information on IAM policies, see [Managing IAM Policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage.html) in the *IAM User Guide*.