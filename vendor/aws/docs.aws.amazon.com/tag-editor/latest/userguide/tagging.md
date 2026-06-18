

# What is Tag Editor?
<a name="tagging"></a>

Tag Editor enables you to effectively manage tags. *Tags* are key and value pairs that act as metadata for organizing your AWS resources. With most AWS resources, you have the option of adding tags when you create the resource. Examples of resources include an Amazon Elastic Compute Cloud (Amazon EC2) instance, an Amazon Simple Storage Service (Amazon S3) bucket, or a secret in AWS Secrets Manager. 

**Important**  
Do not store personally identifiable information (PII) or other confidential or sensitive information in tags. We use tags to provide you with billing and administration services. Tags are not intended to be used for private or sensitive data.

Tags can help you manage, identify, organize, search for, and filter resources. You can create tags to categorize resources by purpose, owner, environment, or other criteria.

Each tag has two parts:
+ A *tag key* (for example, `CostCenter`, `Environment`, or `Project`). Tag keys are case sensitive.
+ A *tag value* (for example, `111122223333` or `Production`). Like tag keys, tag values are case sensitive.

**Note**  
Although tag keys are case sensitive, IAM has additional validations for IAM resources to prevent the application of tag keys that only differ in casing. We recommend not using keys that only differ in casing. Refer to [Tags for IAM resources](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_tags.html#id_tags_rules) for more information.

## Resource tagging methods
<a name="intro-tag-methods"></a>

There are three ways to add tags to your AWS resources:
+ **AWS service API operation** – The tagging API operations supported directly an AWS service. To discover what tagging functionality each AWS service provides, see the service's documentation in the [AWS documentation index](https://docs.aws.amazon.com/index.html).
+ **Tag Editor console** – Some services support tagging with the Tag Editor console.
+ **Resource Groups Tagging API** – Most services also support tagging using the [AWS Resource Groups Tagging API](https://docs.aws.amazon.com/resourcegroupstagging/latest/APIReference/overview.html).

**Note**  
You can also use [AWS Service Catalog TagOptions Library](https://docs.aws.amazon.com/servicecatalog/latest/adminguide/tagoptions.html) to easily manage tags on provisioned products. A *TagOption* is a key-value pair managed in Service Catalog. It is not an AWS tag, but serves as a template for creating an AWS tag based on the TagOption. 

You can tag resources for all cost-accruing services in AWS. For the following services, AWS recommends newer alternative AWS services that support tagging to better meet customer use cases.


|  |  |  | 
| --- |--- |--- |
| Amazon Cloud Directory | Amazon CloudSearch | Amazon Cognito Sync | 
| AWS Data Pipeline | Amazon Elastic Transcoder | Amazon Machine Learning | 
| AWS OpsWorks Stacks | Amazon Glacier Direct | Amazon SimpleDB | 
| Amazon WorkSpaces Application Manager | AWS DeepLens |  | 

### Learn more
<a name="more-info-tagging"></a>

This page provides general information on tagging AWS resources. For more information about tagging resources in a particular AWS service, see its documentation. The following are also good sources of information about tagging:
+ For information about the AWS Resource Groups Tagging API, see the [https://docs.aws.amazon.com/resourcegroupstagging/latest/APIReference/Welcome.html](https://docs.aws.amazon.com/resourcegroupstagging/latest/APIReference/Welcome.html).
+ For information about the tagging functionality each AWS service provides, see the service's documentation in the [AWS documentation index](https://docs.aws.amazon.com/index.html).
+ For information about using tags in IAM policies to help control who can view and interact with your AWS resources, see [Controlling access to and for IAM users and roles using tags](https://docs.aws.amazon.com//IAM/latest/UserGuide/access_iam-tags.html) in the *IAM User Guide*.