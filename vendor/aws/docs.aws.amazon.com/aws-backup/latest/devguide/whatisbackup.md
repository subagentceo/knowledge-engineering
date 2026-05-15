

# What is AWS Backup?
<a name="whatisbackup"></a>

AWS Backup is a fully-managed service that makes it easy to centralize and automate data protection across AWS services, in the cloud, and on premises. Using this service, you can configure backup policies and monitor activity for your AWS resources in one place. It allows you to automate and consolidate backup tasks that were previously performed service-by-service, and removes the need to create custom scripts and manual processes. With a few clicks in the AWS Backup console, you can automate your data protection policies and schedules.

AWS Backup does not govern backups you take in your AWS environment outside of AWS Backup. Therefore, if you want a centralized, end-to-end solution for business and regulatory compliance requirements, start using AWS Backup today.

## Feature overview
<a name="feature-overview"></a>

AWS Backup provides many features and capabilities, including the following.

### Centralized backup management
<a name="centralized-backup-management"></a>

AWS Backup provides a centralized backup console, a set of backup APIs, and the AWS Command Line Interface (AWS CLI) to manage backups across the AWS services that your applications use. With AWS Backup, you can centrally manage backup policies that meet your backup requirements. You can then apply them to your AWS resources across AWS services, enabling you to back up your application data in a consistent and compliant manner. The AWS Backup centralized backup console offers a consolidated view of your backups and backup activity logs, making it easier to audit your backups and ensure compliance.

### Policy-based backup
<a name="policy-based-backup-solution"></a>

With AWS Backup, you can create backup policies known as *backup plans*. Use these backup plans to define your backup requirements and then apply them to the AWS resources that you want to protect across the AWS services that you use. You can create separate backup plans that each meet specific business and regulatory compliance requirements. This helps ensure that each AWS resource is backed up according to your requirements. Backup plans make it easy to enforce your backup strategy across your organization and across your applications in a scalable manner.

For all the configuration options for backup plans, see [Backup plan options and configuration](plan-options-and-configuration.md).

### Tag-based backup policies
<a name="tag-based-backup-policies"></a>

You can use AWS Backup to apply backup plans to your AWS resources in a wide variety of ways, including tagging them. Tagging makes it easier to implement your backup strategy across all your applications and to ensure that all your AWS resources are backed up and protected. AWS tags are a great way to organize and classify your AWS resources. Integration with AWS tags enables you to quickly apply a backup plan to a group of AWS resources, so that they are backed up in a consistent and compliant manner.

For all the ways you can assign your resources to backup plans, see [Select AWS services to backup](assigning-resources.md).

### Lifecycle management policies
<a name="lifecycle-management-policies"></a>

AWS Backup enables you to meet compliance requirements while minimizing backup storage costs by storing backups in a low-cost cold storage tier. You can configure lifecycle policies that automatically transition backups from warm storage to cold storage according to a schedule that you define.

For a list of resources which can be transitioned to cold storage, see [Feature availability by resource](backup-feature-availability.md#features-by-resource). For steps to turn on cold storage in your backup plan, see [Lifecycle and storage tiers](plan-options-and-configuration.md#backup-lifecycle).

### Cross-Region backup
<a name="cross-region-replication"></a>

Using AWS Backup, you can copy backups to multiple different AWS Regions on demand or automatically as part of a scheduled backup plan. Cross-Region backup is particularly valuable if you have business continuity or compliance requirements to store backups a minimum distance away from your production data. For more information, see [ Creating backup copies across AWS Regions](https://docs.aws.amazon.com/aws-backup/latest/devguide/cross-region-backup.html).

### Cross-account management and cross-account backup
<a name="cross-account"></a>

You can use AWS Backup to manage your backups across all AWS accounts inside your [AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html) structure. With cross-account management, you can automatically use backup policies to apply backup plans across the AWS accounts within your organization. This makes compliance and data protection efficient at scale and reduces operational overhead. It also helps eliminate manually duplicating backup plans across individual accounts. For more information, see [Managing AWS Backup resources across multiple AWS accounts](https://docs.aws.amazon.com/aws-backup/latest/devguide/manage-cross-account.html).

You can also copy backups to multiple different AWS accounts inside your AWS Organizations management structure. This way, you can "fan in" backups to a single repository account, then "fan out" backups for greater resilience. [Creating backup copies across AWS accounts](https://docs.aws.amazon.com/aws-backup/latest/devguide/create-cross-account-backup.html).

Before you can use the cross-account management and cross-account backup features, you must have an existing organization structure configured in AWS Organizations. An *organizational unit* (OU) is a group of accounts that can be managed as a single entity. AWS Organizations is a list of accounts that can be grouped into organizational units and managed as a single entity.

### Auditing and reporting with AWS Backup Audit Manager
<a name="auditing-and-reporting"></a>

AWS Backup Audit Manager helps you simplify data governance and compliance management of your backups across AWS. AWS Backup Audit Manager provides built-in, customizable controls that you can align with your organizational requirements. You can also use these controls to automatically track your backup activities and resources. 

AWS Backup Audit Manager can help you locate specific activities and resources that are not yet compliant with the controls that you defined. It also generates daily reports that you can use to demonstrate evidence of compliance with your controls over time. 

To include your backup compliance alongside your overall compliance posture, you can automatically import AWS Backup Audit Manager findings into AWS Audit Manager.

### Incremental backups
<a name="incremental-backups"></a>

AWS Backup efficiently stores your periodic backups incrementally for supported resource types. The first backup of an AWS resource backs up a full copy of your data. For each successive incremental backup, only the changes to your AWS resources are backed up. Incremental backups enable you to benefit from the data protection of frequent backups while minimizing storage costs.

**Important**  
Not all resource types support incremental backups. For resources that do not support incremental backups, each backup is a full copy, which can result in higher storage costs. For a list of which resources support incremental backups, see [Feature availability by resource](backup-feature-availability.md#features-by-resource).

For more information on behaviors in vaults, see [Incremental backups](creating-a-backup.md#incremental-backup-works).

### Full AWS Backup management
<a name="full-management"></a>

Some resource types support full AWS Backup management. The benefits of full AWS Backup management include:
+ **Independent encryption**. AWS Backup automatically encrypts your backups with the KMS key of your AWS Backup vault, instead of using the same encryption key as your source resource. This increases your layers of defense. See [Encryption for backups in AWS Backup](encryption.md) for more information.
+ **`awsbackup` Amazon Resource Names (ARNs)**. Backup ARNs begin with `arn:aws:backup` instead of `arn:aws:{{source-resource}}`. This allows you to create access policies that apply specifically to backups and not the source resources. See [Access control](access-control.md) for more information.
+ **Centralized backup billing and Cost Explorer cost allocation tags.**. Charges for AWS Backup (including storage, data transfers, restores, and early deletion) appear under "Backup" in your Amazon Web Services bill, instead of appearing under each supported resource. You can also use Cost Explorer cost allocation tags to track and optimize your backup costs. See [Metering, costs, and billing for AWS BackupMetering, costs, and billing](metering-and-billing.md) for more information.

To see which resource types are eligible for full AWS Backup management, see [Feature availability by resource](backup-feature-availability.md#features-by-resource).

### Backup activity monitoring
<a name="backup-activity-monitoring"></a>

AWS Backup provides a dashboard that makes it simple to audit backup and restore activity across AWS services. With just a few clicks on the AWS Backup console, you can view the status of recent backup jobs. You can also restore jobs across AWS services to ensure that your AWS resources are properly protected.

AWS Backup integrates with Amazon CloudWatch and Amazon EventBridge. CloudWatch allows you to track metrics and create alarms. EventBridge allows you to view and monitor AWS Backup events. For more information, see [Monitoring AWS Backup events using EventBridge](https://docs.aws.amazon.com/aws-backup/latest/devguide/eventbridge.html) and [Monitoring AWS Backup metrics with CloudWatch](https://docs.aws.amazon.com/aws-backup/latest/devguide/cloudwatch.html).

AWS Backup integrates with AWS CloudTrail. CloudTrail gives you a consolidated view of backup activity logs that make it quick and easy to audit how your resources are backed up. AWS Backup also integrates with Amazon Simple Notification Service (Amazon SNS), providing you with backup activity notifications, such as when a backup succeeds or a restore has been initiated. For more information, see [Logging AWS Backup API calls with CloudTrail](https://docs.aws.amazon.com/aws-backup/latest/devguide/logging-using-cloudtrail.html) and [Amazon SNS and AWS Backup events](https://docs.aws.amazon.com/aws-backup/latest/devguide/backup-notifications.html#backup-notifications-section).

### Secure your data in backup vaults
<a name="backup-access-policies"></a>

The content of each AWS Backup backup is immutable, meaning that no one can alter that content. AWS Backup further secures your backups in backup vaults, which separates them safely from their source instances. For example, your vault will retain your Amazon EC2 and Amazon EBS backups according to the lifecycle policy you choose, even if you delete the source Amazon EC2 instance and Amazon EBS volumes.

Backup vaults offer encryption and resource-based access policies that let you define who has access to your backups. You can define access policies for a backup vault that define who has access to the backups within that vault and what actions they can take. This provides a simple and secure way to control access to your backups across AWS services. To review AWS and customer managed policies for AWS Backup, see [Managed policies for AWS Backup](https://docs.aws.amazon.com/aws-backup/latest/devguide/security-iam-awsmanpol.html).

You can use AWS Backup Vault Lock to prevent anyone (including you) from deleting backups or altering their retention period. AWS Backup Vault Lock helps you enforce a *write-once-read-many* (WORM) model and add another layer of defense to your defense in depth. To get started, see [AWS Backup Vault Lock](https://docs.aws.amazon.com/aws-backup/latest/devguide/vault-lock.html).

## Getting started
<a name="what-is-backup-getstarted"></a>

To learn more about AWS Backup, we recommend that you start with [Getting started with AWS Backup](getting-started.md).

## Supported AWS resources and applications
<a name="supported-resources"></a>

The following are AWS resources and third-party applications that you can back up and restore using AWS Backup. For more information, see [AWS Backup feature availability](backup-feature-availability.md).


| Service | Supported resource types | 
| --- | --- | 
| [Amazon Elastic Compute Cloud (Amazon EC2)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/) | Amazon EC2 instances backed by Amazon EBS volumes | 
| [Amazon Simple Storage Service (Amazon S3)](https://docs.aws.amazon.com/AmazonS3/latest/userguide/) | Amazon S3 data  | 
| [Amazon Elastic Block Store (Amazon EBS)](https://docs.aws.amazon.com/ebs/latest/userguide/what-is-ebs.html) | Amazon EBS volumes | 
| [Amazon DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStartedDynamoDB.html) | Amazon DynamoDB tables | 
| [Amazon Relational Database Service (Amazon RDS)](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/) | Amazon RDS database instances (including all database engines); Multi-Availability Zone clusters | 
| [Amazon Aurora DSQL](https://docs.aws.amazon.com/aurora-dsql/latest/userguide/what-is-aurora-dsql.html) | Single-Region clusters and multi-Region clusters | 
| [Amazon Aurora](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/) | Aurora clusters | 
| [Amazon Elastic File System (Amazon EFS)](https://docs.aws.amazon.com/efs/latest/ug/) | Amazon EFS file systems | 
| [FSx for Lustre](https://docs.aws.amazon.com/fsx/latest/LustreGuide/) | FSx for Lustre file systems | 
| [FSx for Windows File Server ](https://docs.aws.amazon.com/fsx/latest/WindowsGuide/what-is.html) | FSx for Windows File Server file systems | 
| [Amazon FSx for NetApp ONTAP](https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/what-is-fsx-ontap.html) | FSx for ONTAP file systems | 
| [Amazon FSx for OpenZFS](https://docs.aws.amazon.com/fsx/latest/OpenZFSGuide/what-is-fsx.html) | FSx for OpenZFS file systems | 
| [AWS Storage Gateway (Volume Gateway)](https://docs.aws.amazon.com/storagegateway/latest/vgw/WhatIsStorageGateway.html) | AWS Storage Gateway volumes | 
| [Amazon DocumentDB](https://docs.aws.amazon.com/documentdb/latest/developerguide/) | Amazon DocumentDB instance-based clusters | 
| [Amazon Neptune](https://docs.aws.amazon.com/neptune/latest/userguide/) | Amazon Neptune clusters | 
| [Amazon Redshift](https://docs.aws.amazon.com/redshift/latest/dg/welcome.html) | Amazon Redshift clusters | 
| [Amazon Redshift Serverless](https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-serverless.html) | Amazon Redshift namespaces | 
| [Amazon Timestream for LiveAnalytics](https://docs.aws.amazon.com/timestream/latest/developerguide/what-is-timestream.html) | Amazon Timestream for LiveAnalytics tables. (AWS Backup does not support Amazon Timestream for InfluxDB. For more information, see [Amazon Timestream backups](timestream-backup.md).) | 
| [VMware Cloud™ on AWS](https://aws.amazon.com/vmware/) | VMware Cloud™ virtual machines on AWS | 
| [VMware Cloud™ on AWS Outposts](https://aws.amazon.com/vmware/aws-services/) | VMware Cloud™ virtual machines on AWS Outposts | 
| [CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacks.html) | CloudFormation stacks | 
| [ SAP HANA databases](https://docs.aws.amazon.com/aws-backup/latest/devguide/backup-saphana.html) | SAP HANA databases on Amazon EC2 instances | 
| [Amazon Elastic Kubernetes Service (Amazon EKS)](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html) | Amazon EKS clusters and persistent storage backups | 

## Pricing
<a name="pricing"></a>

With AWS Backup, you pay for backup storage, data restored, restore testing, cross-Region data transfer, and AWS Backup Audit Manager. For more information, see [AWS Backup Pricing](https://aws.amazon.com/backup/pricing/).