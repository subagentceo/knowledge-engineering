

# Create and Connect to a MySQL Database with Amazon RDS
<a name="create-mysql-db"></a>


|  |  | 
| --- |--- |
| **AWS experience** | Beginner  | 
| **Time to complete** | 10 minutes  | 
| **Cost to complete** | $0.005 per hour You will only incur charges if you select In-use Public IPv4 Address. | 
| **Services used** | [Amazon RDS](https://aws.amazon.com/rds/)  | 
| **Last updated** | February 3, 2023  | 

## Overview
<a name="overview"></a>

In this tutorial, you will learn how to create an environment to run your MySQL database (we call this environment an instance), connect to the database, and delete the database instance. We will do this using [Amazon Relational Database Service (Amazon RDS)](https://aws.amazon.com/rds/mysql/). 

## What you will accomplish
<a name="what-you-will-accomplish"></a>

In this tutorial, you will: 
+ Create an environment to run your MySQL database 
+ Connect to the database 
+ Delete the database instance 

## Prerequisites
<a name="prerequisites"></a>

Before starting this tutorial, you will need: 
+ **An AWS account:** If you don't already have an account, follow the Setting Up Your AWS Environment getting started guide for a quick overview. 

## Implementation
<a name="implementation"></a>

### Step 1: Create a MySQL DB instance
<a name="create-a-mysql-db-instance"></a>

In this step, we will use Amazon RDS to create a MySQL DB Instance with db.t2.micro DB instance class, 20 GB of storage, and automated backups enabled with a retention period of one day.   

1. Open the AWS Management Console

   Open the [AWS Management Console](https://console.aws.amazon.com/console/home?region=us-east-1) in a new browser window, so you can keep this step-by-step guide open. When the console opens, select **Database** from the left navigation pane and choose **RDS** to open the **Amazon RDS console.**   
![The AWS Management Console highlighting the 'Database' category in the left menu and 'RDS' (Relational Database Service) in the database services list.](http://docs.aws.amazon.com/hands-on/latest/create-mysql-db/images/console-highlighting-database-category.png)

1. Select Region

   In the top right corner of the Amazon RDS console, select the Region in which you want to create the DB instance. 
**Note**  
AWS Cloud resources are housed in highly available data center facilities in different areas of the world. Each Region contains multiple distinct locations called Availability Zones. You have the ability to choose which Region to host your Amazon RDS activity in.   
![The Amazon RDS dashboard showing resources, database creation options, service health, and a dropdown menu listing AWS regions.](http://docs.aws.amazon.com/hands-on/latest/create-mysql-db/images/dashboard-resources-database-creation.png)

1. Create database

   In the **Create database** section, choose **Create database**.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/create-mysql-db/images/resource-creation-interface.png)

1. Select database engine

   You now have options to select your engine. For this tutorial, choose the **MySQL** icon, leave the default value of edition and engine version, and select the **Free Tier** template. ** Multi-AZ deployment:** You will have to pay for Multi-AZ deployment. Using a Multi-AZ deployment will automatically provision and maintain a synchronous standby replica in a different Availability Zone. For more information, see [High Availability Deployment.](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html)  
![The AWS RDS "Create database" page with "Standard create" and "MySQL" options selected, engine version set to MySQL 8.0.28, and "Free tier" template highlighted.](http://docs.aws.amazon.com/hands-on/latest/create-mysql-db/images/database-page-standard-options-selected.png)

1. Configure DB instance

   You will now configure your DB instance. The list below shows the example settings you can use for this tutorial: 

   **Settings**: 
   + **DB instance identifier**: Type a name for the DB instance that is unique for your account in the Region that you selected. For this tutorial, we will name it **rds-mysql-10minTutorial.** 
   + **Master username**: Type a username that you will use to log in to your DB instance. We will use masterUsername in this example. 
   + **Master password**: Type a password that contains from 8 to 41 printable ASCII characters (excluding /,", and @) for your master user password. 
   + **Confirm password**: Retype your password   
![AWS RDS setup screen showing fields for DB instance identifier, master username, master password, and instance configuration options.](http://docs.aws.amazon.com/hands-on/latest/create-mysql-db/images/setup-screen-fields-instance-identifier.png)

1. Additional DB instance configuration

   **Instance specifications:** 
   + **DB instance class**: Select **db.t2.micro — 1vCPU, 1 GiB RAM.** This equates to 1 GB memory and 1 vCPU. To see a list of supported instance classes, see Amazon RDS Pricing. 
   + **Storage type**: Select **General Purpose (SSD)**. For more information about storage, see Storage for Amazon RDS. 
   + **Allocated storage**: Select the default of 20 to allocate 20 GB of storage for your database. You can scale up to a maximum of 64 TB with Amazon RDS for MySQL. 
   + **Enable storage autoscaling**: If your workload is cyclical or unpredictable, you would enable storage autoscaling to enable Amazon RDS to automatically scale up your storage when needed. This option does not apply to this tutorial. 
   + **Multi-AZ deployment**: You will have to pay for Multi-AZ deployment. Using a Multi-AZ deployment will automatically provision and maintain a synchronous standby replica in a different Availability Zone. For more information, see High Availability Deployment.   
![Storage settings interface showing General Purpose SSD (gp2) as the storage type, allocated storage set to 20 GiB, and an unchecked option to enable storage autoscaling.](http://docs.aws.amazon.com/hands-on/latest/create-mysql-db/images/settings-interface-general-purpose-type.png)

1. Configure connectivity

   You are now in the **Connectivity** section where you can provide information that Amazon RDS needs to launch your MySQL DB instance. The following list shows settings for our example DB instance. 

   **Connectivity** 
   + **Compute resource**: Choose **Don’t connect to an EC2 compute resource.** You can manually set up a connection to a compute resource later. 
   + **Virtual Private Cloud (VPC)**: Select **Default VPC.** For more information about VPC, see Amazon RDS and Amazon Virtual Private Cloud (VPC). 

   **Additional connectivity configurations** 
   + **Subnet group**: Choose the **default** subnet group. For more information about subnet groups, see Working with DB Subnet Groups. 
   + **Public accessibility**: Choose **Yes.** This will allocate an IP address for your database instance so that you can directly connect to the database from your own device. 
**Note**  
You will incur charges of $0.005 per hour. 
   + **VPC security groups**: Select **Create new VPC security group.** This will create a security group that will allow connection from the IP address of the device that you are currently using to the database created. 
   + **Availability Zone**: Choose **No preference.** See Regions and Availability Zones for more details. 
   + **RDS Proxy**: By using Amazon RDS Proxy, you can allow your applications to pool and share database connections to improve their ability to scale. Leave the **RDS Proxy** unchecked. 
   + **Port**: Leave the default value of 3306.   
![Database connectivity settings in AWS, showing options for compute resource connection, VPC selection, public access enabled, and creating a new VPC security group.](http://docs.aws.amazon.com/hands-on/latest/create-mysql-db/images/database-connectivity-settings-options.png)

1. Choose authentication option

   Amazon RDS supports several ways to authenticate database users. Choose **Password authentication** from the list of options   
![Database authentication options screen with 'Password authentication' selected, allowing authentication using database passwords.](http://docs.aws.amazon.com/hands-on/latest/create-mysql-db/images/database-authentication-options-screen.png)

1. Verify monitoring

   Leave **Enable enhanced monitoring** unchecked to stay within the Free Tier. Enabling enhanced monitoring will give you metrics in real time for the operating system (OS) that your DB instance runs on. For more information, see [Viewing DB Instance Metrics.](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Monitoring.html)   
![Checkbox option labeled "Enable Enhanced monitoring" with a description about monitoring CPU usage by processes or threads.](http://docs.aws.amazon.com/hands-on/latest/create-mysql-db/images/checkbox-option-labeled-enable-enhanced.png)

1. Set additional configuration options

   In the **Additional configurations** section**:** 

   **Database options** 
   + **Database name**: Enter a database name that is 1 to 64 alphanumeric characters. If you do not provide a name, Amazon RDS will not automatically create a database on the DB instance you are creating. 
   + **DB parameter group**: Leave the default value. For more information, see Working with DB Parameter Groups. 
   + **Option group**: Leave the default value. Amazon RDS uses option groups to enable and configure additional features. For more information, see Working with Option Groups. 

   **Encryption**: This option is not available in the Free Tier. For more information, see [Encrypting Amazon RDS Resources](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html).  

   **Backup** 
   + **Backup retention period**: You can choose the number of days to retain the backup you take. For this tutorial, set this value to ** 1 day.** 
   + **Backup window**: Use the default o**f** ** No preference.** 

   **Maintenance** 
   + **Auto minor version upgrade**: Select **Enable auto minor version upgrade** to receive automatic updates when they become available. 
   + **Maintenance Window**: Select **No preference.** 

   **Deletion protection:** Turn off **Enable deletion protection** for this tutorial. When this option is enabled, you're prevented from accidentally deleting the database. 

   Choose **Create Database**.   
![Amazon RDS additional configuration screen showing database options, backup settings, log exports, maintenance preferences, deletion protection, and estimated monthly costs with a "Create database" button.](http://docs.aws.amazon.com/hands-on/latest/create-mysql-db/images/additional-configuration-screen-database.png)

### Step 2: Download a SQL client
<a name="download-a-sql-client"></a>

Once the database instance creation is complete and the status changes to **available,** you can connect to a database on the DB instance using any standard SQL client. In this step, we will download MySQL Workbench, which is a popular SQL client. 

1. Install MySQL Workbench

   Go to the [Download MySQL Workbench](http://dev.mysql.com/downloads/workbench/) page to download and install MySQL Workbench. For more information on using MySQL, see the [MySQL Documentation](http://dev.mysql.com/doc/). 
**Note**  
Remember to run MySQL Workbench from the same device from which you created the DB instance. The security group your database is placed in is configured to allow connection only from the device from which you created the DB instance.   
![MySQL Community Downloads page for MySQL Workbench 8.0.29, showing macOS selected as the operating system with a download button for the DMG archive.](http://docs.aws.amazon.com/hands-on/latest/create-mysql-db/images/community-downloads-page-workbench-macos.png)

1. Download client

   You will be prompted to log in, sign up, or begin your download. You can choose **No thanks, just start my download** for a quick download.   
![MySQL Community Downloads page with options to log in, sign up, or skip and start the download.](http://docs.aws.amazon.com/hands-on/latest/create-mysql-db/images/community-downloads-page-options-log-sign.png)

### Step 3: Connect to the MySQL database
<a name="connect-to-the-mysql-database"></a>

In this step, we will connect to the database you created using MySQL Workbench. 

1. Launch MySQL Workbench

   Launch the MySQL Workbench application and go to **Database > Connect to Database** (Ctrl\+U) from the menu bar.   
![MySQL Workbench interface with the "Connect to Database" option highlighted in the Database menu.](http://docs.aws.amazon.com/hands-on/latest/create-mysql-db/images/workbench-interface-connect-database.png)

1. Specify connection options

   A dialog box appears. Enter the following: 
   + **Hostname**: You can find your hostname on the Amazon RDS console as shown in the screenshot. 
   + **Port**: The default value should be 3306. 
   + **Username**: Type in the username you created for the Amazon RDS database. In this tutorial, it is '**masterUsername**.' 
   + **Password**: Choose **Store in Vault** (or **Store in Keychain** on MacOS) and enter the password that you used when creating the Amazon RDS database. 

   Choose **OK.**   
![Amazon RDS Console with database connection details and MySQL Workbench setup, highlighting hostname, port, and username fields.](http://docs.aws.amazon.com/hands-on/latest/create-mysql-db/images/console-database-connection-details.png)

1. Verify database connection

   You are now connected to the database\! On the MySQL Workbench, you will see various schema objects available in the database. Now you can create tables, insert data, and run queries.   
![MySQL Workbench interface showing the Navigator panel with schemas "innodb" and "sys," an empty query editor, and the output and context help sections.](http://docs.aws.amazon.com/hands-on/latest/create-mysql-db/images/workbench-interface-navigator-panel.png)

### Step 4: Delete the DB instance
<a name="delete-the-db-instance"></a>

You can easily delete the MySQL DB instance from the Amazon RDS console. It is a best practice to delete instances that you are no longer using so that you don’t keep getting charged for them. 

1. Choose the DB instance

   Go back to the Amazon RDS console. Select **Databases**, choose the instance that you want to delete, and then select **Delete** from the **Actions** dropdown menu.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/create-mysql-db/images/selection-interface.png)

1. Confirm instance deletion

   You are asked to create a final snapshot and to confirm the deletion. For our example, do not create a final snapshot, acknowledge that you want to delete the instance, and then choose **Delete**.  
**Note**  
Deleting your DB instance may take a few minutes   
![Confirmation dialog for deleting an RDS instance, with options to create a final snapshot, retain automated backups, acknowledgment of data loss, a text field to type 'delete me,' and a red warning about taking a final snapshot.](http://docs.aws.amazon.com/hands-on/latest/create-mysql-db/images/confirmation-dialog-deleting-instance.png)

## Congratulations\!
<a name="congratulations"></a>

You have created, connected to, and deleted a MySQL database instance with [Amazon RDS](https://aws.amazon.com/rds/).  Amazon RDS makes it easy to set up, operate, and scale a relational database in the cloud. It provides cost-efficient and resizable capacity while managing time-consuming database administration tasks, freeing you up to focus on your applications and business. 

[Create a Web Server and Amazon RDS DB](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/TUT_WebAppWithRDS.html) 