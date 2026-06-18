

# Amazon RDS Backup & Restore Using AWS Backup
<a name="amazon-rds-backup-restore-using-aws-backup"></a>


|  |  | 
| --- |--- |
| **AWS experience** | Intermediate  | 
| **Time to complete** | 10 minutes  | 
| **Cost to complete** | Free ([Amazon RDS Free Tier](https://aws.amazon.com/rds/free/))  | 
| **Services used** | [AWS Backup](https://aws.amazon.com/backup/) <br />[Amazon Relational Database Service (Amazon RDS)](https://aws.amazon.com/rds/)  | 

## Overview
<a name="overview"></a>

[AWS Backup](https://aws.amazon.com/backup/) enables you to centralize and automate data protection across AWS services. AWS Backup is a fully managed, policy-based service that simplifies data protection at scale. The service is ideal for use cases such as regulatory compliance obligations, business policies for data protection, and business continuity goals. 

In this how-to guide, we will use the AWS Management Console to set up automated backups of select AWS services using Amazon Relational Database Service (Amazon RDS), restore a backup, and clean up our resources to avoid unexpected costs. See [this list](https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html#supported-resources) for all the AWS and third-party services supported by AWS Backup. When going to production, remember to set up the correct schedules and retention management, and to monitor your costs. 

## What you will accomplish
<a name="what-you-will-accomplish"></a>
+ Create an on-demand backup job of an Amazon RDS database 
+ Use a backup plan to back up Amazon RDS resources - using a backup plan within AWS Backup, you can automate your backups on a schedule 
+ Add resources to an existing backup plan using tags 
+ Restore a backup 

## Prerequisites
<a name="prerequisites"></a>

You will need the following resources or permissions to proceed with this how-to guide: 
+ An [AWS account](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/). For more information on using AWS Backup for the first time, view the [AWS Backup Developer Guide](https://docs.aws.amazon.com/aws-backup/latest/devguide/setting-up.html). 
+ One or more Amazon RDS databases (including those that are free tier eligible). For the pricing of databases not in the free tier, refer to [Amazon RDS Pricing](https://aws.amazon.com/rds/pricing/). For AWS Backup pricing, refer to [AWS Backup Pricing](https://aws.amazon.com/backup/pricing/). 
+ IAM roles used by AWS Backup to create a backup of the Amazon RDS database. 
+ If a subsequent role is not created, then the default IAM role can be used - AWSBackupDefaultRole 

## Implementation
<a name="implementation"></a>

### Step 1: Configure an on-demand AWS Backup job of an Amazon RDS database
<a name="configure-an-on-demand-aws-backup-job-of-an-amazon-rds-database"></a>

1. Open the AWS Backup console

   Log in to the [AWS Management Console](https://console.aws.amazon.com/), and open the [AWS Backup console.](https://console.aws.amazon.com/backup)   
![The navigation menu interface for the AWS Backup console.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/navigation-menu-interface-bkplong-console.png)

1. Configure the services used with AWS Backup

   On the navigation pane on the left side of the [AWS Backup console,](https://console.aws.amazon.com/backup) under **My account,** choose **Settings**.   
![The service configuration interface.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/service-configuration-interface.png)

1. Configure resources

   On the **Service opt-in** page, choose **Configure resources**.   
![AWS Backup settings page showing the "Service opt-in" section with a "Configure resources" button and a list of resource types with their backup status marked as "Enabled.".](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/bkplong-settings-page-service-opt-section.png)

1. Select services for backup

   On the Configure resources page, use the toggle switches to enable or disable the services used with AWS Backup. Choose Confirm when your services are configured. 
   + AWS resources that you're backing up should be in the Region you are using for this how-to guide, and resources must all be in the same AWS Region (however, see step 2.11 for information on cross-Region copy). This how-to guide uses the US East (N. Virginia) Region (us-east-1).   
![AWS Backup settings page showing a list of enabled resources with toggle switches, including Aurora, DocumentDB, DynamoDB, and others, and a "Confirm" button highlighted at the bottom.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/bkplong-settings-page-list-enabled.png)

1. Create an on-demand backup job of an Amazon RDS database

   Back in the [AWS Backup console](https://console.aws.amazon.com/backup), under **My account** on the left navigation pane, select **Protected resources.**   
![The AWS Backup interface showing the "Protected resources" section with a list of resource types (e.g., Aurora, DynamoDB, EC2) and their backup status marked as "Enabled.".](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/bkplong-interface-protected-resources.png)

1. Choose Create an on-demand backup

   From the dashboard, select the **Create on-demand** **backup** button.   
![The backup creation interface.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/backup-creation-interface.png)

1. Configure on-demand backup settings

   On the **Create on-demand backup page**, choose the following options: 

   Select the resource type that you want to back up; for example, choose **RDS** for Amazon RDS. 

   Choose the **database name** or **ID** of the resource that you want to protect; for example, analytics. 

   Ensure that **Create backup now** is selected. This initiates your backup job immediately and enables you to see your saved resource sooner on the **Protected resources** page. 

   Select the desired **retention period**. AWS Backup automatically deletes your backups at the end of this period to save storage costs for you. 

   Choose an existing backup vault. Choosing **Create new Backup vault** opens a new page to create a vault and then returns you to the **Create on-demand backup** page when you are finished. 

   Under **IAM role**, choose **Default** role. 
**Note**  
If the AWS Backup Default role is not present in your account, then an AWS Backup Default role is created with the correct permissions.

   Select the **Create on-demand backup** button. This takes you to the **Jobs** page, where you will see a list of jobs.   
![AWS Backup interface showing settings for creating an on-demand backup, including resource type, database name, backup window, retention period, backup vault, IAM role, and a "Create on-demand backup" button.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/bkplong-interface-settings-creating-demand.png)

1. View the backup job details

   Choose the **Backup job ID** for the resource that you chose to back up to see the details of that job.   
![The AWS Backup interface showing a list of backup jobs with details like job ID, status, resource type, and creation time.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/bkplong-interface-list-backup-jobs-details.png)

### Step 2: Configure automatic AWS Backup jobs of an Amazon RDS database
<a name="configure-automatic-aws-backup-jobs-of-an-amazon-rds-database"></a>

1. Configure the services used with AWS Backup

   Back on the left navigation pane in the AWS Backup console, under **My account**, choose **Settings**. 

1. Configure resources

   On the **Service opt-in** page, choose **Configure resources**.   
![The navigation menu interface.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/navigation-menu-interface.png)

1. Select services for backup

   On the **Configure resources** page, use the toggle switches to enable or disable the services used with AWS Backup. Choose **Confirm** when your services are configured. 

   AWS resources that you're backing up should be in the Region you are using for this tutorial, and resources must all be in the same AWS Region (however, see step 2.11 for information on cross-Region copy). This tutorial uses the US East (N. Virginia) Region (us-east-1).   
![AWS Backup settings page showing a list of configurable resources with toggle switches to enable or disable backup protection, and a "Confirm" button highlighted at the bottom.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/bkplong-settings-page-list-configurable.png)

1. Configure a backup plan

   In the AWS Backup console, select **Backup plans** on the left navigation pane under **My account**, and then **Create backup** **plan**.   
![The navigation menu interface.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/navigation-menu-interface-1.png)

1. Create a new backup plan

   AWS Backup provides three ways to get started using the AWS Backup console but for this how-to guide, select **Build a new plan:** 
   + **Start with a template** — You can create a new backup plan based on a template provided by AWS Backup. Be aware that backup plans created by AWS Backup are based on backup best practices and common backup policy configurations. When you select an existing backup plan to start from, the configurations from that backup plan are automatically populated for your new backup plan. You can then change any of these configurations according to your backup requirements. 
   + **Build a new plan** — You can create a new backup plan by specifying each of the backup configuration details, as described in the next section. You can choose from the recommended default configurations. 
   + **Define a plan using JSON** - You can modify the JSON expression of an existing backup plan or create a new expression. 

   **Backup plan name** - You must provide a unique backup plan name. If you try to create a backup plan that is identical to an existing plan, you get an *AlreadyExistsException* error. For this how-to guide, enter **RDS-webapp**.   
![AWS Backup interface showing the "Create backup plan" page with "Build a new plan" selected and a backup plan name entered as "RDS-webapp.".](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/bkplong-interface-backup-plan-page-new.png)

1. Enter a backup rule name

   **Backup rule name** - Backup plans are composed of one or more backup rules. Backup rule names are case sensitive. They must contain from 1 to 63 alphanumeric characters or hyphens. For this how-to guide, enter **RDS-Dailies.**   
![AWS Backup rule configuration page, showing fields for backup rule name, vault, frequency, and other settings, with "RDS-Dailies" entered as the backup rule name.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/bkplong-rule-configuration-page-fields.png)

1. Create a backup vault

   **Backup vault** - A backup vault is a container to organize your backups in. Backups created by a backup rule are organized in the backup vault that you specify in the backup rule. You can use backup vaults to set the AWS Key Management Service (AWS KMS) encryption key that is used to encrypt backups in the backup vault and to control access to the backups in the backup vault. You can also add tags to backup vaults to help you organize them. If you don't want to use the default vault, you can create your own. 

   **Create new backup vault** - Instead of using the default backup vault that is automatically created for you in the AWS Backup console, you can create specific backup vaults to save and organize groups of backups in the same vault. 

   1. To create a backup vault, choose **Create new Backup vault.** 

   1. Enter a name for your backup vault. You can name your vault to reflect what you will store in it, or to make it easier to search for the backups you need. For example, you could name it **FinancialBackups**. 

   1. Select an AWS KMS key. You can use either a key that you already created or select the default AWS Backup master key. 

   1. Optionally, add tags that will help you search for and identify your backup vault. 

   1. Select **Create Backup vault** button.  
![The backup creation interface.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/backup-creation-interface-1.png)

1. Configure the backup vault

   **Create new backup vault** - Instead of using the default backup vault that is automatically created for you in the AWS Backup console, you can create specific backup vaults to save and organize groups of backups in the same vault. 

   1. To create a backup vault, choose **Create new Backup vault.** 

   1. Enter a name for your backup vault. You can name your vault to reflect what you will store in it, or to make it easier to search for the backups you need. For example, you could name it **FinancialBackups**. 

   1. Select an AWS KMS key. You can use either a key that you already created or select the default AWS Backup master key. 

   1. Optionally, add tags that will help you search for and identify your backup vault. 

   1. Select **Create Backup vault** button.   
![The AWS "Create Backup Vault" interface, showing fields for backup vault name, encryption key, account details, and an optional section for tags, with the "Create Backup Vault" button highlighted.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/backup-vault-interface-fields-name.png)

1. Configure backup schedule

   **Backup frequency** - The backup frequency determines how often a backup is created. You can choose a frequency of every 12 hours, daily, weekly, or monthly. When selecting weekly, you can specify which days of the week you want backups to be taken. When selecting monthly, you can choose a specific day of the month. 

   **Enable continuous backups for point-in-time recovery** - With continuous backups, you can perform point-in-time restores (PITR) by choosing when to restore, down to the second. The most time that can elapse between the current state of your workload and your most recent point-in-time restore is 5 minutes. You can store continuous backups for up to 35 days. If you do not enable continuous backups, AWS Backup takes snapshot backups for you. 

   **Backup window** - Backup windows consist of the time that the backup window begins and the duration of the window in hours. The default backup window is set to start at 5 AM UTC (Coordinated Universal Time) and lasts 8 hours.   
![The configuration settings interface.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/configuration-settings-interface.png)

1. Configure retention settings

   **Transition to cold storage** - Currently only Amazon EFS file system backups can be transitioned to cold storage. The cold storage expression is ignored for the backups of Amazon Elastic Block Store (Amazon EBS), Amazon Relational Database Service (Amazon RDS), Amazon Aurora, Amazon DynamoDB, and AWS Storage Gateway. 

   **Retention period** - AWS Backup automatically deletes your backups at the end of this period to save storage costs for you. AWS Backup can retain snapshots between 1 day and 100 years (or indefinitely, if you do not enter a retention period), and continuous backups between 1 and 35 days.   
![AWS Backup settings showing "Transition to cold storage" set to "Never" and "Retention period" set to "Always," with additional options for advanced backup settings.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/bkplong-settings-transition-cold-set-never.png)

1. (Optional) Copy a backup to multiple regions

   **Copy to destination** - As part of your backup plan, you can optionally create a backup copy in another AWS Region. Using AWS Backup, you can copy backups to multiple AWS Regions on-demand, or automatically as part of a scheduled backup plan. Cross-Region Replication (CRR) is particularly valuable if you have business continuity or compliance requirements to store backups a minimum distance away from your production data. When you define a backup copy, you configure the following options: 
   + Copy to destination - The destination Region for the backup copy. 
   + Destination backup vault - The destination backup vault for the copy. 
   + (Advanced Settings) Transition to cold storage 
   + (Advanced Settings) Retention period 
**Note**  
Cross-Region Copy incurs additional data transfer costs. You can refer to the [AWS Backup pricing page](https://aws.amazon.com/backup/pricing/) for more information.  
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/resource-creation-interface.png)

1. Create the plan

   **Tags added to recovery points** - The tags that you list here are automatically added to backups when they are created. 

   **Advanced backup settings** - Enables application-consistent backups for third-party applications that are running on Amazon EC2 instances. Currently, AWS Backup supports Windows VSS backups. This is only applicable for Windows EC2 Instances running SQL Server or Exchange databases. 

   Choose **Create plan.**   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/resource-creation-interface-1.png)

1. Assign resources

   When you assign a resource to a backup plan, that resource is backed up automatically according to the backup plan. The backups for that resource are managed according to the backup plan. You can assign resources using tags or resource IDs. Using tags to assign resources is a simple and scalable way to back up multiple resources. 

   Select the created backup plan, and select the **Assign resources** button.   
![AWS Backup interface showing details of the "RDS-webapp" backup plan, including summary, backup rules, and an option to assign resources.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/bkplong-interface-details-webapp-backup.png)

1. Enter an assignment name

   **Resource assignment name** - Provide a resource assignment name. 

   **IAM role** - When creating a tag-based backup plan, if you choose a role other than **Default role**, make sure that it has the necessary permissions to back up all tagged resources. AWS Backup tries to process all resources with the selected tags. If it encounters a resource that it doesn't have permission to access, the backup plan fails.   
![AWS Backup interface showing "Assign resources" page with fields for resource assignment name and IAM role selection.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/bkplong-interface-assign-resources-page.png)

1. Choose a resource selection type

   **Define resource selection** - You can choose to include all resource types or specific resource types.   
![Backup plan interface showing options to assign resources, with selections to include all resource types or specific resource types.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/backup-plan-interface-options-assign.png)

1. Define resource assignments

   For resource ID-based assignment, select **Resource type** and the name of the resource. 

   To exclude specific resource IDs, select **Resource type** and the name of the resource.   
![AWS interface showing a backup plan configuration step to select specific resource types, with "RDS" as the resource type and "analytics" as the selected database name.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/interface-backup-plan-configuration-select.png)

1. Assign the resources to the backup plan

   For tags-based resource assignment, provide the key-value pair of the Amazon RDS database. 

   Select **Assign resources** and the backup plan has the resources assigned to it.   
![AWS interface showing resource assignment options, including refining selection using tags with fields for key, condition, and value.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/interface-resource-assignment-options.png)

1. View the backup job

   Navigate to the [AWS Backup console](https://console.aws.amazon.com/backup) and the backup jobs will be seen under **Jobs.** 

   A backup, or recovery point, represents the content of a resource, such as an Amazon Elastic Block Store (Amazon EBS) volume or Amazon RDS database, at a specified time. **Recovery point** is a term that refers generally to the different backups in AWS services, such as Amazon EBS snapshots and Amazon RDS backups. In AWS Backup, recovery points are saved in backup vaults, which you can organize according to your business needs. Each recovery point has a unique ID.   
![The AWS Backup interface showing details of the "RDS-webapp" backup plan, including summary information, backup rules, and resource assignments.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/bkplong-interface-details-webapp-backup-1.png)

### Step 3: Restore of an Amazon RDS database using AWS Backup
<a name="restore-of-an-amazon-rds-database-using-aws-backup"></a>

1. Select the backup

   Navigate to the backup vault that was selected in the backup plan and select the latest completed backup.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/selection-interface.png)

1. Restore the RDS instance

   To restore the database, click on the recovery point ARN and select **Restore.**   
![AWS Backup interface showing details of a completed RDS snapshot backup, with options to copy, delete, or restore.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/bkplong-interface-details-completed.png)

1. Review restore configuration

   The restore of the ARN will bring you to a **Restore backup** screen that will have Instance specifications and configurations for the Amazon RDS database. Select the **DB engine**, **License Model,** and **DB instance class.** 
   + Multi AZ - Using a Multi-AZ deployment will automatically provision and maintain a synchronous standby replica in a different Availability Zone. Note that you will have to pay for Multi-AZ deployment. 
   + Storage type - Select **Provisioned IOPS (SSD).** 
   + Provisioned IOPS - The requested number of I/O operations per second that the DB instance can support. Enter **3000**.   
![AWS Restore Backup interface showing instance specifications, including MySQL Community Edition as the DB engine, general-public-license as the license model, db.m4.xlarge instance class, Multi-AZ set to "No," Provisioned IOPS (SSD) storage type, and 3000 provisioned IOPS.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/restore-backup-interface-instance.png)

1. Enter a name for the DB instance

   **DB Instance Identifier** - Type a name for the DB instance that is unique for your account in the Region that you selected. If you're restoring from a DB instance that you deleted after you made the DB snapshot, you can use the name of that DB instance.   
![AWS settings showing a DB snapshot ID and a DB Instance Identifier field with the value 'analyticsrestore' highlighted in red.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/settings-snapshot-instance-identifier.png)

1. Configure network and security settings

   Select the appropriate network and security settings: 
   + VPC - Select the VPC where the database needs to be restored to. 
   + Subnet group - Select the subnet group in the VPC where the database needs to be restored to. 
   + Public accessibility - You can choose if you need the DB Instances to have a public address or not. If you choose **Yes**, this will allocate an IP address for your database instance so that you can directly connect to the database from your own device. 
   + **Availability zone** - Choose **No Preference.**   
![AWS Network & Security settings for a DB instance, showing options for VPC, subnet group, public accessibility set to "No," and availability zone set to "No Preference.".](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/network-amp-security-settings-instance.png)

1. Select database options

   Select the appropriate database options. 
   + **Database port** - Leave the default value of **3306**. 
   + **DB parameter group** - Leave the **default value.** 
   + **Option Group** - Leave the **default value**. Amazon RDS uses option groups to enable and configure additional features. 
   + **IAM DB Authentication Enabled** - You can authenticate to your DB instance using AWS Identity and Access Management (IAM) database authentication. Select **Enable IAM DB authentication.**   
![AWS database options configuration screen showing settings for database port, DB parameter group, option group, and IAM DB authentication.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/database-options-configuration-screen.png)

1. Copy tags to snapshots

   **Copy Tags to Snapshots** - Tags can be set on the database instances to be automatically copied to any automated or manual database snapshots that are created from your instances.   
![AWS RDS settings showing the 'Backup' section with an option to 'Copy tags to snapshots' and a checkbox.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/settings-backup-section-option-copy-tags.png)

1. Configure encryption

   **Encryption** - This is the master key that will be used to protect the key that is used to encrypt the database volume. You can choose from master keys in your AWS account or enter the Amazon Resource Name (ARN) of a key from a different account.   
![AWS console encryption settings page showing options to enable or disable encryption, with a default encryption key selected and status marked as enabled.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/console-encryption-settings-page-options.png)

1. Select log types

   **Log exports** - Select the log types to publish to Amazon CloudWatch logs.    
![AWS interface showing log export options for Amazon CloudWatch Logs, including Audit log, Error log, General log, and Slow query log, with a note that Error logs are enabled by default.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/interface-log-export-options-cwllong.png)

1. Configure automatic maintenance

   **Maintenance** - Select **Yes** if the DB instance should receive automatic engine version upgrades.   
![The configuration settings interface.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/configuration-settings-interface-1.png)

1. Choose a restore role

   **Restore role** - Select the **Default role** or **Choose an IAM role.**    
![AWS Backup interface showing options to specify the IAM role for restoring backups, with "Default role" selected and "Choose an IAM role" unselected.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/bkplong-interface-options-specify-iam-role.png)

1. Restore the backup

   Select **Restore backup.** 
   + Your job will then appear under the **Jobs** section in the **Restore jobs** tab in the [AWS Backup console.](https://console.aws.amazon.com/backup) 
   + Once the restore job is completed, you can navigate to the [Amazon RDS console](https://console.aws.amazon.com/rds/home) and use the endpoint to connect to the database.   
![AWS Backup interface showing options for "Auto minor version upgrade" and "Restore role," with a highlighted "Restore backup" button.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/bkplong-interface-options-auto-minor.png)

1. Monitor the restore job

   Your job will then appear under the **Jobs** section in the **Restore jobs** tab in the [AWS Backup console.](https://console.aws.amazon.com/backup)   
![AWS Backup console showing a "Restore in progress" notification and a list of restore jobs with one job in "Pending" status for an RDS resource.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/bkplong-console-restore-progress.png)

1. Find the DB endpoint

   Once the restore job is completed, you can navigate to the [Amazon RDS console](https://console.aws.amazon.com/rds/home) and use the endpoint to connect to the database.   
![An Amazon RDS database instance details page showing the "analyticsrestore" database with summary information, endpoint, networking, and security details.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/database-instance-details-page.png)

### Clean up resources
<a name="clean-up"></a>

In the following steps, you will clean up the resources you created in this how-to guide. It is a best practice to delete instances and resources that you are no longer using so that you are not continually charged for them. 

1. Delete the restored database

   Open the [Amazon RDS console.](https://console.aws.amazon.com/rds/home) 

   In the navigation pane, choose **Databases**. 

   Select the restored RDS database, and choose **Actions, Delete.**   
![The navigation menu interface.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/navigation-menu-interface-2.png)

1. Confirm deletion

   To confirm deletion, type **delete me** into the field. 
**Note**  
This process can take several seconds to complete.  
![Amazon RDS interface showing a confirmation dialog to delete a database instance, with options to create a final snapshot and retain automated backups, and a text field requiring 'delete me' for confirmation.](http://docs.aws.amazon.com/hands-on/latest/amazon-rds-backup-restore-using-aws-backup/images/interface-confirmation-dialog-delete.png)

## Additional resources: Working with Amazon RDS and Amazon Aurora
<a name="additional-resources-working-with-amazon-rds-and-amazon-aurora"></a>
+ [Getting started with AWS Backup](https://docs.aws.amazon.com/aws-backup/latest/devguide/getting-started.html) 
+ [How to restore an Amazon RDS database](https://docs.aws.amazon.com/aws-backup/latest/devguide/restoring-rds.html) 
+ [How to restore an Amazon Aurora cluster](https://docs.aws.amazon.com/aws-backup/latest/devguide/restoring-aur.html) 
+ [What is Amazon Relational Database Service (Amazon RDS)?](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html) 
+ [What is Amazon Aurora?](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html) 

## Conclusion
<a name="conclusion"></a>

You successfully created an on-demand backup job of an Amazon RDS database\! You also used a backup plan to back up Amazon RDS resources. As a great next step, check out recently published AWS Backup blogs to further your AWS Cloud knowledge. 