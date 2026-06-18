

# Migrate an ASP.NET Web Application to Elastic Beanstalk
<a name="migrate-aspnet-web-application-elastic-beanstalk"></a>


|  |  | 
| --- |--- |
| **AWS experience** | Intermediate  | 
| **Time to complete** | 15 minutes  | 
| **Cost to complete** | Running this tutorial for an hour with two t3.medium instances in the US East (N. Virginia) Region (us-east-1) will cost $0.12 total (on demand). One day will cost $2.88; one month will cost about $84.40.  | 
| **Requires** | AWS account with IAM permissions to create an EC2 instance, key pair, security group, IAM user, and an Elastic Beanstalk environment.   Accounts created within the past 24 hours might not yet have access to the services required for this tutorial.  | 
| **Last updated** | March 30, 2023  | 

## Overview
<a name="overview"></a>

The purpose of this tutorial is to migrate a sample ASP.NET web application to a fully managed [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) environment using the interactive Windows Web Application Migration Assistant (WWAMA). Additional information about the Windows Web Application Migration Assistant is available [here](https://github.com/awslabs/windows-web-app-migration-assistant). 

## What you'll accomplish
<a name="what-you-will-accomplish"></a>
+ In this tutorial, you will  migrate a sample ASP.NET web application to a fully managed AWS Elastic Beanstalk environment. 

## Prerequisites
<a name="prerequisites"></a>

You will need an AWS account and [IAM](https://aws.amazon.com/iam/) permissions to create an [EC2](https://aws.amazon.com/ec2/) instance, key pair, security group, IAM user, and an Elastic Beanstalk environment. This tutorial will deploy an AWS CloudFormation template that automatically provisions the sample website on an EC2 instance that will be the source web application for the migration.  

## Implementation
<a name="implementation"></a>

### Step 1: Sign up for AWS
<a name="sign-up-for-aws"></a>
+ The CloudFormation template used in this tutorial launches a t3.medium EC2 instance, which is **not** included in the Free Tier. You can estimate EC2 costs on the [EC2 pricing page](https://aws.amazon.com/ec2/pricing/). 

  Already have an account? [Sign in](https://console.aws.amazon.com/console/home). 

### Step 2: Set up and configure the stack
<a name="set-up-and-configure-the-stack"></a>
+ Use CloudFormation to launch the EC2 instance that will host the sample website. Then, set up the required IAM permissions. 

  1. Launch an EC2 instance

     Use CloudFormation to launch an EC2 instance in the US-East-1 Region. 

     First, you will need to download the [YAML file](https://github.com/awslabs/windows-web-app-migration-assistant/blob/master/cfn_stack/WWAMALab.yml) we will use for the CloudFormation template from GitHub. In GitHub, open the context (right-click) menu of the **Raw** button at the top of the file, select **Save Link As**. Choose the location on your computer where you want to save the file, and select **Save**.   
![The aws-labs GitHub repository for windows-web-app-migration-assistant, showing the file WWAMALab.yml and an example of using the 'Save Link As...' option for a raw CloudFormation template. This illustrates how to migrate ASP.NET web applications to AWS using the migration assistant.](http://docs.aws.amazon.com/hands-on/latest/migrate-aspnet-web-application-elastic-beanstalk/images/fpavuawv-migration-assistant-labs-github.png)

  1. Create the stack

     Once you have saved the file locally, open the [Create stack](https://us-east-2.console.aws.amazon.com/cloudformation/home?region=us-east-2#/stacks/create) page within the AWS CloudFormation console. In the **Specify template** section, select **Upload a template file**. 

     Choose the **Choose file** button and navigate to the YAML file on your local machine and select **Open**. 

     Then choose **Next**.   
![The AWS CloudFormation 'Create stack' page showing the process to upload a template file for creating a stack, with steps to select 'Upload a template file,' choose a file, and proceed to the next step.](http://docs.aws.amazon.com/hands-on/latest/migrate-aspnet-web-application-elastic-beanstalk/images/stack-becd-cfnlong-page-process-upload.png)

  1. Add a key pair

     Select an existing key pair or [create a key pair](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html#having-ec2-create-your-key-pair) if you do not have one. 

     Then choose **Next**.   
![The AWS CloudFormation console showing the 'Specify stack details' step for migrating an ASP.NET web application, where the user enters a stack name and selects a key pair parameter before proceeding to the next step.](http://docs.aws.amazon.com/hands-on/latest/migrate-aspnet-web-application-elastic-beanstalk/images/specify-details-cfnlong-console-stack.png)

  1. Review the configuration

     On the **Configure stack** options screen, choose **Next**. At the bottom of the **Review** screen, choose **Submit**.   
![The AWS CloudFormation console showing the 'Review WWAMAStack' step for creating a stack, specifying template and stack details, with the Submit button highlighted.](http://docs.aws.amazon.com/hands-on/latest/migrate-aspnet-web-application-elastic-beanstalk/images/stack-abe-cfnlong-console-wwamastack.png)

  1. Verify completion

     Once the stack has been created, you will see its status change to **CREATE\_COMPLETE**.   
![The AWS CloudFormation console with the WWAMAStack stack creation marked as complete. This image is used to verify the successful completion of migrating an ASP.NET Web Application.](http://docs.aws.amazon.com/hands-on/latest/migrate-aspnet-web-application-elastic-beanstalk/images/verify-completion-adcd-cfnlong-console.png)

### Step 3: Create the IAM user
<a name="create-the-iam-user"></a>

1. Log into the console and add a user

   Log in to the [IAM console](https://console.aws.amazon.com/iam/home?#/users). 

   In the left navigation pane, select **Users**, then choose **Add users**. 

   Enter the **User name** **MigrationUser**, check the box for **Programmatic access**, then choose **Next:Permissions**.   
![The 'Add user' step in the AWS Management Console, showing fields for entering a user name and selecting access types when migrating an ASP.NET web application. The screen shows the creation of a user called 'MigrationUser' with programmatic access enabled.](http://docs.aws.amazon.com/hands-on/latest/migrate-aspnet-web-application-elastic-beanstalk/images/owtelhwh-user-console-fields-entering-name.png)

1. Attach Elastic Beanstalk policy

   Select **Attach existing policies directly**, and enter **beanstalk** in the search bar to filter the policies. Select the **checkbox** next to **AdministratorAccess-AWSElasticBeanstalk**.   
![The process of attaching an AWS Elastic Beanstalk policy to a user during the permissions step when migrating an ASP.NET web application. The image displays the 'Add user' page in the AWS Management Console, where Beanstalk-related AWS managed policies are being filtered and selected under 'Set permissions'.](http://docs.aws.amazon.com/hands-on/latest/migrate-aspnet-web-application-elastic-beanstalk/images/atttach-beanstalk-policy-process-attaching.png)

1. Attach IAM policy

   Enter **iam** in the search bar and select the **checkbox** next to **IAMReadOnlyAccess**.   
![The AWS Management Console showing the process of attaching existing IAM policies directly while adding a user, as part of migrating an ASP.NET web application. The 'IAMReadOnlyAccess' policy is selected in the permissions setup interface.](http://docs.aws.amazon.com/hands-on/latest/migrate-aspnet-web-application-elastic-beanstalk/images/abes-attach-iam-policy-fab-bef-console.png)

1. Attach S3 policy

   Enter **s3** in the search bar and select the **checkbox** next to **AmazonS3FullAccess**.   
![The AWS IAM Add User interface showing permissions being set by attaching the AmazonS3FullAccess policy directly to a user. This is step 2 of migrating an ASP.NET Web Application and demonstrates how to assign S3 permissions.](http://docs.aws.amazon.com/hands-on/latest/migrate-aspnet-web-application-elastic-beanstalk/images/attach-policy-adfae-iam-user-interface.png)

1. Review configuration and create user

   Choose **Next:Tags**, then **Next:Review**, and then **Create user**.   
![The 'Add user' review step in AWS IAM, showing user details and attached policies for a migration user when migrating an ASP.NET web application. Policies include AdministratorAccess-AWSElasticBeanstalk, IAMUserChangePassword, and AmazonS3FullAccess.](http://docs.aws.amazon.com/hands-on/latest/migrate-aspnet-web-application-elastic-beanstalk/images/user-configuration-iam-details-attached.png)

1. Download credentials

   After the user is created, choose the **Download .csv** button when the prompt appears.   
![The AWS Management Console after successfully creating a user, showing a success message and an option to download user security credentials as a .csv file. The page includes user details and security key information for user MigrationUser.](http://docs.aws.amazon.com/hands-on/latest/migrate-aspnet-web-application-elastic-beanstalk/images/tobv-download-credentials-console.png)

### Step 4: Log in to the EC2 console and set up to run the WWAMA tool
<a name="log-in-to-the-ec2-console-and-set-up-to-run-the-wwama-tool"></a>

1. Log into the EC2 console

   Log in to [EC2 console](https://us-east-1.console.aws.amazon.com/ec2/v2/home?region=us-east-1#Instances:instanceState=running). 

   Select the WWAMA instance and choose **Connect**.   
![The AWS Management Console showing a running EC2 instance named 'WWAMA Lab' filtered by 'Instance state = running'. Used to verify the running status of an instance during ASP.NET web application migration.](http://docs.aws.amazon.com/hands-on/latest/migrate-aspnet-web-application-elastic-beanstalk/images/rijx-verify-running-instance-fafec-cfed.png)

1. Connect to the instance

   Select the **RDP client** tab, then choose the **Download remote desktop file** button and save the RDP file. Then choose **Get password**.   
![The AWS Management Console showing the 'Connect to instance' options for an EC2 Windows instance, highlighting the process to connect using an RDP client, including session type selection, remote desktop file download, and connection credentials.](http://docs.aws.amazon.com/hands-on/latest/migrate-aspnet-web-application-elastic-beanstalk/images/connect-instance-console-options-windows.png)

1. Upload private key

   Choose **Upload private key file** to upload your private key, then choose **Decrypt password** to get your Windows Server password. You will see the password in plain text. 

   Copy it because you will need it in the next step.   
![The AWS Management Console 'Get Windows password' interface, showing the process to upload a private key file to retrieve and decrypt the initial Windows administrator password for an EC2 instance. Used in the context of migrating an ASP.NET web application.](http://docs.aws.amazon.com/hands-on/latest/migrate-aspnet-web-application-elastic-beanstalk/images/ghgrzxm-upload-private-key-console-get.png)

1. Log into the instance

   Log in to the EC2 instance using the RDP file you saved earlier and provide your password. 

1. Open a PowerShell terminal

   Open a PowerShell terminal as an Administrator by choosing the Windows icon in the lower left corner of the screen, open the **Windows PowerShell** folder, open the context (right-click) menu for **Windows PowerShell**, and then choose **Run as Administrator**.   
![The Windows Server start menu with the context menu for Windows PowerShell open, showing options to run as administrator. This interface is often used when migrating ASP.NET web applications with PowerShell commands.](http://docs.aws.amazon.com/hands-on/latest/migrate-aspnet-web-application-elastic-beanstalk/images/powershell-terminal-windows-server-start.png)

1. Configure credentials

   In the PowerShell window, run the commands provided in the PowerShell sample to configure the AWS credentials. Replace **ACCESS\_KEY** and **SECRET\_ACCESS\_KEY** with the values in the CSV file you downloaded earlier during the creation of the **MigrationUser**. 

   ```
   PS C:\> Import-Module AWSPowerShell
   PS C:\> Set-AWSCredential -AccessKey ACCESS_KEY -SecretKey SECRET_ACCESS_KEY -StoreAs default
   ```  
![Windows PowerShell commands used for AWS, including importing the AWSPowerShell module and setting AWS credentials, as part of the process to migrate an ASP.NET web application.](http://docs.aws.amazon.com/hands-on/latest/migrate-aspnet-web-application-elastic-beanstalk/images/svtpmvxw-run-commands-windows-powershell.png)

1. Extract Migration Assistant files

   The migration assistant has been pre-downloaded on the C:\\ drive by the CloudFormation template. The file is **wwama.zip**. 

   Open the context (right-click) menu for the wwama.zip file and extract the archive.   
![The extraction of files from a compressed folder in Windows Explorer, as part of migrating an ASP.NET web application. The 'Extract All...' option is highlighted in the context menu for a zip file on the C: drive.](http://docs.aws.amazon.com/hands-on/latest/migrate-aspnet-web-application-elastic-beanstalk/images/eohipyv-extract-files-bda-cae-extraction.png)

1. View the sample website

   Open a web browser on the EC2 Windows Server instance and navigate to **http://localhost/**. 

   You will see the sample website that the migration assistant will migrate.   
![The WWAMA Lab sample webpage, demonstrating the Windows Web Application Migration Assistant for AWS Elastic Beanstalk. The page features a navigation bar, a description of the migration utility, a 'Learn more' button, and introductory text for getting started with WWAMA.](http://docs.aws.amazon.com/hands-on/latest/migrate-aspnet-web-application-elastic-beanstalk/images/bke-view-sample-webpage-wwama-lab.png)

### Step 5: Run the Migration Assistant
<a name="run-the-migration-assistant"></a>

1. Launch the script

   In the PowerShell terminal you opened earlier, change to the migration assistant directory and launch the migration script. 

   ```
   PS C:\> cd \wwama\windows-web-app-migration-assistant-master
   PS C:\wwama\windows-web-app-migration-assistant-master> .\MigrateIISWebsiteToElasticBeanstalk.ps1
   ```

   The assistant prompts you for the location of your credentials file. Press **Enter** to skip. 

   When prompted for AWS Profile Name, enter **default**. 

1. Select a Region

   Enter the AWS Region where you'd like your Elastic Beanstalk environment to run. 

   For example: us-east-1. For a list of AWS Regions where Elastic Beanstalk is available, see [AWS Elastic Beanstalk endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/elasticbeanstalk.html). 

1. Select the web application you want to migrate

   The assistant then discovers any websites running on your IIS server and lists them, as in the example. 

   Enter the number **2** to migrate the sample site.   
![The AWS Web Application Migration Assistant command line interface during the process of selecting a specific ASP.NET website to migrate, including profile and region selection and identification of available sites on the local server.](http://docs.aws.amazon.com/hands-on/latest/migrate-aspnet-web-application-elastic-beanstalk/images/select-migration-assistant-command-line.png)

1. Update connection strings

   The assistant then prompts you to update any connection strings selected above. Press **Enter** as there aren’t any connection strings in this application. 

   This message will appear: **The migration assistant didn't find any connection strings.** 

1. Set up your Elastic Beanstalk application

   Next, name your new Elastic Beanstalk application. 

   When prompted to select the Windows Server version, enter **6** and press **Enter.**   
![The process of migrating an ASP.NET web application to AWS Elastic Beanstalk, including application setup, connection string discovery, and selection of supported Windows Server versions.](http://docs.aws.amazon.com/hands-on/latest/migrate-aspnet-web-application-elastic-beanstalk/images/set-cedbed-process-migrating-asp-net-1.png)

1. Configure application

   For instance type that the application will run on, press **Enter** to select the default (t3.medium). 

   ```
   Enter the instance type (default t3.medium) : 
   ```

   For **environment type**, enter 1 for single instance. 

   ```
   Enter the environment type [1]:
   ```

   The migration assistant then migrates your application to Elastic Beanstalk.   
![The process of migrating an ASP.NET web application to AWS Elastic Beanstalk, including application setup, connection string discovery, and selection of supported Windows Server versions.](http://docs.aws.amazon.com/hands-on/latest/migrate-aspnet-web-application-elastic-beanstalk/images/set-cedbed-process-migrating-asp-net-1.png)

1. Verify completion

   When the migration completes, you will see a success message in the CLI.   
![A command-line interface displaying the process of updating and verifying migration completion for an ASP.NET web application to AWS Elastic Beanstalk. The output includes deployment details, environment status, URLs, and confirmation of successful application launch on the AWS Elastic Beanstalk platform.](http://docs.aws.amazon.com/hands-on/latest/migrate-aspnet-web-application-elastic-beanstalk/images/verify-migration-completion-aadad-bfe.png)

### Step 6: Navigate to your web application hosted on Elastic Beanstalk
<a name="navigate-to-your-web-application-hosted-on-elastic-beanstalk"></a>

Now that the site is successfully migrated, verify that the website is up and running. 

1. Locate the application URL

   Get the URL from the output of the PowerShell script.   
![A terminal output showing the successful deployment of a migrated ASP.NET web application to AWS Elastic Beanstalk, including the application URL and confirmation of deployment.](http://docs.aws.amazon.com/hands-on/latest/migrate-aspnet-web-application-elastic-beanstalk/images/ezft-get-url-terminal-output-successful.png)

1. View the page

   Input the URL into your web browser, and you should see your web application, now running on Elastic Beanstalk.   
![The WWAMA Lab web application, demonstrating the Windows Web Application Migration Assistant (WWAMA) for AWS Elastic Beanstalk. The page describes migrating ASP.NET and ASP.NET Core applications from on-premises IIS Windows servers to AWS Elastic Beanstalk, featuring navigation, a 'Learn more' button, and a 'Getting started with WWAMA' section.](http://docs.aws.amazon.com/hands-on/latest/migrate-aspnet-web-application-elastic-beanstalk/images/view-webpage-wwama-lab-demonstrating.png)

1. Access the app in Beanstalk

   You can also view the Elastic Beanstalk environment from the [AWS console](https://us-east-1.console.aws.amazon.com/elasticbeanstalk/home?region=us-east-1#/environments). Make sure you're seeing the console for the same Region you deployed your application to. Feel free to explore what you can do with your application by using the menu on the left side.   
![The AWS Elastic Beanstalk console showing the deployment status and environment health for a migrated ASP.NET web application running on IIS 10.0 with Windows Server 2019. The image displays application version, platform details, and recent environment events.](http://docs.aws.amazon.com/hands-on/latest/migrate-aspnet-web-application-elastic-beanstalk/images/elastic-beanstalk-console-aeblong.png)

### Clean up resources
<a name="run-the-migration-assistant"></a>

1. Delete the Elastic Beanstalk application

   Go to the [Elastic Beanstalk console](https://us-east-1.console.aws.amazon.com/elasticbeanstalk/home?region=us-east-1#/applications). 

   In the **Applications** view, select the radio button next to your application, choose the **Actions** menu, then select **Delete application**. In the confirmation dialog, enter the name of your application and choose **Delete**. This will delete both your application and the Elastic Beanstalk environment.   
![The AWS Elastic Beanstalk console with the 'Delete application' option highlighted for a migrated ASP.NET web application.](http://docs.aws.amazon.com/hands-on/latest/migrate-aspnet-web-application-elastic-beanstalk/images/stlom-delete-resources-aeblong-console.png)

1. Delete temporary files from Amazon S3

   Go to the [Amazon S3 console](https://s3.console.aws.amazon.com/s3/buckets?region=us-east-1), select the radio button next to the bucket named **elastic-beanstalk-migration-ACCOUNT\_ID-TIMESTAmazon Managed Service for Prometheus**, where **ACCOUNT\_ID** is your AWS account ID and **TIMESTAmazon Managed Service for Prometheus** is the time that your application was deployed. 

   Then choose **Empty** to first empty the contents of the bucket. You will need to confirm this action by entering **permanently** **delete** in a text box and choose **Empty**. Choose **Exit** to go back to the S3 buckets view. 

   Now that the S3 bucket is empty, select the radio button next to the bucket again and choose **Delete**. You will need to confirm this action by entering the name of the bucket in the text box and choose **Delete bucket**.   
![The Amazon S3 console showing the 'Buckets' overview with a selected bucket for elastic beanstalk migration and the 'Empty' button highlighted. This view illustrates an empty S3 bucket in the US East (N. Virginia) region, useful for steps involving the migration of an ASP.NET web application.](http://docs.aws.amazon.com/hands-on/latest/migrate-aspnet-web-application-elastic-beanstalk/images/empty-bucket-console-buckets-overview.png)

1. Delete the CloudFormation stack

   Go to the CloudFormation console and delete the [CloudFormation stack](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks?filteringText=&filteringStatus=active&viewNested=true&hideStacks=false) **WWAMAStack** created at the start of the lab. 

## Conclusion
<a name="conclusion"></a>

Congratulations\! You have successfully migrated a sample ASP.NET web application to a fully managed Elastic Beanstalk environment using the Windows Web Application Migration Assistant (WWAMA). AWS Elastic Beanstalk is an easy-to-use service for deploying and scaling web applications and services developed with Java, .NET, PHP, Node.js, Python, Ruby, Go, and Docker on familiar servers such as Apache, Nginx, Passenger, and IIS. You can simply upload your code, and Elastic Beanstalk automatically handles the deployment, from capacity provisioning, load balancing, auto scaling, to application health monitoring. At the same time, you retain full control over the AWS resources powering your application and can access the underlying resources at any time. Visit [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) to learn more.