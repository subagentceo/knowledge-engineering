

# What is AWS Organizations?
<a name="orgs_introduction"></a>

**Centrally manage your environment as you scale your AWS resources**

AWS Organizations helps you centrally manage and govern your environment as you grow and scale your AWS resources. Using Organizations, you can create accounts and allocate resources, group accounts to organize your workflows, apply policies for governance, and simplify billing by using a single payment method for all of your accounts.

Organizations is integrated with other AWS services so you can define central configurations, security mechanisms, audit requirements, and resource sharing across accounts in your organization. For more information, see [Using AWS Organizations with other AWS services](orgs_integrate_services.md).

The following diagram shows a high-level explanation of how you can use AWS Organizations:
+ Add accounts
+ Group accounts
+ Apply policies
+ Enable AWS services

![This image displays how AWS Organizations works: add accounts, group accounts, apply policies, and enable AWS services.](http://docs.aws.amazon.com/organizations/latest/userguide/images/organizations-how-it-works.png)


**Topics**
+ [Features](#features)
+ [Use cases](#use-cases)
+ [Terminology and concepts](orgs_getting-started_concepts.md)
+ [Quotas and service limits](orgs_reference_limits.md)
+ [Region support](region-support.md)
+ [Billing and pricing](pricing.md)
+ [Support and feedback](support-and-feedback.md)

## Features for AWS Organizations
<a name="features"></a>

AWS Organizations offers the following features:

**Manage your AWS accounts**  
AWS accounts are natural boundaries for permission, security, costs, and workloads. Using a multi-account environment is a recommended best-practice when scaling your cloud environment. You can simplify account creation by programmatically creating new accounts using the AWS Command Line Interface (AWS CLI), SDKs, or APIs, and centrally provision recommended resources and permissions to those accounts with [AWS CloudFormation StackSets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html).

**Define and manage your organization**  
As you create new accounts, you can group them into organizational units (OUs), or groups of accounts that serve a single application or service. Apply tag polices to classify or track resources in your organization, and provide attribute-based access control for users or applications. In addition, you can delegate responsibility for supported AWS services to accounts so users can manage them on behalf of your organization.

**Secure and monitor your accounts**  
You can centrally provide tools and access for your security team to manage security needs on behalf of the organization. For example, you can provide read-only security access across accounts, detect and mitigate threats with [Amazon GuardDuty](https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html), review unintended access to resources with [IAM Access Analyzer](https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html), and secure sensitive data with [Amazon Macie](https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html).

**Control access and permissions**  
Set up [AWS IAM Identity Center](https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html) to provide access to AWS accounts and resources using your active directory, and customize permissions based on separate job roles. You can also apply [organization policies](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies.html) to users, accounts, or OUs. For example, [service control policies (SCPs)](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html) enable you to control access to AWS resources, services, and Regions within your organization. [Resource control policies (RCPs)](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps.html) enable you to centrally prevent the unintended use of your AWS resources. [Chat applications policies](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_chatbot.html) enable you to control access to your organization's accounts from chat applications such as Slack and Microsoft Teams.

**Share resources across accounts**  
You can share AWS resources within your organization using [AWS Resource Access Manager (AWS RAM)](https://docs.aws.amazon.com/ram/latest/userguide/what-is.html). For example, you can create your [Amazon Virtual Private Cloud (Amazon VPC)](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) subnets once and share them across your organization. You can also centrally agree to software licenses with [AWS License Manager](https://docs.aws.amazon.com/license-manager/latest/userguide/license-manager.html), and share a catalog of IT services and custom products across accounts with [AWS Service Catalog](https://docs.aws.amazon.com/servicecatalog/latest/adminguide/introduction.html).

**Audit your environment for compliance**  
You can activate [AWS CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html) across accounts, which creates a log of all activity in your cloud environment that cannot be turned off or modified by member accounts. In addition, you can set policies to enforce backups on your specified cadence with [AWS Backup](https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html), or define recommended configuration settings for resources across accounts and AWS Regions with [AWS Config](https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html).

**Centrally manage billing and costs**  
Organizations provides you with a single consolidated bill. In addition, you can view usage from resources across accounts and track costs using [AWS Cost Explorer](https://docs.aws.amazon.com/cost-management/latest/userguide/ce-reports.html), and optimize your usage of compute resources using [AWS Compute Optimizer](https://docs.aws.amazon.com/managedservices/latest/userguide/compute-optimizer.html).

## Use cases for AWS Organizations
<a name="use-cases"></a>

The following are some use cases for AWS Organizations:

**Automate the creation of AWS accounts and categorize workloads**  
You can automate the creation of AWS accounts to quickly launch new workloads. Add the accounts to user-defined groups for instant security policy application, touchless infrastructure deployments, and auditing. Create separate groups to categorize development and production accounts and use [AWS CloudFormation StackSets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html) to provision services and permissions to each group.

**Define and enforce audit and compliance policies**  
You can apply service control policies (SCPs) to ensure that your users perform only the actions that meet your security and compliance requirements. Create a central log of all actions performed across your organization using [AWS CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html). View and enforce standard resource configurations across accounts and AWS Regions using [AWS Config](https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html). Automatically apply regular backups using [AWS Backup](https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html). Use [AWS Control Tower](https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html) to apply pre-packaged governance rules for security, operations, and compliance for your AWS workloads.

**Provide tools and access for your Security teams while encouraging development**  
Create a Security group and provide it with read-only access to all of your resources to identify and mitigate security concerns. You can allow that group to manage [Amazon GuardDuty](https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html) so they can actively monitor and mitigate threats to your workloads, and [IAM Access Analyzer](https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html) to quickly identify unintended access to your resources.

**Share common resources across accounts**  
Organizations makes it easy for you to share critical central resources across your accounts. For example, you can share your central [AWS Directory Service for Microsoft Active Directory](https://docs.aws.amazon.com/directoryservice/latest/admin-guide/what_is.html) so that applications can access your central identity store.

**Share critical central resources across your accounts**  
Share your [AWS Directory Service for Microsoft Active Directory](https://docs.aws.amazon.com/directoryservice/latest/admin-guide/what_is.html) as a central identity store for your applications. Use [AWS Service Catalog](https://docs.aws.amazon.com/servicecatalog/latest/adminguide/introduction.html) to share IT services in designated accounts so users can quickly discover and deploy approved services. Ensure that application resources are created on your [Amazon Virtual Private Cloud (Amazon VPC)](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) subnets by centrally defining them once and sharing them across your organization using [AWS Resource Access Manager (AWS RAM)](https://docs.aws.amazon.com/ram/latest/userguide/what-is.html).