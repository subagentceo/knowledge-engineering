

# Migrate from RDS MySQL to Aurora MySQL in near zero downtime
<a name="migrate-rdsmysql-to-auroramysql"></a>


|  |  | 
| --- |--- |
| **AWS experience** | Beginner  | 
| **Time to Complete** | 10 - 20 minutes  | 
| **Cost to Complete** | Less than $1  | 
| **Services Used** | [AWS RDS](https://aws.amazon.com/rds/) [Amazon Aurora](https://aws.amazon.com/aurora/) | 

## Overview
<a name="overview"></a>

In this tutorial, we will look at how to migrate from Amazon RDS MySQL to Amazon Aurora MySQL with minimal downtime. As with any database migration, there are several options. For migrating data from a MySQL DB Instance to an Amazon Aurora MySQL DB Cluster, we recommend to use a special type of node called an Aurora Read Replica for the source MySQL DB instance. Amazon RDS uses the MySQL DB engines' binary log replication functionality and updates made to the source MySQL DB instance are asynchronously replicated to the Aurora Read Replica. As replication lag between source DB instance and Aurora Read Replica approaches zero, redirect your client applications to the Aurora Read Replica, and make the Aurora Read Replica a standalone Aurora MySQL DB cluster. For more information, refer [Amazon Aurora documentation](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Migrating.RDSMySQL.Replica.html). 

The methodology and steps discussed in this tutorial are applicable to any application’s database that resides on Amazon RDS MySQL DB instance and needs to be migrated to Aurora MySQL DB cluster. 

The tutorial is not within the free tier and will cost you less than $1 provided you follow the steps in the tutorial and terminate your resources at the end of the tutorial. 

## What you'll accomplish
<a name="what-you-will-accomplish"></a>
+ Use RDS Read Replicas to migrate from RDS MySQL to Aurora MySQL with minimal downtime 
+ Promote a read replica to become the new standalone Aurora MySQL DB cluster 
+ Connect your application to the new [DB cluster](https://docs.aws.amazon.com/hands-on/latest/create-high-availability-database-cluster/) 

## Prerequisites
<a name="prerequisites"></a>
+ Existing AWS account, if you don’t have an AWS account then you can create [new account](https://portal.aws.amazon.com/billing/signup#/start) to get started. 
+ Amazon EC2 Key Pairs are used to connect securely to your EC2 Linux-based instances using SSH. If you already have a key pair, you can reuse it for this tutorial. If you don’t have key pair then follow the [instructions](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html) to create new key pair in your preferred region, in which you will complete this tutorial. 
+ It is recommended that you complete this tutorial in Default VPC. Each AWS account is automatically created with a Default VPC in each region, containing a basic network configuration, where resources can be provisioned in any of that region’s availability zones, and can have direct access to the Internet. In rare circumstances, customers can re- purpose these default VPCs, or delete them entirely. If you cannot find the default VPC in your account and region, you can recreate it by following the steps listed [here](https://aws.amazon.com/premiumsupport/knowledge-center/deleted-default-vpc/). 

## Implementation
<a name="implementation"></a>

### Step 1: Setup web application
<a name="setup-web-application"></a>

1. Download the CloudFormation template

   The **CloudFormation.yaml** Template on the GitHub page will launch an Amazon EC2 instance of type t2.micro with latest Amazon Linux 2 OS, bootstrap Apache/PHP, and install a simple address book web application. The template will also create an Amazon RDS MySQL database instance in free tier, i.e. of type db.t2.micro and with no Multi-AZ setup or read replicas. The WebTier Security Group will allow only SSH and HTTP connections to the web server (EC2 instance), and the DBTier Security Group will only allow the WebTier Security Group to initiate database connections to the RDS DB instance over the TCP port 3306. 

   Go to the Github [link](https://github.com/aws-samples/simple-phonebook-web-application) and download the files as shown. 

   Click the Code option and then click on **Download ZIP**. The zip folder will be downloaded by your browser. 

   Go to the downloaded folder location on your machine and then unzip the folder. You will have all files as shown above.   
![GitHub repository page showing file list, branch set to master, and a "Code" dropdown with options to clone or download as ZIP.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/github-repository-page-file-list-set.png)

1. Open CloudFormation

   Open the [AWS CloudFormation console](https://console.aws.amazon.com/cloudformation/home) and sign in with your AWS account credentials. Choose the Region drop-down and select the appropriate AWS Region. This tutorial uses the US West (Oregon) Region. Click on **Create stack**.   
![AWS CloudFormation interface with a "Create stack" button to model and provision cloud infrastructure.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/cfnlong-interface-stack-button-model.png)

1. Create stack

   Select **Template is ready**, and choose **Upload a template file** as the source template. Then, click on **Choose file** and upload the **CloudFormation.yaml** (downloaded in previous step). Click **Next**.   
![AWS CloudFormation "Create stack" interface showing step 1, where a template is prepared and specified by uploading a file named "CloudFormation.yaml.".](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/cfnlong-stack-interface-where-template.png)

1. Review stack details and create stack

   Populate the form as with the values specified below, and then click **Next**: 
   + **Stack Name:** A unique identifier without spaces 
   + **DBInstanceID:** RDS DB instance identifier. It defaults to rdsdb 
   + **DatabaseName:** Database name. It defaults to mydb 
   + **KeyName:** The existing key pair in this account and region 
   + **LatestAmild:** Don't change this parameter, it will install the latest Amazon Linux 2 OS AMI 
   + **MasterUsername:** Choose subnet to deploy the instances 
   + **MasterPassword:** Password for MySQL database access 
   + **SubnetID:** Choose subnet to deploy the instances 
   + **VPC:** Choose VPC (Above subnet should be of this VPC) 
**Note**  
The resources that are created here will be prefixed with whatever value you specify in the Stack Name. Please specify a value that is unique to your account.

   Once you click **Next**, on the **Stack Options** page, accept all of the defaults and click **Next**. 

   On the **Review** page, click **Create stack**.   
![AWS CloudFormation "Specify stack details" page with fields for stack name, parameters like DBInstanceID, DatabaseName, KeyName, and VPC, and a "Next" button highlighted.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/cfnlong-specify-stack-details-page-fields.png)

1. Wait for stack creation

   At this point, you will be directed back to the CloudFormation console and will see a status of **CREATE\_IN\_PROGRESS**. Please wait here until the status changes to **COMPLETE**.   
![AWS CloudFormation interface showing a stack named "rds2aurora" with status "CREATE_IN_PROGRESS" and event details.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/cfnlong-interface-stack-named-aurora.png)

1. (Optional) Refresh status

   You can click on the refresh icon to see the progress of resources creation.   
![A table of events showing timestamps, logical IDs, and statuses, with statuses including "CREATE_COMPLETE" and "CREATE_IN_PROGRESS.".](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/table-events-timestamps-logical-ids.png)

1. View stack outputs

   Once CloudFormation status changes to **CREATE\_COMPLETE**, go to the **Outputs** section. 

   Make a note of the **Output** values from the CloudFormation environment that you have launched, as you will need them for the remainder of the lab. 

   For this tutorial setup, the values are: 
   + RDS DB instance endpoint - **rdsdb.cp94ll5qcjxh.us-west-2.rds.amazonaws.com** 

     This is the DNS name of your database instance, and you will need it to connect to the database. 
   + Webserver URL - **http://ec2-35-165-91-1.us-west-2.compute.amazonaws.com/** 

     This is the Public DNS name of the Amazon EC2 instance.   
![AWS CloudFormation console showing a stack named "rds2aurora" with a status of "CREATE_COMPLETE" and outputs including an RDS DB instance endpoint and a webserver URL.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/cfnlong-console-stack-named-aurora-status.png)

1. Open web application and choose RDS

   Open a new browser tab and navigate to the web server interface by entering the EC2 instance’s **Public DNS** name (from preceding step) into the browser. You should see a website that looks like the example. 

   Click on the **RDS** tab.   
![Amazon Web Services RDS load test interface showing instance ID, availability zone, and current CPU load at 1%.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/load-test-interface-instance-availability.png)

1. Enter database details

   Enter the credentials and database name as shown. The RDS Endpoint name was noted in previous step Click the **Submit** button.   
![Amazon Web Services interface showing database connection fields for endpoint, database name, username, and password with a "Submit" button.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/interface-database-connection-fields.png)

1. Verify connection and view configuration file

   You will see a brief message of a connection attempt by the application to connect to the database on the RDS DB instance, as shown. 

   You will review the contents of file **rds.conf.php**   
![Amazon Web Services page showing a command execution for MySQL and a message about writing configuration to rds.conf.php, with a redirect notice.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/page-command-execution-message-writing.png)

1. View address book

   Upon successful connection completion, you will be redirected to a simple address book application displaying all of the information from the database.   
![A web interface displaying an address book with entries for Alice and Bob, including their phone numbers, email addresses, and options to edit or remove each contact.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/interface-displaying-address-book-entries.png)

1. (Optional) Test database operations

   Feel free to play around with the address book and add/edit/remove content from your RDS database by using the **Add Contact**, **Edit**, and **Remove** links in the Address Book. The changes made to the address book in this tutorial are shown.   
![A web-based address book interface hosted on Amazon Web Services, displaying names, phone numbers, emails, and options to edit or remove contacts.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/based-address-book-interface-hosted.png)

1. Connect to Instance

   Navigate to the [EC2 console](https://console.aws.amazon.com/ec2/v2/home), choose the EC2 instance (Webserver) and choose **Connect**.   
![Amazon EC2 dashboard showing a running t2.micro instance named "WebServer" in the us-west-2c availability zone with its public and private IP details.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/dashboard-running-micro-instance-named.png)

1. Choose a connection method

   In the **Connect to your instance** dialog box, choose **EC2 Instance Connect (browser-based SSH connection)** and then choose **Connect**. A browser window opens displaying the EC2 instance command line interface (CLI).   
![EC2 Instance Connect interface showing connection method options, with 'EC2 Instance Connect' selected and a 'Connect' button highlighted.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/instance-connect-interface-connection.png)

1. Review configuration

   From the command line, navigate to the directory **/var/www/html**. List the files and directories by issuing **ls command**. View the content of the file **rds.conf.php** by using more command. This configuration file has captured the information about the Database Endpoint DNS name, credentials, and the name of database, which you had entered while connecting to the database from the application. You will also revisit this file later.   
![Terminal window showing navigation to the `/var/www/html` directory on an Amazon Linux 2 instance, listing files including `rds.conf.php`, and displaying database connection details in the `rds.conf.php` file.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/terminal-window-navigation-var-directory.png)

### Step 2: Create Aurora Read Replica
<a name="create-aurora-read-replica"></a>

Amazon RDS uses the MySQL DB engines' binary log replication functionality to create a special type of DB cluster called an Aurora Read Replica for a source MySQL DB instance. Updates made to the source MySQL DB instance are asynchronously replicated to the Aurora Read Replica. In this step, you will create Aurora Read Replica and monitor the replication progress. 

1. Create Aurora read replica

   Open the [Amazon RDS console](https://console.aws.amazon.com/rds/), and from the left navigation pane, choose **Databases**, and then choose the MySQL DB instance that you want to use as the source for your Aurora Read Replica. Under the **Actions** drop down, choose **Create Aurora read replica**.   
![AWS RDS interface showing a database named "rdsdb" with the "Actions" dropdown menu expanded, highlighting the "Create Aurora read replica" option.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/interface-database-named-actions-dropdown.png)

1. Configure replica settings

   For the purpose of this tutorial, you will configure the Aurora Read Replica with default values and give the **DB instance identifier** an appropriate name as shown in the example. 

   Choose **Create read replica**   
![The AWS console showing the "Create Aurora read replica" page with options for DB engine, instance class, Multi-AZ deployment, and a DB instance identifier set to "aurora-db".](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/console-aur-read-replica-page-options.png)

1. Create read replica

   Choose **Create read replica**   
![Database settings interface showing IAM role, log recommendations, maintenance options, and a 'Create read replica' button.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/database-settings-interface-iam-role-log.png)

1. Monitor creation status

   Aurora DB Cluster is created with 2 instances: writer and reader. After few minutes the status of the DB cluster changes to Available. Note that the source RDS DB Instance **rdsdb** Role changes to that of **Master** (from the role of Instance as seen in step 1)   
![AWS RDS console showing a list of databases, including an Aurora MySQL cluster with two instances, both marked as "Available.".](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/console-list-databases-including-aur.png)

1. View cluster details

   Click on the Aurora DB cluster to display its details. Click on **Configuration** tab, under **Database** section confirm the **DB cluster role** is **Replica** and the **Replication source** is the ARN of RDS MySQL DB Instance **rdsdb**.   
![AWS RDS dashboard showing the configuration details of an Aurora DB cluster, including DB cluster role as Replica, replication source ARN, and availability settings.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/dashboard-configuration-details-aur.png)

1. Copy writer endpoint

   Click on **Connectivity & security** tab, under the **Endpoints** section note down the **Endpoint name** of **Writer** instance type – for this tutorial it is **aurora-db-cluster.cluster-cp94ll5qcjxh.us-west-2.rds.amazonaws.com**.   
![AWS RDS dashboard showing details of an Aurora DB cluster, including roles (Regional, Writer, Reader), endpoints, and connectivity & security settings.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/dashboard-details-aur-cluster-including.png)

### Step 3: Change RDS DB instance to read-only mode
<a name="change-rds-db-instance-to-read-only-mode"></a>

Before you can promote the Aurora Read Replica to a stand-alone DB cluster and redirect your application to the endpoint for the Aurora Read Replica, stop any write transactions from being written to the source RDS MySQL DB instance. The way to do this is by modifying the **read\_only** parameter in the parameter group assigned to the RDS DB instance. 

1. Open parameter group

   From RDS console, navigate to Parameter group, and select the custom Parameter group (that was created by CloudFormation template) and for **Parameter group actions**, choose **Edit**.   
![AWS RDS console showing the "Parameter groups" section with a selected custom parameter group and the "Edit" option highlighted in the dropdown menu.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/console-parameter-groups-section-selected.png)

1. Modify read\_only parameter

   Under **Parameters** section, search for **read\_only** parameter. The default value is{TrueIfReplica}. Explicitly set this value to **1**, which converts the instance into a read-only mode.   
![Amazon RDS parameter group interface showing a search for "read_only" with editable values and allowed options for parameters.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/parameter-group-interface-search-read-only.png)

1. Save parameter changes

   Choose **Save changes**. This parameter has a dynamic apply type, which means that its setting takes effect immediately and doesn’t require a reboot.   
![Amazon RDS interface showing parameter group settings with "read_only" parameter set to 1 and highlighted "Save changes" button.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/interface-parameter-group-settings-read.png)

### Step 4: Confirm the replication is complete from RDS to Aurora
<a name="confirm-the-replication-is-complete-from-rds-to-aurora"></a>

1. Monitor the replication process

   After the Amazon Aurora cluster has been created and loaded with the initial set of data, Amazon RDS service establishes binlog replication from the RDS MySQL instance to the Amazon Aurora cluster. 

   You can monitor this replication process by observing the CloudWatch metric Aurora Binlog Replica Lag on the Amazon Aurora cluster. 

   The AuroraBinlogReplicaLag metric is defined as the amount of time a replica DB cluster running on Aurora with MySQL compatibility lags behind the source DB cluster. Choose **Monitoring** tab and under **CloudWatch** section, search for binlog metric as shown.   
![AWS RDS dashboard showing details of an Aurora DB cluster with monitoring tab selected and a CloudWatch graph displaying Aurora Binlog Replica Lag in seconds.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/dashboard-details-aur-cluster-monitoring.png)

1. View the binlog replica lag

   The CloudWatch metric Aurora Binlog Replica Lag gives you a high-level view of the binlog replica lag, you can find a more precise measurement by logging in to the newly created Amazon Aurora cluster. To do so, use the MySQL client and run the command **show slave status\\G**. This command returns a lot of very useful information, but the specific metric that we want is **Seconds\_Behind\_Master**. When this metric reaches 0 i.e. there is no replication lag, your newly created Amazon Aurora cluster is in sync with your original RDS MySQL DB instance. 

   Follow the instructions to SSH into your EC2 instance and then connect to your Aurora DB Cluster’s Writer Endpoint **aurora-db-cluster.cluster-cp94ll5qcjxh.us-west-2.rds.amazonaws.com** and execute the command **show slave status\\G**. 

   The Amazon Aurora cluster has the same master user name and master password as the source RDS DB instance. 

   At this point, the migration of database from the source RDS MySQL DB instance to Aurora DB Cluster is completed.   
![Terminal screenshot showing a MySQL "show slave status\G" command output, highlighting "Seconds Behind Master: 0" and the connection to an Amazon RDS Aurora database.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/terminal-screenshot-show-slave-status.png)

### Step 5: Promote Aurora Read Replica to Standalone Cluster
<a name="promote-aurora-read-replica-to-standalone-cluster"></a>

In this step, you will promote your Aurora Read Replica to be a Standalone Aurora Cluster. Promotion should complete fairly quickly, and you can read from and write to the Aurora Read Replica during promotion. 

1. Promote the read replica

   To promote an Aurora Read Replica to an Aurora DB cluster, navigate to [Amazon RDS console](https://console.aws.amazon.com/rds/). In the left navigation pane, choose **Databases**. Choose the DB cluster **aurora-db-cluster** for the Aurora Read Replica. For Actions, choose **Promote**.   
![Amazon RDS dashboard showing a list of databases, with 'aurora-db-cluster' selected and the 'Promote' option highlighted in the Actions dropdown menu.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/dashboard-list-databases-aurora-cluster.png)

1. Confirm promotion

   Choose **Promote Read Replica**.   
![AWS interface showing the option to promote a read replica of "aurora-db-cluster" to a primary instance, with a warning about replication stopping during the process and buttons for "Cancel" and "Promote Read Replica.".](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/interface-option-promote-read-replica.png)

1. Verify promotion completed successfully

   Confirm that the promotion process has been completed. Click on the Aurora DB cluster, choose **Logs & events** tab.   
![AWS RDS dashboard showing details of an Aurora MySQL database cluster with instances listed as available.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/dashboard-details-aur-database-cluster.png)

1. Confirm an event was logged

   Scroll down to **Recent events** and confirm that there is a **Promoted Read Replica cluster to stand-alone database cluster** event logged.   
![AWS RDS console showing no auto-scaling policies or activities, with one recent event indicating a Read Replica cluster was promoted to a standalone database cluster.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/console-auto-scaling-policies-activities.png)

1. Verify the cluster role changed

   The Aurora DB cluster role changes to **Master** as seen in **Configuration** tab under **Database** section. Prior to the Promotion event, the role was Replica.   
![Amazon RDS dashboard showing the configuration details of an Aurora DB cluster, with the 'Master' role highlighted under the DB cluster role.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/dashboard-configuration-details-aur-1.png)

1. Verify the database role changed

   You will also notice that source RDS MySQL DB instance **rdsdb** is no longer in Master role (as seen in Step 2.3) and now has the role of **Instance**.   
![Amazon RDS dashboard showing a list of databases with identifiers, roles, engines, and regions, highlighting "rdsdb" as an instance.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/dashboard-list-databases-identifiers-roles.png)

1. Stop the instance

   After the promotion is complete, the source RDS MySQL DB Instance and the Aurora Read Replica are unlinked, and you can safely delete the RDS DB instance if you want to. AWS Recommends to take snapshot of production RDS DB Instance prior to its deletion. 

   In this tutorial, you are going to stop the RDS MySQL DB instance without creating snapshot. In the left navigation pane, choose **Databases**. Choose the source RDS DB instance **rdsdb**. For Actions, choose **Stop**.   
![Amazon RDS interface showing a list of databases with the "Actions" dropdown menu expanded, highlighting the "Stop" option for the selected database "rdsdb".](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/interface-list-databases-actions-dropdown.png)

1. Confirm stop settings

   Choose **No** for Create snapshot? 

   Then, choose **Yes, Stop Now**.   
![Confirmation dialog to stop a database instance with options to create a snapshot and a warning about automatic restart after seven days, featuring 'Cancel' and 'Yes, Stop Now' buttons.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/confirmation-dialog-stop-database-instance.png)

1. Verify the stopped state

   You will see the RDS DB instance **rdsdb** is now in **Stopped** state.   
![AWS RDS console showing a list of databases, with one MySQL instance named "rdsdb" highlighted and its status marked as "Stopped.".](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/console-list-databases-one-instance-named.png)

### Step 6: Redirect application to use Standalone Aurora Cluster
<a name="redirect-application-to-use-standalone-aurora-cluster"></a>

The Application is now ready to start writing to Aurora Standalone Cluster. 

1. Modify the configuration file

   SSH into your web server EC2 instance, navigate to the directory **/var/www/html**. You will modify the file **rds.conf.php** by executing command **sudo vi rds.conf.php.**   
![Terminal interface showing an Amazon Linux 2 AMI session, navigating to the /var/www/html directory and editing the rds.conf.php file using the vi editor.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/terminal-interface-linux-ami-session.png)

1. Configure the database endpoint

   Change the **RDS\_URL** parameter to Aurora Cluster Writer Node DNS name - **aurora-db-cluster.cluster-cp94ll5qcjxh.us-west-2.rds.amazonaws.com**. Then save the file.   
![A code snippet displayed in an Amazon EC2 Instance Connect terminal, showing PHP variables for an RDS database connection including URL, database name, username, and password.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/code-snippet-displayed-instance-connect-1.png)

1. View the configuration

   Confirm that the changes are in effect, by reading the file again – **cat rds.conf.php.**   
![A code snippet displayed in an Amazon EC2 Instance Connect terminal, showing PHP variables for an RDS database connection including URL, database name, username, and password.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/code-snippet-displayed-instance-connect-1.png)

1. Check the application connection

   Open a new browser tab and navigate to the web server interface by entering the EC2 instance’s **Public DNS** name - **ec2-34-219-103-10.us-west-2.compute.amazonaws.com** into the browser. Choose the **RDS** tab. The web server connects to the Aurora Standalone Cluster and displays the same address book information from the database.   
![A web-based address book interface hosted on Amazon Web Services, displaying a table with names, phone numbers, emails, and options to edit or remove entries.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/based-address-book-interface-hosted-1.png)

1. Verify database functionality

   Confirm that you can also make the write transactions to this database hosted on Aurora Standalone Cluster. Feel free to play around with the address book and add/edit/remove content from your database by using the **Add** **Contact**, **Edit**, and **Remove** links in the Address Book. The changes made to the address book in this tutorial is shown. 
**Note**  
Some storage constraints are not factored in this tutorial and should be considered for your production migrations. For more details, refer to Migrating Your Databases to Amazon Aurora white paper and [documentation](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Migrating.RDSMySQL.Import.html#AuroraMySQL.Migrating.RDSMySQL.Space).  
![A web-based address book interface hosted on Amazon Web Services, displaying a table of names, phone numbers, emails, and options to edit or remove entries.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/based-address-book-interface-hosted-2.png)

### Clean up resources
<a name="clean-up-resources"></a>

It is a best practice to delete instances and resources that you are no longer using so that you don’t keep getting charged for them. Remember that all running Amazon EC2 and Amazon RDS resources will incur an hourly on-demand charge. 

1. Delete the Aurora instances

   Delete all Aurora database instances created in this tutorial from the Amazon RDS Console. 
   + Select the Aurora Reader instance, click on **Actions**, then **Delete**. Type in **delete me** in the field. Then press the **Delete** button. 
   + Select the Aurora Writer instance, click on **Actions**, then **Delete**. Uncheck **Create final snapshot** and **Retain automated backups** (For production database you want to create the final snapshot in the event you need to restore the database). Click on **I acknowledge** checkbox and type in **delete me** in the field. Then press the **Delete** button. This will delete the Aurora DB Cluster as well. 

1. Terminate the EC2 instance

   Delete the EC2 instance created during the workshop. In the EC2 Console main page, click on **Running Instances**; or click on **Instances** on the left menu. Click on the checkbox next to the EC2 instance created for the web app. Then click on **Actions**, then **Instance State**, then **Terminate**. Confirm on **Yes, Terminate** when prompted. 

1. Delete the key pair

   Delete the EC2 keypair (if you created new key pair for this tutorial). Click on **Key Pairs** on the left menu under the EC2 Console. Click on the checkbox next to the key pair created. Then **Delete**. 

1. Delete the CloudFormation stack

   Navigate to [AWS CloudFormation console](https://console.aws.amazon.com/cloudformation/home) and then select the CloudFormation Stack that you created to deploy the resources for this tutorial. Click on the **Delete** button from the top right corner. CloudFormation will automatically remove all resources that it launched earlier.   
![AWS CloudFormation interface showing a stack named "rds2aurora" with status "CREATE_COMPLETE" and a highlighted "Delete" button.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/cfnlong-interface-stack-named-aurora-1.png)

1. Delete stack

   Click **Delete** stack and check the CloudFormation console to ensure the stack that you selected is deleted.   
![Confirmation dialog in AWS CloudFormation asking to delete the "rds2aurora" stack, with options to cancel or delete the stack.](http://docs.aws.amazon.com/hands-on/latest/migrate-rdsmysql-to-auroramysql/images/confirmation-dialog-cfnlong-asking-delete.png)

## Congratulations\!
<a name="congratulations"></a>

In this tutorial, you learned how the Aurora Read Replica can be used, to achieve a near zero downtime, during migration from source MySQL DB instance to Amazon Aurora MySQL Cluster. You also learned how to monitor the replication, to stop writing to RDS MySQL DB instance after replication lag approaches zero, and to convert the Aurora Read Replica into a standalone Aurora MySQL DB cluster. 