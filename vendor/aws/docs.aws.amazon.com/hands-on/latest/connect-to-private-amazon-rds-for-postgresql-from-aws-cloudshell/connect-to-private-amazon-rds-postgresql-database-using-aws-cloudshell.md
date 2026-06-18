

# Connect to Private Amazon RDS PostgreSQL Database Using AWS CloudShell
<a name="connect-to-private-amazon-rds-postgresql-database-using-aws-cloudshell"></a>


|  |  | 
| --- |--- |
| AWS experience | Beginner | 
| Time to complete | 30 minutes | 
| Cost to complete | Less than $1 when completed in 1 hour | 
| Services used | [AWS CloudShell](https://aws.amazon.com/cloudshell/) and [Amazon RDS for PostgreSQL](https://aws.amazon.com/rds/postgresql/) | 
| Last updated | February 23, 2026 | 

## Introduction
<a name="introduction"></a>

Following AWS best practices, databases should be hosted in private subnets within an [Amazon Virtual Private Cloud (Amazon VPC)](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) for enhanced security. When an Amazon RDS PostgreSQL database is hosted in private subnets without public access, you must create another instance in a public subnet and then connect to the database instance. Alternatively, you can establish a connection by creating an [AWS Client VPN](https://aws.amazon.com/vpn/client-vpn/); however, both options incur additional costs.

A simpler and more cost-effective alternative is to use [AWS CloudShell](https://aws.amazon.com/cloudshell/). AWS CloudShell is a browser-based, pre-authenticated shell that you can launch directly from the AWS Management Console. The AWS CloudShell VPC feature allows you to create a CloudShell environment within your VPC. For each VPC environment, you can specify a VPC, add a subnet, and associate up to five security groups. CloudShell inherits the network configuration of the VPC, enabling you to use CloudShell securely within the same subnet as other resources in the VPC and connect to them.

There is no additional charge for AWS CloudShell. You only pay for other AWS resources you use with CloudShell to create and run your applications.

## Prerequisites
<a name="prerequisites"></a>

Before starting this tutorial, you will need:
+ An AWS account: If you don't already have one, follow the [Setting Up Your AWS Environment](https://aws.amazon.com/getting-started/guides/setup-environment/) getting started guide for a quick overview.

## Tasks
<a name="tasks"></a>

This tutorial is divided into the following short tasks. You must complete each task before moving on to the next one.

1. Create a custom Amazon Virtual Private Cloud with public and private subnets (5 Minutes)

1. Create an Amazon RDS PostgreSQL database hosted in private subnets within an Amazon VPC. (10 Minutes)

1. Set up an AWS CloudShell Virtual Private Cloud environment and test connectivity (10 Minutes)

1. Clean up resources (5 Minutes)

## Implementation
<a name="w2aab5c11"></a>

### Task 1: Create a custom Amazon Virtual Private Cloud with public and private subnets
<a name="task-1-create-a-custom-amazon-virtual-private-cloud-with-public-and-private-subnets"></a>

In this task, you will use an AWS CloudFormation template to create a custom Amazon VPC with public and private subnets.

1. Open [AWS CloudShell](https://console.aws.amazon.com/cloudshell/)

1. Copy and paste the following commands into CloudShell:

   ```
   git clone https://github.com/aws-samples/sample-Amazon-Q-Developer-Cookbook.git
   cd sample-Amazon-Q-Developer-Cookbook/dev-vpc-with-private-subnet/example-result/custom-vpc
   chmod 700 deploy.sh
   ./deploy.sh
   ```

1. Choose **Paste**.

   The commands performed the following actions:
   + Deployed an AWS CloudFormation template in a VPC with a pair of public and private subnets spread across two Availability Zones.
   + Deployed an internet gateway with a default route on the public subnets.
   + Deployed a NAT gateway and default routes for the NAT gateway in the private subnets.

1. Open [AWS CloudFormation](https://console.aws.amazon.com/cloudformation/) and wait for the Status column of the **custom-vpc** stack to show CREATE\_COMPLETE.

1. Open [Amazon VPC](https://console.aws.amazon.com/vpcconsole/).

1. Select **Your VPCs** from the left menu.

1. Select **CustomVPC**, and then select the **Resource map tab** to review the layout of the subnets and route tables.

   ![Resource map showing VPC with subnets in two availability zones connected to route tables and network connections.](http://docs.aws.amazon.com/hands-on/latest/connect-to-private-amazon-rds-for-postgresql-from-aws-cloudshell/images/resource-map-tab.png)

### Task 2: Create an Amazon RDS PostgreSQL database hosted in private subnets within an Amazon VPC
<a name="task-2-create-an-amazon-rds-postgresql-database-hosted-in-private-subnets-within-an-amazon-vpc"></a>

In this task, you will create an Amazon RDS PostgreSQL database hosted in private subnets within an Amazon VPC you've created in the previous task.

1. Open the [Amazon RDS](https://console.aws.amazon.com/rds/) console, and select **Create a database**.

   ![Create a database section with two options: Create a database button and Restore from S3 button.](http://docs.aws.amazon.com/hands-on/latest/connect-to-private-amazon-rds-for-postgresql-from-aws-cloudshell/images/RDS-create-a-database.png)

1. For Engine options, select **PostgreSQL** Engine type.

   ![Database creation interface showing Full configuration method selected and PostgreSQL engine type selected.](http://docs.aws.amazon.com/hands-on/latest/connect-to-private-amazon-rds-for-postgresql-from-aws-cloudshell/images/engine-options.png)

1. For Engine version, select **PostgreSQL 16.8-R2**.

   ![Engine version dropdown showing PostgreSQL 16.8-R2 with RDS Extended Support checkbox.](http://docs.aws.amazon.com/hands-on/latest/connect-to-private-amazon-rds-for-postgresql-from-aws-cloudshell/images/engine-versions.png)

1. Select the **Dev/Test** template with the **Single-AZ DB instance deployment** option.

   ![Three RDS deployment options showing Multi-AZ cluster, Multi-AZ instance, and Single-AZ configurations.](http://docs.aws.amazon.com/hands-on/latest/connect-to-private-amazon-rds-for-postgresql-from-aws-cloudshell/images/deploy-options.png)

1. Name your DB instance identifier.

   1. For example, **postgresql-demo**

   ![Settings page showing DB instance identifier field with postgresql-demo entered.](http://docs.aws.amazon.com/hands-on/latest/connect-to-private-amazon-rds-for-postgresql-from-aws-cloudshell/images/db-instance-identifier.png)

1. Under Instance Configuration, select **Burstable classes**.

1. Select **db.t3.medium** for DB instance class, and set Allocated Storage to **20GB**.

   ![DB instance class selection showing db.t3.medium with 2 vCPUs and 4 GiB RAM selected.](http://docs.aws.amazon.com/hands-on/latest/connect-to-private-amazon-rds-for-postgresql-from-aws-cloudshell/images/instance-config.png)

1. Under **Connectivity**:
   + Select the **CustomVPC** you created in previous task.
   + Confirm that the **Public access** setting is set to **No**.
   + Select the **default security group**.

   ![VPC configuration showing CustomVPC selected, Public access set to No, and default security group chosen.](http://docs.aws.amazon.com/hands-on/latest/connect-to-private-amazon-rds-for-postgresql-from-aws-cloudshell/images/connectivity.png)

1. Leave all other options as their default settings, and choose **Create database**.

1. After the database instance successfully creates, select **View connection Details**.

   ![Success banner with View connection details button for newly created postgresql-demo database.](http://docs.aws.amazon.com/hands-on/latest/connect-to-private-amazon-rds-for-postgresql-from-aws-cloudshell/images/manage-credentials.png)

1. Copy the hostname of the instance, and select **Manage Credentials**.

   ![Connection details dialog showing master username postgres and endpoint URL for RDS database.](http://docs.aws.amazon.com/hands-on/latest/connect-to-private-amazon-rds-for-postgresql-from-aws-cloudshell/images/endpoint-info.png)

1. Retrieve the password by selecting **Retrieve secret value**.
**Important**  
Take note of the **username**, **Endpoint**, and **password**. You will need these values for your VPC environment in the next task.

   ![Secret value section with Retrieve secret value button and Resource permissions section with Edit permissions button.](http://docs.aws.amazon.com/hands-on/latest/connect-to-private-amazon-rds-for-postgresql-from-aws-cloudshell/images/secret-value.png)

### Task 3: Set up an AWS CloudShell Virtual Private Cloud environment and test connectivity
<a name="task-3-set-up-an-aws-cloudshell-virtual-private-cloud-environment-and-test-connectivity"></a>

In this task, you will set up an AWS CloudShell VPC environment and test connectivity.

1. Open [AWS CloudShell](https://console.aws.amazon.com/cloudshell/), and select the **\+** button to bring up an option for **Create VPC environment**.

   ![CloudShell interface showing options to open us-west-2 environment or create VPC environment.](http://docs.aws.amazon.com/hands-on/latest/connect-to-private-amazon-rds-for-postgresql-from-aws-cloudshell/images/create-vpc-environment.png)

1. Name the VPC environment.

   1. For example, **cloudshell-vpc-demo**.

1. Select **CustomVPC**, any **Private subnet,** and the **default security group**.

1. Choose **Create**.

   ![Create a VPC environment form with fields for name, VPC, subnet, and security group.](http://docs.aws.amazon.com/hands-on/latest/connect-to-private-amazon-rds-for-postgresql-from-aws-cloudshell/images/custom-vpc.png)
**Note**  
Public IP addresses are not allocated to CloudShell VPC environments by default. VPC environments created in public subnets with routing tables configured to route all traffic to Internet Gateway will not have access to public internet, but private subnets configured with Network Address Translation (NAT) have access to public internet. VPC environments created in such private subnets will have access to public internet.

1. Once the environment is set up, install version 16 of PostgreSQL by copying and pasting these commands.

1. Choose **Paste**.
**Note**  
It is possible that your PostgreSQL version may be outdated compared to your Amazon RDS PostgreSQL database. These commands remove the older version and installs PostgreSQL version 16.

   ```
   psql --version
   sudo dnf remove postgresql15* -y
   sudo dnf clean all
   ```

1. After that completes, copy and paste the following command to install version 16 of PostgreSQL.

1. Choose **Paste**.

   ```
   sudo dnf install postgresql16 -y
   ```

1. In your AWS CloudShell VPC environment, run the following PostgreSQL command:
**Note**  
These are the values at the end of Task 2.

   ```
   psql -h {{<HOSTNAME>}} -U {{<USERNAME>}}
   ```
**Note**  
{{<HOSTNAME>}} is your database endpoint  
{{<USERNAME>}} is your database administrator username

1. Enter your **password** to finish establishing a connection to your database.

   ![CloudShell terminal showing successful psql connection to PostgreSQL database with SSL enabled.](http://docs.aws.amazon.com/hands-on/latest/connect-to-private-amazon-rds-for-postgresql-from-aws-cloudshell/images/establish-connection-to-DB.png)

1. Validate your setup by running this test command:

   ```
   CREATE DATABASE demodb;
   ```

   ![CloudShell terminal showing PostgreSQL connection and database creation commands.](http://docs.aws.amazon.com/hands-on/latest/connect-to-private-amazon-rds-for-postgresql-from-aws-cloudshell/images/validate-setup.png)

### Task 4: Clean up resources
<a name="clean-up-resources"></a>

To avoid unexpected charges, follow these clean-up steps:

1. Open [AWS CloudShell](https://console.aws.amazon.com/cloudshell/), and select **Delete**.
**Note**  
VPC environments do not have persistent storage. The $HOME directory is deleted when your VPC environment times out (after 20-30 minutes of inactivity), or when you delete or restart your environment.

   ![Actions menu showing environment options such as View details, New tab, Split views, and Delete.](http://docs.aws.amazon.com/hands-on/latest/connect-to-private-amazon-rds-for-postgresql-from-aws-cloudshell/images/CloudShell-delete.png)

1. Enter **delete**, and choose **Delete** to confirm the deletion of the VPC environment.

1. Open [Amazon RDS](https://console.aws.amazon.com/rds/), and select **Databases**.

1. Select **postgresql-demo**.

1. Select **Actions**, and select **Delete.**

   ![Quick Actions menu showing options such as Delete, Set up EC2 connection, and Create read replica.](http://docs.aws.amazon.com/hands-on/latest/connect-to-private-amazon-rds-for-postgresql-from-aws-cloudshell/images/enter-delete.png)

1. Enter **delete me** to remove the PostgreSQL database instance.

1. Open [AWS CloudFormation](https://console.aws.amazon.com/cloudformation/), and select **custom-vpc**.

1. Select **Delete.**

   ![Stacks table showing custom-vpc stack with CREATE_COMPLETE status and VPC deployment description.](http://docs.aws.amazon.com/hands-on/latest/connect-to-private-amazon-rds-for-postgresql-from-aws-cloudshell/images/actions-delete.png)

1. Choose **Delete** to remove the CloudFormation stack.

## Conclusion
<a name="conclusion"></a>

You have learned how to connect to an Amazon RDS PostgreSQL instance in private subnets within Amazon VPC using AWS CloudShell.